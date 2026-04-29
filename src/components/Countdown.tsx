import { useEffect, useState } from "react";

const TARGET = new Date("2026-06-15T10:00:00Z").getTime();

function getDiff() {
  const now = Date.now();
  const diff = Math.max(0, TARGET - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown() {
  const [t, setT] = useState(getDiff);

  useEffect(() => {
    const id = setInterval(() => setT(getDiff()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: Array<[string, number]> = [
    ["Days", t.days],
    ["Hours", t.hours],
    ["Minutes", t.minutes],
    ["Seconds", t.seconds],
  ];

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-2xl">
      {units.map(([label, value]) => (
        <div
          key={label}
          className="relative rounded-2xl border border-gold/20 bg-card/40 backdrop-blur-md p-4 sm:p-6 text-center overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="font-mono text-3xl sm:text-5xl font-bold text-gradient-gold tabular-nums">
            {String(value).padStart(2, "0")}
          </div>
          <div className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
