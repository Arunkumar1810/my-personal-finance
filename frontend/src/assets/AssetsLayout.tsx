import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export function AssetsLayout() {
  const [openTrees, setOpenTrees] = useState<Record<string, boolean>>({
    etf: true,
    ltStocks: true,
    usStocks: true,
    esops: false,
    fd: false,
    bonds: false,
    pf: false,
    swing: true,
  });

  const toggleTree = (key: string) => {
    setOpenTrees((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 text-sm rounded-lg transition-colors ${
      isActive
        ? 'bg-[#2C2C35] text-white font-medium'
        : 'text-gray-400 hover:bg-[#2C2C35]/50 hover:text-white'
    }`;

  return (
    <div className="flex h-full -m-8 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-[#16161D] border-r border-[#2C2C35] flex flex-col overflow-y-auto">
        <nav className="flex-1 px-4 py-6 space-y-2">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-4 font-mono">
            Asset Classes
          </div>
          
          <NavLink
            to="/assets"
            end
            className={({ isActive }) =>
              `block px-4 py-3 mb-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#2C2C35] text-white font-medium'
                  : 'text-gray-400 hover:bg-[#2C2C35]/50 hover:text-white'
              }`
            }
          >
            Dashboard
          </NavLink>

          {/* Indian ETFs */}
          <div className="mb-2">
            <button
              type="button"
              onClick={() => toggleTree('etf')}
              className="w-full px-4 py-2 flex items-center justify-between text-gray-400 hover:text-white cursor-pointer transition-colors text-left"
            >
              <span className="font-semibold text-sm flex items-center gap-2">
                Indian ETFs
                <span className="bg-sky-500/10 text-sky-400 text-[10px] px-1.5 py-0.5 rounded border border-sky-500/20 font-mono">
                  AUTO
                </span>
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${openTrees.etf ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openTrees.etf && (
              <div className="pl-4 space-y-1 mt-1">
                <NavLink to="/assets/indian-etfs/asset-evaluation" className={linkClass}>
                  Asset Evaluation
                </NavLink>
                <NavLink to="/assets/indian-etfs/transactions" className={linkClass}>
                  Transactions
                </NavLink>
                <NavLink to="/assets/indian-etfs/holdings" className={linkClass}>
                  Holdings
                </NavLink>
                <NavLink to="/assets/indian-etfs/valuation" className={linkClass}>
                  Valuation
                </NavLink>
              </div>
            )}
          </div>

          {/* Indian Long-Term Stocks */}
          <div className="mb-2">
            <button
              type="button"
              onClick={() => toggleTree('ltStocks')}
              className="w-full px-4 py-2 flex items-center justify-between text-gray-400 hover:text-white cursor-pointer transition-colors text-left"
            >
              <span className="font-semibold text-sm flex items-center gap-2">
                Indian LT Stocks
                <span className="bg-sky-500/10 text-sky-400 text-[10px] px-1.5 py-0.5 rounded border border-sky-500/20 font-mono">
                  AUTO
                </span>
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${openTrees.ltStocks ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openTrees.ltStocks && (
              <div className="pl-4 space-y-1 mt-1">
                <NavLink to="/assets/indian-lt-stocks/asset-evaluation" className={linkClass}>
                  Asset Evaluation
                </NavLink>
                <NavLink to="/assets/indian-lt-stocks/transactions" className={linkClass}>
                  Transactions
                </NavLink>
                <NavLink to="/assets/indian-lt-stocks/holdings" className={linkClass}>
                  Holdings
                </NavLink>
                <NavLink to="/assets/indian-lt-stocks/valuation" className={linkClass}>
                  Valuation
                </NavLink>
              </div>
            )}
          </div>

          {/* US Stocks & ETFs */}
          <div className="mb-2">
            <button
              type="button"
              onClick={() => toggleTree('usStocks')}
              className="w-full px-4 py-2 flex items-center justify-between text-gray-400 hover:text-white cursor-pointer transition-colors text-left"
            >
              <span className="font-semibold text-sm flex items-center gap-2">
                US Stocks & ETFs
                <span className="bg-sky-500/10 text-sky-400 text-[10px] px-1.5 py-0.5 rounded border border-sky-500/20 font-mono">
                  AUTO
                </span>
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${openTrees.usStocks ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openTrees.usStocks && (
              <div className="pl-4 space-y-1 mt-1">
                <NavLink to="/assets/us-stocks/asset-evaluation" className={linkClass}>
                  Asset Evaluation
                </NavLink>
                <NavLink to="/assets/us-stocks/transactions" className={linkClass}>
                  Transactions
                </NavLink>
                <NavLink to="/assets/us-stocks/holdings" className={linkClass}>
                  Holdings
                </NavLink>
                <NavLink to="/assets/us-stocks/valuation" className={linkClass}>
                  Valuation
                </NavLink>
              </div>
            )}
          </div>

          {/* ESOPs & RSUs */}
          <div className="mb-2">
            <button
              type="button"
              onClick={() => toggleTree('esops')}
              className="w-full px-4 py-2 flex items-center justify-between text-gray-400 hover:text-white cursor-pointer transition-colors text-left"
            >
              <span className="font-semibold text-sm flex items-center gap-2">
                ESOPs & RSUs
                <span className="bg-orange-500/10 text-orange-400 text-[10px] px-1.5 py-0.5 rounded border border-orange-500/20 font-mono">
                  MANUAL
                </span>
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${openTrees.esops ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openTrees.esops && (
              <div className="pl-4 space-y-1 mt-1">
                <NavLink to="/assets/esops/asset-evaluation" className={linkClass}>
                  Asset Evaluation
                </NavLink>
                <NavLink to="/assets/esops/transactions" className={linkClass}>
                  Transactions
                </NavLink>
                <NavLink to="/assets/esops/vesting" className={linkClass}>
                  Vesting Schedule
                </NavLink>
                <NavLink to="/assets/esops/grants" className={linkClass}>
                  Grants
                </NavLink>
              </div>
            )}
          </div>

          {/* Fixed Deposits */}
          <div className="mb-2">
            <button
              type="button"
              onClick={() => toggleTree('fd')}
              className="w-full px-4 py-2 flex items-center justify-between text-gray-400 hover:text-white cursor-pointer transition-colors text-left"
            >
              <span className="font-semibold text-sm flex items-center gap-2">
                Fixed Deposits
                <span className="bg-sky-500/10 text-sky-400 text-[10px] px-1.5 py-0.5 rounded border border-sky-500/20 font-mono">
                  AUTO
                </span>
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${openTrees.fd ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openTrees.fd && (
              <div className="pl-4 space-y-1 mt-1">
                <NavLink to="/assets/fixed-deposits/asset-evaluation" className={linkClass}>
                  Asset Evaluation
                </NavLink>
                <NavLink to="/assets/fixed-deposits/transactions" className={linkClass}>
                  Transactions
                </NavLink>
                <NavLink to="/assets/fixed-deposits/active" className={linkClass}>
                  Active FDs
                </NavLink>
                <NavLink to="/assets/fixed-deposits/matured" className={linkClass}>
                  Matured FDs
                </NavLink>
              </div>
            )}
          </div>

          {/* Indian Bonds */}
          <div className="mb-2">
            <button
              type="button"
              onClick={() => toggleTree('bonds')}
              className="w-full px-4 py-2 flex items-center justify-between text-gray-400 hover:text-white cursor-pointer transition-colors text-left"
            >
              <span className="font-semibold text-sm flex items-center gap-2">
                Indian Bonds & SGBs
                <span className="bg-sky-500/10 text-sky-400 text-[10px] px-1.5 py-0.5 rounded border border-sky-500/20 font-mono">
                  AUTO
                </span>
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${openTrees.bonds ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openTrees.bonds && (
              <div className="pl-4 space-y-1 mt-1">
                <NavLink to="/assets/indian-bonds/asset-evaluation" className={linkClass}>
                  Asset Evaluation
                </NavLink>
                <NavLink to="/assets/indian-bonds/transactions" className={linkClass}>
                  Transactions
                </NavLink>
                <NavLink to="/assets/indian-bonds/holdings" className={linkClass}>
                  Holdings
                </NavLink>
                <NavLink to="/assets/indian-bonds/valuation" className={linkClass}>
                  Valuation
                </NavLink>
              </div>
            )}
          </div>

          {/* PF Account */}
          <div className="mb-2">
            <button
              type="button"
              onClick={() => toggleTree('pf')}
              className="w-full px-4 py-2 flex items-center justify-between text-gray-400 hover:text-white cursor-pointer transition-colors text-left"
            >
              <span className="font-semibold text-sm flex items-center gap-2">
                PF Account
                <span className="bg-sky-500/10 text-sky-400 text-[10px] px-1.5 py-0.5 rounded border border-sky-500/20 font-mono">
                  AUTO
                </span>
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${openTrees.pf ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openTrees.pf && (
              <div className="pl-4 space-y-1 mt-1">
                <NavLink to="/assets/pf-account/asset-evaluation" className={linkClass}>
                  Asset Evaluation
                </NavLink>
                <NavLink to="/assets/pf-account/transactions" className={linkClass}>
                  Transactions
                </NavLink>
                <NavLink to="/assets/pf-account/ledger" className={linkClass}>
                  Ledger
                </NavLink>
                <NavLink to="/assets/pf-account/analytics" className={linkClass}>
                  Analytics
                </NavLink>
              </div>
            )}
          </div>

          {/* Swing Trading */}
          <div className="mb-2 mt-6">
            <button
              type="button"
              onClick={() => toggleTree('swing')}
              className="w-full px-4 py-2 flex items-center justify-between text-gray-400 hover:text-white cursor-pointer transition-colors text-left"
            >
              <span className="font-semibold text-sm flex items-center gap-2">
                Swing Trading
                <span className="bg-orange-500/10 text-orange-400 text-[10px] px-1.5 py-0.5 rounded border border-orange-500/20 font-mono">
                  MANUAL
                </span>
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${openTrees.swing ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openTrees.swing && (
              <div className="pl-4 space-y-1 mt-1">
                <NavLink to="/assets/swing/asset-evaluation" className={linkClass}>
                  Asset Evaluation
                </NavLink>
                <NavLink to="/assets/swing/transactions" className={linkClass}>
                  Transactions
                </NavLink>
                <NavLink to="/assets/swing/trades" className={linkClass}>
                  Active Trades
                </NavLink>
                <NavLink to="/assets/swing/gtt" className={linkClass}>
                  GTT Orders
                </NavLink>
                <NavLink to="/assets/swing/watchlist" className={linkClass}>
                  Watchlist Queue
                </NavLink>
                <NavLink to="/assets/swing/history" className={linkClass}>
                  Trade History
                </NavLink>
                <NavLink to="/assets/swing/broker-sync" className={linkClass}>
                  Broker Sync
                </NavLink>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Main Content inside Assets */}
      <div className="flex-1 overflow-auto p-8 bg-[#0D0D12]">
        <Outlet />
      </div>
    </div>
  );
}
