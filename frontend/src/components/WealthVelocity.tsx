import React from 'react';

interface WealthVelocityProps {
  xirr: number;
}

export function WealthVelocity({ xirr }: WealthVelocityProps) {
  // Convert xirr to a percentage
  const percentage = xirr * 100;
  
  // Normalize percentage for the gauge (e.g. -20% to +40%)
  const minP = -20;
  const maxP = 40;
  const normalized = Math.max(0, Math.min(100, ((percentage - minP) / (maxP - minP)) * 100));
  
  // Convert to degrees (0 to 180) for a semi-circle gauge
  const degrees = (normalized / 100) * 180;
  
  // Color based on xirr
  let color = '#4ade80'; // green
  if (percentage < 0) color = '#f87171'; // red
  else if (percentage < 8) color = '#fbbf24'; // yellow
  
  return (
    <div className="relative w-48 h-24 flex flex-col items-center justify-end overflow-hidden">
      {/* Background Arc */}
      <div 
        className="absolute bottom-0 w-48 h-48 rounded-full border-[16px] border-neutral-700"
        style={{ borderBottomColor: 'transparent', borderRightColor: 'transparent', transform: 'rotate(-45deg)' }}
      ></div>
      
      {/* Foreground Arc */}
      <div 
        className="absolute bottom-0 w-48 h-48 rounded-full border-[16px]"
        style={{ 
          borderColor: color, 
          borderBottomColor: 'transparent', 
          borderRightColor: 'transparent', 
          transform: `rotate(${degrees - 45 - 180}deg)`,
          transition: 'transform 1s ease-out'
        }}
      ></div>
      
      {/* Center Label */}
      <div className="absolute bottom-2 text-center">
        <div className="text-2xl font-bold font-mono" style={{ color }}>{percentage.toFixed(1)}%</div>
        <div className="text-xs text-neutral-400">Velocity</div>
      </div>
    </div>
  );
}
