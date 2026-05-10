import { createFileRoute } from "@tanstack/react-router";
import { Users, Mail } from "lucide-react";
import { PageHeader, GlassCard, Badge } from "@/components/dashboard/ui";
import { MOCK_USERS, MOCK_SUBMISSIONS } from "@/lib/mock-data";

export const Route = createFileRoute("/mentor/interns")({
  component: InternsList,
});

function InternsList() {
  const interns = MOCK_USERS.filter((u) => u.role === "intern");
  return (
    <>
      <PageHeader title="Interns" subtitle={`${interns.length} interns assigned to you.`} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {interns.map((i) => {
          const submissions = MOCK_SUBMISSIONS.filter((s) => s.internId === i.id).length;
          return (
            <GlassCard key={i.id} className="p-5">
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 grid place-items-center text-sm font-semibold shadow-glow">
                  {i.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold">{i.name}</div>
                      <div className="text-xs text-muted-foreground inline-flex items-center gap-1"><Mail className="h-3 w-3" /> {i.email}</div>
                    </div>
                    <Badge className={i.active ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" : "bg-white/5 text-muted-foreground border-white/10"}>
                      {i.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="glass rounded-lg p-2 text-center">
                      <div className="text-[10px] text-muted-foreground">Submissions</div>
                      <div className="text-sm font-semibold">{submissions}</div>
                    </div>
                    <div className="glass rounded-lg p-2 text-center">
                      <div className="text-[10px] text-muted-foreground">Joined</div>
                      <div className="text-sm font-semibold">{i.joinedAt}</div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </>
  );
}
