import { useEffect, useRef, useState } from "react";

/**
 * Havrut Heritage Chronograph — live SVG watch.
 * - Main hands: hour / minute / second (real time)
 * - Sub-dials:
 *    • 9 o'clock  : running small seconds (live)
 *    • 6 o'clock  : chronograph minutes (0–30)
 *    • 3 o'clock  : chronograph hours   (0–12)
 *  Center sweep second = chronograph seconds (when running).
 *  When chrono stopped, the center second hand shows real time seconds.
 */
export function AnalogWatch() {
  const [now, setNow] = useState(() => new Date());
  const [chronoMs, setChronoMs] = useState(0);
  const [running, setRunning] = useState(false);
  const startRef = useRef<number | null>(null);
  const baseRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Live clock tick (smooth)
  useEffect(() => {
    let id: number;
    const loop = () => {
      setNow(new Date());
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  // Chronograph loop
  useEffect(() => {
    if (!running) return;
    const tick = () => {
      const elapsed = baseRef.current + (performance.now() - (startRef.current ?? 0));
      setChronoMs(elapsed);
      rafRef.current = requestAnimationFrame(tick);
    };
    startRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      baseRef.current = baseRef.current + (performance.now() - (startRef.current ?? 0));
    };
  }, [running]);

  const start = () => setRunning(true);
  const stop = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    baseRef.current = 0;
    setChronoMs(0);
  };

  // Real time angles
  const ms = now.getMilliseconds();
  const s = now.getSeconds() + ms / 1000;
  const m = now.getMinutes() + s / 60;
  const h = (now.getHours() % 12) + m / 60;

  const hourAngle = h * 30; // 360/12
  const minAngle = m * 6;   // 360/60
  const secAngle = s * 6;

  // Chrono values
  const chronoSec = (chronoMs / 1000) % 60;
  const chronoMin = Math.floor(chronoMs / 60000) % 30;
  const chronoHr = Math.floor(chronoMs / 3600000) % 12;
  const chronoSecAngle = chronoSec * 6;
  const chronoMinAngle = (chronoMin + chronoSec / 60) * 12; // 360/30
  const chronoHrAngle = (chronoHr + chronoMin / 30) * 30;   // 360/12

  // Center sweep: chrono seconds when running, else real seconds
  const centerSweep = running || chronoMs > 0 ? chronoSecAngle : secAngle;

  return (
    <div className="flex flex-col items-center gap-6">
      <svg
        viewBox="0 0 400 400"
        className="w-full max-w-[460px] h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
        role="img"
        aria-label="Havrut Heritage Chronograph live analog watch"
      >
        <defs>
          <radialGradient id="caseGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#f4cf86" />
            <stop offset="55%" stopColor="#c89a55" />
            <stop offset="100%" stopColor="#6b4a23" />
          </radialGradient>
          <radialGradient id="dialGrad" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#1f5b46" />
            <stop offset="70%" stopColor="#0d3a2c" />
            <stop offset="100%" stopColor="#04201a" />
          </radialGradient>
          <radialGradient id="subGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#0f4233" />
            <stop offset="100%" stopColor="#03180f" />
          </radialGradient>
          <linearGradient id="goldHand" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#fce29a" />
            <stop offset="100%" stopColor="#b8842f" />
          </linearGradient>
        </defs>

        {/* Outer case */}
        <circle cx="200" cy="200" r="195" fill="url(#caseGrad)" />
        <circle cx="200" cy="200" r="178" fill="#0a0a0a" />
        {/* Dial */}
        <circle cx="200" cy="200" r="170" fill="url(#dialGrad)" />

        {/* Hour markers */}
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i * 6 * Math.PI) / 180;
          const isHour = i % 5 === 0;
          const r1 = isHour ? 150 : 158;
          const r2 = 165;
          const x1 = 200 + Math.sin(a) * r1;
          const y1 = 200 - Math.cos(a) * r1;
          const x2 = 200 + Math.sin(a) * r2;
          const y2 = 200 - Math.cos(a) * r2;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isHour ? "#e7c684" : "#7a5a2c"}
              strokeWidth={isHour ? 2.2 : 1}
              strokeLinecap="round"
            />
          );
        })}

        {/* Numerals */}
        {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n, i) => {
          if ([3, 6, 9].includes(n)) return null; // sub-dials live here
          const a = (i * 30 * Math.PI) / 180;
          const x = 200 + Math.sin(a) * 130;
          const y = 200 - Math.cos(a) * 130 + 6;
          return (
            <text
              key={n}
              x={x}
              y={y}
              textAnchor="middle"
              fill="#e7c684"
              fontFamily="Georgia, serif"
              fontSize="18"
              fontStyle="italic"
            >
              {n}
            </text>
          );
        })}

        {/* Brand */}
        <text
          x="200"
          y="135"
          textAnchor="middle"
          fill="#e7c684"
          fontFamily="Georgia, serif"
          fontSize="14"
          letterSpacing="4"
        >
          HAVRUT
        </text>
        <text
          x="200"
          y="150"
          textAnchor="middle"
          fill="#a07e3e"
          fontFamily="Georgia, serif"
          fontSize="7"
          letterSpacing="2"
        >
          CHRONOGRAPH · GENEVA
        </text>

        {/* Sub-dial: small running seconds (9 o'clock) */}
        <SubDial
          cx={130}
          cy={200}
          r={32}
          angle={secAngle}
          label="60"
          ticks={60}
          majorEvery={5}
        />
        {/* Sub-dial: chrono minutes 0–30 (6 o'clock) */}
        <SubDial
          cx={200}
          cy={270}
          r={32}
          angle={chronoMinAngle}
          label="30"
          ticks={30}
          majorEvery={5}
        />
        {/* Sub-dial: chrono hours 0–12 (3 o'clock) */}
        <SubDial
          cx={270}
          cy={200}
          r={32}
          angle={chronoHrAngle}
          label="12"
          ticks={12}
          majorEvery={1}
        />

        {/* Hour hand */}
        <g transform={`rotate(${hourAngle} 200 200)`}>
          <rect x="196" y="118" width="8" height="92" rx="3" fill="url(#goldHand)" />
        </g>
        {/* Minute hand */}
        <g transform={`rotate(${minAngle} 200 200)`}>
          <rect x="197.5" y="78" width="5" height="132" rx="2.5" fill="url(#goldHand)" />
        </g>
        {/* Center sweep (chrono seconds or real seconds) */}
        <g transform={`rotate(${centerSweep} 200 200)`}>
          <rect x="199" y="55" width="2" height="160" fill="#f4cf86" />
          <circle cx="200" cy="80" r="4" fill="#f4cf86" />
        </g>
        {/* Center cap */}
        <circle cx="200" cy="200" r="6" fill="#1a1a1a" stroke="#e7c684" strokeWidth="1.5" />

        {/* Crown (aligned to 3 o'clock) */}
        <g>
          {/* stem */}
          <rect x="378" y="196" width="8" height="8" fill="#8a6326" />
          {/* crown body */}
          <circle cx="394" cy="200" r="11" fill="url(#caseGrad)" stroke="#6b4a23" strokeWidth="0.8" />
          {/* fluted teeth */}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30 * Math.PI) / 180;
            const x1 = 394 + Math.cos(a) * 10;
            const y1 = 200 + Math.sin(a) * 10;
            const x2 = 394 + Math.cos(a) * 13;
            const y2 = 200 + Math.sin(a) * 13;
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8a6326" strokeWidth="1.6" strokeLinecap="round" />
            );
          })}
          {/* inset cap with H */}
          <circle cx="394" cy="200" r="5" fill="#3a2810" stroke="#e7c684" strokeWidth="0.6" />
          <text x="394" y="203" textAnchor="middle" fill="#e7c684" fontFamily="Georgia, serif" fontSize="6" fontWeight="bold">H</text>
        </g>
      </svg>

      {/* Chrono controls */}
      <div className="flex items-center gap-3">
        {!running ? (
          <button
            onClick={start}
            className="rounded-full bg-gradient-gold px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-background shadow-gold hover:scale-[1.03] transition-transform"
          >
            Start
          </button>
        ) : (
          <button
            onClick={stop}
            className="rounded-full bg-gradient-gold px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-background shadow-gold hover:scale-[1.03] transition-transform"
          >
            Stop
          </button>
        )}
        <button
          onClick={reset}
          className="rounded-full border border-gold/40 px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground hover:border-gold hover:bg-gold/5 transition"
        >
          Reset
        </button>
        <span className="font-mono text-sm text-gold tabular-nums ml-2">
          {formatChrono(chronoMs)}
        </span>
      </div>
    </div>
  );
}

