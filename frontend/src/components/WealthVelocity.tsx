import React from 'react';

interface WealthVelocityProps { xirr: number; }

export function WealthVelocity({ xirr }: WealthVelocityProps) {
  const pct = xirr * 100;

  // Semicircle gauge: 180° sweep, left=−30%, right=+60%
  const MIN = -30, MAX = 60;
  const norm = Math.max(0, Math.min(1, (Math.max(MIN, Math.min(MAX, pct)) - MIN) / (MAX - MIN)));

  // SVG: 400 wide × 220 tall. Gauge centred at (200, 185) r=140
  const W = 400, H = 220, cx = 200, cy = 185, R = 140;
  const GAP = 3; // gap in px between zone arcs

  // polar helper (0°=right, counter-clockwise for upper half)
  // Semicircle: left end = 180°, right end = 0°
  const pt = (deg: number, r: number) => ({
    x: cx + r * Math.cos((deg * Math.PI) / 180),
    y: cy - r * Math.sin((deg * Math.PI) / 180),
  });

  // Build thick arc path from deg1→deg2 (CCW, upper half)
  const arc = (d1: number, d2: number, r1: number, r2: number, large: boolean) => {
    const a = pt(d1, r1), b = pt(d2, r1), c = pt(d2, r2), d = pt(d1, r2);
    const la = large ? 1 : 0;
    return `M${a.x},${a.y} A${r1},${r1} 0 ${la} 0 ${b.x},${b.y} L${c.x},${c.y} A${r2},${r2} 0 ${la} 1 ${d.x},${d.y}Z`;
  };

  // Zones (frac of 0..1 on the 180° sweep)
  const zones = [
    { from: 0, to: 0.33, color: '#f87171', label: 'Weak'  },
    { from: 0.33, to: 0.55, color: '#fb923c', label: 'Fair'  },
    { from: 0.55, to: 0.75, color: '#facc15', label: 'OK'    },
    { from: 0.75, to: 1.0,  color: '#34d399', label: 'Strong'},
  ];
  // deg: norm=0 → 180°, norm=1 → 0°
  const toDeg = (n: number) => 180 - n * 180;

  const THICKNESS = 22;
  const RI = R - THICKNESS, RO = R;
  const PX_GAP = 2.5; // angular gap approximation per zone edge

  // Needle
  const needleDeg = toDeg(norm);
  const tip  = pt(needleDeg, R - 6);
  const bl   = pt(needleDeg + 90, 10);
  const br   = pt(needleDeg - 90, 10);

  const activeZone = zones.find(z => norm >= z.from && norm <= z.to) || zones[zones.length - 1];
  const color = activeZone.color;

  // Tick labels
  const tickValues = [-30, -15, 0, 15, 30, 45, 60];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ background: 'linear-gradient(160deg,#12121c 0%,#1a1a28 100%)' }}>
      <defs>
        <filter id="wvGlow">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id="hubG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3a3a55"/>
          <stop offset="100%" stopColor="#0d0d1a"/>
        </radialGradient>
      </defs>

      {/* Track */}
      <path d={arc(180, 0, RO, RI, true)} fill="#1e1e30"/>

      {/* Zone arcs */}
      {zones.map((z, i) => {
        const d1 = toDeg(z.from) - (i > 0 ? PX_GAP : 0);
        const d2 = toDeg(z.to)   + (i < zones.length - 1 ? PX_GAP : 0);
        const active = norm >= z.from;
        return (
          <path key={i} d={arc(d1, d2, RO - 1, RI + 1, Math.abs(d1 - d2) > 90)}
            fill={z.color} opacity={active ? 0.9 : 0.15}
            style={{ transition: 'opacity 0.8s ease' }}/>
        );
      })}

      {/* Active zone glow edge */}
      <path
        d={arc(180, toDeg(norm), RO, RI, norm > 0.5)}
        fill="none" stroke={color} strokeWidth="2"
        opacity={0.5} filter="url(#wvGlow)"
        style={{ transition: 'all 1s ease-out' }}/>

      {/* Tick marks + labels */}
      {tickValues.map(v => {
        const n = (v - MIN) / (MAX - MIN);
        const deg = toDeg(n);
        const inner = pt(deg, RI - 8);
        const outer = pt(deg, RI - 2);
        const label = pt(deg, RI - 22);
        return (
          <g key={v}>
            <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
              stroke="#374151" strokeWidth="2" strokeLinecap="round"/>
            <text x={label.x} y={label.y} textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fill="#6b7280">{v}%</text>
          </g>
        );
      })}

      {/* Needle */}
      <g style={{ transition: 'all 1s cubic-bezier(0.34,1.4,0.64,1)' }}>
        <polygon points={`${tip.x},${tip.y} ${bl.x},${bl.y} ${br.x},${br.y}`}
          fill={color} filter="url(#wvGlow)"/>
        <polygon points={`${tip.x},${tip.y} ${bl.x},${bl.y} ${cx},${cy}`}
          fill="#fff" opacity="0.12"/>
      </g>

      {/* Hub */}
      <circle cx={cx} cy={cy} r="16" fill="url(#hubG)"/>
      <circle cx={cx} cy={cy} r="7"  fill={color} filter="url(#wvGlow)"/>

      {/* Value */}
      <text x={cx} y={cy - 42} textAnchor="middle" fontSize="38" fontWeight="bold"
        fontFamily="monospace" fill={color} filter="url(#wvGlow)"
        style={{ transition: 'fill 0.6s ease' }}>
        {pct.toFixed(1)}%
      </text>
      <text x={cx} y={cy - 18} textAnchor="middle" fontSize="11" fill="#6b7280"
        letterSpacing="2">XIRR</text>

      {/* Zone label */}
      <rect x={cx - 28} y={cy + 20} width="56" height="18" rx="9"
        fill={color} opacity="0.15"/>
      <text x={cx} y={cy + 32} textAnchor="middle" fontSize="11"
        fill={color} fontWeight="700">{activeZone.label.toUpperCase()}</text>
    </svg>
  );
}
