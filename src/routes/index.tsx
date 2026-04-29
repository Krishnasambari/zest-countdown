import { createFileRoute } from "@tanstack/react-router";
import watchHero from "@/assets/watch-hero.jpg";
import { Countdown } from "@/components/Countdown";
import { LiveClock } from "@/components/LiveClock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AURUM — The Heritage Chronograph | Launching June 15" },
      {
        name: "description",
        content:
          "Introducing AURUM Heritage Chronograph. A masterpiece of horology, launching June 15. Reserve yours and witness time redefined.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-emerald/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-gold/10 blur-[120px]" />

      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-gold shadow-gold flex items-center justify-center">
            <span className="font-display text-background font-bold text-lg">A</span>
          </div>
          <span className="font-display text-xl tracking-widest">AURUM</span>
        </div>
        <nav className="hidden md:flex items-center gap-10 text-sm uppercase tracking-[0.2em] text-muted-foreground">
          <a href="#collection" className="hover:text-gold transition">Collection</a>
          <a href="#craft" className="hover:text-gold transition">Craft</a>
          <a href="#reserve" className="hover:text-gold transition">Reserve</a>
        </nav>
        <LiveClock />
      </header>

      {/* Hero */}
      <main className="relative z-10 px-6 sm:px-12 pt-8 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-7xl mx-auto">
          <div className="space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-glow-pulse" />
              Launching June 15, 2026
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.95]">
              Time,
              <br />
              <span className="text-gradient-gold italic">reimagined.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              The AURUM Heritage Chronograph — Swiss-engineered, hand-finished,
              and limited to 500 pieces worldwide. Witness the unveiling.
            </p>

            <div className="space-y-4">
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Countdown to launch
              </div>
              <Countdown />
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#reserve"
                className="inline-flex items-center justify-center rounded-full bg-gradient-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-background shadow-gold hover:scale-[1.02] transition-transform"
              >
                Reserve Yours
              </a>
              <a
                href="#craft"
                className="inline-flex items-center justify-center rounded-full border border-gold/40 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-foreground hover:border-gold hover:bg-gold/5 transition"
              >
                Discover Craft
              </a>
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 bg-gradient-emerald rounded-full blur-3xl opacity-40 animate-glow-pulse" />
            <img
              src={watchHero}
              alt="AURUM Heritage Chronograph wristwatch with emerald dial and rose gold accents"
              width={1024}
              height={1024}
              className="relative w-full h-auto animate-float drop-shadow-2xl"
            />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/60 blur-2xl rounded-full" />
          </div>
        </div>

        {/* Specs strip */}
        <section
          id="craft"
          className="mt-32 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/10 rounded-2xl overflow-hidden border border-gold/20"
        >
          {[
            ["500", "Limited pieces"],
            ["42mm", "Sapphire case"],
            ["72h", "Power reserve"],
            ["100m", "Water resistance"],
          ].map(([v, l]) => (
            <div key={l} className="bg-card/60 backdrop-blur-md p-8 text-center">
              <div className="font-display text-4xl text-gradient-gold">{v}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {l}
              </div>
            </div>
          ))}
        </section>

        {/* Reserve */}
        <section id="reserve" className="mt-32 max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Be among the <span className="text-gradient-gold italic">first</span>.
          </h2>
          <p className="text-muted-foreground">
            Reservations open with the launch. Join the waitlist to receive priority access.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 rounded-full bg-card/60 border border-gold/30 px-6 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold transition"
            />
            <button
              type="submit"
              className="rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-background shadow-gold hover:scale-[1.02] transition-transform"
            >
              Notify me
            </button>
          </form>
        </section>
      </main>

      <footer className="relative z-10 border-t border-gold/10 py-8 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
        © 2026 AURUM Maison · Geneva, Switzerland
      </footer>
    </div>
  );
}
