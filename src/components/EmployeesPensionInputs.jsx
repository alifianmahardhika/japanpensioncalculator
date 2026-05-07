import { useApp } from '../contexts/AppContext.jsx';

export default function EmployeesPensionInputs({ values, onChange }) {
  const { T } = useApp();
  const { epMonths, avgMonthlySalary, totalBonuses } = values;

  const asr = epMonths > 0
    ? Math.round(((avgMonthlySalary || 0) * (epMonths || 0) + (totalBonuses || 0)) / (epMonths || 1))
    : 0;

  function handle(key) {
    return (e) => onChange({ ...values, [key]: Math.max(0, parseInt(e.target.value, 10) || 0) });
  }

  return (
    <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">{T('step3.title')}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{T('step3.desc')}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            {T('step3.epMonths')}
          </label>
          <input
            type="number"
            min="0"
            value={epMonths || ''}
            onChange={handle('epMonths')}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            {T('step3.avgSalary')}
          </label>
          <input
            type="number"
            min="0"
            step="1000"
            value={avgMonthlySalary || ''}
            onChange={handle('avgMonthlySalary')}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{T('step3.avgSalaryHint')}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            {T('step3.totalBonuses')}
          </label>
          <input
            type="number"
            min="0"
            step="10000"
            value={totalBonuses || ''}
            onChange={handle('totalBonuses')}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{T('step3.totalBonusesHint')}</p>
        </div>
      </div>
      {epMonths > 0 && avgMonthlySalary > 0 && (
        <p className="mt-4 text-sm text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-lg px-4 py-2 inline-block">
          {T('step3.asrLabel')}:{' '}
          <span className="font-semibold">¥{asr.toLocaleString()}</span>
          <span className="text-blue-500 dark:text-blue-400 ml-1">{T('step3.asrNote')}</span>
        </p>
      )}
    </section>
  );
}
