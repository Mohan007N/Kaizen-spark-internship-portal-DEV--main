import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UserPlus, Mail, User, Lock, Loader2 } from "lucide-react";
import { PageHeader, GlassCard } from "@/components/dashboard/ui";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-store";
import { api } from "@/lib/api";

export const Route = createFileRoute("/mentor/create-intern")({
  component: CreateInternPage,
});

function CreateInternPage() {
  const user = useAuth((s) => s.user);
  const [loading, setLoading] = useState(false);
  const [createdInterns, setCreatedInterns] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // Create intern account via API
      const newIntern = await api.createUser({
        name: formData.name,
        email: formData.email,
        role: "INTERN",
        password: formData.password, // Pass password
      } as any);

      // Add to created interns list
      setCreatedInterns([{ ...newIntern, password: formData.password }, ...createdInterns]);

      toast.success(`Intern account created for ${formData.email}`);
      toast.info("Share the login credentials with the intern");
      
      // Reset form
      setFormData({ name: "", email: "", password: "" });
    } catch (error: any) {
      toast.error(error.message || "Failed to create intern account");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function generatePassword() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, password });
    toast.success("Secure password generated");
  }

  return (
    <>
      <PageHeader 
        title="Create Intern Account" 
        subtitle="Add a new intern to your mentorship program"
      />

      <div className="max-w-2xl">
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 grid place-items-center">
              <UserPlus className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">New Intern Registration</h2>
              <p className="text-xs text-muted-foreground">
                Create login credentials for your intern
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Aarav Mehta"
                  className="w-full rounded-xl glass pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/60"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="intern@example.com"
                  className="w-full rounded-xl glass pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/60"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">
                Login credentials will be sent to this email
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Initial Password <span className="text-rose-400">*</span>
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter or generate password"
                    className="w-full rounded-xl glass pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/60 font-mono"
                  />
                </div>
                <button
                  type="button"
                  onClick={generatePassword}
                  className="px-4 py-3 rounded-xl glass hover:bg-white/5 transition-colors text-sm font-medium whitespace-nowrap"
                >
                  Generate
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">
                Intern will be prompted to change password on first login
              </p>
            </div>

            {/* Info Box */}
            <div className="glass rounded-xl p-4 border border-cyan/20">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-lg bg-cyan/10 grid place-items-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-cyan" />
                </div>
                <div className="text-xs text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">What happens next?</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Intern account will be created immediately</li>
                    <li>Login credentials sent to their email</li>
                    <li>They can access the platform at intern.kaizenspark.com</li>
                    <li>You'll be assigned as their mentor automatically</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading || !formData.name || !formData.email || !formData.password}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-rose-500 hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    Create Intern Account
                  </>
                )}
              </button>
            </div>
          </form>
        </GlassCard>

        {/* Recent Interns */}
        <GlassCard className="p-6 mt-6">
          <h3 className="text-sm font-semibold mb-4">Recently Created Interns</h3>
          {createdInterns.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              <UserPlus className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>No interns created yet</p>
              <p className="text-xs mt-1">Create your first intern account above</p>
            </div>
          ) : (
            <div className="space-y-3">
              {createdInterns.map((intern) => (
                <div key={intern.id} className="glass rounded-xl p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-tint to-cyan grid place-items-center text-sm font-semibold flex-shrink-0">
                        {intern.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium truncate">{intern.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{intern.email}</div>
                      </div>
                    </div>
                    <div className="glass rounded-lg px-3 py-2 text-xs font-mono flex-shrink-0">
                      <div className="text-[10px] text-muted-foreground mb-0.5">Password</div>
                      <div className="text-cyan">{intern.password}</div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/5 text-xs text-muted-foreground">
                    Created {new Date(intern.createdAt).toLocaleDateString()} • Share these credentials with the intern
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>
    </>
  );
}
