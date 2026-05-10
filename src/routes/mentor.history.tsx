import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { PageHeader, GlassCard, Badge } from "@/components/dashboard/ui";
import { MOCK_SUBMISSIONS, statusMeta } from "@/lib/mock-data";

export const Route = createFileRoute("/mentor/history")({
  component: HistoryPage,
});

function HistoryPage() {
  const items = MOCK_SUBMISSIONS.filter((s) => s.status === "approved" || s.status === "rejected");
  return (
    <>
      <PageHeader title="Feedback history" subtitle="Past reviews you've completed." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {items.map((s) => {
          const m = statusMeta(s.status);
          return (
            <GlassCard key={s.id} className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.submittedAt}</div>
                  <div className="mt-1 text-base font-semibold">{s.taskTitle}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.internName}</div>
                </div>
                <Badge className={m.className}>{m.label}</Badge>
              </div>
              {s.score !== undefined && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < (s.score ?? 0) ? "fill-cyan text-cyan" : "text-white/15"}`} />
                    ))}
                  </div>
                  <span className="text-sm font-mono text-cyan">{s.score}/10</span>
                </div>
              )}
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.feedback ?? "—"}</p>
            </GlassCard>
          );
        })}
      </div>
    </>
  );
}
