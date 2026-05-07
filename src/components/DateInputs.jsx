import { monthsBetween } from '../lib/pension.js';
import { useApp } from '../contexts/AppContext.jsx';

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR + 20 - 1980 + 1 }, (_, i) => 1980 + i);
const MONTHS = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1).padStart(2, '0'),
  index: i,
}));

const SELECT_CLASS =
  'border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-2 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full';

function MonthSelect({ value, onChange }) {
  const { lang, T } = useApp();

  const year  = value ? value.slice(0, 4) : '';
  const month = value ? value.slice(5, 7) : '';

  function emit(y, m) {
    onChange(y && m ? `${y}-${m}` : '');
  }

  const monthLabel = (index) =>
    new Intl.DateTimeFormat(lang, { month: 'short' }).format(new Date(2000, index, 1));

  return (
    <div className="flex gap-2">
      <select
        value={year}
        onChange={e => emit(e.target.value, month)}
        className={SELECT_CLASS}
      >
        <option value="">{T('step1.yearPlaceholder')}</option>
        {YEARS.map(y => <option key={y} value={String(y)}>{y}</option>)}
      </select>
      <select
        value={month}
        onChange={e => emit(year, e.target.value)}
        className={SELECT_CLASS}
      >
        <option value="">{T('step1.monthPlaceholder')}</option>
        {MONTHS.map(({ value: v, index }) => (
          <option key={v} value={v}>{monthLabel(index)}</option>
        ))}
      </select>
    </div>
  );
}

export default function DateInputs({ values, onChange }) {
  const { T } = useApp();
  const { arrivalMonth, departureMonth, baseMonth } = values;
  const total = monthsBetween(arrivalMonth, departureMonth);

  function handle(field) {
    return (v) => onChange({ ...values, [field]: v });
  }

  return (
    <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{T('step1.title')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            {T('step1.arrival')}
          </label>
          <MonthSelect value={arrivalMonth} onChange={handle('arrivalMonth')} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            {T('step1.departure')}
          </label>
          <MonthSelect value={departureMonth} onChange={handle('departureMonth')} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            {T('step1.baseMonth')}
          </label>
          <MonthSelect value={baseMonth} onChange={handle('baseMonth')} />
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
