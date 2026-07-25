import React from 'react';
import { Position } from './PositionsTable';
import { TickerCell } from './TickerCell';

interface PositionCardProps {
  position: Position;
}

export const PositionCard: React.FC<PositionCardProps> = ({ position }) => {
  return (
    <div className="bg-[#16161D] border border-[#2C2C35] rounded-lg p-4 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <TickerCell symbol={position.symbol} logo={position.logo} summary={position.summary} />
        <div className="text-right flex flex-col">
          <span className={`font-bold ${position.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {position.profitLoss >= 0 ? '+' : ''}{position.profitLoss.toFixed(2)}
          </span>
          <span className={`text-xs ${position.profitLossPercentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {position.profitLossPercentage >= 0 ? '+' : ''}{position.profitLossPercentage.toFixed(2)}%
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#2C2C35] text-sm">
        <div className="flex flex-col">
          <span className="text-gray-400 text-xs">Qty</span>
          <span className="text-white">{position.quantity}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 text-xs">Avg Price</span>
          <span className="text-white">${position.averagePrice.toFixed(2)}</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-gray-400 text-xs">LTP</span>
          <span className="text-white">${position.currentPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
