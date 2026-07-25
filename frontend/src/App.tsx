import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { GttDashboard } from './components/GttDashboard'
import './App.css'

import { WatchlistQueue } from './components/WatchlistQueue'

function HistoryPlaceholder() {
  return <div className="p-8"><h2 className="text-2xl font-bold">History</h2></div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<GttDashboard />} />
          <Route path="watchlist" element={<WatchlistQueue />} />
          <Route path="history" element={<HistoryPlaceholder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
