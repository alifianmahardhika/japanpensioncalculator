// National Pension lump-sum payment tables indexed by fiscal year.
// "Fiscal year" is the year April of which the base month (last premium paid) falls in:
//   FY2026 = April 2026 – March 2027, etc.
// Formula: Amount = NP_monthly_premium × 1/2 × number
// where the NP monthly premium and the bracket number are pre-computed in each row.
// Source: Japan Pension Service, Lump-sum Withdrawal Payment guide (March 2026).

// NP monthly premiums per fiscal year (back-calculated from the table: amount / (0.5 × number))
export const NP_MONTHLY_PREMIUM = {
  2026: 17920, // ¥17,920 (Apr 2026 – Mar 2027)
  2025: 17510, // ¥17,510 (Apr 2025 – Mar 2026)
  2024: 16980, // ¥16,980 (Apr 2024 – Mar 2025)
  2023: 16520, // ¥16,520 (Apr 2023 – Mar 2024)
  2022: 16590, // ¥16,590 (Apr 2022 – Mar 2023)
  2021: 16610, // ¥16,610 (Apr 2021 – Mar 2022)
};

// Each entry: { minMonths, number, amount }
// Bracket: minMonths <= paidMonths < next.minMonths
// number: the "Number used for calculation" from the PDF table (6, 12, 18, ..., 60)
const NP_TABLE_FY2026 = [
  { minMonths: 60, number: 60, amount: 537600 },
  { minMonths: 54, number: 54, amount: 483840 },
  { minMonths: 48, number: 48, amount: 430080 },
  { minMonths: 42, number: 42, amount: 376320 },
  { minMonths: 36, number: 36, amount: 322560 },
  { minMonths: 30, number: 30, amount: 268800 },
  { minMonths: 24, number: 24, amount: 215040 },
  { minMonths: 18, number: 18, amount: 161280 },
  { minMonths: 12, number: 12, amount: 107520 },
  { minMonths: 6,  number: 6,  amount: 53760  },
];

const NP_TABLE_FY2025 = [
  { minMonths: 60, number: 60, amount: 525300 },
  { minMonths: 54, number: 54, amount: 472770 },
  { minMonths: 48, number: 48, amount: 420240 },
  { minMonths: 42, number: 42, amount: 367710 },
  { minMonths: 36, number: 36, amount: 315180 },
  { minMonths: 30, number: 30, amount: 262650 },
  { minMonths: 24, number: 24, amount: 210120 },
  { minMonths: 18, number: 18, amount: 157590 },
  { minMonths: 12, number: 12, amount: 105060 },
  { minMonths: 6,  number: 6,  amount: 52530  },
];

const NP_TABLE_FY2024 = [
  { minMonths: 60, number: 60, amount: 509400 },
  { minMonths: 54, number: 54, amount: 458460 },
  { minMonths: 48, number: 48, amount: 407520 },
  { minMonths: 42, number: 42, amount: 356580 },
  { minMonths: 36, number: 36, amount: 305640 },
  { minMonths: 30, number: 30, amount: 254700 },
  { minMonths: 24, number: 24, amount: 203760 },
  { minMonths: 18, number: 18, amount: 152820 },
  { minMonths: 12, number: 12, amount: 101880 },
  { minMonths: 6,  number: 6,  amount: 50940  },
];

const NP_TABLE_FY2023 = [
  { minMonths: 60, number: 60, amount: 495600 },
  { minMonths: 54, number: 54, amount: 446040 },
  { minMonths: 48, number: 48, amount: 396480 },
  { minMonths: 42, number: 42, amount: 346920 },
  { minMonths: 36, number: 36, amount: 297360 },
  { minMonths: 30, number: 30, amount: 247800 },
  { minMonths: 24, number: 24, amount: 198240 },
  { minMonths: 18, number: 18, amount: 148680 },
  { minMonths: 12, number: 12, amount: 99120  },
  { minMonths: 6,  number: 6,  amount: 49560  },
];

