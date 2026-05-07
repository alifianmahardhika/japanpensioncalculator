import { monthsBetween, npContributionPaidMonths } from '../lib/pension.js';
import { useApp } from '../contexts/AppContext.jsx';

const FIELD_KEYS = [
  { key: 'fullPaid',           weight: '× 1' },
  { key: 'quarterExempt',      weight: '× ¾' },
  { key: 'halfExempt',         weight: '× ½' },
  { key: 'threeQuarterExempt', weight: '× ¼' },
  { key: 'fullExempt',         weight: '× 0' },
  { key: 'studentDeferment',   weight: '× 0' },
];

export default function ExemptionBreakdown({ values, onChange, arrivalMonth, departureMonth }) {
  const { T } = useApp();
  const totalPeriod = monthsBetween(arrivalMonth, departureMonth);
  const allocatedNP = FIELD_KEYS.reduce((s, f) => s + (values[f.key] || 0), 0);
  const mismatch = totalPeriod > 0 && allocatedNP !== totalPeriod;
  const paid = npContributionPaidMonths(values);

  function handle(key) {
    return (e) => onChange({ ...values, [key]: Math.max(0, parseInt(e.target.value, 10) || 0) });
  }

  return (
    <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">{T('step2.title')}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{T('step2.desc')}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FIELD_KEYS.map(({ key, weight }) => (
          <div key={key} className="flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">{T(`step2.${key}`)}</label>
              <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded px-2 py-0.5">{weight}</span>
            </div>
            <input
              type="number"
              min="0"
              value={values[key] || ''}
              onChange={handle(key)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{T(`step2.${key}Desc`)}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <span className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 text-gray-700 dark:text-gray-200">
          {T('step2.npEntered')}: <span className="font-semibold">{allocatedNP}</span>
          {totalPeriod > 0 && <> / {totalPeriod} {T('step2.total')}</>}
        </span>
        <span className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg px-3 py-1.5 text-blue-700 dark:text-blue-300">
          {T('step2.weightedPaid')}: <span className="font-semibold">{paid} {T('step1.months')}</span>
        </span>
      </div>

      {mismatch && (
        <p className="mt-3 text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg px-4 py-2">
          {T('step2.mismatch', { a: allocatedNP, t: totalPeriod })}
        </p>
      )}
    </section>
  );
}
