import { createFileRoute } from "@tanstack/react-router";
import { Award, Download, Lock } from "lucide-react";
import { PageHeader, GlassCard, Badge } from "@/components/dashboard/ui";
import { toast } from "sonner";
import { KaizenLogo } from "@/components/site/KaizenLogo";

export const Route = createFileRoute("/intern/certificate")({
  component: CertificatePage,
});

function CertificatePage() {
  const status = "pending" as "pending" | "approved";
  const ready = status === "approved";

  return (
    <>
      <PageHeader title="Certificate" subtitle="Your KaizenSpark internship certificate." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 p-2 overflow-hidden">
          <div className="relative rounded-xl bg-gradient-to-br from-deep-tech via-midnight to-tech-surface p-10 border border-white/5">
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-cyan grid place-items-center shadow-glow">
                    <KaizenLogo className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">KaizenSpark Tech</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Certificate of Completion</div>
                  </div>
                </div>
                <Award className="h-10 w-10 text-cyan/60" />
              </div>

              <div className="mt-12 text-center">
                <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Awarded to</div>
                <div className="mt-3 text-4xl font-bold text-gradient" style={{ fontFamily: "var(--font-display)" }}>
                  Aarav Mehta
                </div>
                <div className="mt-4 text-sm text-muted-foreground max-w-md mx-auto">
                  for successfully completing the AI/ML Engineering Track at KaizenSpark Tech with distinction.
                </div>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Issued</div>
                  <div className="mt-1 text-sm font-medium">—</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Credential ID</div>
                  <div className="mt-1 text-sm font-mono">KS-AI-XXXX</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Director</div>
                  <div className="mt-1 text-sm font-medium">R. Kapoor</div>
                </div>
              </div>
            </div>

            {!ready && (
              <div className="absolute inset-0 grid place-items-center bg-midnight/70 backdrop-blur-sm rounded-xl">
                <div className="text-center">
                  <Lock className="h-8 w-8 text-muted-foreground mx-auto" />
                  <div className="mt-3 text-sm font-medium">Pending approval</div>
                  <div className="text-xs text-muted-foreground">Available after program completion.</div>
                </div>
              </div>
            )}
          </div>
        </GlassCard>

        <GlassCard className="p-6 h-fit">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Status</div>
            <Badge className={ready ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" : "bg-amber-500/15 text-amber-300 border-amber-500/30"}>
              {ready ? "Approved" : "Pending"}
            </Badge>
          </div>
          <div className="mt-4 text-xs text-muted-foreground leading-relaxed">
            Your certificate unlocks once all assigned tasks are approved and the program director signs off.
          </div>
          <button
            disabled={!ready}
            onClick={() => toast.success("Certificate downloaded")}
            className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary to-blue-tint glow disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <Download className="h-4 w-4" />
            {ready ? "Download PDF" : "Locked"}
          </button>
        </GlassCard>
      </div>
    </>
  );
}
