

interface GttProgressBarProps {
  stoplossPrice: number;
  buyPrice: number;
  targetPrice: number;
  currentPrice: number;
}

export function GttProgressBar({ stoplossPrice, buyPrice, targetPrice, currentPrice }: GttProgressBarProps) {
  // Calculate total range
  const minPrice = stoplossPrice;
  const maxPrice = targetPrice;
  const range = maxPrice - minPrice;
  
  // Guard against divide by zero or invalid data
  if (range <= 0) return null;

  // Calculate positions as percentages
  const getPercent = (price: number) => {
    const clamped = Math.max(minPrice, Math.min(maxPrice, price));
    return ((clamped - minPrice) / range) * 100;
  };

  const buyPercent = getPercent(buyPrice);
  const currentPercent = getPercent(currentPrice);
  
  const isProfit = currentPrice >= buyPrice;
  const fillStart = isProfit ? buyPercent : currentPercent;
  const fillEnd = isProfit ? currentPercent : buyPercent;
  const fillWidth = fillEnd - fillStart;
  
  // Fill color and accessibility pattern
  const fillColorClass = isProfit ? 'bg-green-500' : 'bg-red-500';
  const patternStyle = !isProfit ? {
    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.2) 4px, rgba(0,0,0,0.2) 8px)`
  } : {};

  return (
    <div className="w-full relative cursor-default py-1">
      {/* CMP Label (Above) */}
      <div className="relative h-4 mb-1 text-[10px] font-mono">
        <span 
          className={`absolute -translate-x-1/2 font-bold ${isProfit ? 'text-green-400' : 'text-red-400'}`} 
          style={{ left: `${currentPercent}%` }}
        >
          {currentPrice.toFixed(2)}
        </span>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full h-3 bg-neutral-800 rounded overflow-hidden relative border border-neutral-700">
        
        {/* Dynamic Fill */}
        <div 
          className={`absolute top-0 bottom-0 ${fillColorClass}`}
          style={{ 
            left: `${fillStart}%`, 
            width: `${fillWidth}%`,
            ...patternStyle 
          }}
        />

        {/* Markers */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-neutral-500 z-0" style={{ left: '0%' }} /> {/* Stoploss Marker */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-neutral-400 z-0" style={{ left: `${buyPercent}%` }} /> {/* Buy Marker */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-neutral-500 z-0" style={{ left: '99%' }} /> {/* Target Marker */}
        
        {/* Current Price Indicator Line (Thicker/different color) */}
        <div className={`absolute top-0 bottom-0 w-[3px] z-0 ${isProfit ? 'bg-green-400' : 'bg-red-400'}`} style={{ left: `calc(${currentPercent}% - 1px)` }} />
      </div>

      {/* SL, Buy, Target Labels (Below) */}
      <div className="relative h-4 mt-1 text-[10px] font-mono text-neutral-400">
        <span className="absolute left-0">{stoplossPrice.toFixed(2)}</span>
        <span className="absolute -translate-x-1/2 text-neutral-300" style={{ left: `${buyPercent}%` }}>{buyPrice.toFixed(2)}</span>
        <span className="absolute right-0">{targetPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}
