import { useState } from 'react';

// ==========================================
// 1. Assets Dashboard View
// ==========================================
export function AssetsDashboardView() {
  return (
    <div className="max-w-5xl">
      <h2 className="text-2xl font-semibold mb-6 text-white">Assets Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm font-medium">Total Assets Value</h3>
          <div className="text-3xl font-mono mt-2 text-white font-bold">$298,500.00</div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm font-medium">Asset Allocation</h3>
          <div className="mt-4 w-full h-4 rounded-full overflow-hidden flex">
            <div className="h-full bg-blue-500" style={{ width: '70%' }} title="Equity 70%" />
            <div className="h-full bg-orange-400" style={{ width: '20%' }} title="Debt 20%" />
            <div className="h-full bg-emerald-500" style={{ width: '10%' }} title="Cash 10%" />
          </div>
          <div className="flex flex-wrap gap-4 mt-4 text-xs font-mono text-gray-400">
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-blue-500 rounded-full" /> Equity (70%)</span>
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-orange-400 rounded-full" /> Debt (20%)</span>
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-emerald-500 rounded-full" /> Cash (10%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. Indian ETFs Views (Holdings & Valuation)
// ==========================================
export function IndianEtfsHoldingsView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Indian ETFs - Holdings</h2>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          + Add Transaction
        </button>
      </header>
      <div className="border border-[#2C2C35] rounded-2xl overflow-hidden shadow-lg bg-[#16161D]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#2C2C35]/30">
            <tr className="text-gray-400 text-sm border-b border-[#2C2C35]">
              <th className="py-4 px-6 font-medium">Ticker</th>
              <th className="py-4 px-6 font-medium text-right">Shares</th>
              <th className="py-4 px-6 font-medium text-right">Avg Price</th>
              <th className="py-4 px-6 font-medium text-right">Current Price</th>
              <th className="py-4 px-6 font-medium text-right">Current Value</th>
              <th className="py-4 px-6 font-medium text-right">P&L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2C2C35] font-mono text-sm">
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">NIFTYBEES</td>
              <td className="py-4 px-6 text-right">2,500</td>
              <td className="py-4 px-6 text-right text-gray-400">₹240.00</td>
              <td className="py-4 px-6 text-right text-white">₹262.50</td>
              <td className="py-4 px-6 text-right text-white">₹6,56,250</td>
              <td className="py-4 px-6 text-right text-green-400">+₹56,250 (+9.3%)</td>
            </tr>
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">BANKBEES</td>
              <td className="py-4 px-6 text-right">800</td>
              <td className="py-4 px-6 text-right text-gray-400">₹510.00</td>
              <td className="py-4 px-6 text-right text-white">₹545.00</td>
              <td className="py-4 px-6 text-right text-white">₹4,36,000</td>
              <td className="py-4 px-6 text-right text-green-400">+₹28,000 (+6.8%)</td>
            </tr>
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">ITBEES</td>
              <td className="py-4 px-6 text-right">3,000</td>
              <td className="py-4 px-6 text-right text-gray-400">₹38.50</td>
              <td className="py-4 px-6 text-right text-white">₹41.20</td>
              <td className="py-4 px-6 text-right text-white">₹1,23,600</td>
              <td className="py-4 px-6 text-right text-green-400">+₹8,100 (+7.0%)</td>
            </tr>
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">MON100</td>
              <td className="py-4 px-6 text-right">1,200</td>
              <td className="py-4 px-6 text-right text-gray-400">₹145.00</td>
              <td className="py-4 px-6 text-right text-white">₹168.00</td>
              <td className="py-4 px-6 text-right text-white">₹2,01,600</td>
              <td className="py-4 px-6 text-right text-green-400">+₹27,600 (+15.8%)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function IndianEtfsValuationView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Indian ETFs - Valuation</h2>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm mb-2">Portfolio Value</h3>
          <div className="text-3xl font-mono text-white font-bold">₹14,50,000</div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm mb-2">Invested Value</h3>
          <div className="text-3xl font-mono text-gray-300 font-bold">₹11,20,000</div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl border-l-4 border-l-green-500">
          <h3 className="text-gray-400 text-sm mb-2">XIRR</h3>
          <div className="text-3xl font-mono text-green-400 font-bold">18.4%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl relative overflow-hidden flex flex-col h-72 group">
          <h3 className="text-white font-semibold mb-1">Future Projection (10 Years)</h3>
          <p className="text-xs text-gray-500 mb-4">Based on historical 12% CAGR</p>
          <div className="flex-1 relative w-full mt-2">
            <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,80 L0,100 L100,100 L100,50 Z" fill="url(#etf-invested-grad)" opacity="0.6" />
              <path d="M0,80 L100,50" fill="none" stroke="#6b7280" strokeWidth="2" strokeDasharray="4" />
              <path d="M0,80 L0,100 L100,100 L100,10 Z" fill="url(#etf-projected-grad)" opacity="0.4" />
              <path d="M0,80 Q50,60 100,10" fill="none" stroke="#38bdf8" strokeWidth="3" />
              <defs>
                <linearGradient id="etf-invested-grad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#4b5563" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <linearGradient id="etf-projected-grad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="lg:col-span-1 bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl flex flex-col items-center justify-center h-72">
          <h3 className="text-white font-semibold mb-4 w-full text-left">Composition</h3>
          <div
            className="relative w-28 h-28 rounded-full mb-4"
            style={{
              background: 'conic-gradient(#0ea5e9 0% 45%, #f59e0b 45% 75%, #10b981 75% 90%, #8b5cf6 90% 100%)',
              boxShadow: 'inset 0 0 15px #16161D'
            }}
          >
            <div className="absolute inset-3 bg-[#16161D] rounded-full flex items-center justify-center">
              <span className="text-[11px] text-gray-400 font-mono">4 ETFs</span>
            </div>
          </div>
          <div className="w-full space-y-1 text-xs font-mono">
            <div className="flex justify-between text-sky-400"><span>NIFTYBEES</span><span>45%</span></div>
            <div className="flex justify-between text-amber-400"><span>BANKBEES</span><span>30%</span></div>
            <div className="flex justify-between text-emerald-400"><span>ITBEES</span><span>15%</span></div>
            <div className="flex justify-between text-violet-400"><span>MON100</span><span>10%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. Indian Long-Term Stocks Views
// ==========================================
export function IndianLtStocksHoldingsView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Indian Long-Term Stocks - Holdings</h2>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          + Add Transaction
        </button>
      </header>
      <div className="border border-[#2C2C35] rounded-2xl overflow-hidden shadow-lg bg-[#16161D]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#2C2C35]/30">
            <tr className="text-gray-400 text-sm border-b border-[#2C2C35]">
              <th className="py-4 px-6 font-medium">Ticker</th>
              <th className="py-4 px-6 font-medium text-right">Shares</th>
              <th className="py-4 px-6 font-medium text-right">Avg Price</th>
              <th className="py-4 px-6 font-medium text-right">Current Price</th>
              <th className="py-4 px-6 font-medium text-right">Current Value</th>
              <th className="py-4 px-6 font-medium text-right">P&L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2C2C35] font-mono text-sm">
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">RELIANCE</td>
              <td className="py-4 px-6 text-right">150</td>
              <td className="py-4 px-6 text-right text-gray-400">₹2,450.00</td>
              <td className="py-4 px-6 text-right text-white">₹2,950.00</td>
              <td className="py-4 px-6 text-right text-white">₹4,42,500</td>
              <td className="py-4 px-6 text-right text-green-400">+₹75,000 (+20.4%)</td>
            </tr>
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">TCS</td>
              <td className="py-4 px-6 text-right">80</td>
              <td className="py-4 px-6 text-right text-gray-400">₹3,400.00</td>
              <td className="py-4 px-6 text-right text-white">₹4,120.00</td>
              <td className="py-4 px-6 text-right text-white">₹3,29,600</td>
              <td className="py-4 px-6 text-right text-green-400">+₹57,600 (+21.1%)</td>
            </tr>
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">INFY</td>
              <td className="py-4 px-6 text-right">200</td>
              <td className="py-4 px-6 text-right text-gray-400">₹1,420.00</td>
              <td className="py-4 px-6 text-right text-white">₹1,780.00</td>
              <td className="py-4 px-6 text-right text-white">₹3,56,000</td>
              <td className="py-4 px-6 text-right text-green-400">+₹72,000 (+25.3%)</td>
            </tr>
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">HDFCBANK</td>
              <td className="py-4 px-6 text-right">250</td>
              <td className="py-4 px-6 text-right text-gray-400">₹1,510.00</td>
              <td className="py-4 px-6 text-right text-white">₹1,620.00</td>
              <td className="py-4 px-6 text-right text-white">₹4,05,000</td>
              <td className="py-4 px-6 text-right text-green-400">+₹27,500 (+7.3%)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function IndianLtStocksValuationView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Indian Long-Term Stocks - Valuation</h2>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm mb-2">Portfolio Value</h3>
          <div className="text-3xl font-mono text-white font-bold">₹28,40,000</div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm mb-2">Invested Value</h3>
          <div className="text-3xl font-mono text-gray-300 font-bold">₹20,00,000</div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl border-l-4 border-l-green-500">
          <h3 className="text-gray-400 text-sm mb-2">XIRR</h3>
          <div className="text-3xl font-mono text-green-400 font-bold">22.5%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl relative overflow-hidden flex flex-col h-72">
          <h3 className="text-white font-semibold mb-1">Future Projection (10 Years)</h3>
          <p className="text-xs text-gray-500 mb-4">Based on historical 15% CAGR</p>
          <div className="flex-1 relative w-full mt-2">
            <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,80 L0,100 L100,100 L100,50 Z" fill="#4b5563" opacity="0.5" />
              <path d="M0,80 L100,50" fill="none" stroke="#6b7280" strokeWidth="2" strokeDasharray="4" />
              <path d="M0,80 L0,100 L100,100 L100,10 Z" fill="#0ea5e9" opacity="0.3" />
              <path d="M0,80 Q50,60 100,10" fill="none" stroke="#38bdf8" strokeWidth="3" />
            </svg>
          </div>
        </div>

        <div className="lg:col-span-1 bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl flex flex-col items-center justify-center h-72">
          <h3 className="text-white font-semibold mb-4 w-full text-left">Composition</h3>
          <div
            className="relative w-28 h-28 rounded-full mb-4"
            style={{
              background: 'conic-gradient(#0ea5e9 0% 30%, #f59e0b 30% 55%, #10b981 55% 75%, #8b5cf6 75% 100%)',
              boxShadow: 'inset 0 0 15px #16161D'
            }}
          >
            <div className="absolute inset-3 bg-[#16161D] rounded-full flex items-center justify-center">
              <span className="text-[11px] text-gray-400 font-mono">4 Stocks</span>
            </div>
          </div>
          <div className="w-full space-y-1 text-xs font-mono">
            <div className="flex justify-between text-sky-400"><span>RELIANCE</span><span>30%</span></div>
            <div className="flex justify-between text-amber-400"><span>TCS</span><span>25%</span></div>
            <div className="flex justify-between text-emerald-400"><span>INFY</span><span>20%</span></div>
            <div className="flex justify-between text-violet-400"><span>HDFCBANK</span><span>25%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. US Stocks & ETFs Views
// ==========================================
export function UsStocksHoldingsView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">US Stocks & ETFs - Holdings</h2>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          + Add Transaction
        </button>
      </header>
      <div className="border border-[#2C2C35] rounded-2xl overflow-hidden shadow-lg bg-[#16161D]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#2C2C35]/30">
            <tr className="text-gray-400 text-sm border-b border-[#2C2C35]">
              <th className="py-4 px-6 font-medium">Ticker</th>
              <th className="py-4 px-6 font-medium text-right">Shares</th>
              <th className="py-4 px-6 font-medium text-right">Avg Price</th>
              <th className="py-4 px-6 font-medium text-right">Current Price</th>
              <th className="py-4 px-6 font-medium text-right">Current Value</th>
              <th className="py-4 px-6 font-medium text-right">P&L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2C2C35] font-mono text-sm">
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">AAPL</td>
              <td className="py-4 px-6 text-right">50</td>
              <td className="py-4 px-6 text-right text-gray-400">$175.00</td>
              <td className="py-4 px-6 text-right text-white">$220.50</td>
              <td className="py-4 px-6 text-right text-white">$11,025.00</td>
              <td className="py-4 px-6 text-right text-green-400">+$2,275.00 (+26.0%)</td>
            </tr>
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">MSFT</td>
              <td className="py-4 px-6 text-right">30</td>
              <td className="py-4 px-6 text-right text-gray-400">$340.00</td>
              <td className="py-4 px-6 text-right text-white">$415.00</td>
              <td className="py-4 px-6 text-right text-white">$12,450.00</td>
              <td className="py-4 px-6 text-right text-green-400">+$2,250.00 (+22.1%)</td>
            </tr>
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">NVDA</td>
              <td className="py-4 px-6 text-right">80</td>
              <td className="py-4 px-6 text-right text-gray-400">$95.00</td>
              <td className="py-4 px-6 text-right text-white">$125.00</td>
              <td className="py-4 px-6 text-right text-white">$10,000.00</td>
              <td className="py-4 px-6 text-right text-green-400">+$2,400.00 (+31.6%)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function UsStocksValuationView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">US Stocks & ETFs - Valuation</h2>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm mb-2">Portfolio Value</h3>
          <div className="text-3xl font-mono text-white font-bold">$84,400.00</div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm mb-2">Invested Value</h3>
          <div className="text-3xl font-mono text-gray-300 font-bold">$60,000.00</div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl border-l-4 border-l-green-500">
          <h3 className="text-gray-400 text-sm mb-2">XIRR</h3>
          <div className="text-3xl font-mono text-green-400 font-bold">28.1%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl relative overflow-hidden flex flex-col h-72">
          <h3 className="text-white font-semibold mb-1">Future Projection (10 Years)</h3>
          <p className="text-xs text-gray-500 mb-4">Based on historical 20% CAGR</p>
          <div className="flex-1 relative w-full mt-2">
            <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,80 L0,100 L100,100 L100,50 Z" fill="#4b5563" opacity="0.5" />
              <path d="M0,80 L100,50" fill="none" stroke="#6b7280" strokeWidth="2" strokeDasharray="4" />
              <path d="M0,80 L0,100 L100,100 L100,10 Z" fill="#0ea5e9" opacity="0.3" />
              <path d="M0,80 Q50,60 100,10" fill="none" stroke="#38bdf8" strokeWidth="3" />
            </svg>
          </div>
        </div>

        <div className="lg:col-span-1 bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl flex flex-col items-center justify-center h-72">
          <h3 className="text-white font-semibold mb-4 w-full text-left">Composition</h3>
          <div
            className="relative w-28 h-28 rounded-full mb-4"
            style={{
              background: 'conic-gradient(#0ea5e9 0% 35%, #f59e0b 35% 65%, #10b981 65% 85%, #8b5cf6 85% 100%)',
              boxShadow: 'inset 0 0 15px #16161D'
            }}
          >
            <div className="absolute inset-3 bg-[#16161D] rounded-full flex items-center justify-center">
              <span className="text-[11px] text-gray-400 font-mono">6 Assets</span>
            </div>
          </div>
          <div className="w-full space-y-1 text-xs font-mono">
            <div className="flex justify-between text-sky-400"><span>AAPL</span><span>35%</span></div>
            <div className="flex justify-between text-amber-400"><span>MSFT</span><span>30%</span></div>
            <div className="flex justify-between text-emerald-400"><span>QQQ</span><span>20%</span></div>
            <div className="flex justify-between text-violet-400"><span>NVDA</span><span>15%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. ESOPs & RSUs Views
