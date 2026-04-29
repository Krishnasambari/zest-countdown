import { useEffect, useState } from "react";

export function LiveClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString("en-US", { hour12: false });
  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-gold/30 bg-card/40 backdrop-blur-md px-5 py-2">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-gold animate-glow-pulse" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
      </span>
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {date}
      </span>
      <span className="font-mono text-sm text-gold tabular-nums">{time}</span>
    </div>
  );
}
