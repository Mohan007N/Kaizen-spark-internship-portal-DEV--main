import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PageHeader, GlassCard, Badge } from "@/components/dashboard/ui";
import { Modal } from "@/components/dashboard/Overlays";
import { MOCK_TASKS, diffMeta, statusMeta, type Task, type Difficulty } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/tasks")({
  component: AdminTasks,
});

function AdminTasks() {
  const [list, setList] = useState<Task[]>(MOCK_TASKS);
  const [open, setOpen] = useState(false);

  return (
    <>
      <PageHeader
        title="Tasks" subtitle="Create tasks and assign them to interns."
        action={
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary to-blue-tint glow"
          >
            <Plus className="h-4 w-4" /> New task
          </button>
        }
      />
      <GlassCard className="overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-muted-foreground">
              <th className="text-left font-medium px-5 py-3">Title</th>
              <th className="text-left font-medium px-5 py-3 hidden md:table-cell">Domain</th>
              <th className="text-left font-medium px-5 py-3 hidden md:table-cell">Due</th>
              <th className="text-left font-medium px-5 py-3">Difficulty</th>
              <th className="text-left font-medium px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {list.map((t) => {
              const dm = diffMeta(t.difficulty); const sm = statusMeta(t.status);
              return (
                <tr key={t.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-medium">{t.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{t.description}</div>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground hidden md:table-cell">{t.domain}</td>
                  <td className="px-5 py-4 text-muted-foreground hidden md:table-cell">{t.deadline}</td>
                  <td className="px-5 py-4"><Badge className={dm.className}>{dm.label}</Badge></td>
                  <td className="px-5 py-4"><Badge className={sm.className}>{sm.label}</Badge></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </GlassCard>

      <Modal open={open} onClose={() => setOpen(false)} title="Create task">
        <TaskForm
          onSubmit={(t) => {
            setList((p) => [{ ...t, id: `t-${Date.now()}`, status: "assigned" }, ...p]);
            toast.success("Task created"); setOpen(false);
          }}
        />
      </Modal>
    </>
  );
}

function TaskForm({ onSubmit }: { onSubmit: (t: Omit<Task, "id" | "status">) => void }) {
  const [form, setForm] = useState({
    title: "", description: "", deadline: "2026-06-01",
    difficulty: "medium" as Difficulty, domain: "Web", skills: "", refs: "",
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          title: form.title, description: form.description, deadline: form.deadline,
          difficulty: form.difficulty, domain: form.domain,
          skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
        });
      }}
      className="space-y-4"
    >
      <Input label="Title" v={form.title} onChange={(v) => setForm({ ...form, title: v })} />
      <div>
        <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Description</label>
        <textarea
          required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
          className="w-full rounded-xl glass px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/60 resize-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Due date" type="date" v={form.deadline} onChange={(v) => setForm({ ...form, deadline: v })} />
        <div>
          <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Difficulty</label>
          <select
            value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value as Difficulty })}
            className="w-full rounded-xl glass px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/60"
          >
            <option value="easy" className="bg-midnight">Easy</option>
            <option value="medium" className="bg-midnight">Medium</option>
            <option value="hard" className="bg-midnight">Hard</option>
          </select>
        </div>
      </div>
      <Input label="Skills (comma separated)" v={form.skills} onChange={(v) => setForm({ ...form, skills: v })} />
      <Input label="Reference links" v={form.refs} onChange={(v) => setForm({ ...form, refs: v })} />
      <button type="submit" className="w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary to-blue-tint glow">
        Create task
      </button>
    </form>
  );
}

function Input({ label, v, onChange, type = "text" }: { label: string; v: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</label>
      <input
        required type={type} value={v} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl glass px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/60"
      />
    </div>
  );
}
