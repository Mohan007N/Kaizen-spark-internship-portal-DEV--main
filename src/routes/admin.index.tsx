import { createFileRoute } from "@tanstack/react-router";
import { Users, BookOpen, Activity, Inbox } from "lucide-react";
import { PageHeader, StatCard, GlassCard, ProgressBar } from "@/components/dashboard/ui";
import { MOCK_PROGRAMS, MOCK_USERS, MOCK_SUBMISSIONS } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const totalInterns = MOCK_USERS.filter((u) => u.role === "intern").length;
  const pending = MOCK_SUBMISSIONS.filter((s) => s.status === "submitted" || s.status === "under_review").length;

  return (
    <>
      <PageHeader title="Program control center" subtitle="High-level metrics across all programs." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total interns" value={173} icon={Users} accent="from-rose-500 to-primary" delta={{ value: "+12 this month", positive: true }} />
        <StatCard label="Active programs" value={MOCK_PROGRAMS.length} icon={BookOpen} accent="from-primary to-blue-tint" />
        <StatCard label="Completion rate" value="94%" icon={Activity} accent="from-emerald-500 to-cyan" delta={{ value: "+3% MoM", positive: true }} />
        <StatCard label="Pending reviews" value={pending} icon={Inbox} accent="from-amber-500 to-rose-500" />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GlassCard className="p-6">
          <div className="text-sm font-semibold mb-4">Program enrollment</div>
          <div className="space-y-4">
            {MOCK_PROGRAMS.map((p) => {
              const pct = Math.min(100, Math.round((p.enrolled / 80) * 100));
              return (
                <div key={p.id}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium">{p.title}</span>
                    <span className="text-muted-foreground tabular-nums">{p.enrolled} / 80</span>
                  </div>
                  <ProgressBar value={pct} accent="from-rose-500 to-primary" />
                </div>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="text-sm font-semibold mb-4">Quick stats</div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { l: "Mentors", v: MOCK_USERS.filter(u=>u.role==="mentor").length },
              { l: "Active interns", v: totalInterns - 1 },
              { l: "Avg. completion", v: "9.4 wks" },
              { l: "Avg. score", v: "8.6" },
              { l: "NPS", v: "72" },
              { l: "Drop-off", v: "3%" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-xl p-4">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                <div className="mt-1 text-xl font-bold tabular-nums">{s.v}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </>
  );
}
