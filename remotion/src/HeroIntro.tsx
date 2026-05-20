import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

// ── Palette (mirrors wildtrail-gear Tailwind tokens) ─────────────
const NAVY_950 = '#050A1F';
const NAVY_900 = '#0A1733';
const NAVY_800 = '#0F2147';
const NAVY_500 = '#2C5AA8';
const NAVY_400 = '#4F7DCE';
const RED_500 = '#DD2A2A';
const RED_400 = '#E85059';
const IVORY_50 = '#FAFAF7';
const IVORY_200 = '#E2E0D6';

const RAJDHANI = "'Rajdhani', 'Inter', system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, monospace";

const EASE_OUT_QUART = Easing.bezier(0.22, 1, 0.36, 1);

// ── Background: animated contour grid ────────────────────────────
function ContourBackground() {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const drift = interpolate(frame, [0, 180], [0, -120], {
    extrapolateRight: 'clamp',
  });

  const lines = [];
  const step = 80;
  for (let y = -step; y < height + step * 2; y += step) {
    const wave = Math.sin((y + drift) * 0.012) * 24;
    const opacity = interpolate(y, [-step, height], [0.05, 0.35], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    lines.push(
      <path
        key={y}
        d={`M -50 ${y + wave} Q ${width / 2} ${y - 60 + wave * 1.4}, ${width + 50} ${y + wave}`}
        stroke={NAVY_500}
        strokeWidth={1.5}
        fill="none"
        opacity={opacity}
      />,
    );
  }

  return (
    <AbsoluteFill style={{ background: NAVY_950 }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: 'absolute', inset: 0 }}
      >
        <defs>
          <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
            <stop offset="0%" stopColor={NAVY_900} stopOpacity="0" />
            <stop offset="100%" stopColor={NAVY_950} stopOpacity="1" />
          </radialGradient>
        </defs>
        {lines}
        <rect width={width} height={height} fill="url(#vignette)" />
      </svg>
    </AbsoluteFill>
  );
}

// ── Red dust particles ──────────────────────────────────────────
function DustField() {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const particles = Array.from({ length: 90 }, (_, i) => {
    const seed = i * 9301 + 49297;
    const px = (seed % 233280) / 233280;
    const py = ((seed * 7) % 233280) / 233280;
    const size = 1.5 + ((seed * 13) % 100) / 35;
    const speed = 0.4 + ((seed * 17) % 100) / 100;
    const y = (py * height + frame * speed * -1.2 + height) % height;
    const x = px * width;
    const fade = interpolate(y, [0, 80, height - 80, height], [0, 1, 1, 0]);
    return (
      <circle
        key={i}
        cx={x}
        cy={y}
        r={size}
        fill={i % 5 === 0 ? RED_500 : NAVY_400}
        opacity={fade * (i % 5 === 0 ? 0.85 : 0.4)}
      />
    );
  });

  return (
    <svg
      width={width}
      height={height}
      style={{ position: 'absolute', inset: 0 }}
    >
      {particles}
    </svg>
  );
}

// ── Crosshair scanner sweep ──────────────────────────────────────
function ScannerSweep() {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const sweep = spring({
    frame: frame - fps * 0.2,
    fps,
    config: { damping: 18, mass: 1.2 },
  });
  const x = interpolate(sweep, [0, 1], [-100, width + 100]);
  const opacity = interpolate(frame, [0, 8, 26, 30], [0, 0.4, 0.4, 0]);

  return (
    <svg
      width={width}
      height={height}
      style={{ position: 'absolute', inset: 0 }}
    >
      <line
        x1={x}
        y1={0}
        x2={x}
        y2={height}
        stroke={RED_500}
        strokeWidth={2}
        opacity={opacity}
      />
    </svg>
  );
}