const NP_TABLE_FY2022 = [
  { minMonths: 60, number: 60, amount: 497700 },
  { minMonths: 54, number: 54, amount: 447930 },
  { minMonths: 48, number: 48, amount: 398160 },
  { minMonths: 42, number: 42, amount: 348390 },
  { minMonths: 36, number: 36, amount: 298620 },
  { minMonths: 30, number: 30, amount: 248850 },
  { minMonths: 24, number: 24, amount: 199080 },
  { minMonths: 18, number: 18, amount: 149310 },
  { minMonths: 12, number: 12, amount: 99540  },
  { minMonths: 6,  number: 6,  amount: 49770  },
];

const NP_TABLE_FY2021 = [
  { minMonths: 60, number: 60, amount: 498300 },
  { minMonths: 54, number: 54, amount: 448470 },
  { minMonths: 48, number: 48, amount: 398640 },
  { minMonths: 42, number: 42, amount: 348810 },
  { minMonths: 36, number: 36, amount: 298980 },
  { minMonths: 30, number: 30, amount: 249150 },
  { minMonths: 24, number: 24, amount: 199320 },
  { minMonths: 18, number: 18, amount: 149490 },
  { minMonths: 12, number: 12, amount: 99660  },
  { minMonths: 6,  number: 6,  amount: 49830  },
];

// Map fiscal year start → table.
export const NP_TABLES = {
  2026: NP_TABLE_FY2026,
  2025: NP_TABLE_FY2025,
  2024: NP_TABLE_FY2024,
  2023: NP_TABLE_FY2023,
  2022: NP_TABLE_FY2022,
  2021: NP_TABLE_FY2021,
};

// Employees' Pension lump-sum payment rate table (last month >= 2021-04, cap 60 months).
//
// Formula: Amount = ASR × paymentRate
// where paymentRate = InsuranceRate × 1/2 × number  (pre-computed in the PDF table)
// InsuranceRate = 18.300% (fixed since Sept 2017)
//
// The PDF table columns are:
//   "Number used for calculation" (number) and "Payment rate" (paymentRate)
// paymentRate ≈ 0.183 × 0.5 × number (small rounding differs at 6-month bracket).
export const EP_RATES_POST2021 = [
  { minMonths: 60, number: 60, paymentRate: 5.5 },
  { minMonths: 54, number: 54, paymentRate: 4.9 },
  { minMonths: 48, number: 48, paymentRate: 4.4 },
  { minMonths: 42, number: 42, paymentRate: 3.8 },
  { minMonths: 36, number: 36, paymentRate: 3.3 },
  { minMonths: 30, number: 30, paymentRate: 2.7 },
  { minMonths: 24, number: 24, paymentRate: 2.2 },
  { minMonths: 18, number: 18, paymentRate: 1.6 },
  { minMonths: 12, number: 12, paymentRate: 1.1 },
  { minMonths: 6,  number: 6,  paymentRate: 0.5 },
];

// Employees' Pension lump-sum payment rate table (last month Sept 2017 – March 2021, cap 36 months).
export const EP_RATES_PRE2021 = [
  { minMonths: 36, number: 36, paymentRate: 3.3 },
  { minMonths: 30, number: 30, paymentRate: 2.7 },
  { minMonths: 24, number: 24, paymentRate: 2.2 },
  { minMonths: 18, number: 18, paymentRate: 1.6 },
  { minMonths: 12, number: 12, paymentRate: 1.1 },
  { minMonths: 6,  number: 6,  paymentRate: 0.5 },
];

// Insurance rate (保険料率) fixed at 18.300% since September 2017.
export const EP_INSURANCE_RATE = 0.1830;

// Full annual Basic Pension amount (老齢基礎年金) for reference year.
// This is updated each April via macroeconomic slide adjustments.
// FY2024 confirmed: ¥816,000/year. FY2026 approximate.
export const NP_FULL_ANNUAL_PENSION = 816000; // JPY / year (FY2024 reference)

// EP old-age pension rate for post-April 2003 insured periods.
// Formula: Annual EP = ASR × EP_OLD_AGE_RATE × months
export const EP_OLD_AGE_RATE = 5.481 / 1000; // 5.481‰
