import React from 'react';
import { TickerCell } from './TickerCell';

export interface Position {
  id: string;
  symbol: string;
  logo: string;
  summary: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  profitLoss: number;
  profitLossPercentage: number;
}

interface PositionsTableProps {
  positions: Position[];
}

export const PositionsTable: React.FC<PositionsTableProps> = ({ positions }) => {
  return (
    <table className="hidden md:table w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-[#2C2C35] text-gray-400 text-sm">
          <th className="py-3 px-4 font-normal">Ticker</th>
          <th className="py-3 px-4 font-normal text-right">Quantity</th>
          <th className="py-3 px-4 font-normal text-right">Avg. Price</th>
          <th className="py-3 px-4 font-normal text-right">LTP</th>
          <th className="py-3 px-4 font-normal text-right">P&L</th>
        </tr>
      </thead>
      <tbody className="text-white">
        {positions.map((position) => (
          <tr key={position.id} className="border-b border-[#2C2C35] hover:bg-[#2C2C35]/50 transition-colors">
            <td className="py-2 px-4">
              <TickerCell symbol={position.symbol} logo={position.logo} summary={position.summary} />
            </td>
            <td className="py-2 px-4 text-right">{position.quantity}</td>
            <td className="py-2 px-4 text-right">${position.averagePrice.toFixed(2)}</td>
            <td className="py-2 px-4 text-right">${position.currentPrice.toFixed(2)}</td>
            <td className={`py-2 px-4 text-right ${position.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {position.profitLoss >= 0 ? '+' : ''}{position.profitLoss.toFixed(2)} 
              <br />
              <span className="text-xs">
                ({position.profitLossPercentage >= 0 ? '+' : ''}{position.profitLossPercentage.toFixed(2)}%)
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
