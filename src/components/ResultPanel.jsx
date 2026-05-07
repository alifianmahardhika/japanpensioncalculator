import {
  checkEligibility,
  nationalPensionLumpSum,
  employeesPensionLumpSum,
  oldAgePensionEstimate,
  npContributionPaidMonths,
  qualificationMonths,
} from '../lib/pension.js';
import { useApp } from '../contexts/AppContext.jsx';

const yen = (n) => `¥${Math.round(n).toLocaleString()}`;
const pct = (r) => `${(r * 100).toFixed(3)}%`;

function FormulaLine({ label, eq, result, highlight }) {
  return (
    <div className={`flex flex-wrap items-baseline gap-x-3 py-1 text-sm ${highlight ? 'font-semibold text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}`}>
      {label && <span className="text-gray-500 dark:text-gray-400 min-w-[180px]">{label}</span>}
      {eq && <span className="font-mono text-blue-700 dark:text-blue-400">{eq}</span>}
      {result !== undefined && <span className={`ml-auto font-mono ${highlight ? 'text-green-700 dark:text-green-400 text-base' : ''}`}>{result}</span>}
    </div>
  );
}

function Divider() {
  return <div className="border-t border-dashed border-gray-200 dark:border-gray-600 my-2" />;
}

function SectionHeader({ children, color = 'blue' }) {
  const colors = {
    blue: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-300',
    green: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-800 dark:text-green-300',
    red: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700 text-red-800 dark:text-red-300',
    gray: 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400',
  };
  return (
    <div className={`border rounded-t-lg px-4 py-2 text-sm font-semibold ${colors[color]}`}>
      {children}
    </div>
  );
}

function NPLumpSumBox({ result, paidMonths }) {
  const { T } = useApp();

  if (paidMonths < 6) {
    return (
      <div className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
        <SectionHeader color="gray">{T('npBox.title')}</SectionHeader>
        <div className="px-4 py-3 text-sm text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800">
          {T('npBox.belowMin', { n: paidMonths })}
        </div>
      </div>
    );
  }
  if (!result) return null;

  return (
    <div className="border border-green-200 dark:border-green-700 rounded-xl overflow-hidden">
      <SectionHeader color="green">{T('npBox.title')}</SectionHeader>
      <div className="px-4 py-4 space-y-0.5 font-mono text-sm bg-white dark:bg-gray-800">
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 font-sans italic">
          {T('npBox.formula')}
        </p>

        <FormulaLine label={T('npBox.fiscalYear')} result={result.fiscalYearLabel} />
        <FormulaLine label={T('npBox.premium')} result={yen(result.premium)} />
        <FormulaLine label={T('npBox.paidMonths')} result={`${result.paidMonths} mo`} />
        {result.paidMonths > result.cap && (
          <FormulaLine label={T('npBox.cappedAt', { cap: result.cap })} result={`→ ${result.cappedMonths} mo`} />
        )}
        <FormulaLine label={T('npBox.number')} result={result.number} />

        <Divider />

        <FormulaLine
          label={T('npBox.amount')}
          eq={`${yen(result.premium)} × ½ × ${result.number}`}
          result={yen(result.amount)}
          highlight
        />

        <p className="text-xs text-gray-400 dark:text-gray-500 font-sans mt-2">
          {T('npBox.noTax')}
        </p>
      </div>
    </div>
  );
}

function EPLumpSumBox({ result, epMonths }) {
  const { T } = useApp();

  if (!epMonths || epMonths < 6) {
    return (
      <div className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
        <SectionHeader color="gray">{T('epBox.title')}</SectionHeader>
        <div className="px-4 py-3 text-sm text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800">
          {T('epBox.belowMin', { n: epMonths || 0 })}
        </div>
      </div>
    );
  }
  if (!result) return null;

  return (
    <div className="border border-green-200 dark:border-green-700 rounded-xl overflow-hidden">
      <SectionHeader color="green">{T('epBox.title')}</SectionHeader>
      <div className="px-4 py-4 space-y-0.5 font-mono text-sm bg-white dark:bg-gray-800">
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 font-sans italic">
          {T('epBox.formula1')}<br />{T('epBox.formula2')}
        </p>

        <p className="text-xs font-sans font-semibold text-gray-600 dark:text-gray-300 mt-3 mb-1">{T('epBox.step1')}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 font-sans italic mb-1">{T('epBox.step1Formula')}</p>
        <FormulaLine
          label={T('epBox.salaryXMonths')}
          eq={`${yen(result.avgMonthlySalary)} × ${result.epMonths}`}
          result={yen(result.avgMonthlySalary * result.epMonths)}
        />
        <FormulaLine label={T('epBox.totalBonuses')} result={yen(result.totalBonuses)} />
        <FormulaLine
          label={T('epBox.asr')}
          eq={`(${yen(result.avgMonthlySalary * result.epMonths)} + ${yen(result.totalBonuses)}) ÷ ${result.epMonths}`}
          result={yen(result.asr)}
          highlight
        />

        <Divider />

        <p className="text-xs font-sans font-semibold text-gray-600 dark:text-gray-300 mt-2 mb-1">{T('epBox.step2')}</p>
        <FormulaLine label={T('epBox.insuranceRate')} result={pct(result.insuranceRate)} />
        <FormulaLine label={T('epBox.cappedMonths', { cap: result.cap })} result={`${result.cappedMonths} mo`} />
        <FormulaLine label={T('epBox.number')} result={result.number} />
        <FormulaLine
          label={T('epBox.paymentRate')}
          eq={`${pct(result.insuranceRate)} × ½ × ${result.number}`}
          result={result.paymentRate.toFixed(1)}
          highlight
        />

        <Divider />

        <p className="text-xs font-sans font-semibold text-gray-600 dark:text-gray-300 mt-2 mb-1">{T('epBox.step3')}</p>
        <FormulaLine
          label={T('epBox.gross')}
          eq={`${yen(result.asr)} × ${result.paymentRate.toFixed(1)}`}
          result={yen(result.grossAmount)}
          highlight
        />
        <FormulaLine
          label={T('epBox.tax')}
          eq={`${yen(result.grossAmount)} × 20.42%`}
          result={`− ${yen(result.withholdingTax)}`}
        />
        <div className="border-t border-gray-300 dark:border-gray-600 mt-1 pt-1">
          <FormulaLine label={T('epBox.net')} result={yen(result.netAmount)} highlight />
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 font-sans mt-2">
          {T('epBox.taxNote')}
        </p>
      </div>
    </div>
  );
}

