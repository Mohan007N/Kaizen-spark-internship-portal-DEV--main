import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "radial-gradient(1200px circle at var(--mx, 50%) var(--my, 0%), oklch(0.55 0.22 264 / 0.18), transparent 40%), var(--gradient-hero)",
      }}
    >
      <div className="absolute inset-0 grid-bg radial-fade opacity-60" />
      {/* Floating orbs */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl animate-pulse-glow" />
      <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-cyan/20 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-tint/20 blur-3xl animate-pulse-glow" style={{ animationDelay: "3s" }} />
      {/* Particles */}
      <Particles />
    </div>
  );
}

function Particles() {
  const dots = Array.from({ length: 40 });
  return (
    <div className="absolute inset-0">
      {dots.map((_, i) => {
        const left = (i * 53) % 100;
        const top = (i * 37) % 100;
        const delay = (i % 8) * 0.6;
        const size = (i % 3) + 1.5;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-sky/70 animate-float"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              animationDelay: `${delay}s`,
              boxShadow: "0 0 8px currentColor",
            }}
          />
        );
      })}
    </div>
  );
}
