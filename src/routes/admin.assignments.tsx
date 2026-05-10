import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Link2, Plus, X } from "lucide-react";
import { PageHeader, GlassCard, Badge } from "@/components/dashboard/ui";
import { MOCK_TASKS, MOCK_USERS, statusMeta } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/assignments")({
  component: Assignments,
});

interface Assignment { id: string; taskId: string; internId: string; }

const initial: Assignment[] = [
  { id: "a-1", taskId: "t-1", internId: "u-intern-1" },
  { id: "a-2", taskId: "t-3", internId: "u-intern-1" },
  { id: "a-3", taskId: "t-5", internId: "u-intern-2" },
  { id: "a-4", taskId: "t-2", internId: "u-intern-1" },
];

function Assignments() {
  const [list, setList] = useState<Assignment[]>(initial);
  const [taskId, setTaskId] = useState(MOCK_TASKS[0].id);
  const [internId, setInternId] = useState(MOCK_USERS.find((u) => u.role === "intern")!.id);
  const interns = MOCK_USERS.filter((u) => u.role === "intern");

  function add(e: React.FormEvent) {
    e.preventDefault();
    setList((p) => [{ id: `a-${Date.now()}`, taskId, internId }, ...p]);
    toast.success("Assignment created");
  }

  function remove(id: string) {
    setList((p) => p.filter((a) => a.id !== id));
  }

  return (
    <>
      <PageHeader title="Assignments" subtitle="Assign tasks to interns and track status." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form onSubmit={add} className="glass-strong border-gradient rounded-2xl p-6 space-y-4">
          <div className="text-sm font-semibold inline-flex items-center gap-2"><Link2 className="h-4 w-4 text-cyan" /> New assignment</div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Task</label>
            <select value={taskId} onChange={(e) => setTaskId(e.target.value)}
              className="w-full rounded-xl glass px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/60">
              {MOCK_TASKS.map((t) => <option key={t.id} value={t.id} className="bg-midnight">{t.title}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Intern</label>
            <select value={internId} onChange={(e) => setInternId(e.target.value)}
              className="w-full rounded-xl glass px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/60">
              {interns.map((u) => <option key={u.id} value={u.id} className="bg-midnight">{u.name}</option>)}
            </select>
          </div>
          <button type="submit" className="w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary to-blue-tint glow inline-flex items-center justify-center gap-2">
            <Plus className="h-4 w-4" /> Assign
          </button>
        </form>

        <GlassCard className="lg:col-span-2 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-muted-foreground">
                <th className="text-left font-medium px-5 py-3">Task</th>
                <th className="text-left font-medium px-5 py-3">Intern</th>
                <th className="text-left font-medium px-5 py-3">Status</th>
                <th className="text-right font-medium px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {list.map((a) => {
                const t = MOCK_TASKS.find((x) => x.id === a.taskId)!;
                const u = MOCK_USERS.find((x) => x.id === a.internId)!;
                const m = statusMeta(t.status);
                return (
                  <tr key={a.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                    <td className="px-5 py-4 font-medium">{t.title}</td>
                    <td className="px-5 py-4 text-muted-foreground">{u.name}</td>
                    <td className="px-5 py-4"><Badge className={m.className}>{m.label}</Badge></td>
                    <td className="px-5 py-4 text-right">
                      <button onClick={() => remove(a.id)} className="text-muted-foreground hover:text-rose-400">
                        <X className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </GlassCard>
      </div>
    </>
  );
}