function OldAgePensionBox({ est, qualMonths }) {
  const { T } = useApp();
  if (!est) return null;

  return (
    <div className="border border-blue-200 dark:border-blue-700 rounded-xl overflow-hidden">
      <SectionHeader color="blue">{T('oaBox.title')}</SectionHeader>
      <div className="px-4 py-4 space-y-0.5 font-mono text-sm bg-white dark:bg-gray-800">
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 font-sans italic">
          {T('oaBox.approx')}
        </p>

        <p className="text-xs font-sans font-semibold text-gray-600 dark:text-gray-300 mb-1">{T('oaBox.basicTitle')}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 font-sans italic mb-1">{T('oaBox.basicFormula')}</p>
        <FormulaLine label={T('oaBox.fullAmount')} result={`${yen(est.fullAnnualAmount)}/year`} />
        <FormulaLine label={T('oaBox.npMonths')} result={`${est.npMonthsForBasic} ÷ 480`} />
        <FormulaLine
          label={T('oaBox.annualBasic')}
          eq={`${yen(est.fullAnnualAmount)} × ${est.npMonthsForBasic}/480`}
          result={`${yen(est.basicAnnual)}/year`}
        />
        <FormulaLine label={T('oaBox.monthlyBasic')} result={`${yen(est.basicMonthly)}/month`} highlight />

        {est.epMonths > 0 && (
          <>
            <Divider />
            <p className="text-xs font-sans font-semibold text-gray-600 dark:text-gray-300 mt-2 mb-1">{T('oaBox.epTitle')}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 font-sans italic mb-1">{T('oaBox.epFormula')}</p>
            <FormulaLine label={T('oaBox.asr')} result={`${yen(est.asr)}/month`} />
            <FormulaLine label={T('oaBox.epMonths')} result={est.epMonths} />
            <FormulaLine
              label={T('oaBox.annualEP')}
              eq={`${yen(est.asr)} × 5.481‰ × ${est.epMonths}`}
              result={`${yen(est.epAnnual)}/year`}
            />
            <FormulaLine label={T('oaBox.monthlyEP')} result={`${yen(est.epMonthly)}/month`} highlight />
          </>
        )}

        <Divider />
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg px-3 py-2 mt-2">
          <FormulaLine label={T('oaBox.totalMonthly')} result={`${yen(est.totalMonthly)}/month`} highlight />
          <FormulaLine label={T('oaBox.totalAnnual')} result={`${yen(est.totalAnnual)}/year`} />
        </div>

        {qualMonths < 120 && (
          <p className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg px-3 py-2 mt-2 font-sans">
            {T('oaBox.needMore', { cur: qualMonths, need: 120 - qualMonths })}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ResultPanel({ npValues, epValues, baseMonth, departureMonth }) {
  const { T } = useApp();
  const { fullPaid, quarterExempt, halfExempt, threeQuarterExempt, fullExempt, studentDeferment } = npValues;
  const { epMonths, avgMonthlySalary, totalBonuses } = epValues;

  const npPaid = npContributionPaidMonths({ fullPaid, quarterExempt, halfExempt, threeQuarterExempt });
  const npFullMonths = (fullPaid || 0) + (quarterExempt || 0) + (halfExempt || 0) + (threeQuarterExempt || 0) + (fullExempt || 0) + (studentDeferment || 0);
  const qualMonths = qualificationMonths({ fullPaid, quarterExempt, halfExempt, threeQuarterExempt, fullExempt, studentDeferment, epMonths });
  const elig = checkEligibility({ qualMonths, npPaidMonths: npPaid, epMonths: epMonths || 0 });

  const npResult = nationalPensionLumpSum({ paidMonths: npPaid, baseMonth });
  const epResult = employeesPensionLumpSum({
    epMonths: epMonths || 0,
    avgMonthlySalary: avgMonthlySalary || 0,
    totalBonuses: totalBonuses || 0,
    lastMonth: departureMonth,
  });

  const oldAgePension = oldAgePensionEstimate({
    npPaidMonths: npPaid,
    npFullMonths,
    epMonths: epMonths || 0,
    avgMonthlySalary: avgMonthlySalary || 0,
    totalBonuses: totalBonuses || 0,
  });

  const combinedGross = (npResult?.amount || 0) + (epResult?.grossAmount || 0);
  const combinedNet = (npResult?.amount || 0) + (epResult?.netAmount || 0);

  const verdictStyle = elig.eligibleForOldAge
    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-600 text-blue-800 dark:text-blue-300'
    : elig.eligibleForLumpSum
      ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-600 text-green-800 dark:text-green-300'
      : 'bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-600 text-red-800 dark:text-red-300';

  const verdictTitle = elig.eligibleForOldAge
    ? T('result.eligOldAge')
    : elig.eligibleForLumpSum
      ? T('result.eligLumpSum')
      : T('result.notElig');

  const statCards = [
    {
      label: T('result.qualPeriod'),
      value: `${qualMonths} mo`,
      sub: qualMonths >= 120 ? T('result.oldAgeElig') : `${120 - qualMonths} mo ${T('result.toOldAge')}`,
    },
    {
      label: T('result.npPaid'),
      value: `${npPaid} mo`,
      sub: npPaid >= 6 ? T('result.minOk') : T('result.belowMin'),
    },
    {
      label: T('result.epMonths'),
      value: `${epMonths || 0} mo`,
      sub: (epMonths || 0) >= 6 ? T('result.minOk') : (epMonths || 0) === 0 ? T('result.none') : T('result.belowMin'),
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{T('result.title')}</h2>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3 text-sm">
        {statCards.map(({ label, value, sub }) => (
          <div key={label} className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Eligibility verdict */}
      <div className={`border rounded-xl px-5 py-4 ${verdictStyle}`}>
        <p className="font-semibold text-base">{verdictTitle}</p>
        <p className="text-sm mt-1 opacity-80">{elig.reason}</p>
      </div>

      {/* Section A: Lump-sum */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 border-t border-gray-200 dark:border-gray-600" />
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${elig.eligibleForLumpSum ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
            {T('result.sectionA')}
          </span>
          <div className="flex-1 border-t border-gray-200 dark:border-gray-600" />
        </div>

        {elig.eligibleForLumpSum ? (
          <>
            <NPLumpSumBox result={npResult} paidMonths={npPaid} />
            <EPLumpSumBox result={epResult} epMonths={epMonths} />

            {(npResult || epResult) && (
              <div className="bg-green-50 dark:bg-green-900/30 border border-green-300 dark:border-green-600 rounded-xl px-5 py-4 space-y-1">
                <p className="text-xs font-semibold text-green-700 dark:text-green-300 mb-2">{T('result.combinedTitle')}</p>
                {npResult && <FormulaLine label={T('result.npLumpSum')} result={yen(npResult.amount)} />}
                {epResult && <FormulaLine label={T('result.epGross')} result={yen(epResult.grossAmount)} />}
                {epResult && <FormulaLine label={T('result.epTax')} result={`− ${yen(epResult.withholdingTax)}`} />}
                <div className="border-t border-green-200 dark:border-green-700 pt-2">
                  <FormulaLine label={T('result.totalGross')} result={yen(combinedGross)} />
                  <FormulaLine label={T('result.totalNet')} result={yen(combinedNet)} highlight />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="border border-gray-200 dark:border-gray-600 rounded-xl px-5 py-4 text-sm text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800">
            {elig.eligibleForOldAge ? T('result.lumpSumBlockedOldAge') : T('result.lumpSumBlockedMin')}
          </div>
        )}
      </div>

      {/* Section B: Old-age Pension */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 border-t border-gray-200 dark:border-gray-600" />
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${elig.eligibleForOldAge ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
            {T('result.sectionB')}
          </span>
          <div className="flex-1 border-t border-gray-200 dark:border-gray-600" />
        </div>

        <OldAgePensionBox est={oldAgePension} qualMonths={qualMonths} />
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-700 pt-4 space-y-1.5">
        <p className="font-medium text-gray-500 dark:text-gray-400">{T('result.abbrev')}</p>
        <p>{T('result.disclaimer1')}</p>
        <p>{T('result.disclaimer2')}</p>
        <p>
          {T('result.disclaimerSource')}{' '}
          <a href={T('result.officialPDFUrl')} target="_blank" rel="noreferrer" className="underline text-blue-400 dark:text-blue-400">
            {T('result.officialPDF')}
          </a>
          {' · '}
          <a href={T('result.npSourceUrl')} target="_blank" rel="noreferrer" className="underline text-blue-400 dark:text-blue-400">
            {T('result.npSourceLabel')}
          </a>
        </p>
      </div>
    </section>
  );
}
