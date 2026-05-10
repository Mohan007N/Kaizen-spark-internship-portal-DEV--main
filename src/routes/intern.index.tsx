import { createFileRoute } from "@tanstack/react-router";
import { ListChecks, CheckCircle2, Clock, TrendingUp, ArrowUpRight, GitCommit } from "lucide-react";
import { PageHeader, StatCard, GlassCard, ProgressBar, Badge } from "@/components/dashboard/ui";
import { MOCK_TASKS, statusMeta } from "@/lib/mock-data";
import { motion } from "framer-motion";

export const Route = createFileRoute("/intern/")({
  component: InternDashboard,
});

function InternDashboard() {
  const total = MOCK_TASKS.length;
  const completed = MOCK_TASKS.filter((t) => t.status === "approved").length;
  const pending = MOCK_TASKS.filter((t) => t.status === "under_review" || t.status === "submitted").length;
  const progress = Math.round((completed / total) * 100);

  const activity = [
    { time: "2h ago", text: "You submitted Dockerize Microservice", icon: GitCommit },
    { time: "Yesterday", text: "Mentor approved Responsive Pricing Page", icon: CheckCircle2 },
    { time: "2 days ago", text: "New task assigned: GraphQL Schema Stitching", icon: ListChecks },
    { time: "5 days ago", text: "Profile updated", icon: TrendingUp },
  ];

  return (
    <>
      <PageHeader
        title="Welcome back, Aarav 👋"
        subtitle="Here's a snapshot of your internship progress."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Tasks Assigned" value={total} icon={ListChecks} accent="from-blue-tint to-cyan" delta={{ value: "+2 this week", positive: true }} />
        <StatCard label="Completed" value={completed} icon={CheckCircle2} accent="from-emerald-500 to-cyan" delta={{ value: "+1", positive: true }} />
        <StatCard label="Pending Review" value={pending} icon={Clock} accent="from-amber-500 to-rose-500" />
        <StatCard label="Progress" value={`${progress}%`} icon={TrendingUp} accent="from-primary to-blue-tint" delta={{ value: "On track", positive: true }} />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <GlassCard className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold">Internship Progress</div>
              <div className="text-xs text-muted-foreground">12-week AI/ML Engineering Track</div>
            </div>
            <div className="text-2xl font-bold text-gradient tabular-nums">{progress}%</div>
          </div>
          <ProgressBar value={progress} />
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { l: "Week", v: "5 / 12" },
              { l: "Mentor sessions", v: "8" },
              { l: "Avg. score", v: "8.7" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-xl p-3">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                <div className="mt-1 text-lg font-semibold tabular-nums">{s.v}</div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="text-sm font-semibold mb-3">Active tasks</div>
            <div className="space-y-2">
              {MOCK_TASKS.slice(0, 3).map((t) => {
                const m = statusMeta(t.status);
                return (
                  <motion.div
                    key={t.id}
                    whileHover={{ x: 2 }}
                    className="flex items-center justify-between rounded-xl glass p-3 hover:bg-white/5 cursor-pointer"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{t.title}</div>
                      <div className="text-xs text-muted-foreground">Due {t.deadline}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge className={m.className}>{m.label}</Badge>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="text-sm font-semibold mb-4">Recent activity</div>
          <div className="space-y-4">
            {activity.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="flex gap-3">
                  <div className="relative">
                    <div className="h-8 w-8 rounded-lg glass grid place-items-center">
                      <Icon className="h-3.5 w-3.5 text-cyan" />
                    </div>
                    {i < activity.length - 1 && <div className="absolute left-1/2 top-8 -translate-x-1/2 h-6 w-px bg-white/10" />}
                  </div>
                  <div className="pt-1">
                    <div className="text-sm">{a.text}</div>
                    <div className="text-xs text-muted-foreground">{a.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </>
  );
}
