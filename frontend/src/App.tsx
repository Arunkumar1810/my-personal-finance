import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { ActiveTradesPage } from './components/ActiveTradesPage'
import './App.css'

import { WatchlistQueue } from './components/WatchlistQueue'
import { FallbackProvider } from './components/FallbackContext'
import { Settings } from './components/Settings'
import { PortfolioValuation } from './components/PortfolioValuation'

import { HistoryPage } from './components/HistoryPage'
import { DashboardPage } from './components/DashboardPage'
function App() {
  return (
    <FallbackProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<ActiveTradesPage />} />
            <Route path="watchlist" element={<WatchlistQueue />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="valuation" element={<div className="p-8 h-full bg-[#0D0D12] overflow-auto"><PortfolioValuation /></div>} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FallbackProvider>
  )
}

export default App
