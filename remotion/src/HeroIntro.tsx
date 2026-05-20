import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

// ── Palette ─────────────────────────────────────────────────────
const NAVY_950 = '#050A1F';
const NAVY_900 = '#0A1733';
const NAVY_800 = '#0F2147';
const NAVY_700 = '#173063';
const NAVY_500 = '#2C5AA8';
const NAVY_400 = '#4F7DCE';
const RED_700 = '#9B1A21';
const RED_600 = '#BF252D';
const RED_500 = '#DD2A2A';
const RED_400 = '#E85059';
const IVORY_50 = '#FAFAF7';
const IVORY_200 = '#E2E0D6';
const IVORY_300 = '#9C9580';

const RAJDHANI = "'Rajdhani', 'Inter', system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, monospace";

const EASE_OUT_QUART = Easing.bezier(0.22, 1, 0.36, 1);

// ── Scene timings (frames, 30fps) ───────────────────────────────
// 0-45    WILD   (1.5s)  dawn over peaks
// 45-110  TRAIL  (2.2s)  path traces toward summit
// 110-180 GEAR   (2.3s)  equipment stamps along the trail
// 180-300 LOCK   (4.0s)  wordmark + tagline + URL hold

// ── Sky + sun gradient background ───────────────────────────────
function SkyAndSun() {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Sun rises over the run
  const sunY = interpolate(frame, [0, 110], [height * 0.85, height * 0.45], {
    easing: EASE_OUT_QUART,
    extrapolateRight: 'clamp',
  });
  const sunRadius = interpolate(frame, [0, 110], [60, 130], {
    easing: EASE_OUT_QUART,
    extrapolateRight: 'clamp',
  });
  const sunOpacity = interpolate(frame, [180, 240], [1, 0.25], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Sky warms in
  const warmth = interpolate(frame, [0, 110], [0, 1], {
    easing: EASE_OUT_QUART,
    extrapolateRight: 'clamp',
  });
  const cool = interpolate(frame, [180, 240], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: NAVY_950, overflow: 'hidden' }}>
      <svg width={width} height={height} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={NAVY_950} />
            <stop offset="55%" stopColor={NAVY_900} />
            <stop offset="100%" stopColor={NAVY_700} stopOpacity={0.85 - cool * 0.4} />
          </linearGradient>
          <radialGradient id="dawnGlow" cx={width / 2} cy={sunY} r={width * 0.55} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={RED_500} stopOpacity={0.45 * warmth} />
            <stop offset="50%" stopColor={RED_700} stopOpacity={0.18 * warmth} />
            <stop offset="100%" stopColor={NAVY_950} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={IVORY_50} stopOpacity="0.95" />
            <stop offset="50%" stopColor={RED_400} stopOpacity="0.85" />
            <stop offset="100%" stopColor={RED_600} stopOpacity="0.4" />
          </radialGradient>
        </defs>
        <rect width={width} height={height} fill="url(#sky)" />
        <rect width={width} height={height} fill="url(#dawnGlow)" />
        <circle cx={width / 2} cy={sunY} r={sunRadius} fill="url(#sun)" opacity={sunOpacity} />
      </svg>
      <Stars />
    </AbsoluteFill>
  );
}

function Stars() {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const fade = interpolate(frame, [0, 60], [1, 0], {
    easing: EASE_OUT_QUART,
    extrapolateRight: 'clamp',
  });

  const stars = Array.from({ length: 70 }, (_, i) => {
    const seed = i * 9301 + 49297;
    const px = (seed % 233280) / 233280;
    const py = ((seed * 7) % 233280) / 233280;
    const r = 1 + ((seed * 13) % 100) / 70;
    const baseOpacity = 0.25 + ((seed * 17) % 100) / 220;
    const twinkle = 0.6 + Math.sin(frame * 0.06 + i) * 0.4;
    return (
      <circle
        key={i}
        cx={px * width}
        cy={py * height * 0.55}
        r={r}
        fill={IVORY_50}
        opacity={baseOpacity * twinkle * fade}
      />
    );
  });

  return (
    <svg width={width} height={height} style={{ position: 'absolute', inset: 0 }}>
      {stars}
    </svg>
  );
}

