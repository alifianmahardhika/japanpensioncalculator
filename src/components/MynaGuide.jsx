import { useApp } from '../contexts/AppContext.jsx';

const EP_ROWS = [
  { jpLabel: '厚生年金資格取得年月日',   sample: '2023年04月01日', mappingKey: 'm_epDate',   color: 'orange' },
  { jpLabel: '厚生年金資格月数情報',     sample: '36',             mappingKey: 'm_epMonths', color: 'green' },
  { jpLabel: '厚生年金加入月数情報',     sample: '48',             mappingKey: null,         color: 'gray' },
  { jpLabel: '厚生年金納付月数情報',     sample: '48',             mappingKey: null,         color: 'gray' },
];

const NP_ROWS = [
  { jpLabel: '国民年金加入月数情報',                        sample: '61', mappingKey: null,            color: 'gray' },
  { jpLabel: '国民年金保険料納付月数情報',                   sample: '0',  mappingKey: 'm_npPaid',      color: 'blue' },
  { jpLabel: '国民年金全額保険料免除月数情報',                sample: '1',  mappingKey: 'm_npFullExempt', color: 'blue' },
  { jpLabel: '国民年金３／４保険料免除月数情報',              sample: '0',  mappingKey: 'm_np34Exempt',  color: 'blue' },
  { jpLabel: '国民年金半額保険料免除月数情報',                sample: '0',  mappingKey: 'm_npHalfExempt', color: 'blue' },
  { jpLabel: '国民年金１／４保険料免除月数情報',              sample: '0',  mappingKey: 'm_np14Exempt',  color: 'blue' },
  { jpLabel: '国民年金学生納付特例／納付猶予月数情報',         sample: '60', mappingKey: 'm_npStudent',   color: 'blue' },
];

// These three all show the same total in the portal — use any of them to verify
const TOTAL_ROWS = [
  { jpLabel: '国民年金・厚生年金・船員保険納付月数等合計情報', sample: '109' },
  { jpLabel: '年金加入月数合計情報',                         sample: '109' },
  { jpLabel: '年金納付月数等合計情報',                       sample: '109' },
];

const COLOR = {
  orange: {
    row:   'bg-orange-50 dark:bg-orange-900/20',
    badge: 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300',
    value: 'text-orange-700 dark:text-orange-300 font-semibold',
  },
  green: {
    row:   'bg-green-50 dark:bg-green-900/20',
    badge: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300',
    value: 'text-green-700 dark:text-green-300 font-semibold',
  },
  blue: {
    row:   'bg-blue-50 dark:bg-blue-900/20',
    badge: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
    value: 'text-blue-700 dark:text-blue-300 font-semibold',
  },
  gray: {
    row:   '',
    badge: '',
    value: 'text-gray-500 dark:text-gray-400',
  },
  violet: {
    row:   'bg-violet-50 dark:bg-violet-900/20',
    badge: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300',
    value: 'text-violet-700 dark:text-violet-300 font-semibold',
  },
};

function PortalRow({ jpLabel, sample, mappingKey, color, T }) {
  const c = COLOR[color];
  return (
    <div className={`flex items-start justify-between gap-2 px-3 py-1.5 rounded-md ${c.row}`}>
      <div className="flex items-baseline gap-2 flex-1 min-w-0">
        <span className="text-xs font-mono text-gray-700 dark:text-gray-300 truncate">{jpLabel}</span>
        <span className={`text-xs font-mono shrink-0 ${c.value}`}>{sample}</span>
      </div>
      {mappingKey && (
        <span className={`text-xs font-medium shrink-0 rounded px-1.5 py-0.5 ${c.badge}`}>
          {T(`guide.${mappingKey}`)}
        </span>
      )}
    </div>
  );
}

export default function MynaGuide({ open, setOpen }) {
  const { T } = useApp();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Toggle header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 dark:bg-indigo-900/40 rounded-full p-1.5 shrink-0">
            <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{T('guide.title')}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">マイナポータル — 年金資格記録情報</p>
          </div>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-gray-100 dark:border-gray-700 px-6 py-5 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">{T('guide.desc')}</p>

          <a
            href="https://myna.go.jp/pension/detail"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {T('guide.linkText')}
          </a>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 text-xs">
            {[
              { color: 'bg-orange-200 dark:bg-orange-800', label: 'Step 1' },
              { color: 'bg-blue-200 dark:bg-blue-800',     label: 'Step 2' },
              { color: 'bg-green-200 dark:bg-green-800',   label: 'Step 3' },
              { color: 'bg-violet-200 dark:bg-violet-800', label: T('guide.totalSection') },
            ].map(({ color, label }) => (
              <span key={label} className="flex items-center gap-1">
                <span className={`w-2.5 h-2.5 rounded-sm inline-block ${color}`} />
                <span className="text-gray-600 dark:text-gray-400">{label}</span>
              </span>
            ))}
          </div>

          {/* Portal mockup */}
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl p-4 space-y-3 text-xs">
            <div className="font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 pb-2">
              年金資格記録情報
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">{T('guide.epSection')}</p>
              <div className="space-y-0.5">
                {EP_ROWS.map(({ jpLabel, sample, mappingKey, color }) => (
                  <PortalRow key={jpLabel} jpLabel={jpLabel} sample={sample} mappingKey={mappingKey} color={color} T={T} />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">{T('guide.npSection')}</p>
              <div className="space-y-0.5">
                {NP_ROWS.map(({ jpLabel, sample, mappingKey, color }) => (
                  <PortalRow key={jpLabel} jpLabel={jpLabel} sample={sample} mappingKey={mappingKey} color={color} T={T} />
                ))}
              </div>
            </div>

            {/* Grand totals */}
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">{T('guide.totalSection')}</p>
              <div className="space-y-0.5">
                {TOTAL_ROWS.map(({ jpLabel, sample }) => (
                  <PortalRow key={jpLabel} jpLabel={jpLabel} sample={sample} mappingKey="m_grandTotal" color="violet" T={T} />
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg px-3 py-2">
            {T('guide.note')}
          </p>
        </div>
      )}
    </div>
  );
}