function SubDial({
  cx,
  cy,
  r,
  angle,
  label,
  ticks,
  majorEvery,
}: {
  cx: number;
  cy: number;
  r: number;
  angle: number;
  label: string;
  ticks: number;
  majorEvery: number;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="url(#subGrad)" stroke="#a07e3e" strokeWidth="1" />
      {Array.from({ length: ticks }).map((_, i) => {
        const a = ((i * 360) / ticks) * (Math.PI / 180);
        const isMajor = i % majorEvery === 0;
        const r1 = isMajor ? r - 6 : r - 4;
        const r2 = r - 2;
        return (
          <line
            key={i}
            x1={cx + Math.sin(a) * r1}
            y1={cy - Math.cos(a) * r1}
            x2={cx + Math.sin(a) * r2}
            y2={cy - Math.cos(a) * r2}
            stroke={isMajor ? "#e7c684" : "#6b5128"}
            strokeWidth={isMajor ? 1.2 : 0.6}
          />
        );
      })}
      <text
        x={cx}
        y={cy - r / 2}
        textAnchor="middle"
        fill="#a07e3e"
        fontFamily="Georgia, serif"
        fontSize="6"
        letterSpacing="1"
      >
        {label}
      </text>
      <g transform={`rotate(${angle} ${cx} ${cy})`}>
        <rect x={cx - 0.6} y={cy - r + 4} width="1.2" height={r - 2} fill="#f4cf86" />
      </g>
      <circle cx={cx} cy={cy} r="2" fill="#e7c684" />
    </g>
  );
}

function formatChrono(ms: number) {
  const totalSec = ms / 1000;
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = Math.floor(totalSec % 60);
  const cs = Math.floor((ms % 1000) / 10);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
}