// ── Mountain silhouettes (parallax layers) ──────────────────────
function Mountains() {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const farX = interpolate(frame, [0, 300], [-20, 20]);
  const midX = interpolate(frame, [0, 300], [-40, 40]);
  const nearX = interpolate(frame, [0, 300], [-60, 60]);

  // Lock-state push down
  const baseY = interpolate(frame, [180, 240], [0, 90], {
    easing: EASE_OUT_QUART,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const farRidge = `M 0 ${height * 0.65} L 280 ${height * 0.45} L 540 ${height * 0.55} L 780 ${height * 0.4} L 1080 ${height * 0.52} L 1320 ${height * 0.42} L 1560 ${height * 0.5} L 1820 ${height * 0.46} L ${width} ${height * 0.55} L ${width} ${height} L 0 ${height} Z`;
  const midRidge = `M 0 ${height * 0.72} L 200 ${height * 0.58} L 460 ${height * 0.68} L 700 ${height * 0.52} L 940 ${height * 0.65} L 1180 ${height * 0.55} L 1440 ${height * 0.66} L 1720 ${height * 0.56} L ${width} ${height * 0.66} L ${width} ${height} L 0 ${height} Z`;
  const nearRidge = `M 0 ${height * 0.82} L 160 ${height * 0.74} L 360 ${height * 0.8} L 580 ${height * 0.68} L 820 ${height * 0.78} L 1080 ${height * 0.7} L 1340 ${height * 0.79} L 1620 ${height * 0.72} L ${width} ${height * 0.8} L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg
      width={width}
      height={height}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <g transform={`translate(${farX} ${baseY})`}>
        <path d={farRidge} fill={NAVY_800} opacity={0.85} />
      </g>
      <g transform={`translate(${midX} ${baseY})`}>
        <path d={midRidge} fill={NAVY_900} opacity={0.95} />
      </g>
      <g transform={`translate(${nearX} ${baseY})`}>
        <path d={nearRidge} fill={NAVY_950} />
      </g>
    </svg>
  );
}

// ── Treeline silhouette at the very bottom ──────────────────────
function Treeline() {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  const baseY = interpolate(frame, [180, 240], [0, 110], {
    easing: EASE_OUT_QUART,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const trees: { x: number; w: number; h: number }[] = [];
  let x = -40;
  let seed = 1;
  while (x < width + 40) {
    seed = (seed * 9301 + 49297) % 233280;
    const w = 30 + (seed % 50);
    const h = 70 + ((seed * 3) % 110);
    trees.push({ x, w, h });
    x += w * 0.6;
  }

  return (
    <svg
      width={width}
      height={height}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <g transform={`translate(0 ${baseY})`}>
        {trees.map((t, i) => (
          <polygon
            key={i}
            points={`${t.x},${height} ${t.x + t.w / 2},${height - t.h} ${t.x + t.w},${height}`}
            fill={NAVY_950}
            opacity={0.9}
          />
        ))}
      </g>
    </svg>
  );
}

// ── Trail line + waypoint markers ───────────────────────────────
function TrailPath() {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // Trail begins at bottom center, curves toward the sun
  const startX = width / 2 - 220;
  const startY = height * 0.94;
  const endX = width / 2 + 30;
  const endY = height * 0.5;
  const path = `M ${startX} ${startY} C ${startX + 200} ${startY - 80}, ${endX - 320} ${endY + 240}, ${endX} ${endY}`;

  // Trail visible from frame 45, draws over 50 frames
  const localFrame = frame - 45;
  const draw = interpolate(localFrame, [0, 50], [0, 1], {
    easing: EASE_OUT_QUART,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fade = interpolate(frame, [180, 220], [1, 0.35], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Waypoints along the trail
  const wp = [
    { t: 0.18, label: 'KM 0' },
    { t: 0.5, label: 'KM 12' },
    { t: 0.85, label: 'SUMMIT' },
  ];

  function pointOnCurve(t: number) {
    // Quadratic-ish along cubic — approximate with sampling
    const ax = startX,
      ay = startY;
    const bx = startX + 200,
      by = startY - 80;
    const cx = endX - 320,
      cy = endY + 240;
    const dx = endX,
      dy = endY;
    const omt = 1 - t;
    const x =
      omt * omt * omt * ax +
      3 * omt * omt * t * bx +
      3 * omt * t * t * cx +
      t * t * t * dx;
    const y =
      omt * omt * omt * ay +
      3 * omt * omt * t * by +
      3 * omt * t * t * cy +
      t * t * t * dy;
    return { x, y };
  }

  const TRAIL_LEN = 1900;

  return (
    <svg
      width={width}
      height={height}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: fade }}
    >
      {/* Path glow */}
      <path
        d={path}
        stroke={RED_500}
        strokeWidth={6}
        fill="none"
        strokeDasharray={TRAIL_LEN}
        strokeDashoffset={(1 - draw) * TRAIL_LEN}
        strokeLinecap="round"
        opacity={0.25}
      />
      <path
        d={path}
        stroke={RED_500}
        strokeWidth={2.5}
        fill="none"
        strokeDasharray={TRAIL_LEN}
        strokeDashoffset={(1 - draw) * TRAIL_LEN}
        strokeLinecap="round"
      />

      {wp.map((w, i) => {
        const reveal = interpolate(
          localFrame,
          [w.t * 50 - 2, w.t * 50 + 6],
          [0, 1],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          },
        );
        const { x, y } = pointOnCurve(w.t);
        const size = 10 * reveal;
        const pulse = 1 + Math.sin((frame - 45 - w.t * 50) * 0.18) * 0.18;
        return (
          <g key={i} opacity={reveal}>
            <circle cx={x} cy={y} r={size * pulse + 8} fill={RED_500} opacity={0.18} />
            <rect
              x={x - size}
              y={y - size}
              width={size * 2}
              height={size * 2}
              transform={`rotate(45 ${x} ${y})`}
              fill={RED_500}
            />
            <rect
              x={x - size * 0.55}
              y={y - size * 0.55}
              width={size * 1.1}
              height={size * 1.1}
              transform={`rotate(45 ${x} ${y})`}
              fill={IVORY_50}
            />
            <text
              x={x + 20}
              y={y - 14}
              fill={IVORY_50}
              fontFamily={MONO}
              fontSize={16}
              letterSpacing={3}
              opacity={reveal}
            >
              {w.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Gear icons stamp in along the trail (Scene 3) ───────────────
function GearIcons() {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const localFrame = frame - 110;

  // Five gear icons spaced across screen
  const icons: { x: number; y: number; render: (size: number) => React.ReactElement }[] = [
    {
      x: width * 0.16,
      y: height * 0.46,
      render: (s) => <CameraIcon size={s} />,
    },
    {
      x: width * 0.32,
      y: height * 0.4,
      render: (s) => <DroneIcon size={s} />,
    },
    {
      x: width * 0.5,
      y: height * 0.36,
      render: (s) => <AntennaIcon size={s} />,
    },
    {
      x: width * 0.68,
      y: height * 0.4,
      render: (s) => <BatteryIcon size={s} />,
    },
    {
      x: width * 0.84,
      y: height * 0.46,
      render: (s) => <KnifeIcon size={s} />,
    },
  ];

  const exit = interpolate(frame, [180, 215], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', opacity: exit }}>
      {icons.map((it, i) => {
        const enterSpring = spring({
          frame: localFrame - i * 6,
          fps,
          config: { damping: 14, mass: 0.9 },
        });
        const scale = interpolate(enterSpring, [0, 1], [0.4, 1]);
        const op = interpolate(enterSpring, [0, 1], [0, 1]);
        const yOff = interpolate(enterSpring, [0, 1], [40, 0]);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: it.x - 50,
              top: it.y - 50 + yOff,
              width: 100,
              height: 100,
              transform: `scale(${scale})`,
              opacity: op,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <div
              style={{
                width: 100,
                height: 100,
                border: `2px solid ${RED_500}`,
                background: `${NAVY_950}D0`,
                backdropFilter: 'blur(8px)',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              {it.render(54)}
            </div>
            {/* Tether line down to trail */}
            <div
              style={{
                position: 'absolute',
                top: 100,
                left: '50%',
                width: 1.5,
                height: 60,
                background: `linear-gradient(180deg, ${RED_500}, transparent)`,
                transform: 'translateX(-50%)',
                opacity: op,
              }}
            />
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

// ── Monoline gear icon set ──────────────────────────────────────
function CameraIcon({ size = 54 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={IVORY_50} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h3l2-2h8l2 2h3v11H3z" />
      <circle cx="12" cy="13.5" r="3.5" />
    </svg>
  );
}
function DroneIcon({ size = 54 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={IVORY_50} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="6" height="6" />
      <circle cx="5" cy="5" r="2.5" />
      <circle cx="19" cy="5" r="2.5" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <line x1="7" y1="7" x2="10" y2="10" />
      <line x1="17" y1="7" x2="14" y2="10" />
      <line x1="7" y1="17" x2="10" y2="14" />
      <line x1="17" y1="17" x2="14" y2="14" />
    </svg>
  );
}
function AntennaIcon({ size = 54 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={IVORY_50} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v14" />
      <path d="M5 8 12 3 19 8" />
      <path d="M7 17h10" />
      <path d="M9 21h6" />
    </svg>
  );
}
function BatteryIcon({ size = 54 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={IVORY_50} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="16" height="10" rx="1" />
      <line x1="19" y1="10" x2="21" y2="10" />
      <line x1="19" y1="14" x2="21" y2="14" />
      <line x1="7" y1="10" x2="7" y2="14" />
      <line x1="11" y1="10" x2="11" y2="14" />
      <line x1="15" y1="10" x2="15" y2="14" />
    </svg>
  );
}
function KnifeIcon({ size = 54 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={IVORY_50} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 19 18 4l3 3-15 15z" />
      <path d="M14 8l2 2" />
      <path d="M3 19l3-1" />
    </svg>
  );
}

// ── Stage chapter label (WILD / TRAIL / GEAR) ───────────────────
function ChapterLabel({
  text,
  from,
  duration,
}: {
  text: string;
  from: number;
  duration: number;
}) {
  const frame = useCurrentFrame();
  const local = frame - from;
  const enter = interpolate(local, [0, 8], [0, 1], {
    easing: EASE_OUT_QUART,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitOff = duration - 12;
  const exit = interpolate(local, [exitOff, duration], [1, 0], {
    easing: EASE_OUT_QUART,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const op = enter * exit;
  const y = interpolate(local, [0, 8], [20, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        top: 88,
        left: 0,
        right: 0,
        textAlign: 'center',
        opacity: op,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: 18,
          letterSpacing: '0.4em',
          color: RED_400,
          textTransform: 'uppercase',
          marginBottom: 14,
        }}
      >
        — Chapter —
      </div>
      <div
        style={{
          fontFamily: RAJDHANI,
          fontWeight: 700,
          fontSize: 96,
          letterSpacing: '-0.015em',
          color: IVORY_50,
          textTransform: 'uppercase',
          lineHeight: 1,
        }}
      >
        {text}
      </div>
    </div>
  );
}

// ── Final wordmark lock ─────────────────────────────────────────
function FinalLock() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const local = frame - 180;

  const wildSpring = spring({ frame: local, fps, config: { damping: 16, mass: 1 } });
  const trailSpring = spring({ frame: local - 6, fps, config: { damping: 16, mass: 1 } });
  const gearSpring = spring({ frame: local - 12, fps, config: { damping: 16, mass: 1 } });

  const wildY = interpolate(wildSpring, [0, 1], [60, 0]);
  const trailY = interpolate(trailSpring, [0, 1], [60, 0]);
  const gearY = interpolate(gearSpring, [0, 1], [60, 0]);
  const wildOp = interpolate(wildSpring, [0, 1], [0, 1]);
  const trailOp = interpolate(trailSpring, [0, 1], [0, 1]);
  const gearOp = interpolate(gearSpring, [0, 1], [0, 1]);

  const ruleW = interpolate(local, [20, 50], [0, 720], {
    easing: EASE_OUT_QUART,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const tagOp = interpolate(local, [38, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const urlOp = interpolate(local, [60, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const slowBreath = 1 + Math.sin(local * 0.05) * 0.01;

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 22,
        transform: `scale(${slowBreath})`,
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: 20,
          letterSpacing: '0.5em',
          color: RED_400,
          textTransform: 'uppercase',
          opacity: tagOp,
        }}
      >
        ▾ EST · 2026
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 26,
          fontFamily: RAJDHANI,
          fontWeight: 700,
          fontSize: 188,
          letterSpacing: '-0.025em',
          lineHeight: 0.9,
          textTransform: 'uppercase',
        }}
      >
        <span
          style={{
            color: IVORY_50,
            opacity: wildOp,
            transform: `translateY(${wildY}px)`,
            display: 'inline-block',
          }}
        >
          Wild
        </span>
        <span
          style={{
            color: IVORY_50,
            opacity: trailOp,
            transform: `translateY(${trailY}px)`,
            display: 'inline-block',
          }}
        >
          Trail
        </span>
        <span
          style={{
            color: RED_500,
            opacity: gearOp,
            transform: `translateY(${gearY}px)`,
            display: 'inline-block',
          }}
        >
          Gear
        </span>
      </div>

      <div
        style={{
          width: ruleW,
          height: 2,
          background: RED_500,
        }}
      />

      <div
        style={{
          fontFamily: RAJDHANI,
          fontWeight: 600,
          fontSize: 32,
          letterSpacing: '0.32em',
          color: IVORY_200,
          textTransform: 'uppercase',
          opacity: tagOp,
        }}
      >
        Equipping The Wild · Streaming The Adventure
      </div>

      <div
        style={{
          fontFamily: MONO,
          fontSize: 22,
          letterSpacing: '0.42em',
          color: IVORY_300,
          textTransform: 'uppercase',
          opacity: urlOp,
          marginTop: 14,
        }}
      >
        wildtrailgear.store
      </div>
    </AbsoluteFill>
  );
}

// ── HUD strips ──────────────────────────────────────────────────
function HUD() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        justifyContent: 'space-between',
        padding: 40,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: IVORY_200,
          fontFamily: MONO,
          fontSize: 14,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          opacity: 0.7,
        }}
      >
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ width: 8, height: 8, background: RED_500, display: 'inline-block' }} />
          WT · Field Catalog
        </div>
        <div>N 34°11′47″ · W 86°28′02″</div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: IVORY_200,
          fontFamily: MONO,
          fontSize: 14,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          opacity: 0.6,
        }}
      >
        <div>FRAME {String(frame).padStart(4, '0')}</div>
        <div style={{ color: RED_400 }}>SIG · {String(40000 + (Math.floor(frame / 6) * 73) % 6000).padStart(5, '0')}</div>
        <div>WILDTRAILGEAR.STORE</div>
      </div>
    </AbsoluteFill>
  );
}

// ── Vignette ────────────────────────────────────────────────────
function Vignette() {
  const { width, height } = useVideoConfig();
  return (
    <svg
      width={width}
      height={height}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <defs>
        <radialGradient id="vig" cx="50%" cy="50%" r="80%">
          <stop offset="40%" stopColor={NAVY_950} stopOpacity={0} />
          <stop offset="100%" stopColor={NAVY_950} stopOpacity={0.85} />
        </radialGradient>
      </defs>
      <rect width={width} height={height} fill="url(#vig)" />
    </svg>
  );
}

// ── Composition ─────────────────────────────────────────────────
export const HeroIntro: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: NAVY_950, overflow: 'hidden' }}>
      <SkyAndSun />
      <Mountains />
      <Treeline />
      <TrailPath />
      <GearIcons />
      <Vignette />
      <HUD />

      {/* Chapter labels */}
      <Sequence from={6} durationInFrames={40} layout="none">
        <ChapterLabel text="Wild" from={6} duration={40} />
      </Sequence>
      <Sequence from={50} durationInFrames={56} layout="none">
        <ChapterLabel text="Trail" from={50} duration={56} />
      </Sequence>
      <Sequence from={112} durationInFrames={62} layout="none">
        <ChapterLabel text="Gear" from={112} duration={62} />
      </Sequence>

      <Sequence from={180} durationInFrames={120} layout="none">
        <FinalLock />
      </Sequence>
    </AbsoluteFill>
  );
};
