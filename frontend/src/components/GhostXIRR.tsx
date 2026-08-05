import React from 'react';

interface GhostXIRRProps {
  xirr: number;
}

export function GhostXIRR({ xirr }: GhostXIRRProps) {
  // Mocking predictive trend data
  // In a real scenario, this might project XIRR based on hypothetical future cash flows
  const dataPoints = [
    { month: 0, val: xirr },
    { month: 3, val: xirr * 1.05 },
    { month: 6, val: xirr * 1.08 },
    { month: 9, val: xirr * 1.15 },
    { month: 12, val: xirr * 1.25 }
  ];

  const minVal = Math.min(0, ...dataPoints.map(d => d.val));
  const maxVal = Math.max(0, ...dataPoints.map(d => d.val)) * 1.5;
  const range = maxVal - minVal || 1;

  // SVG dimensions
  const width = 300;
  const height = 120;
  
  const getX = (index: number) => (index / (dataPoints.length - 1)) * width;
  const getY = (val: number) => height - ((val - minVal) / range) * height;

  const pathD = dataPoints.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.val)}`
  ).join(' ');

  // Area under curve
  const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        <defs>
          <linearGradient id="ghostGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        
        {/* Baseline (0%) */}
        <line x1="0" y1={getY(0)} x2={width} y2={getY(0)} stroke="#3f3f46" strokeDasharray="4 4" />
        
        {/* Area */}
        <path d={areaD} fill="url(#ghostGradient)" />
        
        {/* Line */}
        <path d={pathD} fill="none" stroke="#a855f7" strokeWidth="3" />
        
        {/* Current Node */}
        <circle cx={getX(0)} cy={getY(dataPoints[0].val)} r="4" fill="#a855f7" />
        
        {/* Predictive Node */}
        <circle cx={getX(4)} cy={getY(dataPoints[4].val)} r="4" fill="#d8b4fe" stroke="#a855f7" strokeWidth="2" />
      </svg>
      <div className="absolute top-2 right-4 text-xs font-mono text-purple-400 opacity-80">
        +12m projection
      </div>
    </div>
  );
}
