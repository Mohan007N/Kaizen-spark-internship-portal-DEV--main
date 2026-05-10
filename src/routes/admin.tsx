import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LayoutDashboard, BookOpen, ListChecks, Users, Link2 } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/lib/auth-store";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · KaizenSpark" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/programs", label: "Programs", icon: BookOpen },
  { to: "/admin/tasks", label: "Tasks", icon: ListChecks },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/assignments", label: "Assignments", icon: Link2 },
];

function AdminLayout() {
  const user = useAuth((s) => s.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate({ to: "/login" });
    else if (user.role !== "ADMIN") navigate({ to: user.role === "INTERN" ? "/intern" : "/mentor" });
  }, [user, navigate]);
  if (!user || user.role !== "ADMIN") return null;
  return (
    <DashboardLayout nav={nav} role="ADMIN" roleLabel="Admin" roleAccent="from-rose-500 to-primary">
      <Outlet />
    </DashboardLayout>
  );
}
