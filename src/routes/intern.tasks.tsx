import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Tag, ExternalLink, ListChecks, LayoutGrid, List } from "lucide-react";
import { PageHeader, GlassCard, Badge, EmptyState } from "@/components/dashboard/ui";
import { Drawer } from "@/components/dashboard/Overlays";
import { TaskCalendar } from "@/components/dashboard/TaskCalendar";
import { MOCK_TASKS, statusMeta, diffMeta, type Task } from "@/lib/mock-data";

export const Route = createFileRoute("/intern/tasks")({
  component: TasksPage,
});

function TasksPage() {
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");
  const [selected, setSelected] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  const filtered = MOCK_TASKS.filter((t) => {
    if (filter === "active") return t.status !== "approved" && t.status !== "rejected";
    if (filter === "done") return t.status === "approved";
    return true;
  });

  return (
    <>
      <PageHeader
        title="My Tasks"
        subtitle="All assignments across your internship."
        action={
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="glass rounded-lg p-1 flex">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"}`}
                title="List view"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("calendar")}
                className={`p-2 rounded-md transition-colors ${viewMode === "calendar" ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"}`}
                title="Calendar view"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>

            {/* Filter */}
            <div className="glass rounded-lg p-1 flex">
              {(["all", "active", "done"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${filter === f ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        }
      />

      {filtered.length === 0 ? (
        <EmptyState icon={ListChecks} title="No tasks" hint="Try a different filter." />
      ) : viewMode === "calendar" ? (
        <TaskCalendar tasks={filtered} onTaskClick={setSelected} />
      ) : (
        <GlassCard className="overflow-hidden">
          {/* Desktop */}
          <div className="hidden md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="text-left font-medium px-5 py-3">Task</th>
                  <th className="text-left font-medium px-5 py-3">Domain</th>
                  <th className="text-left font-medium px-5 py-3">Deadline</th>
                  <th className="text-left font-medium px-5 py-3">Difficulty</th>
                  <th className="text-left font-medium px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => {
                  const sm = statusMeta(t.status); const dm = diffMeta(t.difficulty);
                  return (
                    <tr
                      key={t.id}
                      onClick={() => setSelected(t)}
                      className="border-b border-white/5 last:border-0 hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="font-medium">{t.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{t.description}</div>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{t.domain}</td>
                      <td className="px-5 py-4 text-muted-foreground">{t.deadline}</td>
                      <td className="px-5 py-4"><Badge className={dm.className}>{dm.label}</Badge></td>
                      <td className="px-5 py-4"><Badge className={sm.className}>{sm.label}</Badge></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Mobile */}
          <div className="md:hidden divide-y divide-white/5">
            {filtered.map((t) => {
              const sm = statusMeta(t.status); const dm = diffMeta(t.difficulty);
              return (
                <button key={t.id} onClick={() => setSelected(t)} className="w-full text-left p-4 hover:bg-white/5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-medium truncate">{t.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2 mt-1">{t.description}</div>
                    </div>
                    <Badge className={sm.className}>{sm.label}</Badge>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" /> {t.deadline}
                    <Badge className={dm.className}>{dm.label}</Badge>
                  </div>
                </button>
              );
            })}
          </div>
        </GlassCard>
      )}

      <Drawer open={!!selected} onClose={() => setSelected(null)} title="Task detail">
        {selected && (
          <div className="space-y-5">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{selected.domain}</div>
              <h3 className="mt-1 text-xl font-semibold">{selected.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className={statusMeta(selected.status).className}>{statusMeta(selected.status).label}</Badge>
                <Badge className={diffMeta(selected.difficulty).className}>{diffMeta(selected.difficulty).label}</Badge>
                <Badge className="bg-white/5 text-muted-foreground border-white/10"><Calendar className="h-3 w-3" /> Due {selected.deadline}</Badge>
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Description</div>
              <p className="text-sm leading-relaxed">{selected.description}</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Skills</div>
              <div className="flex flex-wrap gap-1.5">
                {selected.skills.map((s) => (
                  <Badge key={s} className="bg-white/5 text-foreground border-white/10"><Tag className="h-3 w-3" /> {s}</Badge>
                ))}
              </div>
            </div>
            <a
              href="/intern/submissions"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary to-blue-tint glow"
            >
              Submit work <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
      </Drawer>
    </>
  );
}
