// Mock API Service - Replace with real backend calls
import type {
  User,
  Program,
  Task,
  Assignment,
  Submission,
  Review,
  Certificate,
  AdminStats,
  MentorStats,
  InternStats,
  TaskStatus,
} from '@/types';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Helper function to get auth token
function getAuthToken(): string | null {
  const authData = localStorage.getItem('kaizenspark-auth');
  if (!authData) return null;
  try {
    const parsed = JSON.parse(authData);
    return parsed.state?.token || null;
  } catch {
    return null;
  }
}

// Helper function for API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }
  
  return response.json();
}

// Mock Data Store - Empty by default, data will be created by mentors/admins
const mockUsers: User[] = [];
const mockPrograms: Program[] = [];
const mockTasks: Task[] = [];
const mockAssignments: Assignment[] = [];
const mockSubmissions: Submission[] = [];
const mockReviews: Review[] = [];
const mockCertificates: Certificate[] = [];

// API Functions
export const api = {
  // Auth
  async login(email: string, password: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const user = mockUsers.find(u => u.email === email);
    // In production, verify password hash
    return user || null;
  },

  // Users
  async getUsers(): Promise<User[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUsers;
  },

  async getUserById(id: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockUsers.find(u => u.id === id) || null;
  },

  async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return apiRequest<User>('/users', {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: (data as any).password || 'temp123', // Password should be passed separately
        role: data.role,
      }),
    });
  },

  // Programs
  async getPrograms(): Promise<Program[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockPrograms;
  },

  async getProgramById(id: string): Promise<Program | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockPrograms.find(p => p.id === id) || null;
  },

  async createProgram(data: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>): Promise<Program> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newProgram: Program = {
      ...data,
      id: `prog-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockPrograms.push(newProgram);
    return newProgram;
  },

  // Tasks
  async getTasks(): Promise<Task[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockTasks;
  },

  async getTaskById(id: string): Promise<Task | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockTasks.find(t => t.id === id) || null;
  },

  async createTask(data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newTask: Task = {
      ...data,
      id: `task-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockTasks.push(newTask);
    return newTask;
  },

  // Assignments
  async getAssignments(): Promise<Assignment[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAssignments.map(a => ({
      ...a,
      task: mockTasks.find(t => t.id === a.taskId),
      intern: mockUsers.find(u => u.id === a.internId),
      mentor: mockUsers.find(u => u.id === a.mentorId),
    }));
  },

  async getAssignmentsByIntern(internId: string): Promise<Assignment[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAssignments
      .filter(a => a.internId === internId)
      .map(a => ({
        ...a,
        task: mockTasks.find(t => t.id === a.taskId),
        mentor: mockUsers.find(u => u.id === a.mentorId),
      }));
  },

  async getAssignmentsByMentor(mentorId: string): Promise<Assignment[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAssignments
      .filter(a => a.mentorId === mentorId)
      .map(a => ({
        ...a,
        task: mockTasks.find(t => t.id === a.taskId),
        intern: mockUsers.find(u => u.id === a.internId),
      }));
  },

  async createAssignment(data: Omit<Assignment, 'id' | 'assignedAt'>): Promise<Assignment> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newAssignment: Assignment = {
      ...data,
      id: `assign-${Date.now()}`,
      assignedAt: new Date(),
    };
    mockAssignments.push(newAssignment);
    return newAssignment;
  },

  async updateAssignmentStatus(id: string, status: TaskStatus): Promise<Assignment> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const assignment = mockAssignments.find(a => a.id === id);
    if (!assignment) throw new Error('Assignment not found');
    assignment.status = status;
    if (status === 'SUBMITTED') {
      assignment.submittedAt = new Date();
    }
    return assignment;
  },

  // Submissions
  async getSubmissions(): Promise<Submission[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockSubmissions.map(s => ({
      ...s,
      assignment: mockAssignments.find(a => a.id === s.assignmentId),
    }));
  },

  async getSubmissionsByAssignment(assignmentId: string): Promise<Submission | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockSubmissions.find(s => s.assignmentId === assignmentId) || null;
  },

  async createSubmission(data: Omit<Submission, 'id' | 'submittedAt'>): Promise<Submission> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newSubmission: Submission = {
      ...data,
      id: `sub-${Date.now()}`,
      submittedAt: new Date(),
    };
    mockSubmissions.push(newSubmission);
    
    // Update assignment status
    const assignment = mockAssignments.find(a => a.id === data.assignmentId);
    if (assignment) {
      assignment.status = 'SUBMITTED';
      assignment.submittedAt = new Date();
    }
    
    return newSubmission;
  },

  // Reviews
  async getReviews(): Promise<Review[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockReviews;
  },

  async createReview(data: Omit<Review, 'id' | 'reviewedAt'>): Promise<Review> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newReview: Review = {
      ...data,
      id: `rev-${Date.now()}`,
      reviewedAt: new Date(),
    };
    mockReviews.push(newReview);
    
    // Update assignment status
    const submission = mockSubmissions.find(s => s.id === data.submissionId);
    if (submission) {
      const assignment = mockAssignments.find(a => a.id === submission.assignmentId);
      if (assignment) {
        assignment.status = data.status === 'APPROVED' ? 'APPROVED' : 'REJECTED';
        assignment.reviewedAt = new Date();
      }
    }
    
    return newReview;
  },

  // Certificates
  async getCertificates(): Promise<Certificate[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [];
  },

  async getCertificatesByIntern(internId: string): Promise<Certificate[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [];
  },

  // Stats
  async getAdminStats(): Promise<AdminStats> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const interns = mockUsers.filter(u => u.role === 'INTERN');
    const mentors = mockUsers.filter(u => u.role === 'MENTOR');
    const pendingReviews = mockAssignments.filter(a => a.status === 'SUBMITTED').length;
    const completed = mockAssignments.filter(a => a.status === 'APPROVED').length;
    const total = mockAssignments.length;
    
    return {
      totalInterns: interns.length,
      totalMentors: mentors.length,
      activeTasks: mockTasks.length,
      pendingReviews,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      activePrograms: mockPrograms.filter(p => p.isActive).length,
    };
  },

  async getMentorStats(mentorId: string): Promise<MentorStats> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const assignments = mockAssignments.filter(a => a.mentorId === mentorId);
    const interns = new Set(assignments.map(a => a.internId)).size;
    const pendingReviews = assignments.filter(a => a.status === 'SUBMITTED').length;
    const approved = assignments.filter(a => a.status === 'APPROVED').length;
    const reviews = mockReviews.filter(r => r.mentorId === mentorId);
    const avgScore = reviews.length > 0 
      ? reviews.reduce((sum, r) => sum + r.score, 0) / reviews.length 
      : 0;
    
    return {
      assignedInterns: interns,
      pendingReviews,
      approvedSubmissions: approved,
      averageScore: Math.round(avgScore * 10) / 10,
    };
  },

  async getInternStats(internId: string): Promise<InternStats> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const assignments = mockAssignments.filter(a => a.internId === internId);
    const completed = assignments.filter(a => a.status === 'APPROVED').length;
    const pending = assignments.filter(a => 
      a.status === 'PENDING' || a.status === 'IN_PROGRESS'
    ).length;
    
    const submissions = mockSubmissions.filter(s => 
      assignments.some(a => a.id === s.assignmentId)
    );
    const reviews = mockReviews.filter(r => 
      submissions.some(s => s.id === r.submissionId)
    );
    const avgScore = reviews.length > 0 
      ? reviews.reduce((sum, r) => sum + r.score, 0) / reviews.length 
      : 0;
    
    return {
      assignedTasks: assignments.length,
      completedTasks: completed,
      pendingTasks: pending,
      averageScore: Math.round(avgScore * 10) / 10,
      certificatesEarned: 0,
    };
  },
};