// ==========================================
export function EsopsVestingView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">ESOPs & RSUs - Vesting Schedule</h2>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm mb-2">Vested (Available)</h3>
          <div className="text-3xl font-mono text-green-400 font-bold">2,500 Shares</div>
          <div className="text-sm font-mono text-gray-400 mt-1">Est. Value: $375,000</div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm mb-2">Unvested</h3>
          <div className="text-3xl font-mono text-amber-400 font-bold">7,500 Shares</div>
          <div className="text-sm font-mono text-gray-400 mt-1">Est. Value: $1,125,000</div>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-4 text-white">Upcoming Vesting Tranches</h3>
      <div className="space-y-4">
        <div className="bg-[#16161D] border border-[#2C2C35] p-4 rounded-xl flex justify-between items-center">
          <div>
            <div className="font-semibold text-white">Tranche 2 (25%)</div>
            <div className="text-xs text-gray-400">Vests on Oct 1, 2026</div>
          </div>
          <div className="font-mono text-white text-right">
            <div>2,500 Shares</div>
            <div className="text-xs text-gray-500">$375,000</div>
          </div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-4 rounded-xl flex justify-between items-center">
          <div>
            <div className="font-semibold text-white">Tranche 3 (25%)</div>
            <div className="text-xs text-gray-400">Vests on Oct 1, 2027</div>
          </div>
          <div className="font-mono text-white text-right">
            <div>2,500 Shares</div>
            <div className="text-xs text-gray-500">$375,000</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EsopsGrantsView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">ESOPs - Grants</h2>
      </header>
      <div className="space-y-4">
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Grant #2023-A</h3>
            <span className="px-3 py-1 bg-sky-500/10 text-sky-400 text-xs rounded border border-sky-500/20">
              Vesting Active
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><span className="block text-gray-500 mb-1">Grant Date</span><span className="font-mono text-white">Oct 1, 2023</span></div>
            <div><span className="block text-gray-500 mb-1">Total Options</span><span className="font-mono text-white">10,000</span></div>
            <div><span className="block text-gray-500 mb-1">Vested</span><span className="font-mono text-green-400">2,500</span></div>
            <div><span className="block text-gray-500 mb-1">Unvested</span><span className="font-mono text-white">7,500</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. Fixed Deposits Views
