import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { GttDashboard } from './components/GttDashboard'
import './App.css'

import { WatchlistQueue } from './components/WatchlistQueue'
import { FallbackProvider } from './components/FallbackContext'
import { Settings } from './components/Settings'

function HistoryPlaceholder() {
  return <div className="p-8"><h2 className="text-2xl font-bold">History</h2></div>;
}

function App() {
  return (
    <FallbackProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<GttDashboard />} />
            <Route path="watchlist" element={<WatchlistQueue />} />
            <Route path="history" element={<HistoryPlaceholder />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FallbackProvider>
  )
}

export default App
