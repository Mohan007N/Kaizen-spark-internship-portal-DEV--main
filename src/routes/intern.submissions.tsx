import { useState, useRef, type DragEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Upload, Github, FileText, Loader2, CheckCircle2, X } from "lucide-react";
import { PageHeader, GlassCard, Badge } from "@/components/dashboard/ui";
import { MOCK_SUBMISSIONS, statusMeta } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/intern/submissions")({
  component: SubmissionsPage,
});

function SubmissionsPage() {
  const [github, setGithub] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const valid = /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+/.test(github);

  function onDrop(e: DragEvent) {
    e.preventDefault(); setDrag(false);
    const f = e.dataTransfer.files?.[0]; if (f) setFile(f);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) { toast.error("Enter a valid GitHub URL"); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGithub(""); setNotes(""); setFile(null);
      toast.success("Submission sent for review");
    }, 900);
  }

  return (
    <>
      <PageHeader title="Submit Work" subtitle="Send your task for mentor review." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form onSubmit={submit} className="lg:col-span-2 glass-strong border-gradient rounded-2xl p-6 space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">GitHub URL</label>
            <div className="relative">
              <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={github} onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/username/repo"
                className={`w-full rounded-xl glass pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 ${github && !valid ? "ring-2 ring-rose-500/60" : "focus:ring-cyan/60"}`}
              />
            </div>
            {github && !valid && <div className="text-xs text-rose-400 mt-1">Enter a valid GitHub repository URL.</div>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">File upload</label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              className={`rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all ${drag ? "border-cyan bg-cyan/5" : "border-white/10 hover:border-white/20 glass"}`}
            >
              <input ref={inputRef} type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <FileText className="h-5 w-5 text-cyan" />
                  <span className="text-sm font-medium">{file.name}</span>
                  <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); }} className="text-muted-foreground hover:text-rose-400">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="h-6 w-6 text-cyan mx-auto" />
                  <div className="mt-2 text-sm font-medium">Drag & drop or click to upload</div>
                  <div className="text-xs text-muted-foreground mt-1">PDF, ZIP, or images up to 20MB</div>
                </>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Notes</label>
            <textarea
              value={notes} onChange={(e) => setNotes(e.target.value)} rows={4}
              placeholder="Anything your mentor should know…"
              className="w-full rounded-xl glass px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/60 resize-none"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary to-blue-tint glow hover:shadow-glow-cyan transition-all disabled:opacity-70"
          >
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : <><CheckCircle2 className="h-4 w-4" /> Submit for review</>}
          </button>
        </form>

        <GlassCard className="p-6">
          <div className="text-sm font-semibold mb-4">Recent submissions</div>
          <div className="space-y-3">
            {MOCK_SUBMISSIONS.filter((s) => s.internId === "u-intern-1").map((s) => {
              const m = statusMeta(s.status);
              return (
                <div key={s.id} className="glass rounded-xl p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-sm font-medium">{s.taskTitle}</div>
                    <Badge className={m.className}>{m.label}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{s.submittedAt}</div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </>
  );
}
