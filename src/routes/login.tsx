import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth, DEMO_ACCOUNTS, roleHome } from "@/lib/auth-store";
import { toast } from "sonner";
import { KaizenLogo } from "@/components/site/KaizenLogo";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — KaizenSpark Intern Platform" },
      { name: "description", content: "Sign in to the KaizenSpark internship management platform." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const login = useAuth((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    login(email, password).then((result) => {
      setLoading(false);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(`Welcome back, ${result.user.name.split(" ")[0]}`);
      navigate({ to: roleHome(result.user.role) });
    });
  }

  function quickLogin(e: string, p: string) {
    setEmail(e); setPassword(p);
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-midnight grid lg:grid-cols-2">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-30 radial-fade" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan/10 blur-3xl" />
      </div>

      {/* Left: Form */}
      <div className="flex flex-col justify-center px-6 py-12 lg:px-16">
        <Link to="/" className="inline-flex items-center gap-2 mb-12 w-fit">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-cyan grid place-items-center shadow-glow">
            <KaizenLogo className="text-white" size={20} />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">KaizenSpark</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Intern Platform</div>
          </div>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-auto lg:mx-0"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground mb-6">
            <ShieldCheck className="h-3 w-3 text-cyan" />
            Private workspace · intern.kaizenspark.com
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to continue your internship journey.</p>

          <form onSubmit={submit} className="mt-8 space-y-4 glass-strong rounded-2xl p-6 border-gradient">
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@kaizenspark.tech"
                  className="w-full rounded-xl glass pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/60"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl glass pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/60"
                />
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary to-blue-tint glow hover:shadow-glow-cyan transition-all disabled:opacity-70"
            >
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</> : <>Sign in <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 glass rounded-2xl p-4">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">Demo accounts (click to autofill)</div>
            <div className="grid gap-2">
              {DEMO_ACCOUNTS.map((a) => (
                <button
                  type="button"
                  key={a.email}
                  onClick={() => quickLogin(a.email, a.password)}
                  className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 hover:bg-white/5 transition-colors text-left"
                >
                  <div>
                    <div className="text-sm font-medium capitalize">{a.user.role}</div>
                    <div className="text-xs text-muted-foreground">{a.email}</div>
                  </div>
                  <div className="text-[10px] font-mono text-cyan">{a.password}</div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right: Visual */}
      <div className="hidden lg:flex relative items-center justify-center p-12 border-l border-white/5">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-full max-w-md"
        >
          <div className="glass-strong rounded-3xl p-6 border-gradient shadow-elevated">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-rose-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
              </div>
              <div className="ml-2 text-[10px] text-muted-foreground font-mono">intern.kaizenspark.com</div>
            </div>

            <div className="space-y-3">
              {["Dashboard", "Tasks", "Submissions", "Feedback"].map((l, i) => (
                <motion.div
                  key={l}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="glass rounded-lg p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded-md bg-gradient-to-br from-blue-tint to-cyan" />
                    <div className="text-sm">{l}</div>
                  </div>
                  <div className="text-xs text-cyan font-mono">{(i + 1) * 23}%</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                { d: "AI/ML", v: 48 },
                { d: "Web", v: 72 },
                { d: "Cloud", v: 31 },
              ].map((x) => (
                <div key={x.d} className="glass rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-gradient">{x.v}</div>
                  <div className="text-[10px] text-muted-foreground">{x.d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -top-6 -right-6 glass-strong rounded-2xl p-4 shadow-glow-cyan">
            <div className="text-[10px] text-muted-foreground">Active interns</div>
            <div className="text-2xl font-bold text-gradient">173</div>
          </div>
          <div className="absolute -bottom-6 -left-6 glass-strong rounded-2xl p-4 shadow-glow">
            <div className="text-[10px] text-muted-foreground">Completion rate</div>
            <div className="text-2xl font-bold text-cyan">94%</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
