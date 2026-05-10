import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  LayoutDashboard, ListChecks, Upload, MessageSquare, Award, User as UserIcon,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/lib/auth-store";

export const Route = createFileRoute("/intern")({
  head: () => ({ meta: [{ title: "Intern · KaizenSpark" }, { name: "robots", content: "noindex" }] }),
  component: InternLayout,
});

const nav = [
  { to: "/intern", label: "Dashboard", icon: LayoutDashboard },
  { to: "/intern/tasks", label: "My Tasks", icon: ListChecks },
  { to: "/intern/submissions", label: "Submissions", icon: Upload },
  { to: "/intern/feedback", label: "Feedback", icon: MessageSquare },
  { to: "/intern/certificate", label: "Certificate", icon: Award },
  { to: "/intern/profile", label: "Profile", icon: UserIcon },
];

function InternLayout() {
  const user = useAuth((s) => s.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate({ to: "/login" });
    else if (user.role !== "INTERN") navigate({ to: user.role === "MENTOR" ? "/mentor" : "/admin" });
  }, [user, navigate]);
  if (!user || user.role !== "INTERN") return null;
  return (
    <DashboardLayout nav={nav} role="INTERN" roleLabel="Intern" roleAccent="from-blue-tint to-cyan">
      <Outlet />
    </DashboardLayout>
  );
}
