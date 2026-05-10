import { createFileRoute } from "@tanstack/react-router";
import { Users, Inbox, CheckCircle2, Clock, ArrowUpRight } from "lucide-react";
import { PageHeader, StatCard, GlassCard, Badge } from "@/components/dashboard/ui";
import { MOCK_SUBMISSIONS, MOCK_USERS, statusMeta } from "@/lib/mock-data";

export const Route = createFileRoute("/mentor/")({
  component: MentorDashboard,
});

function MentorDashboard() {
  const interns = MOCK_USERS.filter((u) => u.role === "intern" && u.active);
  const pending = MOCK_SUBMISSIONS.filter((s) => s.status === "submitted" || s.status === "under_review");
  const completed = MOCK_SUBMISSIONS.filter((s) => s.status === "approved" || s.status === "rejected");

  return (
    <>
      <PageHeader title="Mentor overview" subtitle="Track your interns and review submissions." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Assigned interns" value={interns.length} icon={Users} accent="from-amber-500 to-rose-500" />
        <StatCard label="Pending reviews" value={pending.length} icon={Inbox} accent="from-cyan to-blue-tint" delta={{ value: "+2 today", positive: true }} />
        <StatCard label="Completed reviews" value={completed.length} icon={CheckCircle2} accent="from-emerald-500 to-cyan" />
        <StatCard label="Avg. response" value="4.2h" icon={Clock} accent="from-primary to-blue-tint" delta={{ value: "-12% week", positive: true }} />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold">Latest queue</div>
            <a href="/mentor/queue" className="text-xs text-cyan inline-flex items-center gap-1 hover:underline">View all <ArrowUpRight className="h-3 w-3" /></a>
          </div>
          <div className="space-y-2">
            {pending.map((s) => {
              const m = statusMeta(s.status);
              return (
                <div key={s.id} className="glass rounded-xl p-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{s.taskTitle}</div>
                    <div className="text-xs text-muted-foreground">{s.internName} · {s.submittedAt}</div>
                  </div>
                  <Badge className={m.className}>{m.label}</Badge>
                </div>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="text-sm font-semibold mb-4">Your interns</div>
          <div className="space-y-2">
            {interns.map((i) => (
              <div key={i.id} className="glass rounded-xl p-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-500 to-rose-500 grid place-items-center text-xs font-semibold">
                  {i.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{i.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{i.email}</div>
                </div>
                <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30">Active</Badge>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </>
  );
}
