import { NavLink, Outlet } from 'react-router-dom';
import { TimelineScrubber } from './TimelineScrubber';
import { ActionInbox } from './ActionInbox';
import { OfflineWarningBanner } from './OfflineWarningBanner';
import { useState } from 'react';

export function AppLayout() {
  const [scrubData, setScrubData] = useState<any>(null);

  const topNavClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-4 border-b-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'border-blue-500 text-white'
        : 'border-transparent text-gray-400 hover:text-white'
    }`;

  return (
    <div className="flex h-screen w-full bg-[#0D0D12] text-white font-mono flex-col overflow-hidden">
      <OfflineWarningBanner />
      {/* Top Navigation */}
      <header className="flex-shrink-0 bg-[#16161D] border-b border-[#2C2C35] px-6 flex items-center justify-between z-10">
        <div className="flex items-center">
          <h1 className="text-xl font-bold tracking-tight text-white mr-10 py-4 select-none">
            Wealth Orchestrator
          </h1>
          <nav className="flex space-x-1">
            <NavLink to="/" end className={topNavClass}>
              Dashboard
            </NavLink>
            <NavLink to="/valuation" className={topNavClass}>
              Portfolio Valuation
            </NavLink>
            <NavLink to="/liabilities" className={topNavClass}>
              Liabilities
            </NavLink>
            <NavLink to="/goals" className={topNavClass}>
              Goals
            </NavLink>
            <NavLink to="/assets" className={topNavClass}>
              Assets
            </NavLink>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive ? 'bg-[#2C2C35] text-white' : 'text-gray-400 hover:text-white'
              }`
            }
          >
            Settings
          </NavLink>
        </div>
      </header>

      {/* Main Body Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-[#0D0D12] p-8 relative flex flex-col">
          <ActionInbox />

          {/* Timeline Scrubber Projection Banner */}
          {scrubData && (
            <div className="bg-[#16161D] border border-[#2C2C35] p-4 rounded-xl mb-6 flex items-center justify-between shadow-xl animate-fade-in">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-white uppercase tracking-wider">
                    Timeline Projection
                  </span>
                  <span className="bg-sky-500/10 text-sky-400 text-xs px-2.5 py-0.5 rounded border border-sky-500/20 font-mono">
                    {scrubData.offsetMonths === 0
                      ? 'Today (Baseline)'
                      : scrubData.offsetMonths > 0
                      ? `+${scrubData.offsetMonths} Months`
                      : `${scrubData.offsetMonths} Months`}
                  </span>
                  {scrubData.stressTestActive && (
                    <span className="bg-rose-500/10 text-rose-400 text-xs px-2.5 py-0.5 rounded border border-rose-500/20 font-mono">
                      Stress Test (-{scrubData.dropPercent}%)
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Dynamic simulation across all tracked assets
                </div>
              </div>
              <div className="flex items-center gap-6">
                {scrubData.data?.projected_assets && scrubData.data.projected_assets.length > 0 && (
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Total Projected Value</div>
                    <div className="text-lg font-mono font-bold text-sky-400">
                      ₹
                      {scrubData.data.projected_assets
                        .reduce((sum: number, a: any) => sum + (a.projected_value || 0), 0)
                        .toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setScrubData(null)}
                  className="text-gray-500 hover:text-white text-xs px-2 py-1 rounded hover:bg-[#2C2C35] transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer Scrubber */}
      <TimelineScrubber onScrubResult={setScrubData} />
    </div>
  );
}