// ==========================================
export function FixedDepositsActiveView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Fixed Deposits - Active</h2>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          + Add FD
        </button>
      </header>
      <div className="border border-[#2C2C35] rounded-2xl overflow-hidden shadow-lg bg-[#16161D]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#2C2C35]/30">
            <tr className="text-gray-400 text-sm border-b border-[#2C2C35]">
              <th className="py-4 px-6 font-medium">Bank</th>
              <th className="py-4 px-6 font-medium text-right">Principal</th>
              <th className="py-4 px-6 font-medium text-right">Interest Rate</th>
              <th className="py-4 px-6 font-medium">Maturity Date</th>
              <th className="py-4 px-6 font-medium text-right">Accrued Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2C2C35] font-mono text-sm">
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 text-white font-sans">HDFC Bank</td>
              <td className="py-4 px-6 text-right text-gray-300">₹2,00,000</td>
              <td className="py-4 px-6 text-right text-sky-400">7.25%</td>
              <td className="py-4 px-6 text-gray-400 font-sans">2027-03-15</td>
              <td className="py-4 px-6 text-right text-white">₹2,18,500</td>
            </tr>
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 text-white font-sans">State Bank of India</td>
              <td className="py-4 px-6 text-right text-gray-300">₹1,50,000</td>
              <td className="py-4 px-6 text-right text-sky-400">7.00%</td>
              <td className="py-4 px-6 text-gray-400 font-sans">2026-11-20</td>
              <td className="py-4 px-6 text-right text-white">₹1,58,200</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function FixedDepositsMaturedView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Fixed Deposits - Matured</h2>
      </header>
      <div className="border border-[#2C2C35] rounded-2xl overflow-hidden shadow-lg bg-[#16161D]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#2C2C35]/30">
            <tr className="text-gray-400 text-sm border-b border-[#2C2C35]">
              <th className="py-4 px-6 font-medium">Bank</th>
              <th className="py-4 px-6 font-medium">Maturity Date</th>
              <th className="py-4 px-6 font-medium text-right">Principal</th>
              <th className="py-4 px-6 font-medium text-right">Interest</th>
              <th className="py-4 px-6 font-medium text-right">Total Payout</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2C2C35] font-mono text-sm opacity-80">
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 text-white font-sans">HDFC Bank</td>
              <td className="py-4 px-6 text-gray-400 font-sans">2025-12-01</td>
              <td className="py-4 px-6 text-right text-gray-300">₹1,00,000</td>
              <td className="py-4 px-6 text-right text-green-400">+₹14,000</td>
              <td className="py-4 px-6 text-right text-white">₹1,14,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// 7. Indian Bonds & SGBs Views
