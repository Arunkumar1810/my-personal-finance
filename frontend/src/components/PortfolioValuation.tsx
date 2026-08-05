import React, { useEffect, useState } from 'react';
import { WealthVelocity } from './WealthVelocity';
import { GhostXIRR } from './GhostXIRR';
import { calculateXIRR } from '../utils/xirr';

const INFLATION_RATE = 0.06; // 6% assumed inflation


export function PortfolioValuation() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCalculatorMode, setIsCalculatorMode] = useState(false);
  const [isReal, setIsReal] = useState(false);
  const [simTransactions, setSimTransactions] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/portfolio-valuation')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setSimTransactions(data.transactions ? [...data.transactions] : []);
        setIsLoading(false);
      })
      .catch(e => {
        console.error("Failed to fetch portfolio valuation", e);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="bg-[#16161D] border border-neutral-700 rounded p-6 animate-pulse">
        <div className="h-6 w-48 bg-neutral-800 rounded mb-4"></div>
        <div className="h-12 w-32 bg-neutral-800 rounded"></div>
      </div>
    );
  }

  if (!data) return null;

  // Calculate dynamic XIRR
  let displayXirr = data.xirr;
  if (isCalculatorMode) {
    const xirrFlows = [...simTransactions];
    const totalVal = data.current_value + data.available_funds;
    if (totalVal > 0) {
      xirrFlows.push({ date: new Date().toISOString(), amount: totalVal, type: 'withdrawal' });
    }
    const mapped = xirrFlows.map(tx => {
      let amt = tx.amount;
      if (tx.type === 'deposit' && amt > 0) amt = -amt;
      return { date: new Date(tx.date), amount: amt };
    });
    const calc = calculateXIRR(mapped);
    if (calc !== null) displayXirr = calc;
  }

  if (isReal && displayXirr) {
    displayXirr = ((1 + displayXirr) / (1 + INFLATION_RATE)) - 1;
  }

  const handleTxChange = (idx: number, field: string, value: any) => {
    const updated = [...simTransactions];
    if (field === 'amount') {
      updated[idx].amount = parseFloat(value) || 0;
    } else if (field === 'date') {
      updated[idx].date = value;
    }
    setSimTransactions(updated);
  };

  const handleAddTx = () => {
    setSimTransactions([...simTransactions, { date: new Date().toISOString().split('T')[0], amount: 10000, type: 'deposit' }]);
  };

  const currentTxs = isCalculatorMode ? simTransactions : (data.transactions || []);

  return (
    <div className="bg-[#16161D] border border-neutral-700 rounded p-6 mb-8 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-xl font-bold text-neutral-300">Portfolio Valuation</h2>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <label className="flex items-center space-x-2 text-sm cursor-pointer">
            <span className={!isReal ? "text-white" : "text-neutral-500"}>Nominal</span>
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={isReal} onChange={() => setIsReal(!isReal)} />
              <div className={`block w-10 h-6 rounded-full ${isReal ? 'bg-purple-600' : 'bg-neutral-600'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${isReal ? 'translate-x-4' : ''}`}></div>
            </div>
            <span className={isReal ? "text-purple-400" : "text-neutral-500"}>Real</span>
          </label>
        </div>
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
          <div className="text-neutral-400 text-sm">XIRR (Annualized) {isReal && <span className="text-purple-400 text-xs ml-1">(Adjusted for {INFLATION_RATE * 100}% inflation)</span>}</div>
          <div className={`text-3xl font-mono ${displayXirr >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {displayXirr !== null ? (displayXirr * 100).toFixed(2) + '%' : 'N/A'}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-neutral-700 pb-2">Wealth Velocity</h3>
          <div className="h-48 flex items-center justify-center bg-[#2C2C35] rounded">
            <WealthVelocity xirr={displayXirr || 0} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-neutral-700 pb-2">Ghost XIRR Trend</h3>
          <div className="h-48 flex items-center justify-center bg-[#2C2C35] rounded">
            <GhostXIRR xirr={displayXirr || 0} />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4 border-b border-neutral-700 pb-2">
          <h3 className="text-lg font-semibold">Cash Flow Ledger</h3>
          <button 
            onClick={() => setIsCalculatorMode(!isCalculatorMode)}
            className={`px-3 py-1 text-sm rounded ${isCalculatorMode ? 'bg-purple-600 text-white' : 'bg-[#2C2C35] text-neutral-400 hover:bg-neutral-700'}`}
          >
            {isCalculatorMode ? 'Exit Calculator' : 'Calculator Mode'}
          </button>
        </div>
        
        {isCalculatorMode && (
          <div className="mb-4 text-sm text-purple-400 bg-purple-900/20 p-3 rounded border border-purple-800/50 flex justify-between items-center">
            <span>You are in Calculator Mode. Changes made here will recompute your XIRR locally but will not be saved.</span>
            <button onClick={handleAddTx} className="px-2 py-1 bg-purple-700 hover:bg-purple-600 text-white rounded text-xs">+ Add Simulated Flow</button>
          </div>
        )}

        <div className="bg-[#0D0D12] border border-neutral-700 rounded overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#2C2C35] text-neutral-400">
              <tr>
                <th className="px-4 py-2 w-1/3">Date</th>
                <th className="px-4 py-2 w-1/4">Type</th>
                <th className="px-4 py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentTxs && currentTxs.length > 0 ? (
                currentTxs.map((tx: any, idx: number) => (
                  <tr key={idx} className="border-t border-neutral-800">
                    <td className="px-4 py-2">
                      {isCalculatorMode ? (
                        <input 
                          type="date" 
                          value={tx.date.split('T')[0]} 
                          onChange={(e) => handleTxChange(idx, 'date', e.target.value)}
                          className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 w-full text-white"
                        />
                      ) : new Date(tx.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs ${tx.type === 'deposit' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right">
                      {isCalculatorMode ? (
                         <input 
                           type="number" 
                           value={tx.amount} 
                           onChange={(e) => handleTxChange(idx, 'amount', e.target.value)}
                           className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 w-32 text-right text-white font-mono"
                         />
                      ) : (
                        <span className={`font-mono ${tx.type === 'deposit' ? 'text-green-400' : 'text-red-400'}`}>
                          {tx.type === 'deposit' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-4 py-4 text-center text-neutral-500">No transactions recorded.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
