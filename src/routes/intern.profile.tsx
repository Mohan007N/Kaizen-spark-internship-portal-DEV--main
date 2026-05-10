import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Github, Linkedin, Save } from "lucide-react";
import { PageHeader, GlassCard } from "@/components/dashboard/ui";
import { useAuth } from "@/lib/auth-store";
import { toast } from "sonner";

export const Route = createFileRoute("/intern/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const user = useAuth((s) => s.user);
  return (
    <>
      <PageHeader title="Profile" subtitle="Manage your personal information." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="p-6 text-center">
          <div className="mx-auto h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-tint to-cyan grid place-items-center text-2xl font-bold shadow-glow">
            {user?.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div className="mt-4 text-lg font-semibold">{user?.name}</div>
          <div className="text-xs text-muted-foreground">{user?.title}</div>
          <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Mail className="h-3 w-3" /> {user?.email}
          </div>
          <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" /> Bengaluru, India
          </div>
        </GlassCard>

        <form
          onSubmit={(e) => { e.preventDefault(); toast.success("Profile updated"); }}
          className="lg:col-span-2 glass-strong border-gradient rounded-2xl p-6 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full name" defaultValue={user?.name} />
            <Field label="Title" defaultValue={user?.title} />
            <Field label="Email" type="email" defaultValue={user?.email} />
            <Field label="Phone" defaultValue="+91 98xxx xxxxx" />
          </div>
          <Field label="Bio" textarea defaultValue="ML engineer in training. Loves transformers and clean code." />
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="GitHub" icon={Github} defaultValue="github.com/aarav" />
            <Field label="LinkedIn" icon={Linkedin} defaultValue="linkedin.com/in/aarav" />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary to-blue-tint glow"
          >
            <Save className="h-4 w-4" /> Save changes
          </button>
        </form>
      </div>
    </>
  );
}

function Field({ label, defaultValue, type = "text", textarea, icon: Icon }: {
  label: string; defaultValue?: string; type?: string; textarea?: boolean; icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className={textarea ? "sm:col-span-2" : ""}>
      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />}
        {textarea ? (
          <textarea defaultValue={defaultValue} rows={3}
            className="w-full rounded-xl glass px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/60 resize-none" />
        ) : (
          <input type={type} defaultValue={defaultValue}
            className={`w-full rounded-xl glass ${Icon ? "pl-10" : "px-4"} pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/60`} />
        )}
      </div>
    </div>
  );
}