// ── Wordmark assembly ────────────────────────────────────────────
function Wordmark() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame;

  const wild = 'WILDTRAIL'.split('');
  const gearY = interpolate(localFrame, [0, 24], [40, 0], {
    easing: EASE_OUT_QUART,
    extrapolateRight: 'clamp',
  });
  const gearOpacity = interpolate(localFrame, [4, 26], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const ruleProgress = interpolate(localFrame, [12, 36], [0, 1], {
    easing: EASE_OUT_QUART,
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 18,
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: 22,
          letterSpacing: '0.5em',
          color: RED_400,
          textTransform: 'uppercase',
          opacity: interpolate(localFrame, [0, 12], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        ▾ WT / SERIAL 2026
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
        <div
          style={{
            fontFamily: RAJDHANI,
            fontSize: 168,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 0.9,
            display: 'flex',
            gap: 0,
            color: IVORY_50,
          }}
        >
          {wild.map((ch, i) => {
            const delay = i * 2;
            const enter = spring({
              frame: localFrame - delay,
              fps,
              config: { damping: 16, mass: 0.9 },
            });
            const y = interpolate(enter, [0, 1], [60, 0]);
            const op = interpolate(enter, [0, 1], [0, 1]);
            return (
              <span
                key={i}
                style={{
                  transform: `translateY(${y}px)`,
                  opacity: op,
                  display: 'inline-block',
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>
        <div
          style={{
            fontFamily: RAJDHANI,
            fontSize: 168,
            fontWeight: 700,
            color: RED_500,
            letterSpacing: '-0.02em',
            lineHeight: 0.9,
            transform: `translateY(${gearY}px)`,
            opacity: gearOpacity,
          }}
        >
          GEAR
        </div>
      </div>

      <div
        style={{
          width: 900 * ruleProgress,
          height: 2,
          background: RED_500,
          opacity: ruleProgress,
        }}
      />
    </AbsoluteFill>
  );
}

// ── Category chips ──────────────────────────────────────────────
function CategoryChips() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const items = ['Cameras', 'Drones', 'Power', 'Audio', 'Fishing'];

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 16,
        }}
      >
        {items.map((label, i) => {
          const enter = spring({
            frame: frame - i * 4,
            fps,
            config: { damping: 18 },
          });
          const y = interpolate(enter, [0, 1], [40, 0]);
          const op = interpolate(enter, [0, 1], [0, 1]);
          return (
            <div
              key={label}
              style={{
                transform: `translateY(${y}px)`,
                opacity: op,
                padding: '14px 28px',
                border: `1.5px solid ${IVORY_200}33`,
                color: IVORY_50,
                fontFamily: RAJDHANI,
                fontWeight: 600,
                fontSize: 24,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                background: `${NAVY_900}80`,
                backdropFilter: 'blur(8px)',
              }}
            >
              {label}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

// ── Tagline ─────────────────────────────────────────────────────
function Tagline() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fade = spring({ frame, fps, config: { damping: 22, mass: 1 } });
  const y = interpolate(fade, [0, 1], [30, 0]);
  const op = interpolate(fade, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <div
        style={{
          opacity: op,
          transform: `translateY(${y}px)`,
          fontFamily: MONO,
          fontSize: 22,
          color: RED_400,
          textTransform: 'uppercase',
          letterSpacing: '0.42em',
        }}
      >
        ─── EQUIPPING THE WILD ───
      </div>
      <div
        style={{
          opacity: op,
          transform: `translateY(${y}px)`,
          fontFamily: RAJDHANI,
          fontSize: 112,
          fontWeight: 700,
          color: IVORY_50,
          letterSpacing: '-0.015em',
          textTransform: 'uppercase',
          textAlign: 'center',
          lineHeight: 0.95,
        }}
      >
        Streaming The
        <br />
        <span style={{ color: RED_500 }}>Adventure</span>
      </div>
      <div
        style={{
          opacity: op * 0.85,
          transform: `translateY(${y}px)`,
          fontFamily: MONO,
          fontSize: 18,
          color: IVORY_200,
          letterSpacing: '0.34em',
          textTransform: 'uppercase',
          marginTop: 12,
        }}
      >
        wildtrailgear.store
      </div>
    </AbsoluteFill>
  );
}

// ── Top + bottom HUD strips ─────────────────────────────────────
function HUD() {
  const frame = useCurrentFrame();
  const tickSeed = Math.floor(frame / 6);
  const reading = String(40000 + ((tickSeed * 73) % 6000)).padStart(5, '0');

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        justifyContent: 'space-between',
        padding: 48,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: IVORY_200,
          fontFamily: MONO,
          fontSize: 16,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}
      >
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span
            style={{
              width: 10,
              height: 10,
              background: RED_500,
              display: 'inline-block',
            }}
          />
          WildTrail · Live Catalog
        </div>
        <div>/// N 34°11′47″ · W 86°28′02″</div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: IVORY_200,
          fontFamily: MONO,
          fontSize: 16,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}
      >
        <div>FRAME {String(frame).padStart(4, '0')}</div>
        <div style={{ color: RED_400 }}>SIG · {reading}</div>
        <div>2026 · CATALOG 07</div>
      </div>
    </AbsoluteFill>
  );
}

// ── Final composition ───────────────────────────────────────────
export const HeroIntro: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: NAVY_950, overflow: 'hidden' }}>
      <ContourBackground />
      <DustField />
      <ScannerSweep />
      <HUD />

      <Sequence from={Math.round(fps * 0.4)} durationInFrames={Math.round(fps * 2.4)} layout="none">
        <Wordmark />
      </Sequence>
      <Sequence from={Math.round(fps * 2.6)} durationInFrames={Math.round(fps * 1.8)} layout="none">
        <CategoryChips />
      </Sequence>
      <Sequence from={Math.round(fps * 4.4)} durationInFrames={Math.round(fps * 2.6)} layout="none">
        <Tagline />
      </Sequence>
    </AbsoluteFill>
  );
};
