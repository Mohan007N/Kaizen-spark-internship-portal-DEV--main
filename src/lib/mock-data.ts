export type TaskStatus = "assigned" | "in_progress" | "submitted" | "under_review" | "approved" | "rejected";
export type Difficulty = "easy" | "medium" | "hard";

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  difficulty: Difficulty;
  status: TaskStatus;
  skills: string[];
  domain: string;
  assignee?: string;
}

export interface Submission {
  id: string;
  taskId: string;
  taskTitle: string;
  internId: string;
  internName: string;
  githubUrl: string;
  notes: string;
  submittedAt: string;
  status: TaskStatus;
  score?: number;
  feedback?: string;
}

export interface Program {
  id: string;
  title: string;
  domain: string;
  duration: string;
  description: string;
  enrolled: number;
}

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: "INTERN" | "MENTOR" | "ADMIN";
  active: boolean;
  joinedAt: string;
  createdBy?: string; // ID of mentor/admin who created this user
}

// Empty arrays - data will be created by mentors/admins
export const MOCK_TASKS: Task[] = [];
export const MOCK_SUBMISSIONS: Submission[] = [];
export const MOCK_PROGRAMS: Program[] = [];
export const MOCK_USERS: PlatformUser[] = [];

export function statusMeta(s: TaskStatus) {
  switch (s) {
    case "approved":
      return { label: "Approved", className: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)]" };
    case "rejected":
      return { label: "Rejected", className: "bg-rose-500/15 text-rose-300 border-rose-500/30 shadow-[0_0_20px_-5px_rgba(244,63,94,0.5)]" };
    case "under_review":
      return { label: "Under Review", className: "bg-amber-500/15 text-amber-300 border-amber-500/30" };
    case "submitted":
      return { label: "Submitted", className: "bg-cyan/15 text-cyan border-cyan/30" };
    case "in_progress":
      return { label: "In Progress", className: "bg-blue-tint/15 text-blue-tint border-blue-tint/30" };
    case "assigned":
      return { label: "Assigned", className: "bg-white/5 text-muted-foreground border-white/10" };
  }
}

export function diffMeta(d: Difficulty) {
  if (d === "easy") return { label: "Easy", className: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" };
  if (d === "medium") return { label: "Medium", className: "bg-amber-500/10 text-amber-300 border-amber-500/20" };
  return { label: "Hard", className: "bg-rose-500/10 text-rose-300 border-rose-500/20" };
}
