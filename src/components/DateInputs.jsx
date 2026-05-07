import { monthsBetween } from '../lib/pension.js';
import { useApp } from '../contexts/AppContext.jsx';

export default function DateInputs({ values, onChange }) {
  const { T } = useApp();
  const { arrivalMonth, departureMonth, baseMonth } = values;
  const total = monthsBetween(arrivalMonth, departureMonth);

  function handle(field) {
    return (e) => onChange({ ...values, [field]: e.target.value });
  }

  return (
    <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{T('step1.title')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            {T('step1.arrival')}
          </label>
          <input
            type="month"
            value={arrivalMonth}
            onChange={handle('arrivalMonth')}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            {T('step1.departure')}
          </label>
          <input
            type="month"
            value={departureMonth}
            onChange={handle('departureMonth')}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            {T('step1.baseMonth')}
          </label>
          <input
            type="month"
            value={baseMonth}
            onChange={handle('baseMonth')}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{T('step1.baseMonthHint')}</p>
        </div>
      </div>
      {total > 0 && (
        <p className="mt-4 text-sm text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-lg px-4 py-2 inline-block">
          {T('step1.totalPeriod')}: <span className="font-semibold">{total} {T('step1.months')}</span>
        </p>
      )}
    </section>
  );
}
