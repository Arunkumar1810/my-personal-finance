import { useState, useEffect } from 'react';
import { HoldingsTable } from './HoldingsTable';
import { ErrorOverlay } from './ErrorOverlay';

export function ActiveTradesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [holdings, setHoldings] = useState<any[]>([]);
  const [pendingBuyGtts, setPendingBuyGtts] = useState<any[]>([]);
  const [orphanedSellGtts, setOrphanedSellGtts] = useState<any[]>([]);

  useEffect(() => {
    // Fetch initial holdings
    fetch('http://localhost:8000/api/holdings')
      .then(res => res.json())
      .then(data => {
        if (data.holdings) {
          const mappedHoldings = data.holdings.map((h: any) => {
            const investedAmount = h.quantity * h.average_price;
            const currentAmount = h.quantity * h.last_price;
            const pnl = currentAmount - investedAmount;
            const dayChange = h.day_change_percentage || 0;
            return {
              symbol: h.tradingsymbol,
              currentPrice: h.last_price,
              investedAmount,
              currentAmount,
              pnl,
              dayChange,
              sellGtts: []
            };
          });
          setHoldings(mappedHoldings);
        }
        setIsLoading(false);
        setError(false);
      })
      .catch(e => {
        console.error("Failed to fetch initial holdings", e);
        setIsLoading(false);
        setError(true);
      });

    const ws = new WebSocket('ws://localhost:8000/ws/holdings');
    
    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "unified_update") {
          const payload = message.data;
          if (payload && payload.gtt_orders) {
            const parsedGtts = payload.gtt_orders.map((gtt: any) => {
              const condition = gtt.condition || {};
              const symbol = condition.tradingsymbol || 'Unknown';
              const triggers = condition.trigger_values || [];
              
              let stopLoss = 0, target = 0, triggerPrice = 0;
              if (gtt.type === 'two-leg' && triggers.length >= 2) {
                stopLoss = Math.min(triggers[0], triggers[1]);
                target = Math.max(triggers[0], triggers[1]);
              } else if (triggers.length > 0) {
                triggerPrice = triggers[0];
              }
              let quantity = 1;
              if (gtt.orders && gtt.orders.length > 0) {
                quantity = gtt.orders[0].quantity;
              } else if (gtt.discrepancy && gtt.discrepancy.trigger_quantity) {
                quantity = gtt.discrepancy.trigger_quantity;
              }
              
              return {
                id: gtt.id,
                symbol,
                quantity,
                triggerPrice,
                stoplossPrice: stopLoss,
                buyPrice: gtt.average_price || 0,
                targetPrice: target,
                type: gtt.type,
                isBuy: gtt.type === 'single' && triggerPrice < (gtt.last_price || 0) // Naive inference
              };
            });

            // Group identical GTT orders
            const groupedGttsMap = new Map<string, any>();
            parsedGtts.forEach((gtt: any) => {
              const sym = (gtt.symbol || '').toString().trim().toUpperCase();
              const key = `${sym}-${gtt.type}-${Number(gtt.triggerPrice).toFixed(2)}-${Number(gtt.stoplossPrice).toFixed(2)}-${Number(gtt.targetPrice).toFixed(2)}`;
              if (groupedGttsMap.has(key)) {
                const existing = groupedGttsMap.get(key);
                existing.quantity = Number(existing.quantity) + Number(gtt.quantity || 0);
              } else {
                groupedGttsMap.set(key, { ...gtt });
              }
            });
            const aggregatedGtts = Array.from(groupedGttsMap.values());

            // Group into pending buy, orphaned sell, and nested sell
            
            setHoldings(prevHoldings => {
              const buys: any[] = [];
              const orphaned: any[] = [];
              const newHoldings = [...prevHoldings].map(h => ({...h, sellGtts: []}));
              
              aggregatedGtts.forEach((gtt: any) => {
                const holding = newHoldings.find(h => h.symbol === gtt.symbol);
                if (holding) {
                  if (!holding.sellGtts.find((s: any) => s.id === gtt.id)) {
                     holding.sellGtts.push(gtt);
                  }
                } else {
                  if (gtt.isBuy) buys.push(gtt);
                  else orphaned.push(gtt);
                }
              });
              
              // Safely dispatch outer state updates asynchronously to avoid strict-mode double-invocation mutating external states improperly
              queueMicrotask(() => {
                setPendingBuyGtts(buys);
                setOrphanedSellGtts(orphaned);
              });
              
              return newHoldings;
            });
          }
        }
      } catch (e) {
        console.error("Failed to parse WebSocket message", e);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="p-8 space-y-8 flex flex-col h-full bg-[#0D0D12] overflow-auto">
        <h2 className="text-2xl font-bold mb-4 text-white">Active Trades</h2>
        
        {/* Skeleton for Holdings */}
        <section>
          <div className="h-6 w-48 bg-neutral-800 rounded animate-pulse mb-4"></div>
          <div className="w-full h-64 bg-[#16161D] border border-neutral-700 rounded animate-pulse"></div>
        </section>

        {/* Skeleton for Pending Buys */}
        <section>
          <div className="h-6 w-56 bg-neutral-800 rounded animate-pulse mb-4"></div>
          <div className="w-full h-32 bg-[#16161D] border border-neutral-700 rounded animate-pulse"></div>
        </section>
        
        {/* Skeleton for Orphaned Sells */}
        <section>
          <div className="h-6 w-64 bg-neutral-800 rounded animate-pulse mb-4"></div>
          <div className="w-full h-32 bg-[#16161D] border border-neutral-700 rounded animate-pulse"></div>
        </section>
      </div>
    );
  }

  return (
    <>
      {error && <ErrorOverlay />}
      <div className="p-8 space-y-8 flex flex-col h-full bg-[#0D0D12] overflow-auto text-white">
        <h2 className="text-2xl font-bold mb-2">Active Trades</h2>
      
      {/* Active Holdings */}
      <section>
        <h3 className="text-lg font-semibold mb-3 text-neutral-300 border-b border-neutral-800 pb-2">Active Holdings</h3>
        <HoldingsTable holdings={holdings} />
      </section>
      
      {/* Pending Buy GTT Orders */}
      <section>
        <h3 className="text-lg font-semibold mb-3 text-neutral-300 border-b border-neutral-800 pb-2">Pending Buy GTT Orders</h3>
        <div className="w-full border border-neutral-700 rounded bg-[#16161D] overflow-hidden">
          <table className="w-full text-sm text-left table-fixed">
            <thead className="text-xs text-neutral-400 uppercase bg-[#2C2C35] border-b border-neutral-700">
              <tr>
                <th className="px-4 py-2">Stock Name</th>
                <th className="px-4 py-2 text-right">Trigger Price</th>
                <th className="px-4 py-2 text-right">Quantity</th>
                <th className="px-4 py-2 text-right">Order Value</th>
              </tr>
            </thead>
            <tbody>
              {pendingBuyGtts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-center text-neutral-500 text-sm">
                    No pending buy orders.
                  </td>
                </tr>
              ) : (
                pendingBuyGtts.map((gtt: any) => (
                  <tr key={gtt.id} className="border-b border-neutral-700 hover:bg-[#2C2C35]">
                    <td className="px-4 py-2 font-bold">{gtt.symbol}</td>
                    <td className="px-4 py-2 text-right font-mono">{gtt.triggerPrice.toFixed(2)}</td>
                    <td className="px-4 py-2 text-right font-mono">{gtt.quantity}</td>
                    <td className="px-4 py-2 text-right font-mono">{(gtt.triggerPrice * gtt.quantity).toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
      
      {/* Orphaned Sell GTT Orders */}
      <section>
        <h3 className="text-lg font-semibold mb-3 text-neutral-300 border-b border-neutral-800 pb-2">Orphaned Sell GTT Orders</h3>
        <div className="w-full border border-neutral-700 rounded bg-[#16161D] overflow-hidden">
          <table className="w-full text-sm text-left table-fixed">
            <thead className="text-xs text-neutral-400 uppercase bg-[#2C2C35] border-b border-neutral-700">
              <tr>
                <th className="px-4 py-2">Stock Name</th>
                <th className="px-4 py-2 text-right">Target Price</th>
                <th className="px-4 py-2 text-right">Stoploss Price</th>
                <th className="px-4 py-2 text-right">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orphanedSellGtts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-center text-neutral-500 text-sm">
                    No orphaned sell orders.
                  </td>
                </tr>
              ) : (
                orphanedSellGtts.map((gtt: any) => (
                  <tr key={gtt.id} className="border-b border-neutral-700 hover:bg-[#2C2C35]">
                    <td className="px-4 py-2 font-bold">{gtt.symbol}</td>
                    <td className="px-4 py-2 text-right font-mono text-green-400">{gtt.targetPrice.toFixed(2)}</td>
                    <td className="px-4 py-2 text-right font-mono text-red-400">{gtt.stoplossPrice.toFixed(2)}</td>
                    <td className="px-4 py-2 text-right font-mono">{gtt.quantity}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
    </>
  );
}
