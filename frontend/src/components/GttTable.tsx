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
}

interface GttTableProps {
  orders: GttOrder[];
}

export const GttTable: React.FC<GttTableProps> = ({ orders }) => {
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
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>ETA (Days)</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Quantity</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Holdings</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedOrders).map(symbol => (
            <React.Fragment key={symbol}>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <td colSpan={6} style={{ padding: '8px', fontWeight: 'bold' }}>{symbol}</td>
              </tr>
              {groupedOrders[symbol].map(order => (
                <tr key={order.id}>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}></td>
                  <td style={{ 
                    padding: '8px', 
                    borderBottom: '1px solid #eee',
                    backgroundColor: order.closestTrigger === 'STOP_LOSS' ? '#ffcccc' : 'transparent',
                    transition: 'background-color 0.3s'
                  }}>
                    {order.stopLoss !== undefined ? order.stopLoss : order.triggerPrice}
                  </td>
                  <td style={{ 
                    padding: '8px', 
                    borderBottom: '1px solid #eee',
                    backgroundColor: order.closestTrigger === 'TARGET' ? '#ccffcc' : 'transparent',
                    transition: 'background-color 0.3s'
                  }}>
                    {order.target !== undefined ? order.target : '-'}
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
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
