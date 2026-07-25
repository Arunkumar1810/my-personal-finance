import React from 'react';

export interface GttOrder {
  id: string;
  symbol: string;
  quantity: number;
  holdings: number;
  triggerPrice?: number;
  stopLoss?: number;
  target?: number;
  type?: string;
  closestTrigger?: "STOP_LOSS" | "TARGET" | null;
  eta?: number | null;
  currentPrice?: number;
  boughtPrice?: number;
  isSabotaged?: boolean;
}

interface GttTableProps {
  orders: GttOrder[];
}

export const GttTable: React.FC<GttTableProps> = ({ orders }) => {
  const [overriddenOrders, setOverriddenOrders] = React.useState<Set<string>>(new Set());

  const handleOverride = (id: string) => {
    setOverriddenOrders(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const renderProgressBar = (order: GttOrder) => {
    if (order.boughtPrice === undefined || order.currentPrice === undefined) return '-';
    const stopLoss = order.stopLoss !== undefined ? order.stopLoss : order.triggerPrice;

    if (order.currentPrice >= order.boughtPrice) {
      if (order.target === undefined) return '-';
      const range = order.target - order.boughtPrice;
      if (range <= 0) return '-';
      const progress = order.currentPrice - order.boughtPrice;
      const percent = Math.min(100, Math.max(0, (progress / range) * 100));
      return (
        <div className="w-20 h-2 bg-gray-200 rounded overflow-hidden">
          <div className="h-full bg-green-500" style={{ width: `${percent}%` }}></div>
        </div>
      );
    } else {
      if (stopLoss === undefined) return '-';
      const range = order.boughtPrice - stopLoss;
      if (range <= 0) return '-';
      const progress = order.boughtPrice - order.currentPrice;
      const percent = Math.min(100, Math.max(0, (progress / range) * 100));
      return (
        <div className="w-20 h-2 bg-gray-200 rounded overflow-hidden">
          <div className="h-full bg-red-500" style={{ width: `${percent}%` }}></div>
        </div>
      );
    }
  };

  // Group by symbol
  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.symbol]) {
      acc[order.symbol] = [];
    }
    acc[order.symbol].push(order);
    return acc;
  }, {} as Record<string, GttOrder[]>);

  return (
    <div className="gtt-table-container" style={{ color: '#000' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Symbol</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Stop-Loss</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Target</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Current Price</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Bought Price</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>ETA (Days)</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Quantity</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Holdings</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Progress</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedOrders).map(symbol => (
            <React.Fragment key={symbol}>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <td colSpan={10} style={{ padding: '8px', fontWeight: 'bold' }}>{symbol}</td>
              </tr>
              {groupedOrders[symbol].map(order => {
                const isSabotaged = order.isSabotaged && !overriddenOrders.has(order.id);
                const rowClassName = isSabotaged ? "animate-pulse bg-[#FF1744] text-white" : "";
                
                return (
                <tr key={order.id} className={rowClassName}>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}></td>
                  <td style={{ 
                    padding: '8px', 
                    borderBottom: '1px solid #eee',
                    backgroundColor: (!isSabotaged && order.closestTrigger === 'STOP_LOSS') ? '#ffcccc' : 'transparent',
                    transition: 'background-color 0.3s'
                  }}>
                    {isSabotaged ? (
                      <span title="Enforced 0.5% stop-loss">🔒 {order.stopLoss !== undefined ? order.stopLoss : order.triggerPrice}</span>
                    ) : (
                      order.stopLoss !== undefined ? order.stopLoss : order.triggerPrice
                    )}
                  </td>
                  <td style={{ 
                    padding: '8px', 
                    borderBottom: '1px solid #eee',
                    backgroundColor: (!isSabotaged && order.closestTrigger === 'TARGET') ? '#ccffcc' : 'transparent',
                    transition: 'background-color 0.3s'
                  }}>
                    {order.target !== undefined ? order.target : '-'}
                  </td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                    {order.currentPrice !== undefined ? order.currentPrice : '-'}
                  </td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                    {order.boughtPrice !== undefined ? order.boughtPrice : '-'}
                  </td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                    {order.eta !== undefined && order.eta !== null ? order.eta : '-'}
                  </td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                    {order.quantity}
                    {order.quantity > order.holdings && (
                      <span title="Warning: Quantity exceeds holdings" style={{ color: 'orange', marginLeft: '8px' }}>
                        ⚠️
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{order.holdings}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                    {renderProgressBar(order)}
                  </td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                    {isSabotaged && (
                      <button 
                        onClick={() => handleOverride(order.id)}
                        className="px-2 py-1 text-xs font-semibold rounded bg-white text-black hover:bg-gray-200"
                      >
                        Override
                      </button>
                    )}
                  </td>
                </tr>
              )})}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
