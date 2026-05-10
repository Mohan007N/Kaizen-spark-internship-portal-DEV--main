import { motion } from "framer-motion";
import { ArrowRight, Play, TrendingUp, Users, Briefcase, Award } from "lucide-react";
import { useEffect, useState } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{n.toLocaleString()}{suffix}</>;
}

export function Hero() {
  return (
    <section id="home" className="relative pt-32 md:pt-40 pb-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-medium text-primary mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              2026 Cohort Now Open
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              Shape the Future
              <br />
              <span className="text-primary">Through Technology</span>
            </h1>

            <p className="mt-8 text-xl text-muted-foreground leading-relaxed max-w-2xl">
              KaizenSpark Tech delivers industry-leading internship programs that transform 
              aspiring technologists into enterprise-ready professionals.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#apply"
                className="group inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-semibold text-white bg-primary hover:bg-primary/90 transition-all duration-300"
              >
                Start Your Journey
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-semibold border border-border hover:bg-accent transition-colors"
              >
                Explore Programs
              </a>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8">
              {[
                { v: "12,000+", l: "Professionals Trained" },
                { v: "94%", l: "Placement Success" },
                { v: "200+", l: "Enterprise Partners" },
              ].map((s) => (
                <div key={s.l} className="border-l-2 border-primary/20 pl-4">
                  <div className="text-3xl font-bold text-foreground">{s.v}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent blur-3xl" />
            <DashboardCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DashboardCard() {
  const bars = [40, 65, 50, 80, 70, 92, 85];
  return (
    <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm text-muted-foreground">Performance Dashboard</div>
          <div className="text-lg font-semibold mt-1">Program Analytics</div>
        </div>
        <div className="flex gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="h-2 w-2 rounded-full bg-primary/40" />
          <span className="h-2 w-2 rounded-full bg-primary/20" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { i: Users, v: 1284, l: "Active Participants", c: "bg-primary/10 text-primary" },
          { i: Briefcase, v: 372, l: "Live Projects", c: "bg-primary/10 text-primary" },
          { i: Award, v: 94, l: "Success Rate %", c: "bg-primary/10 text-primary" },
        ].map((s, i) => (
          <div key={i} className="bg-accent/50 rounded-xl p-4 border border-border">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${s.c}`}>
              <s.i className="h-5 w-5" />
            </div>
            <div className="mt-3 text-2xl font-bold">
              <Counter to={s.v} />
            </div>
            <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="bg-accent/30 rounded-xl p-5 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium">Skill Development Trajectory</div>
          <div className="inline-flex items-center gap-1.5 text-xs text-primary font-medium">
            <TrendingUp className="h-4 w-4" /> +28%
          </div>
        </div>
        <div className="flex items-end gap-2 h-32">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: "easeOut" }}
              className="flex-1 rounded-t bg-primary/80 relative"
            />
          ))}
        </div>
        <div className="mt-3 flex justify-between text-xs text-muted-foreground">
          {["Week 1","Week 2","Week 3","Week 4","Week 5","Week 6","Week 7"].map(w => <span key={w}>{w}</span>)}
        </div>
      </div>
    </div>
  );
}
