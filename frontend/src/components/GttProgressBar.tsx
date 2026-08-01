import React, { useState } from 'react';

interface GttProgressBarProps {
  stoplossPrice: number;
  buyPrice: number;
  targetPrice: number;
  currentPrice: number;
}

export function GttProgressBar({ stoplossPrice, buyPrice, targetPrice, currentPrice }: GttProgressBarProps) {
  const [isHovered, setIsHovered] = useState(false);

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
    <div 
      className="w-full relative group cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Expanded detailed view on hover */}
      {isHovered && (
        <div className="absolute -top-10 left-0 right-0 flex justify-between text-xs font-mono bg-[#2C2C35] px-2 py-1 rounded shadow-lg z-10 border border-[#3C3C45]">
          <div className="flex flex-col">
            <span className="text-neutral-500">SL</span>
            <span className="text-white">{stoplossPrice.toFixed(2)}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-neutral-500">Buy</span>
            <span className="text-white">{buyPrice.toFixed(2)}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className={isProfit ? 'text-green-400' : 'text-red-400'}>CMP</span>
            <span className="text-white font-bold flex items-center">
              {currentPrice.toFixed(2)} 
              {isProfit ? <span className="ml-1 text-green-400">↑</span> : <span className="ml-1 text-red-400">↓</span>}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-neutral-500">Target</span>
            <span className="text-white">{targetPrice.toFixed(2)}</span>
          </div>
        </div>
      )}

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
    </div>
  );
}
