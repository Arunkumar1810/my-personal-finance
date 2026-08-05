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
