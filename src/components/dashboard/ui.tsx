import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}

export function StatCard({
  label, value, icon: Icon, delta, accent = "from-blue-tint to-cyan",
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  delta?: { value: string; positive?: boolean };
  accent?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="relative glass rounded-2xl p-5 border-gradient overflow-hidden group"
    >
      <div className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${accent} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
      <div className="flex items-start justify-between relative">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-2 text-3xl font-bold tabular-nums">{value}</div>
          {delta && (
            <div className={`mt-1.5 inline-flex items-center gap-1 text-xs ${delta.positive ? "text-emerald-400" : "text-rose-400"}`}>
              {delta.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {delta.value}
            </div>
          )}
        </div>
        <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${accent} grid place-items-center shadow-glow`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`glass rounded-2xl border border-white/5 ${className}`}>{children}</div>;
}

export function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${className}`}>
      {children}
    </span>
  );
}

export function ProgressBar({ value, accent = "from-blue-tint to-cyan" }: { value: number; accent?: string }) {
  return (
    <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`h-full rounded-full bg-gradient-to-r ${accent} shadow-[0_0_12px_rgba(6,182,212,0.6)]`}
      />
    </div>
  );
}

export function EmptyState({ icon: Icon, title, hint }: { icon: LucideIcon; title: string; hint?: string }) {
  return (
    <div className="text-center py-16">
      <div className="mx-auto h-12 w-12 rounded-2xl glass grid place-items-center text-muted-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-4 text-sm font-medium">{title}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}
