'use client';

import { useEffect, useState } from 'react';

const PINGS: { angle: number; r: number; label: string }[] = [
  { angle: 18, r: 64, label: 'A1' },
  { angle: 92, r: 38, label: 'B2' },
  { angle: 154, r: 78, label: 'C3' },
  { angle: 220, r: 52, label: 'D4' },
  { angle: 298, r: 88, label: 'E5' },
];

export default function Radar({ size = 220 }: { size?: number }) {
  const [sweep, setSweep] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      setSweep((elapsed * 50) % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 6;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      role="img"
      aria-label="Radar telemetry sweep"
      className="select-none"
    >
      <defs>
        <radialGradient id="radar-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1A1A1A" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </radialGradient>
        <linearGradient id="sweep" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF5722" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FF5722" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx={cx} cy={cy} r={r} fill="url(#radar-bg)" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#3A403A" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={r * 0.66} fill="none" stroke="#3A403A" strokeWidth="0.5" opacity="0.7" />
      <circle cx={cx} cy={cy} r={r * 0.33} fill="none" stroke="#3A403A" strokeWidth="0.5" opacity="0.5" />
      <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="#3A403A" strokeWidth="0.5" opacity="0.5" />
      <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="#3A403A" strokeWidth="0.5" opacity="0.5" />

      <g transform={`rotate(${sweep} ${cx} ${cy})`}>
        <path
          d={`M ${cx} ${cy} L ${cx + r} ${cy} A ${r} ${r} 0 0 0 ${cx + r * Math.cos((-50 * Math.PI) / 180)} ${
            cy + r * Math.sin((-50 * Math.PI) / 180)
          } Z`}
          fill="url(#sweep)"
        />
        <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="#FF5722" strokeWidth="1" />
      </g>

      {PINGS.map((p, i) => {
        const rad = (p.angle * Math.PI) / 180;
        const x = cx + (p.r / 100) * r * Math.cos(rad);
        const y = cy + (p.r / 100) * r * Math.sin(rad);
        const delta = ((sweep - p.angle + 360) % 360) / 360;
        const intensity = Math.max(0, 1 - delta * 1.8);
        return (
          <g key={i}>
            <circle
              cx={x}
              cy={y}
              r={2 + intensity * 4}
              fill="#FF5722"
              opacity={0.25 + intensity * 0.75}
            />
            <text
              x={x + 8}
              y={y + 3}
              fill="#9C9580"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.16em"
              opacity={0.4 + intensity * 0.6}
            >
              {p.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
