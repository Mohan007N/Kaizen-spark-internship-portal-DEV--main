import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Github, Download, CheckCircle2, XCircle, Star, Inbox } from "lucide-react";
import { PageHeader, GlassCard, Badge, EmptyState } from "@/components/dashboard/ui";
import { Drawer } from "@/components/dashboard/Overlays";
import { MOCK_SUBMISSIONS, statusMeta, type Submission } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/mentor/queue")({
  component: ReviewQueue,
});

function ReviewQueue() {
  const [items, setItems] = useState(MOCK_SUBMISSIONS.filter((s) => s.status === "submitted" || s.status === "under_review"));
  const [selected, setSelected] = useState<Submission | null>(null);
  const [score, setScore] = useState(8);
  const [feedback, setFeedback] = useState("");

  function decide(approve: boolean) {
    if (!selected) return;
    setItems((prev) => prev.filter((s) => s.id !== selected.id));
    toast.success(approve ? `Approved · ${selected.taskTitle}` : `Rejected · ${selected.taskTitle}`);
    setSelected(null); setFeedback(""); setScore(8);
  }

  return (
    <>
      <PageHeader title="Review queue" subtitle={`${items.length} submissions awaiting review.`} />
      {items.length === 0 ? (
        <EmptyState icon={Inbox} title="All caught up" hint="No pending submissions." />
      ) : (
        <GlassCard className="overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-muted-foreground">
                <th className="text-left font-medium px-5 py-3">Intern</th>
                <th className="text-left font-medium px-5 py-3">Task</th>
                <th className="text-left font-medium px-5 py-3 hidden md:table-cell">Submitted</th>
                <th className="text-left font-medium px-5 py-3">Status</th>
                <th className="text-right font-medium px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((s) => {
                const m = statusMeta(s.status);
                return (
                  <tr key={s.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-500 to-rose-500 grid place-items-center text-[10px] font-semibold">
                          {s.internName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <span className="font-medium">{s.internName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">{s.taskTitle}</td>
                    <td className="px-5 py-4 text-muted-foreground hidden md:table-cell">{s.submittedAt}</td>
                    <td className="px-5 py-4"><Badge className={m.className}>{m.label}</Badge></td>
                    <td className="px-5 py-4 text-right">
                      <button onClick={() => setSelected(s)} className="text-xs px-3 py-1.5 rounded-lg glass hover:bg-white/10">Review</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </GlassCard>
      )}

      <Drawer open={!!selected} onClose={() => setSelected(null)} title="Review submission">
        {selected && (
          <div className="space-y-5">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{selected.internName}</div>
              <h3 className="text-xl font-semibold mt-1">{selected.taskTitle}</h3>
            </div>
            <a
              href={selected.githubUrl} target="_blank" rel="noreferrer"
              className="flex items-center justify-between glass rounded-xl p-3 hover:bg-white/5"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Github className="h-4 w-4 text-cyan shrink-0" />
                <span className="text-sm font-mono truncate">{selected.githubUrl.replace("https://", "")}</span>
              </div>
              <span className="text-xs text-cyan">Open</span>
            </a>
            <button
              onClick={() => toast.info("Downloading…")}
              className="w-full flex items-center justify-between glass rounded-xl p-3 hover:bg-white/5"
            >
              <div className="flex items-center gap-3"><Download className="h-4 w-4 text-cyan" /> <span className="text-sm">submission.zip</span></div>
              <span className="text-xs text-cyan">Download</span>
            </button>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Score</label>
                <span className="text-sm font-mono text-cyan">{score}/10</span>
              </div>
              <input type="range" min={1} max={10} value={score} onChange={(e) => setScore(+e.target.value)} className="w-full accent-cyan" />
              <div className="mt-2 flex">
                {Array.from({ length: 10 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < score ? "fill-cyan text-cyan" : "text-white/15"}`} />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Feedback</label>
              <textarea
                value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={4}
                placeholder="Specific, actionable feedback…"
                className="w-full rounded-xl glass px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/60 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => decide(false)}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-rose-300 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 hover:shadow-[0_0_20px_-5px_rgba(244,63,94,0.7)] transition-all"
              >
                <XCircle className="h-4 w-4" /> Reject
              </button>
              <button
                onClick={() => decide(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.7)] transition-all"
              >
                <CheckCircle2 className="h-4 w-4" /> Approve
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
}
