import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { NetWorthDashboard } from './components/wealth/NetWorthDashboard';
import { LiabilitiesPage } from './components/wealth/LiabilitiesPage';
import { GoalsPage } from './components/wealth/GoalsPage';
import { PortfolioValuation } from './components/PortfolioValuation';
import { Settings } from './components/Settings';
import { FallbackProvider } from './components/FallbackContext';

import { AssetsLayout } from './components/wealth/AssetsLayout';
import {
  AssetsDashboardView,
  IndianEtfsHoldingsView,
  IndianEtfsValuationView,
  IndianLtStocksHoldingsView,
  IndianLtStocksValuationView,
  UsStocksHoldingsView,
  UsStocksValuationView,
  EsopsVestingView,
  EsopsGrantsView,
  FixedDepositsActiveView,
  FixedDepositsMaturedView,
  IndianBondsHoldingsView,
  IndianBondsValuationView,
  PfAccountLedgerView,
  PfAccountAnalyticsView,
  BrokerSyncView,
} from './components/wealth/AssetClassViews';

import { ActiveTradesPage } from './components/ActiveTradesPage';
import { GttDashboard } from './components/GttDashboard';
import { WatchlistQueue } from './components/WatchlistQueue';
import { HistoryPage } from './components/HistoryPage';
import { DashboardPage } from './components/DashboardPage';

import './App.css';

function App() {
  return (
    <FallbackProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            {/* Top Navigation Views */}
            <Route index element={<NetWorthDashboard />} />
            <Route path="dashboard" element={<NetWorthDashboard />} />
            <Route path="valuation" element={<PortfolioValuation />} />
            <Route path="liabilities" element={<LiabilitiesPage />} />
            <Route path="goals" element={<GoalsPage />} />
            <Route path="settings" element={<Settings />} />
            <Route path="risk-dashboard" element={<DashboardPage />} />

            {/* Assets Module with Left Sidebar */}
            <Route path="assets" element={<AssetsLayout />}>
              <Route index element={<AssetsDashboardView />} />
              <Route path="dashboard" element={<AssetsDashboardView />} />
              
              {/* Indian ETFs */}
              <Route path="indian-etfs/holdings" element={<IndianEtfsHoldingsView />} />
              <Route path="indian-etfs/valuation" element={<IndianEtfsValuationView />} />

              {/* Indian Long-Term Stocks */}
              <Route path="indian-lt-stocks/holdings" element={<IndianLtStocksHoldingsView />} />
              <Route path="indian-lt-stocks/valuation" element={<IndianLtStocksValuationView />} />

              {/* US Stocks & ETFs */}
              <Route path="us-stocks/holdings" element={<UsStocksHoldingsView />} />
              <Route path="us-stocks/valuation" element={<UsStocksValuationView />} />

              {/* ESOPs & RSUs */}
              <Route path="esops/vesting" element={<EsopsVestingView />} />
              <Route path="esops/grants" element={<EsopsGrantsView />} />

              {/* Fixed Deposits */}
              <Route path="fixed-deposits/active" element={<FixedDepositsActiveView />} />
              <Route path="fixed-deposits/matured" element={<FixedDepositsMaturedView />} />

              {/* Indian Bonds */}
              <Route path="indian-bonds/holdings" element={<IndianBondsHoldingsView />} />
              <Route path="indian-bonds/valuation" element={<IndianBondsValuationView />} />

              {/* PF Account */}
              <Route path="pf-account/ledger" element={<PfAccountLedgerView />} />
              <Route path="pf-account/analytics" element={<PfAccountAnalyticsView />} />

              {/* Swing Trading Subtree */}
              <Route path="swing/trades" element={<ActiveTradesPage />} />
              <Route path="swing/gtt" element={<GttDashboard />} />
              <Route path="swing/watchlist" element={<WatchlistQueue />} />
              <Route path="swing/history" element={<HistoryPage />} />
              <Route path="swing/broker-sync" element={<BrokerSyncView />} />
            </Route>

            {/* Legacy shortcuts */}
            <Route path="swing" element={<ActiveTradesPage />} />
            <Route path="watchlist" element={<WatchlistQueue />} />
            <Route path="history" element={<HistoryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FallbackProvider>
  );
}

export default App;
