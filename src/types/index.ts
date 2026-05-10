// Core Types for KaizenSpark Internship Platform

export type Role = 'ADMIN' | 'MENTOR' | 'INTERN';

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';

export type TaskDifficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  duration: number; // in weeks
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: TaskDifficulty;
  skills: string[];
  deadline: Date;
  referenceLinks?: string[];
  programId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Assignment {
  id: string;
  taskId: string;
  internId: string;
  mentorId: string;
  status: TaskStatus;
  assignedAt: Date;
  submittedAt?: Date;
  reviewedAt?: Date;
  task?: Task;
  intern?: User;
  mentor?: User;
}

export interface Submission {
  id: string;
  assignmentId: string;
  githubUrl?: string;
  fileUrl?: string;
  notes?: string;
  submittedAt: Date;
  assignment?: Assignment;
}

export interface Review {
  id: string;
  submissionId: string;
  mentorId: string;
  score: number; // 1-10
  feedback: string;
  status: 'APPROVED' | 'REJECTED';
  reviewedAt: Date;
  mentor?: User;
  submission?: Submission;
}

export interface Certificate {
  id: string;
  internId: string;
  programId: string;
  certificateId: string; // Unique certificate number
  issuedAt: Date;
  pdfUrl?: string;
  intern?: User;
  program?: Program;
}

// Dashboard Stats
export interface AdminStats {
  totalInterns: number;
  totalMentors: number;
  activeTasks: number;
  pendingReviews: number;
  completionRate: number;
  activePrograms: number;
}

export interface MentorStats {
  assignedInterns: number;
  pendingReviews: number;
  approvedSubmissions: number;
  averageScore: number;
}

export interface InternStats {
  assignedTasks: number;
  completedTasks: number;
  pendingTasks: number;
  averageScore: number;
  certificatesEarned: number;
}

// Form Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface CreateTaskForm {
  title: string;
  description: string;
  difficulty: TaskDifficulty;
  skills: string[];
  deadline: Date;
  referenceLinks?: string[];
  programId: string;
}

export interface SubmitTaskForm {
  assignmentId: string;
  githubUrl?: string;
  file?: File;
  notes?: string;
}

export interface ReviewTaskForm {
  submissionId: string;
  score: number;
  feedback: string;
  status: 'APPROVED' | 'REJECTED';
}

export interface CreateUserForm {
  email: string;
  name: string;
  password: string;
  role: Role;
}

export interface CreateProgramForm {
  name: string;
  description: string;
  duration: number;
  startDate: Date;
  endDate: Date;
}
