import {
  NP_TABLES,
  NP_MONTHLY_PREMIUM,
  EP_RATES_POST2021,
  EP_RATES_PRE2021,
  EP_INSURANCE_RATE,
  NP_FULL_ANNUAL_PENSION,
  EP_OLD_AGE_RATE,
} from './tables.js';

// Returns inclusive month count between two "YYYY-MM" strings.
export function monthsBetween(from, to) {
  if (!from || !to) return 0;
  const [fy, fm] = from.split('-').map(Number);
  const [ty, tm] = to.split('-').map(Number);
  const diff = (ty - fy) * 12 + (tm - fm) + 1;
  return Math.max(0, diff);
}

// Weighted contribution-paid months for NP lump-sum calculation.
// Exemption rules per PDF:
//   1/4 exempt  → counts as 3/4 month
//   1/2 exempt  → counts as 1/2 month
//   3/4 exempt  → counts as 1/4 month
//   full exempt → 0 (only for qualification period)
//   student     → 0 (only for qualification period)
export function npContributionPaidMonths({ fullPaid, quarterExempt, halfExempt, threeQuarterExempt }) {
  const raw =
    (fullPaid || 0) +
    (quarterExempt || 0) * 0.75 +
    (halfExempt || 0) * 0.5 +
    (threeQuarterExempt || 0) * 0.25;
  return Math.floor(raw);
}

// Total qualification period months (used for 120-month old-age threshold).
export function qualificationMonths({ fullPaid, quarterExempt, halfExempt, threeQuarterExempt, fullExempt, studentDeferment, epMonths }) {
  return (
    (fullPaid || 0) +
    (quarterExempt || 0) +
    (halfExempt || 0) +
    (threeQuarterExempt || 0) +
    (fullExempt || 0) +
    (studentDeferment || 0) +
    (epMonths || 0)
  );
}

// Determine the fiscal year start (April–March) for a given YYYY-MM base month.
function fiscalYearOf(yyyyMM) {
  const [y, m] = yyyyMM.split('-').map(Number);
  return m >= 4 ? y : y - 1;
}

function lookupNPTable(table, paidMonths) {
  for (const row of table) {
    if (paidMonths >= row.minMonths) return row;
  }
  return null;
}

function lookupEPRate(table, months) {
  for (const row of table) {
    if (months >= row.minMonths) return row;
  }
  return null;
}

// ─── National Pension lump-sum ───────────────────────────────────────────────
//
// Formula:  Amount = NP_premium × 1/2 × Number
//
// baseMonth: YYYY-MM of the last premium payment month (基準月).
export function nationalPensionLumpSum({ paidMonths, baseMonth }) {
  if (paidMonths < 6 || !baseMonth) return null;

  const isPost2021 = baseMonth >= '2021-04';
  const cap = isPost2021 ? 60 : 36;
  const cappedMonths = Math.min(paidMonths, cap);

  const fy = fiscalYearOf(baseMonth);
  const table = NP_TABLES[fy] || NP_TABLES[2026];
  const premium = NP_MONTHLY_PREMIUM[fy] || NP_MONTHLY_PREMIUM[2026];
  const fyLabel = `FY${fy} (Apr ${fy}–Mar ${fy + 1})`;

  const row = lookupNPTable(table, cappedMonths);
  if (!row) return null;

  return {
    paidMonths,
    cappedMonths,
    cap,
    // Formula breakdown fields
    premium,            // NP monthly premium for display
    number: row.number, // "Number used for calculation" from the PDF table
    amount: row.amount, // pre-computed: premium × 1/2 × number
    fiscalYearLabel: fyLabel,
    fiscalYear: fy,
  };
}

