import React, { useEffect, useState } from 'react';

interface GhostXIRRProps { xirr: number; }

export function GhostXIRR({ xirr }: GhostXIRRProps) {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDrawn(true), 80); return () => clearTimeout(t); }, [xirr]);

  const pct = xirr * 100;
  const BENCHMARK = 12;
  const MONTHS = 13; // index 0..12

  // Projection: mean-reversion toward benchmark
  const pts = Array.from({ length: MONTHS }, (_, m) => {
    const t = m / 12;
    return m === 0 ? pct : pct + (BENCHMARK - pct) * (1 - Math.exp(-2.2 * t));
  });

  // Layout
  const W = 400, H = 220;
  const PL = 48, PR = 20, PT = 28, PB = 36;
  const CW = W - PL - PR, CH = H - PT - PB;

  const allVals = [...pts, BENCHMARK, 0];
  const rawMin = Math.min(...allVals);
  const rawMax = Math.max(...allVals);
  const pad = (rawMax - rawMin) * 0.18 || 4;
  const minV = rawMin - pad, maxV = rawMax + pad;
  const range = maxV - minV;

  const gx = (m: number) => PL + (m / 12) * CW;
  const gy = (v: number) => PT + CH - ((v - minV) / range) * CH;

  // Smooth bezier
  const coords = pts.map((v, i) => ({ x: gx(i), y: gy(v) }));
  const pathD = coords.reduce((d, p, i) => {
    if (i === 0) return `M${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    const prev = coords[i - 1];
    const cpx = ((prev.x + p.x) / 2).toFixed(1);
    return `${d} C${cpx},${prev.y.toFixed(1)} ${cpx},${p.y.toFixed(1)} ${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }, '');

  const lastPt = coords[coords.length - 1];
  const firstPt = coords[0];
  const zeroY = gy(0);
  const benchY = gy(BENCHMARK);

  const areaBot = Math.min(zeroY, PT + CH);
  const areaD = `${pathD} L${lastPt.x},${areaBot} L${firstPt.x},${areaBot}Z`;

  const isPos = pct >= 0;
  const lineCol = isPos ? '#818cf8' : '#fb7185';

  // Y ticks
  const span = maxV - minV;
  const step = span > 30 ? 10 : span > 15 ? 5 : span > 6 ? 2 : 1;
  const firstTick = Math.ceil(minV / step) * step;
  const yTicks: number[] = [];
  for (let v = firstTick; v <= maxV + 0.001; v += step) yTicks.push(Math.round(v * 10) / 10);

  // Path animation length approximation
  const PATHLEN = 900;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ background: 'linear-gradient(160deg,#12121c 0%,#1a1a28 100%)' }}>
      <defs>
        <linearGradient id="projAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={lineCol} stopOpacity="0.28"/>
          <stop offset="100%" stopColor={lineCol} stopOpacity="0.0"/>
        </linearGradient>
        <filter id="projGlow">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <clipPath id="projClip">
          <rect x={PL} y={PT} width={CW} height={CH}/>
        </clipPath>
      </defs>

      {/* Y-axis grid lines + labels */}
      {yTicks.map(v => {
        const y = gy(v);
        if (y < PT - 2 || y > PT + CH + 2) return null;
        return (
          <g key={v}>
            <line x1={PL} y1={y} x2={PL + CW} y2={y}
              stroke={v === 0 ? '#374151' : '#1f2030'} strokeWidth={v === 0 ? 1.2 : 1}
              strokeDasharray={v === 0 ? '4 3' : undefined}/>
            <text x={PL - 6} y={y} textAnchor="end" dominantBaseline="middle"
              fontSize="11" fill="#4b5563">
              {v > 0 ? '+' : ''}{v}%
            </text>
          </g>
        );
      })}

      {/* Benchmark line */}
      {benchY >= PT && benchY <= PT + CH && (
        <g>
          <line x1={PL} y1={benchY} x2={PL + CW} y2={benchY}
            stroke="#fbbf24" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.5"/>
          <text x={PL + CW + 4} y={benchY} dominantBaseline="middle"
            fontSize="10" fill="#fbbf24" opacity="0.6">12%</text>
        </g>
      )}

      {/* Area */}
      <g clipPath="url(#projClip)">
        <path d={areaD} fill="url(#projAreaGrad)"/>
      </g>

      {/* Dashed projection line */}
      <g clipPath="url(#projClip)">
        <path d={pathD} fill="none" stroke={lineCol} strokeWidth="2"
          strokeDasharray="7 4" strokeLinecap="round" opacity="0.4"/>
      </g>

      {/* Animated solid line */}
      <g clipPath="url(#projClip)">
        <path d={pathD} fill="none" stroke={lineCol} strokeWidth="3"
          strokeLinecap="round" filter="url(#projGlow)"
          strokeDasharray={`${PATHLEN} ${PATHLEN}`}
          strokeDashoffset={drawn ? 0 : PATHLEN}
          style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1)' }}/>
      </g>

      {/* Start dot */}
      <circle cx={firstPt.x} cy={firstPt.y} r="6" fill={lineCol} filter="url(#projGlow)"/>
      <circle cx={firstPt.x} cy={firstPt.y} r="12" fill={lineCol} opacity="0.1"/>

      {/* Current value callout */}
      <rect x={firstPt.x + 10} y={firstPt.y - 15} width={52} height={22} rx="6"
        fill="#12121c" stroke={lineCol} strokeWidth="1.2"/>
      <text x={firstPt.x + 36} y={firstPt.y - 1} textAnchor="middle"
        fontSize="12" fontFamily="monospace" fontWeight="bold" fill={lineCol}>
        {pct.toFixed(1)}%
      </text>

      {/* End dot */}
      <circle cx={lastPt.x} cy={lastPt.y} r="5"
        fill="#12121c" stroke={lineCol} strokeWidth="2" opacity="0.7"/>

      {/* Projected value */}
      <rect x={lastPt.x - 58} y={lastPt.y - 15} width={52} height={22} rx="6"
        fill="#12121c" stroke={lineCol} strokeWidth="1" opacity="0.6"/>
      <text x={lastPt.x - 32} y={lastPt.y - 1} textAnchor="middle"
        fontSize="12" fontFamily="monospace" fill={lineCol} opacity="0.6">
        {pts[12].toFixed(1)}%
      </text>

      {/* X-axis labels */}
      {[0, 3, 6, 9, 12].map(m => (
        <text key={m} x={gx(m)} y={PT + CH + 18} textAnchor="middle"
          fontSize="11" fill={m === 0 ? '#9ca3af' : '#4b5563'}>
          {m === 0 ? 'Now' : `+${m}m`}
        </text>
      ))}

      {/* Header labels */}
      <text x={PL} y={PT - 10} fontSize="11" fill="#6b7280" fontWeight="600" letterSpacing="1">
        12-MONTH PROJECTION
      </text>
      <text x={PL + CW} y={PT - 10} textAnchor="end" fontSize="10" fill="#fbbf24" opacity="0.5">
        ── 12% target
      </text>
    </svg>
  );
}
