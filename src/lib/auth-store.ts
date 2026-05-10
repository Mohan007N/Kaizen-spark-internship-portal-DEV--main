import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Role } from "@/types";

export const DEMO_ACCOUNTS: Array<{ email: string; password: string; user: User }> = [
  {
    email: "mentor@kaizenspark.tech",
    password: "demo1234",
    user: {
      id: "u-mentor-1",
      name: "Dr. Priya Sharma",
      email: "mentor@kaizenspark.tech",
      role: "MENTOR",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15"),
    },
  },
  {
    email: "admin@kaizenspark.tech",
    password: "demo1234",
    user: {
      id: "u-admin-1",
      name: "Rohan Kapoor",
      email: "admin@kaizenspark.tech",
      role: "ADMIN",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
  },
];

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{ ok: true; user: User } | { ok: false; error: string }>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (email, password) => {
        try {
          // Call FastAPI backend
          const response = await fetch('http://localhost:8000/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          
          if (!response.ok) {
            return { ok: false, error: "Invalid credentials. Please check your email and password." };
          }
          
          const data = await response.json();
          const user: User = {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            createdAt: new Date(data.user.created_at),
            updatedAt: new Date(data.user.updated_at),
          };
          
          set({ user, token: data.access_token });
          return { ok: true, user };
        } catch (error) {
          // Fallback to demo accounts if backend is not running
          const match = DEMO_ACCOUNTS.find(
            (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password,
          );
          if (!match) return { ok: false, error: "Invalid credentials. Please check your email and password." };
          set({ user: match.user, token: 'demo-token' });
          return { ok: true, user: match.user };
        }
      },
      logout: () => set({ user: null, token: null }),
    }),
    { name: "kaizenspark-auth" },
  ),
);

export function roleHome(role: Role): string {
  switch (role) {
    case "INTERN":
      return "/intern";
    case "MENTOR":
      return "/mentor";
    case "ADMIN":
      return "/admin";
    default:
      return "/login";
  }
}
