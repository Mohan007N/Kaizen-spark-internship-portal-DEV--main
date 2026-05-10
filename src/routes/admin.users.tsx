import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, UserPlus } from "lucide-react";
import { PageHeader, GlassCard, Badge } from "@/components/dashboard/ui";
import { Modal } from "@/components/dashboard/Overlays";
import { MOCK_USERS, type PlatformUser } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/users")({
  component: UsersPage,
});

function UsersPage() {
  const [list, setList] = useState<PlatformUser[]>(MOCK_USERS);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "intern" | "mentor" | "admin">("all");

  const view = list.filter((u) => filter === "all" || u.role === filter);

  function toggle(id: string) {
    setList((p) => p.map((u) => (u.id === id ? { ...u, active: !u.active } : u)));
    toast.success("User updated");
  }

  return (
    <>
      <PageHeader
        title="Users" subtitle="Manage interns, mentors, and admins."
        action={
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary to-blue-tint glow"
          >
            <UserPlus className="h-4 w-4" /> Add user
          </button>
        }
      />
      <div className="mb-4 glass rounded-lg p-1 inline-flex">
        {(["all", "intern", "mentor", "admin"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${filter === f ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"}`}>
            {f}
          </button>
        ))}
      </div>

      <GlassCard className="overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-muted-foreground">
              <th className="text-left font-medium px-5 py-3">User</th>
              <th className="text-left font-medium px-5 py-3 hidden md:table-cell">Email</th>
              <th className="text-left font-medium px-5 py-3">Role</th>
              <th className="text-left font-medium px-5 py-3 hidden md:table-cell">Joined</th>
              <th className="text-right font-medium px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {view.map((u) => (
              <tr key={u.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-rose-500 to-primary grid place-items-center text-[10px] font-semibold">
                      {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <span className="font-medium">{u.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-muted-foreground hidden md:table-cell">{u.email}</td>
                <td className="px-5 py-4">
                  <Badge className="bg-white/5 text-foreground border-white/10 capitalize">{u.role}</Badge>
                </td>
                <td className="px-5 py-4 text-muted-foreground hidden md:table-cell">{u.joinedAt}</td>
                <td className="px-5 py-4 text-right">
                  <button onClick={() => toggle(u.id)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${u.active
                      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20"
                      : "bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10"}`}>
                    {u.active ? "Active" : "Inactive"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>

      <Modal open={open} onClose={() => setOpen(false)} title="Add user">
        <AddUserForm
          onSubmit={(u) => {
            setList((p) => [{ ...u, id: `u-${Date.now()}`, active: true, joinedAt: new Date().toISOString().slice(0, 10) }, ...p]);
            toast.success("User added"); setOpen(false);
          }}
        />
      </Modal>
    </>
  );
}

function AddUserForm({ onSubmit }: { onSubmit: (u: Omit<PlatformUser, "id" | "active" | "joinedAt">) => void }) {
  const [form, setForm] = useState({ name: "", email: "", role: "intern" as PlatformUser["role"] });
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}
      className="space-y-4"
    >
      <div>
        <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Full name</label>
        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-xl glass px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/60" />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Email</label>
        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-xl glass px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/60" />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Role</label>
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as PlatformUser["role"] })}
          className="w-full rounded-xl glass px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/60">
          <option value="intern" className="bg-midnight">Intern</option>
          <option value="mentor" className="bg-midnight">Mentor</option>
          <option value="admin" className="bg-midnight">Admin</option>
        </select>
      </div>
      <button type="submit" className="w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary to-blue-tint glow inline-flex items-center justify-center gap-2">
        <Plus className="h-4 w-4" /> Add user
      </button>
    </form>
  );
}