// ==========================================
export function IndianBondsHoldingsView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Indian Bonds & SGBs - Holdings</h2>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          + Add Bond
        </button>
      </header>
      <div className="border border-[#2C2C35] rounded-2xl overflow-hidden shadow-lg bg-[#16161D]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#2C2C35]/30">
            <tr className="text-gray-400 text-sm border-b border-[#2C2C35]">
              <th className="py-4 px-6 font-medium">Bond / SGB Name</th>
              <th className="py-4 px-6 font-medium text-right">Units</th>
              <th className="py-4 px-6 font-medium text-right">Issue Price</th>
              <th className="py-4 px-6 font-medium text-right">Current Price</th>
              <th className="py-4 px-6 font-medium text-right">Coupon Rate</th>
              <th className="py-4 px-6 font-medium text-right">Current Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2C2C35] font-mono text-sm">
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">SGB 2029 Series IV</td>
              <td className="py-4 px-6 text-right">50</td>
              <td className="py-4 px-6 text-right text-gray-400">₹4,800</td>
              <td className="py-4 px-6 text-right text-white">₹7,150</td>
              <td className="py-4 px-6 text-right text-amber-400">2.5% p.a.</td>
              <td className="py-4 px-6 text-right text-green-400">₹3,57,500</td>
            </tr>
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">NHAI Tax-Free Bonds</td>
              <td className="py-4 px-6 text-right">100</td>
              <td className="py-4 px-6 text-right text-gray-400">₹1,000</td>
              <td className="py-4 px-6 text-right text-white">₹1,180</td>
              <td className="py-4 px-6 text-right text-sky-400">8.20%</td>
              <td className="py-4 px-6 text-right text-white">₹1,18,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function IndianBondsValuationView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Indian Bonds & SGBs - Valuation</h2>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm mb-2">Portfolio Value</h3>
          <div className="text-3xl font-mono text-white font-bold">₹5,50,000</div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm mb-2">Invested Value</h3>
          <div className="text-3xl font-mono text-gray-300 font-bold">₹4,80,000</div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl border-l-4 border-l-sky-500">
          <h3 className="text-gray-400 text-sm mb-2">Yield (XIRR)</h3>
          <div className="text-3xl font-mono text-sky-400 font-bold">7.8%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl relative overflow-hidden flex flex-col h-72">
          <h3 className="text-white font-semibold mb-1">Future Projection (10 Years)</h3>
          <p className="text-xs text-gray-500 mb-4">Based on historical 7.5% steady Yield</p>
          <div className="flex-1 relative w-full mt-2">
            <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,80 L0,100 L100,100 L100,50 Z" fill="#4b5563" opacity="0.5" />
              <path d="M0,80 L100,50" fill="none" stroke="#6b7280" strokeWidth="2" strokeDasharray="4" />
              <path d="M0,80 L0,100 L100,100 L100,30 Z" fill="#fbbf24" opacity="0.3" />
              <path d="M0,80 L100,30" fill="none" stroke="#fcd34d" strokeWidth="3" />
            </svg>
          </div>
        </div>

        <div className="lg:col-span-1 bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl flex flex-col items-center justify-center h-72">
          <h3 className="text-white font-semibold mb-4 w-full text-left">Composition</h3>
          <div
            className="relative w-28 h-28 rounded-full mb-4"
            style={{
              background: 'conic-gradient(#fbbf24 0% 50%, #38bdf8 50% 80%, #34d399 80% 100%)',
              boxShadow: 'inset 0 0 15px #16161D'
            }}
          >
            <div className="absolute inset-3 bg-[#16161D] rounded-full flex items-center justify-center">
              <span className="text-[11px] text-gray-400 font-mono">3 Assets</span>
            </div>
          </div>
          <div className="w-full space-y-1 text-xs font-mono">
            <div className="flex justify-between text-amber-400"><span>SGB 2029</span><span>50%</span></div>
            <div className="flex justify-between text-sky-400"><span>NHAI Bonds</span><span>30%</span></div>
            <div className="flex justify-between text-emerald-400"><span>REC Tax Free</span><span>20%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 8. Provident Fund Views
