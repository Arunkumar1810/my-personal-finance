import React, { useEffect, useState } from 'react';
import { WealthVelocity } from './WealthVelocity';
import { GhostXIRR } from './GhostXIRR';

const INFLATION_RATE = 0.06; // 6% assumed inflation

export function PortfolioValuation() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReal, setIsReal] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authCreds, setAuthCreds] = useState({ user_id: '', password: '', totp_code: '' });
  const [authStatus, setAuthStatus] = useState({ loading: false, error: '', success: false });

  const fetchValuation = () => {
    fetch('http://localhost:8000/api/portfolio-valuation')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setIsLoading(false);
      })
      .catch(e => {
        console.error("Failed to fetch portfolio valuation", e);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchValuation();
  }, []);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthStatus({ loading: true, error: '', success: false });
    try {
      const res = await fetch('http://localhost:8000/api/console/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authCreds)
      });
      const json = await res.json();
      if (!res.ok || json.status !== 'success') {
        throw new Error(json.detail || 'Login failed');
      }
      setAuthStatus({ loading: false, error: '', success: true });
      setIsAuthModalOpen(false);
      setIsLoading(true);
      fetchValuation();
    } catch (err: any) {
      setAuthStatus({ loading: false, error: err.message, success: false });
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#16161D] border border-neutral-700 rounded p-6 animate-pulse">
        <div className="h-6 w-48 bg-neutral-800 rounded mb-4"></div>
        <div className="h-12 w-32 bg-neutral-800 rounded"></div>
      </div>
    );
  }

  if (!data) return null;

  let displayXirr = data.xirr;
  if (isReal && displayXirr) {
    displayXirr = ((1 + displayXirr) / (1 + INFLATION_RATE)) - 1;
  }

  // Compute running balance (chrono order), then display most-recent first
  let currentTxs = [...(data.transactions || [])];
  currentTxs.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

  let runningBalance = 0;
  currentTxs = currentTxs.map((tx: any) => {
    const absAmount = Math.abs(tx.amount);
    if (tx.type === 'deposit') {
      runningBalance += absAmount;
    } else {
      runningBalance -= absAmount;
    }
    return { ...tx, balance: runningBalance };
  });
  currentTxs.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // 1. Derived Data Computation
  let totalDeposited = 0;
  let totalWithdrawn = 0;
  let portfolioStartDate: Date | null = null;
  
  if (data.transactions && data.transactions.length > 0) {
    const ascTxs = [...data.transactions].sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
    portfolioStartDate = new Date(ascTxs[0].date);
    for (const tx of data.transactions) {
      if (tx.type === 'deposit') {
        totalDeposited += Math.abs(tx.amount);
      } else {
        totalWithdrawn += Math.abs(tx.amount);
      }
    }
  }

  const netInvested = totalDeposited - totalWithdrawn;
  const unrealisedGain = (data.current_value || 0) - netInvested;
  const gainPct = netInvested !== 0 ? (unrealisedGain / netInvested) * 100 : 0;

  const totalCapital = (data.current_value || 0) + (data.available_funds || 0);
  const deployedPct = totalCapital > 0 ? (data.current_value / totalCapital) * 100 : 0;
  const idlePct = totalCapital > 0 ? (data.available_funds / totalCapital) * 100 : 0;

  let portfolioAgeStr = '';
  if (portfolioStartDate) {
    const now = new Date();
    const diffMonths = (now.getFullYear() - portfolioStartDate.getFullYear()) * 12 + (now.getMonth() - portfolioStartDate.getMonth());
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;
    if (years > 0) {
       portfolioAgeStr = `${years}y ${months}m`;
    } else {
       portfolioAgeStr = `${months}m`;
    }
  }

  // Monthly Cash Flow Chart Data
  const monthlyDataMap = new Map<string, { deposits: number, withdrawals: number, label: string }>();
  if (data.transactions) {
     const ascTxs = [...data.transactions].sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
     ascTxs.forEach((tx: any) => {
        const d = new Date(tx.date);
        const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2, '0')}`;
        if (!monthlyDataMap.has(key)) {
           monthlyDataMap.set(key, { 
             deposits: 0, 
             withdrawals: 0, 
             label: d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }) 
           });
        }
        if (tx.type === 'deposit') {
           monthlyDataMap.get(key)!.deposits += Math.abs(tx.amount);
        } else {
           monthlyDataMap.get(key)!.withdrawals += Math.abs(tx.amount);
        }
     });
  }
  const monthlyData = Array.from(monthlyDataMap.values());
  const maxMonthlyVal = monthlyData.length > 0 
    ? Math.max(...monthlyData.map(m => Math.max(m.deposits, m.withdrawals)))
    : 0;

  return (
    <div className="bg-[#16161D] border border-neutral-700 rounded p-6 mb-8 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-xl font-bold text-neutral-300">Portfolio Valuation</h2>
        <label className="flex items-center space-x-2 text-sm cursor-pointer mt-2 md:mt-0">
          <span className={!isReal ? "text-white" : "text-neutral-500"}>Nominal</span>
          <div className="relative">
            <input type="checkbox" className="sr-only" checked={isReal} onChange={() => setIsReal(!isReal)} />
            <div className={`block w-10 h-6 rounded-full ${isReal ? 'bg-purple-600' : 'bg-neutral-600'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${isReal ? 'translate-x-4' : ''}`}></div>
          </div>
          <span className={isReal ? "text-purple-400" : "text-neutral-500"}>Real</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="text-neutral-400 text-sm">Current Value</div>
          <div className="text-3xl font-mono">₹{data.current_value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
        </div>
        <div>
          <div className="text-neutral-400 text-sm">Available Funds</div>
          <div className="text-3xl font-mono text-green-400">₹{data.available_funds.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
        </div>
        <div>
          <div className="text-neutral-400 text-sm">
            XIRR (Annualized){isReal && <span className="text-purple-400 text-xs ml-1">(Adjusted for {INFLATION_RATE * 100}% inflation)</span>}
          </div>
          <div className={`text-3xl font-mono ${displayXirr >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {displayXirr !== null ? (displayXirr * 100).toFixed(2) + '%' : 'N/A'}
          </div>
        </div>
      </div>

      {/* Capital Story Card & Portfolio Tenure */}
      <div className="mt-8 bg-[#0D0D12] border border-neutral-700 rounded p-5">
        <div className="flex justify-between items-center mb-4 border-b border-neutral-700 pb-2">
          <h3 className="text-lg font-semibold text-neutral-300">Capital Story</h3>
          {portfolioStartDate && (
            <span className="text-xs text-neutral-500 bg-[#16161D] px-2 py-1 rounded border border-neutral-700">
              Since {portfolioStartDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} &bull; {portfolioAgeStr}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <div>
            <div className="text-neutral-500 mb-1">Total Deposited</div>
            <div className="font-mono">₹{totalDeposited.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
          </div>
          <div>
            <div className="text-neutral-500 mb-1">Total Withdrawn</div>
            <div className="font-mono">₹{totalWithdrawn.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
          </div>
          <div>
            <div className="text-neutral-500 mb-1">Net Invested</div>
            <div className="font-mono">₹{netInvested.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
          </div>
          <div>
            <div className="text-neutral-500 mb-1">Unrealised Gain</div>
            <div className={`font-mono ${unrealisedGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {unrealisedGain >= 0 ? '+' : '-'}₹{Math.abs(unrealisedGain).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </div>
          </div>
          <div>
            <div className="text-neutral-500 mb-1">Gain %</div>
            <div className={`font-mono ${unrealisedGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {unrealisedGain >= 0 ? '+' : ''}{gainPct.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>

      {/* Capital Efficiency Bar */}
      <div className="mt-8">
         <h3 className="text-lg font-semibold mb-3 border-b border-neutral-700 pb-2">Capital Efficiency</h3>
         <div className="h-4 w-full bg-neutral-800 rounded-full overflow-hidden flex">
            <div className="bg-indigo-500 h-full transition-all duration-1000" style={{ width: `${totalCapital === 0 ? 0 : deployedPct}%` }}></div>
            <div className="bg-neutral-600 h-full transition-all duration-1000" style={{ width: `${totalCapital === 0 ? 100 : idlePct}%` }}></div>
         </div>
         <div className="flex justify-between mt-2 text-xs">
            <div>
               <span className="text-indigo-400 font-semibold">In Market</span>
               <span className="text-neutral-400 ml-2">₹{(data.current_value || 0).toLocaleString()} ({deployedPct.toFixed(1)}%)</span>
            </div>
            <div className="text-right">
               <span className="text-neutral-400 mr-2">₹{(data.available_funds || 0).toLocaleString()} ({idlePct.toFixed(1)}%)</span>
               <span className="text-neutral-500 font-semibold">Idle Cash</span>
            </div>
         </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3 border-b border-neutral-700 pb-2">Wealth Velocity</h3>
          <div className="rounded overflow-hidden" style={{height: '220px'}}>
            <WealthVelocity xirr={displayXirr || 0} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3 border-b border-neutral-700 pb-2">XIRR Projection</h3>
          <div className="rounded overflow-hidden" style={{height: '220px'}}>
            <GhostXIRR xirr={displayXirr || 0} />
          </div>
        </div>
      </div>

      {/* Monthly Cash Flow Chart */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3 border-b border-neutral-700 pb-2">Monthly Cash Flow</h3>
        {monthlyData.length === 0 ? (
          <div className="text-center text-neutral-500 py-8 bg-[#0D0D12] border border-neutral-700 rounded">
            No cash flow data yet.
          </div>
        ) : (
          <div className="bg-[#0D0D12] border border-neutral-700 rounded p-4 overflow-x-auto">
             <div className="min-w-[500px]" style={{ height: '200px' }}>
                <svg width="100%" height="100%" preserveAspectRatio="none">
                   {/* Y-axis grids */}
                   {[0, 0.25, 0.5, 0.75, 1].map(pct => {
                      const y = 20 + (1 - pct) * 150;
                      return (
                         <g key={pct}>
                            <line x1="0" y1={y} x2="100%" y2={y} stroke="#2C2C35" strokeDasharray="4 4" />
                            <text x="0" y={y - 4} fontSize="10" fill="#6b7280">
                               ₹{((maxMonthlyVal * pct) / 1000).toFixed(0)}k
                            </text>
                         </g>
                      );
                   })}
                   
                   {/* Bars */}
                   {monthlyData.map((m, i) => {
                      const totalWidth = 100 / monthlyData.length;
                      const xCenter = (i + 0.5) * totalWidth;
                      const barWidth = Math.min(4, totalWidth * 0.3); // max 4% width
                      
                      const depH = maxMonthlyVal > 0 ? (m.deposits / maxMonthlyVal) * 150 : 0;
                      const witH = maxMonthlyVal > 0 ? (m.withdrawals / maxMonthlyVal) * 150 : 0;
                      
                      return (
                         <g key={i}>
                            {/* Deposit bar */}
                            <rect 
                               x={`${xCenter - barWidth}%`} 
                               y={170 - depH} 
                               width={`${barWidth}%`} 
                               height={depH} 
                               fill="#34d399" 
                               rx="2"
                            />
                            {/* Withdrawal bar */}
                            <rect 
                               x={`${xCenter}%`} 
                               y={170 - witH} 
                               width={`${barWidth}%`} 
                               height={witH} 
                               fill="#fb923c" 
                               rx="2"
                            />
                            {/* X-axis label */}
                            <text 
                               x={`${xCenter}%`} 
                               y="190" 
                               textAnchor="middle" 
                               fontSize="10" 
                               fill="#9ca3af"
                            >
                               {m.label}
                            </text>
                         </g>
                      );
                   })}
                </svg>
             </div>
             <div className="flex justify-center mt-2 space-x-6 text-xs text-neutral-400">
                <div className="flex items-center"><span className="w-3 h-3 bg-green-400 rounded-sm mr-2"></span>Deposits</div>
                <div className="flex items-center"><span className="w-3 h-3 bg-orange-400 rounded-sm mr-2"></span>Withdrawals</div>
             </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4 border-b border-neutral-700 pb-2">
          <h3 className="text-lg font-semibold">Cash Flow Ledger</h3>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="px-3 py-1 text-sm rounded bg-blue-600 hover:bg-blue-700 text-white"
          >
            Refresh Transactions
          </button>
        </div>

        <div className="bg-[#0D0D12] border border-neutral-700 rounded overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#2C2C35] text-neutral-400">
              <tr>
                <th className="px-4 py-2 w-1/4">Date</th>
                <th className="px-4 py-2 w-1/4">Type</th>
                <th className="px-4 py-2 w-1/4 text-right">Amount</th>
                <th className="px-4 py-2 w-1/4 text-right">Net Invested</th>
              </tr>
            </thead>
            <tbody>
              {currentTxs.length > 0 ? (
                currentTxs.map((tx: any, idx: number) => (
                  <tr key={idx} className="border-t border-neutral-800">
                    <td className="px-4 py-2">{new Date(tx.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs ${tx.type === 'deposit' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <span className={`font-mono ${tx.type === 'deposit' ? 'text-green-400' : 'text-red-400'}`}>
                        {tx.type === 'deposit' ? '+' : '-'}₹{Math.abs(tx.amount).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-white">
                      ₹{tx.balance.toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-4 text-center text-neutral-500">No transactions recorded.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-[#16161D] border border-neutral-700 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Refresh Transactions</h2>
            <p className="text-sm text-neutral-400 mb-6">Authenticate with Zerodha Console to fetch historical cash deposits and withdrawals. Credentials are used once and not stored.</p>
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">User ID</label>
                <input
                  type="text"
                  value={authCreds.user_id}
                  onChange={e => setAuthCreds({...authCreds, user_id: e.target.value})}
                  className="w-full bg-[#0D0D12] border border-neutral-700 rounded px-3 py-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Password</label>
                <input
                  type="password"
                  value={authCreds.password}
                  onChange={e => setAuthCreds({...authCreds, password: e.target.value})}
                  className="w-full bg-[#0D0D12] border border-neutral-700 rounded px-3 py-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">TOTP Code</label>
                <input
                  type="text"
                  value={authCreds.totp_code}
                  onChange={e => setAuthCreds({...authCreds, totp_code: e.target.value})}
                  className="w-full bg-[#0D0D12] border border-neutral-700 rounded px-3 py-2 text-white"
                  required
                />
              </div>
              {authStatus.error && <div className="text-red-400 text-sm mt-2">{authStatus.error}</div>}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(false)}
                  className="px-4 py-2 rounded text-neutral-400 hover:text-white"
                  disabled={authStatus.loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                  disabled={authStatus.loading}
                >
                  {authStatus.loading ? 'Authenticating...' : 'Submit & Refresh'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
