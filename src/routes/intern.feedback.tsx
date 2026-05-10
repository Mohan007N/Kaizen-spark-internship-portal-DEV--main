import { createFileRoute } from "@tanstack/react-router";
import { Star, MessageSquare } from "lucide-react";
import { PageHeader, GlassCard, Badge, EmptyState } from "@/components/dashboard/ui";
import { MOCK_SUBMISSIONS, statusMeta } from "@/lib/mock-data";

export const Route = createFileRoute("/intern/feedback")({
  component: FeedbackPage,
});

function FeedbackPage() {
  const items = MOCK_SUBMISSIONS.filter((s) => s.internId === "u-intern-1");
  return (
    <>
      <PageHeader title="Feedback" subtitle="Reviews from your mentors." />
      {items.length === 0 ? (
        <EmptyState icon={MessageSquare} title="No feedback yet" hint="Submit a task to receive mentor feedback." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {items.map((s) => {
            const m = statusMeta(s.status);
            return (
              <GlassCard key={s.id} className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.submittedAt}</div>
                    <div className="mt-1 text-base font-semibold">{s.taskTitle}</div>
                  </div>
                  <Badge className={m.className}>{m.label}</Badge>
                </div>
                {s.score !== undefined && (
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < (s.score ?? 0) ? "fill-cyan text-cyan" : "text-white/15"}`} />
                      ))}
                    </div>
                    <span className="text-sm font-mono text-cyan">{s.score}/10</span>
                  </div>
                )}
                <div className="mt-4 glass rounded-xl p-4">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Mentor note</div>
                  <p className="text-sm leading-relaxed">{s.feedback ?? "Awaiting mentor review."}</p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}
    </>
  );
}