// ==========================================
export function PfAccountLedgerView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Provident Fund (EPF/PPF) - Ledger</h2>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm">Total PF Balance</h3>
          <div className="text-3xl font-mono mt-2 text-white font-bold">₹18,50,000</div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm">Interest Earned (YTD)</h3>
          <div className="text-3xl font-mono mt-2 text-green-400 font-bold">+₹1,24,000</div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm">Est. Rate</h3>
          <div className="text-3xl font-mono mt-2 text-sky-400 font-bold">8.15%</div>
        </div>
      </div>

      <div className="border border-[#2C2C35] rounded-2xl overflow-hidden shadow-lg bg-[#16161D]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#2C2C35]/30">
            <tr className="text-gray-400 text-sm border-b border-[#2C2C35]">
              <th className="py-4 px-6 font-medium">Month</th>
              <th className="py-4 px-6 font-medium text-right">Employee Share</th>
              <th className="py-4 px-6 font-medium text-right">Employer Share</th>
              <th className="py-4 px-6 font-medium text-right">Total Deposit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2C2C35] font-mono text-sm">
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 text-white font-sans">July 2026</td>
              <td className="py-4 px-6 text-right text-gray-300">₹15,000</td>
              <td className="py-4 px-6 text-right text-gray-300">₹15,000</td>
              <td className="py-4 px-6 text-right text-green-400">₹30,000</td>
            </tr>
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 text-white font-sans">June 2026</td>
              <td className="py-4 px-6 text-right text-gray-300">₹15,000</td>
              <td className="py-4 px-6 text-right text-gray-300">₹15,000</td>
              <td className="py-4 px-6 text-right text-green-400">₹30,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PfAccountAnalyticsView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">PF Account - Analytics</h2>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm mb-4 font-medium">Contribution Growth (6 Months)</h3>
          <div className="h-48 relative overflow-hidden flex items-end justify-between px-2 gap-3">
            <div className="w-10 bg-sky-500/20 h-1/6 rounded-t hover:bg-sky-500/40 transition-colors" title="Month 1" />
            <div className="w-10 bg-sky-500/30 h-2/6 rounded-t hover:bg-sky-500/40 transition-colors" title="Month 2" />
            <div className="w-10 bg-sky-500/40 h-3/6 rounded-t hover:bg-sky-500/50 transition-colors" title="Month 3" />
            <div className="w-10 bg-sky-500/50 h-4/6 rounded-t hover:bg-sky-500/60 transition-colors" title="Month 4" />
            <div className="w-10 bg-sky-500/60 h-5/6 rounded-t hover:bg-sky-500/70 transition-colors" title="Month 5" />
            <div className="w-10 bg-sky-500 h-full rounded-t hover:bg-sky-400 transition-colors" title="Month 6" />
          </div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl font-mono text-white mb-2 font-bold">8.15%</div>
            <div className="text-sm text-gray-500 uppercase tracking-widest font-mono">Current EPF Interest Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 9. Broker Sync View
// ==========================================
export function BrokerSyncView() {
  const [connecting, setConnecting] = useState(false);

  const handleKiteLogin = async () => {
    setConnecting(true);
    try {
      const res = await fetch('http://localhost:8000/api/auth/login-url');
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
          return;
        }
      }
    } catch (e) {
      console.error("Broker login redirect failed", e);
    }
    setConnecting(false);
  };

  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Broker Sync (Zerodha Kite)</h2>
      </header>
      <div className="bg-[#16161D] border border-[#2C2C35] p-8 rounded-2xl max-w-xl">
        <h3 className="text-lg font-semibold text-white mb-2">Connect to Zerodha Kite</h3>
        <p className="text-gray-400 text-sm mb-6">
          Synchronize your positions, orders, holdings, and daily ticks directly from your broker.
        </p>
        <button
          onClick={handleKiteLogin}
          disabled={connecting}
          className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-colors flex items-center gap-2 shadow-lg shadow-orange-600/20"
        >
          {connecting ? 'Redirecting to Kite...' : 'Login with Kite Connect'}
        </button>
      </div>
    </div>
  );
}
