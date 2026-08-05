import { NavLink, Outlet } from 'react-router-dom';
import { OfflineWarningBanner } from './OfflineWarningBanner';

export function AppLayout() {
  return (
    <div className="flex h-screen w-full bg-background text-white font-mono">
      {/* Fixed Left Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-[#16161D] border-r border-[#2C2C35] flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-tight text-white">Swing Trader</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-[#2C2C35] text-white' : 'text-gray-400 hover:bg-[#2C2C35] hover:text-white'
              }`
            }
          >
            Active Trades
          </NavLink>
          
          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-[#2C2C35] text-white' : 'text-gray-400 hover:bg-[#2C2C35] hover:text-white'
              }`
            }
          >
            Watchlist
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-[#2C2C35] text-white' : 'text-gray-400 hover:bg-[#2C2C35] hover:text-white'
              }`
            }
          >
            History
          </NavLink>
          
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-[#2C2C35] text-white' : 'text-gray-400 hover:bg-[#2C2C35] hover:text-white'
              }`
            }
          >
            Dashboard
          </NavLink>
          
          <NavLink
            to="/valuation"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-[#2C2C35] text-white' : 'text-gray-400 hover:bg-[#2C2C35] hover:text-white'
              }`
            }
          >
            Portfolio Valuation
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-[#2C2C35] text-white' : 'text-gray-400 hover:bg-[#2C2C35] hover:text-white'
              }`
            }
          >
            Settings
          </NavLink>
        </nav>
        
        <div className="p-4 border-t border-[#2C2C35] text-xs text-gray-500">
          v1.0.0
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-background flex flex-col">
        <OfflineWarningBanner />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
