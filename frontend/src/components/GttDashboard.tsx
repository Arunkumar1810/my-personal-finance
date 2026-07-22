import React, { useEffect, useState } from 'react';
import { GttTable, type GttOrder } from './GttTable';

export const GttDashboard: React.FC = () => {
  const [orders, setOrders] = useState<GttOrder[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/holdings');
    
    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        
        if (message.type === "unified_update") {
          const payload = message.data;
          if (payload && payload.gtt_orders) {
            const mappedOrders: GttOrder[] = payload.gtt_orders.map((gtt: any) => {
              const condition = gtt.condition || {};
              const symbol = condition.tradingsymbol || 'Unknown';
              const triggers = condition.trigger_values || [];
              
              let stopLoss, target, triggerPrice;
              if (gtt.type === 'two-leg' && triggers.length >= 2) {
                stopLoss = Math.min(triggers[0], triggers[1]);
                target = Math.max(triggers[0], triggers[1]);
              } else if (triggers.length > 0) {
                triggerPrice = triggers[0];
              }
              
              return {
                id: gtt.id,
                symbol,
                quantity: gtt.discrepancy?.trigger_quantity || 0,
                holdings: gtt.discrepancy?.actual_holding || 0,
                triggerPrice,
                stopLoss,
                target,
                type: gtt.type,
                closestTrigger: gtt.closestTrigger,
                eta: gtt.eta ? Math.round(gtt.eta) : null,
                currentPrice: gtt.last_price,
                boughtPrice: gtt.average_price
              };
            });
            setOrders(mappedOrders);
          } else {
            setOrders(Array.isArray(payload) ? payload : []);
          }
        } else if (message.type === "live_ticks") {
           // Handle live ticks here (e.g., update prices or trigger recalculation)
           // console.log("Live ticks received:", message.data);
        }
      } catch (e) {
        console.error("Failed to parse WebSocket message", e);
      }
    };

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#fff', color: '#000' }}>
      <h1>GTT Dashboard</h1>
      <GttTable orders={orders} />
    </div>
  );
};
