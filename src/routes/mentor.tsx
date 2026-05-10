import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LayoutDashboard, Users, Inbox, History, UserPlus } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/lib/auth-store";

export const Route = createFileRoute("/mentor")({
  head: () => ({ meta: [{ title: "Mentor · KaizenSpark" }, { name: "robots", content: "noindex" }] }),
  component: MentorLayout,
});

const nav = [
  { to: "/mentor", label: "Dashboard", icon: LayoutDashboard },
  { to: "/mentor/create-intern", label: "Create Intern", icon: UserPlus },
  { to: "/mentor/interns", label: "My Interns", icon: Users },
  { to: "/mentor/queue", label: "Review Queue", icon: Inbox },
  { to: "/mentor/history", label: "Feedback History", icon: History },
];

function MentorLayout() {
  const user = useAuth((s) => s.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate({ to: "/login" });
    else if (user.role !== "MENTOR") navigate({ to: user.role === "INTERN" ? "/intern" : "/admin" });
  }, [user, navigate]);
  if (!user || user.role !== "MENTOR") return null;
  return (
    <DashboardLayout nav={nav} role="MENTOR" roleLabel="Mentor" roleAccent="from-amber-500 to-rose-500">
      <Outlet />
    </DashboardLayout>
  );
}
