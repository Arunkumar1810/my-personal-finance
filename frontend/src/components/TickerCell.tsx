import React from 'react';

interface TickerCellProps {
  symbol: string;
  logo: string;
  summary: string;
}

export const TickerCell: React.FC<TickerCellProps> = ({ symbol, logo, summary }) => {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 overflow-hidden">
        <img src={logo} alt={`${symbol} logo`} className="w-full h-full object-contain p-1" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-white">{symbol}</span>
        <span className="text-xs text-gray-400 line-clamp-1">{summary}</span>
      </div>
    </div>
  );
};
