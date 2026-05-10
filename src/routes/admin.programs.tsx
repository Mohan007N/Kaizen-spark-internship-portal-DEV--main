import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Edit3, Users } from "lucide-react";
import { PageHeader, GlassCard, Badge } from "@/components/dashboard/ui";
import { Modal } from "@/components/dashboard/Overlays";
import { MOCK_PROGRAMS, type Program } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/programs")({
  component: ProgramsPage,
});

function ProgramsPage() {
  const [list, setList] = useState<Program[]>(MOCK_PROGRAMS);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Program | null>(null);

  function save(form: Omit<Program, "id" | "enrolled">) {
    if (editing) {
      setList((p) => p.map((x) => (x.id === editing.id ? { ...x, ...form } : x)));
      toast.success("Program updated");
    } else {
      setList((p) => [...p, { ...form, id: `p-${Date.now()}`, enrolled: 0 }]);
      toast.success("Program created");
    }
    setOpen(false); setEditing(null);
  }

  return (
    <>
      <PageHeader
        title="Programs" subtitle="Create and manage internship tracks."
        action={
          <button
            onClick={() => { setEditing(null); setOpen(true); }}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary to-blue-tint glow"
          >
            <Plus className="h-4 w-4" /> New program
          </button>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {list.map((p) => (
          <GlassCard key={p.id} className="p-6">
            <div className="flex items-start justify-between">
              <Badge className="bg-primary/15 text-blue-tint border-primary/30">{p.domain}</Badge>
              <button onClick={() => { setEditing(p); setOpen(true); }} className="text-muted-foreground hover:text-cyan">
                <Edit3 className="h-4 w-4" />
              </button>
            </div>
            <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{p.description}</p>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{p.duration}</span>
              <span className="inline-flex items-center gap-1 text-cyan"><Users className="h-3 w-3" /> {p.enrolled}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      <Modal open={open} onClose={() => { setOpen(false); setEditing(null); }} title={editing ? "Edit program" : "New program"}>
        <ProgramForm initial={editing ?? undefined} onSubmit={save} />
      </Modal>
    </>
  );
}

function ProgramForm({ initial, onSubmit }: { initial?: Program; onSubmit: (p: Omit<Program, "id" | "enrolled">) => void }) {
  const [form, setForm] = useState({
    title: initial?.title ?? "",
    duration: initial?.duration ?? "8 weeks",
    domain: initial?.domain ?? "Web",
    description: initial?.description ?? "",
  });
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}
      className="space-y-4"
    >
      <FieldText label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
      <div className="grid grid-cols-2 gap-3">
        <FieldText label="Duration" value={form.duration} onChange={(v) => setForm({ ...form, duration: v })} />
        <FieldText label="Domain" value={form.domain} onChange={(v) => setForm({ ...form, domain: v })} />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Description</label>
        <textarea
          required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
          className="w-full rounded-xl glass px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/60 resize-none"
        />
      </div>
      <button type="submit" className="w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary to-blue-tint glow">
        {initial ? "Save changes" : "Create program"}
      </button>
    </form>
  );
}

function FieldText({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</label>
      <input
        required value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl glass px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/60"
      />
    </div>
  );
}
