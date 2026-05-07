import { useState, useRef } from 'react';
import { useApp } from './contexts/AppContext.jsx';
import { qualificationMonths } from './lib/pension.js';
import DateInputs from './components/DateInputs.jsx';
import ExemptionBreakdown from './components/ExemptionBreakdown.jsx';
import EmployeesPensionInputs from './components/EmployeesPensionInputs.jsx';
import ResultPanel from './components/ResultPanel.jsx';
import MynaGuide from './components/MynaGuide.jsx';

const today = new Date();
const thisMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
const prevMonth = (() => {
  const d = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
})();

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'ja', label: '日本語' },
  { code: 'id', label: 'ID' },
];

export default function App() {
  const { theme, toggleTheme, lang, setLang, T } = useApp();

  const [dates, setDates] = useState({
    arrivalMonth: '',
    departureMonth: thisMonth,
    baseMonth: prevMonth,
  });

  const [np, setNP] = useState({
    fullPaid: 0,
    quarterExempt: 0,
    halfExempt: 0,
    threeQuarterExempt: 0,
    fullExempt: 0,
    studentDeferment: 0,
  });

  const [ep, setEP] = useState({
    epMonths: 0,
    avgMonthlySalary: 0,
    totalBonuses: 0,
  });

  const qualMonths = qualificationMonths({ ...np, epMonths: ep.epMonths || 0 });

  const [portalTotal, setPortalTotal] = useState('');
  const [guideOpen, setGuideOpen] = useState(false);
  const guideRef = useRef(null);

  const portalNum = parseInt(portalTotal, 10);
  const hasPortalInput = portalTotal !== '' && !isNaN(portalNum) && portalNum > 0;
  const isExact = hasPortalInput && portalNum === qualMonths;
  const isProjection = hasPortalInput && portalNum < qualMonths;
  const isMatch = isExact || isProjection;

  const openGuide = () => {
    setGuideOpen(true);
    setTimeout(() => guideRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 dark:bg-red-900/40 rounded-full p-2 shrink-0">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-tight">{T('header.title')}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">{T('header.subtitle')}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 shrink-0 mt-1">
              {/* Language switcher */}
              <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
                {LANGS.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    className={`px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      lang === code
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-5">

        {/* Prominent verification card — fill this first */}
        <div className="bg-white dark:bg-gray-800 border-2 border-violet-400 dark:border-violet-500 rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-5 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <svg className="w-5 h-5 text-violet-600 dark:text-violet-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-bold text-violet-800 dark:text-violet-200 font-mono">年金加入月数合計情報</span>
              <span className="text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded-full tracking-wide uppercase">
                {T('guide.required')}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{T('guide.verifyTopDesc')}</p>
            <div className="flex items-center gap-3 flex-wrap">
              <input
                type="number"
                min="0"
                value={portalTotal}
                onChange={e => setPortalTotal(e.target.value)}
                placeholder="109"
                className="w-36 border-2 border-violet-300 dark:border-violet-600 rounded-lg px-3 py-2.5 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 text-base font-semibold"
              />
              {hasPortalInput && (
                <span className={`text-sm font-semibold px-3 py-1.5 rounded-lg ${
                  isExact      ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                  : isProjection ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                  : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
                }`}>
                  {isExact ? `✓ ${qualMonths} mo` : isProjection ? `↗ ${portalNum} → ${qualMonths} mo` : `✗ calc: ${qualMonths} mo`}
                </span>
              )}
            </div>
            {hasPortalInput && (
              <p className={`text-sm rounded-lg px-4 py-2.5 ${
                isExact      ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700'
                : isProjection ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
                : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700'
              }`}>
                {isExact
                  ? T('guide.verifyMatch', { calc: qualMonths })
                  : isProjection
                    ? T('guide.verifyProjection', { calc: qualMonths, portal: portalNum, diff: qualMonths - portalNum })
                    : T('guide.verifyMismatch', { calc: qualMonths, portal: portalNum })}
              </p>
            )}
            {!hasPortalInput && (
              <button
                onClick={openGuide}
                className="text-xs text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {T('guide.whereToFind')}
              </button>
            )}
          </div>
        </div>

        <div ref={guideRef}>
          <MynaGuide qualMonths={qualMonths} open={guideOpen} setOpen={setGuideOpen} />
        </div>
        <DateInputs values={dates} onChange={setDates} />
        <ExemptionBreakdown
          values={np}
          onChange={setNP}
          arrivalMonth={dates.arrivalMonth}
          departureMonth={dates.departureMonth}
        />
        <EmployeesPensionInputs values={ep} onChange={setEP} />
        <ResultPanel
          npValues={np}
          epValues={ep}
          baseMonth={dates.baseMonth}
          departureMonth={dates.departureMonth}
        />
      </main>

      <footer className="max-w-3xl mx-auto px-4 py-6 text-center text-xs text-gray-400 dark:text-gray-500">
        {T('footer')}{' '}
        <a href="https://www.nenkin.go.jp" target="_blank" rel="noreferrer" className="underline">nenkin.go.jp</a>.
      </footer>
    </div>
  );
}
