import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './common/AppLayout';
import { FallbackProvider } from './common/FallbackContext';
import { SettingsPage } from './common/SettingsPage';

import { NetWorthDashboard } from './wealth-dashboard/NetWorthDashboard';
import { PortfolioValuation } from './portfolio-valuation/PortfolioValuation';
import { LiabilitiesPage } from './liabilities/LiabilitiesPage';
import { GoalsPage } from './goals/GoalsPage';

import { AssetsLayout } from './assets/AssetsLayout';
import { AssetsDashboardView } from './assets/assets-dashboard/AssetsDashboardView';
import { IndianEtfsHoldingsView } from './assets/indian-etfs/IndianEtfsHoldingsView';
import { IndianEtfsValuationView } from './assets/indian-etfs/IndianEtfsValuationView';
import { IndianLtStocksHoldingsView } from './assets/indian-lt-stocks/IndianLtStocksHoldingsView';
import { IndianLtStocksValuationView } from './assets/indian-lt-stocks/IndianLtStocksValuationView';
import { UsStocksHoldingsView } from './assets/us-stocks-etfs/UsStocksHoldingsView';
import { UsStocksValuationView } from './assets/us-stocks-etfs/UsStocksValuationView';
import { EsopsVestingView } from './assets/esops-rsus/EsopsVestingView';
import { EsopsGrantsView } from './assets/esops-rsus/EsopsGrantsView';
import { FixedDepositsActiveView } from './assets/fixed-deposits/FixedDepositsActiveView';
import { FixedDepositsMaturedView } from './assets/fixed-deposits/FixedDepositsMaturedView';
import { IndianBondsHoldingsView } from './assets/indian-bonds/IndianBondsHoldingsView';
import { IndianBondsValuationView } from './assets/indian-bonds/IndianBondsValuationView';
import { PfAccountLedgerView } from './assets/pf/PfAccountLedgerView';
import { PfAccountAnalyticsView } from './assets/pf/PfAccountAnalyticsView';

import { ActiveTradesPage } from './assets/indian-swing-trading/ActiveTradesPage';
import { GttDashboard } from './assets/indian-swing-trading/GttDashboard';
import { WatchlistQueue } from './assets/indian-swing-trading/WatchlistQueue';
import { HistoryPage } from './assets/indian-swing-trading/HistoryPage';
import { RiskDashboardPage } from './assets/indian-swing-trading/RiskDashboardPage';
import { BrokerSyncView } from './assets/indian-swing-trading/BrokerSyncView';

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
            <Route path="settings" element={<SettingsPage />} />
            <Route path="risk-dashboard" element={<RiskDashboardPage />} />

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
