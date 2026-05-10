import { useState, type ReactNode } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell, LogOut, Menu, X, Search, ChevronRight,
} from "lucide-react";
import { useAuth, type Role } from "@/lib/auth-store";
import { toast } from "sonner";
import { KaizenLogo } from "@/components/site/KaizenLogo";

export interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface DashboardLayoutProps {
  nav: NavItem[];
  role: Role;
  roleLabel: string;
  roleAccent: string; // e.g. "from-blue-tint to-cyan"
  children: ReactNode;
}

export function DashboardLayout({ nav, role, roleLabel, roleAccent, children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  function handleLogout() {
    logout();
    toast.success("Signed out");
    navigate({ to: "/login" });
  }

  const crumb = nav.find((n) => pathname === n.to || pathname.startsWith(n.to + "/"))?.label ?? "Overview";

  return (
    <div className="min-h-screen bg-midnight text-foreground relative">
      {/* Ambient bg */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-30 radial-fade" />
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan/10 blur-3xl" />
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 glass-strong border-r border-white/5 transform transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-16 items-center justify-between px-5 border-b border-white/5">
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${roleAccent} grid place-items-center shadow-glow`}>
              <KaizenLogo className="text-white" size={20} />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">KaizenSpark</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{roleLabel}</div>
            </div>
          </Link>
          <button onClick={() => setOpen(false)} className="lg:hidden text-muted-foreground hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.to || (item.to !== `/${role}` && pathname.startsWith(item.to + "/"));
            const exactRoot = item.to === `/${role}` && pathname === item.to;
            const isActive = active || exactRoot;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "text-white bg-white/5"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId={`active-${role}`}
                    className={`absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-gradient-to-b ${roleAccent}`}
                  />
                )}
                <Icon className={`h-4 w-4 ${isActive ? "text-cyan" : ""}`} />
                <span>{item.label}</span>
                {isActive && <ChevronRight className="ml-auto h-3.5 w-3.5 text-cyan" />}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="glass rounded-xl p-3 flex items-center gap-3">
            <div className={`h-9 w-9 shrink-0 rounded-full bg-gradient-to-br ${roleAccent} grid place-items-center text-xs font-semibold`}>
              {user?.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium truncate">{user?.name}</div>
              <div className="text-[10px] text-muted-foreground truncate">{user?.title}</div>
            </div>
            <button
              onClick={handleLogout}
              className="text-muted-foreground hover:text-rose-400 transition-colors"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop */}
      {open && (
        <div onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-black/50 lg:hidden" />
      )}

      {/* Main column */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 h-16 glass-strong border-b border-white/5 flex items-center px-4 lg:px-8 gap-4">
          <button onClick={() => setOpen(true)} className="lg:hidden text-muted-foreground">
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">{roleLabel}</span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
            <span className="font-medium">{crumb}</span>
          </div>
          <div className="hidden md:flex items-center gap-2 ml-6 glass rounded-lg px-3 py-1.5 w-72">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search…"
              className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground/60"
            />
            <kbd className="text-[10px] text-muted-foreground border border-white/10 rounded px-1.5 py-0.5">⌘K</kbd>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setNotifOpen((v) => !v)}
                className="relative h-9 w-9 grid place-items-center rounded-lg glass hover:bg-white/10 transition-colors"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-2 w-80 glass-strong rounded-xl border border-white/10 shadow-elevated p-3 z-30"
                  >
                    <div className="text-xs uppercase tracking-wider text-muted-foreground px-2 py-1">Notifications</div>
                    {[
                      { t: "New task assigned", d: "2m ago" },
                      { t: "Mentor approved your submission", d: "1h ago" },
                      { t: "Certificate ready to download", d: "Yesterday" },
                    ].map((n) => (
                      <div key={n.t} className="flex items-start gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                        <div className="h-2 w-2 rounded-full bg-cyan mt-1.5" />
                        <div className="flex-1">
                          <div className="text-sm">{n.t}</div>
                          <div className="text-xs text-muted-foreground">{n.d}</div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${roleAccent} grid place-items-center text-xs font-semibold`}>
              {user?.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8 max-w-[1600px] mx-auto">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
