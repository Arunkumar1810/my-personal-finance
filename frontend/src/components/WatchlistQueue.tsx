import React, { useState } from 'react';
import { TickerInputForm } from './TickerInputForm';
import { useFallback } from './FallbackContext';

export function WatchlistQueue() {
  const [watchlist, setWatchlist] = useState<string[]>(['AAPL', 'MSFT', 'GOOG']);
  const [pendingTickers, setPendingTickers] = useState<string[]>([]);
  const { isFallback } = useFallback();

  const handleAddTicker = (ticker: string) => {
    setPendingTickers([...pendingTickers, ticker]);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Watchlist Queue</h2>
      
      <TickerInputForm onSubmit={handleAddTicker} />

      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-gray-900 text-gray-400">
            <tr>
              <th className="px-6 py-3 font-medium">Ticker</th>
              <th className="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {watchlist.map((ticker) => (
              <tr key={ticker} className="hover:bg-gray-750 transition-colors">
                <td className="px-6 py-4 font-medium text-white">{ticker}</td>
                <td className="px-6 py-4 text-green-400">Active</td>
              </tr>
            ))}
            {pendingTickers.map((ticker, index) => {
              const isSuspended = isFallback;
              return (
                <tr 
                  key={`pending-${index}`} 
                  className={`hover:bg-gray-750 transition-colors ${
                    isSuspended ? 'opacity-50 line-through grayscale' : 'animate-pulse'
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-white">{ticker}</td>
                  <td className={`px-6 py-4 ${isSuspended ? 'text-gray-400' : 'text-yellow-500'}`}>
                    {isSuspended ? 'Suspended (Offline)' : 'Awaiting 15-min Sync'}
                  </td>
                </tr>
              );
            })}
            {watchlist.length === 0 && pendingTickers.length === 0 && (
              <tr>
                <td colSpan={2} className="px-6 py-8 text-center text-gray-500">
                  No tickers in watchlist
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
