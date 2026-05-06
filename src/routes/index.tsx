import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Countdown } from "@/components/Countdown";
import { LiveClock } from "@/components/LiveClock";
import { AnalogWatch } from "@/components/AnalogWatch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const WEB3FORMS_KEY = "02da42ac-9fa0-4ffc-a6e8-f7e9c4c97b20";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Havrut — The Heritage Chronograph | Launching June 15" },
      {
        name: "description",
        content:
          "Introducing the Havrut Heritage Chronograph. A masterpiece of horology, launching June 15. Reserve yours and witness time redefined.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [reserveOpen, setReserveOpen] = useState(false);
  const [reserveStatus, setReserveStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [waitlistStatus, setWaitlistStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleReserveSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReserveStatus("sending");
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", "New Havrut Watch Reservation");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setReserveStatus("success");
        setTimeout(() => {
          setReserveOpen(false);
          setReserveStatus("idle");
        }, 2000);
      } else {
        setReserveStatus("error");
      }
    } catch {
      setReserveStatus("error");
    }
  };

  const handleWaitlistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWaitlistStatus("sending");
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", "New Havrut Waitlist Signup");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setWaitlistStatus("success");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setWaitlistStatus("idle"), 4000);
      } else {
        setWaitlistStatus("error");
      }
    } catch {
      setWaitlistStatus("error");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-emerald/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-gold/10 blur-[120px]" />

      <header className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-gold shadow-gold flex items-center justify-center">
            <span className="font-display text-background font-bold text-lg">H</span>
          </div>
          <span className="font-display text-xl tracking-widest">HAVRUT</span>
        </div>
        <nav className="hidden md:flex items-center gap-10 text-sm uppercase tracking-[0.2em] text-muted-foreground">
          <a href="#collection" className="hover:text-gold transition">Collection</a>
          <a href="#craft" className="hover:text-gold transition">Craft</a>
          <a href="#reserve" className="hover:text-gold transition">Reserve</a>
        </nav>
        <LiveClock />
      </header>

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
              The Havrut Heritage Chronograph — Swiss-engineered, hand-finished,
              and limited to 500 pieces worldwide. Witness the unveiling.
            </p>

            <div className="space-y-4">
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Countdown to launch
              </div>
              <Countdown />
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                type="button"
                onClick={() => setReserveOpen(true)}
                className="inline-flex items-center justify-center rounded-full bg-gradient-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-background shadow-gold hover:scale-[1.02] transition-transform"
              >
                Reserve Yours
              </button>
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
            <div className="relative">
              <AnalogWatch />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/60 blur-2xl rounded-full" />
          </div>
        </div>

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
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{l}</div>
            </div>
          ))}
        </section>

        <section id="reserve" className="mt-32 max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Be among the <span className="text-gradient-gold italic">first</span>.
          </h2>
          <p className="text-muted-foreground">
            Reservations open with the launch. Join the waitlist to receive priority access.
          </p>

          {waitlistStatus === "success" ? (
            <div className="py-6 space-y-2">
              <div className="text-3xl">✦</div>
              <div className="font-display text-xl text-gradient-gold">You're on the list</div>
              <p className="text-sm text-muted-foreground">
                We'll notify you before June 15 launch.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleWaitlistSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4"
            >
              <input type="checkbox" name="botcheck" className="hidden" />
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="flex-1 rounded-full bg-card/60 border border-gold/30 px-6 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold transition"
              />
              <button
                type="submit"
                disabled={waitlistStatus === "sending"}
                className="rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-background shadow-gold hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {waitlistStatus === "sending" ? "Sending..." : "Notify me"}
              </button>
              {waitlistStatus === "error" && (
                <p className="text-xs text-red-400 w-full text-center mt-1">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </section>
      </main>

      <footer className="relative z-10 border-t border-gold/10 py-8 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
        © 2026 Havrut Maison · Geneva, Switzerland
      </footer>

      <Dialog open={reserveOpen} onOpenChange={setReserveOpen}>
        <DialogContent className="sm:max-w-md border-gold/30 bg-card/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              Reserve your <span className="text-gradient-gold italic">Havrut</span>
            </DialogTitle>
            <DialogDescription>
              Limited to 500 pieces. Complete the form to secure priority access.
            </DialogDescription>
          </DialogHeader>

          {reserveStatus === "success" ? (
            <div className="py-8 text-center space-y-2">
              <div className="text-3xl">✦</div>
              <div className="font-display text-xl text-gradient-gold">Reservation received</div>
              <p className="text-sm text-muted-foreground">
                We'll be in touch before launch on June 15.
              </p>
            </div>
          ) : (
            <form onSubmit={handleReserveSubmit} className="space-y-4 pt-2">
              <input type="checkbox" name="botcheck" className="hidden" />
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  name="firstname"
                  placeholder="First name"
                  className="rounded-md bg-background/60 border border-gold/30 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold transition"
                />
                <input
                  required
                  name="lastname"
                  placeholder="Last name"
                  className="rounded-md bg-background/60 border border-gold/30 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold transition"
                />
              </div>
              <input
                required
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full rounded-md bg-background/60 border border-gold/30 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold transition"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone (optional)"
                className="w-full rounded-md bg-background/60 border border-gold/30 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold transition"
              />
              <select
                required
                name="finish"
                defaultValue=""
                className="w-full rounded-md bg-background/60 border border-gold/30 px-4 py-2.5 text-sm focus:outline-none focus:border-gold transition"
              >
                <option value="" disabled>Preferred finish</option>
                <option value="rose-gold">Rose Gold · Emerald Dial</option>
                <option value="yellow-gold">Yellow Gold · Onyx Dial</option>
                <option value="platinum">Platinum · Sapphire Dial</option>
              </select>
              <textarea
                rows={3}
                name="notes"
                placeholder="Notes (optional)"
                className="w-full rounded-md bg-background/60 border border-gold/30 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold transition resize-none"
              />
              {reserveStatus === "error" && (
                <p className="text-xs text-red-400 text-center">
                  Something went wrong. Please try again.
                </p>
              )}
              <button
                type="submit"
                disabled={reserveStatus === "sending"}
                className="w-full rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-background shadow-gold hover:scale-[1.01] transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {reserveStatus === "sending" ? "Sending..." : "Confirm reservation"}
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