// ─── Employees' Pension lump-sum ─────────────────────────────────────────────
//
// Formula:  Amount = ASR × PaymentRate
//           PaymentRate = InsuranceRate × 1/2 × Number   (= 18.3% × 0.5 × Number)
//
// Inputs:
//   epMonths              – total EP insured months
//   avgMonthlySalary      – average standard monthly remuneration (gross, post-Apr 2003)
//   totalBonuses          – total standard bonuses over the entire EP period
//   lastMonth             – YYYY-MM of the last EP insured month
export function employeesPensionLumpSum({ epMonths, avgMonthlySalary, totalBonuses, lastMonth }) {
  if (!epMonths || epMonths < 6 || !avgMonthlySalary) return null;

  const isPost2021 = lastMonth >= '2021-04';
  const cap = isPost2021 ? 60 : 36;
  const cappedMonths = Math.min(epMonths, cap);

  const table = isPost2021 ? EP_RATES_POST2021 : EP_RATES_PRE2021;
  const row = lookupEPRate(table, cappedMonths);
  if (!row) return null;

  // Average Standard Remuneration = (sum of monthly pay + total bonuses) / total months
  // (This formula applies when all insured periods are after April 2003.)
  const asr = Math.round(
    ((avgMonthlySalary || 0) * (epMonths || 0) + (totalBonuses || 0)) / (epMonths || 1)
  );

  // paymentRate is taken directly from the PDF table (= InsuranceRate × 1/2 × Number,
  // already computed; e.g. 5.5 for ≥60 months).
  const paymentRate = row.paymentRate;
  const grossAmount = Math.round(asr * paymentRate);
  const withholdingTax = Math.round(grossAmount * 0.2042);
  const netAmount = grossAmount - withholdingTax;

  return {
    epMonths,
    cappedMonths,
    cap,
    // Formula breakdown fields
    avgMonthlySalary,
    totalBonuses: totalBonuses || 0,
    asr,               // Average Standard Remuneration
    insuranceRate: EP_INSURANCE_RATE,
    number: row.number,
    paymentRate,       // = InsuranceRate × 1/2 × Number (from PDF table)
    grossAmount,
    withholdingTax,
    netAmount,
  };
}

// ─── Old-age Pension estimate ─────────────────────────────────────────────────
//
// Basic Pension (老齢基礎年金):
//   Annual = NP_FULL_ANNUAL_PENSION × (qualifyingNpMonths / 480)   [480 = 40 yr × 12]
//
// EP Earnings-related Pension (老齢厚生年金), post-April 2003 periods:
//   Annual = ASR × 5.481/1000 × epMonths
//
// Note: This is an approximation. The actual amount at age 65 is adjusted for
// macroeconomic slide, indexing, and pre-2003 periods use a different rate (7.125/1000).
export function oldAgePensionEstimate({ npPaidMonths, npFullMonths, epMonths, avgMonthlySalary, totalBonuses }) {
  // Use npFullMonths (all NP categories) for Basic Pension denominator,
  // capped at 480 (40 years).
  const npMonthsForBasic = Math.min(npFullMonths || 0, 480);

  const basicAnnual = Math.round(NP_FULL_ANNUAL_PENSION * (npMonthsForBasic / 480));
  const basicMonthly = Math.round(basicAnnual / 12);

  const asr = epMonths > 0
    ? Math.round(((avgMonthlySalary || 0) * (epMonths || 0) + (totalBonuses || 0)) / (epMonths || 1))
    : 0;

  const epAnnual = epMonths > 0 ? Math.round(asr * EP_OLD_AGE_RATE * epMonths) : 0;
  const epMonthly = Math.round(epAnnual / 12);

  const totalMonthly = basicMonthly + epMonthly;
  const totalAnnual = basicAnnual + epAnnual;

  return {
    // Basic Pension breakdown
    npMonthsForBasic,
    fullAnnualAmount: NP_FULL_ANNUAL_PENSION,
    basicAnnual,
    basicMonthly,
    // EP Pension breakdown
    asr,
    epOldAgeRate: EP_OLD_AGE_RATE,
    epMonths: epMonths || 0,
    epAnnual,
    epMonthly,
    // Totals
    totalMonthly,
    totalAnnual,
  };
}

// ─── Eligibility check ────────────────────────────────────────────────────────
export function checkEligibility({ qualMonths, npPaidMonths, epMonths }) {
  if (qualMonths >= 120) {
    return {
      eligibleForOldAge: true,
      eligibleForLumpSum: false,
      reason: 'Your qualification period is 120 months (10 years) or more — you qualify for the Japanese Old-age Pension from age 65. You cannot claim the Lump-sum Withdrawal Payment.',
    };
  }

  const npEligible = (npPaidMonths || 0) >= 6;
  const epEligible = (epMonths || 0) >= 6;

  if (!npEligible && !epEligible) {
    return {
      eligibleForOldAge: false,
      eligibleForLumpSum: false,
      reason: `Your contribution-paid period (NP: ${npPaidMonths} months, EP: ${epMonths} months) is below the 6-month minimum for both National Pension and Employees' Pension.`,
    };
  }

  return {
    eligibleForOldAge: false,
    eligibleForLumpSum: true,
    reason: `Your qualification period (${qualMonths} months) is below the 120-month threshold. You qualify for the Lump-sum Withdrawal Payment.`,
  };
}
