import React, { useState } from 'react';
import { GttProgressBar } from './GttProgressBar';

interface SellGttOrder {
  id: string;
  stoplossPrice: number;
  buyPrice: number;
  targetPrice: number;
  quantity: number;
}

interface Holding {
  symbol: string;
  currentPrice: number;
  investedAmount: number;
  currentAmount: number;
  pnl: number;
  dayChange: number;
  sellGtts: SellGttOrder[];
}

export function HoldingsTable({ holdings = [] }: { holdings?: Holding[] }) {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (symbol: string) => {
    setExpandedRows(prev => ({ ...prev, [symbol]: !prev[symbol] }));
  };

  return (
    <div className="w-full border border-neutral-700 rounded bg-[#16161D] overflow-hidden">
      <table className="w-full text-sm text-left table-fixed">
        <thead className="text-xs text-neutral-400 uppercase bg-[#2C2C35] border-b border-neutral-700">
          <tr>
            <th className="w-8 px-2 py-2"></th> {/* Chevron column */}
            <th className="px-4 py-2">Stock Name</th>
            <th className="px-4 py-2 text-right">Current Price</th>
            <th className="px-4 py-2 text-right">Invested Amt</th>
            <th className="px-4 py-2 text-right">Current Amt</th>
            <th className="px-4 py-2 text-right">P&amp;L</th>
            <th className="px-4 py-2 text-right">P&amp;L %</th>
            <th className="px-4 py-2 text-right">Day Change</th>
          </tr>
        </thead>
        <tbody>
          {holdings.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-4 py-8 text-center text-neutral-500">
                No active holdings.
              </td>
            </tr>
          ) : (
            holdings.map((holding) => (
              <React.Fragment key={holding.symbol}>
                {/* Main Holding Row */}
                <tr 
                  className={`border-b border-neutral-700 hover:bg-[#2C2C35] cursor-pointer transition-colors ${expandedRows[holding.symbol] ? 'bg-[#212129]' : ''}`}
                  onClick={() => toggleRow(holding.symbol)}
                >
                  <td className="px-2 py-2 text-center text-neutral-500">
                    <span className={`inline-block transition-transform ${expandedRows[holding.symbol] ? 'rotate-90' : ''}`}>
                      ▶
                    </span>
                  </td>
                  <td className="px-4 py-2 font-bold text-white">{holding.symbol}</td>
                  <td className="px-4 py-2 text-right text-neutral-300 font-mono">{holding.currentPrice.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right text-neutral-300 font-mono">{holding.investedAmount.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right text-neutral-300 font-mono">{holding.currentAmount.toFixed(2)}</td>
                  <td className={`px-4 py-2 text-right font-mono ${holding.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {holding.pnl >= 0 ? '+' : ''}{holding.pnl.toFixed(2)}
                  </td>
                  <td className={`px-4 py-2 text-right font-mono ${holding.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {holding.investedAmount > 0 ? `${holding.pnl >= 0 ? '+' : ''}${((holding.pnl / holding.investedAmount) * 100).toFixed(2)}%` : '0.00%'}
                  </td>
                  <td className={`px-4 py-2 text-right font-mono ${holding.dayChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {holding.dayChange >= 0 ? '+' : ''}{holding.dayChange.toFixed(2)}%
                  </td>
                </tr>
                
                {/* Nested Sell GTTs Sub-Table */}
                {expandedRows[holding.symbol] && (
                  <tr className="bg-[#1A1A21] border-b border-neutral-700">
                    <td colSpan={8} className="p-0">
                      <div className="pl-12 pr-4 py-4 space-y-3">
                        <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Active Sell GTTs</div>
                        {holding.sellGtts.length === 0 ? (
                          <div className="text-sm text-neutral-500">No active sell orders for {holding.symbol}.</div>
                        ) : (
                          holding.sellGtts.map(gtt => (
                            <div key={gtt.id} className="flex flex-col space-y-1">
                              <div className="flex justify-between text-xs text-neutral-400">
                                <span>Qty: {gtt.quantity}</span>
                                <span>Risk Progress</span>
                              </div>
                              <GttProgressBar 
                                stoplossPrice={gtt.stoplossPrice}
                                buyPrice={gtt.buyPrice}
                                targetPrice={gtt.targetPrice}
                                currentPrice={holding.currentPrice}
                              />
                            </div>
                          ))
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
