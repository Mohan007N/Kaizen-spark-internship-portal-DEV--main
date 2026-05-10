import { useState } from "react";
import { Upload, Send, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "./Domains";

const domains = ["Web Development", "AI & Machine Learning", "Cloud Computing", "Mobile App", "Cybersecurity", "Data Science"];

export function ApplyForm() {
  const [sent, setSent] = useState(false);
  const [file, setFile] = useState<string | null>(null);

  return (
    <section id="apply" className="py-24">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeading
          eyebrow="Apply Now"
          title="Begin your KaizenSpark journey."
          sub="Tell us about yourself. We'll get back within 48 hours."
        />

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="mt-12 glass-strong border-gradient rounded-3xl p-6 md:p-10 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full Name" name="name" placeholder="Aarav Mehta" />
            <Field label="Email" name="email" type="email" placeholder="you@university.edu" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="College / University" name="college" placeholder="IIT Bombay" />
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Domain</label>
              <select
                required
                className="w-full rounded-xl glass px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/60"
              >
                <option value="" className="bg-midnight">Select a track</option>
                {domains.map(d => <option key={d} className="bg-midnight">{d}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Resume</label>
            <label className="flex items-center justify-between gap-3 rounded-xl glass border-dashed border-white/10 px-4 py-4 cursor-pointer hover:bg-white/5 transition-colors">
              <span className="flex items-center gap-3 text-sm text-muted-foreground">
                <Upload className="h-4 w-4 text-cyan" />
                {file ?? "Upload PDF (max 5MB)"}
              </span>
              <span className="text-xs text-cyan">Browse</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0]?.name ?? null)}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={sent}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-primary to-blue-tint glow hover:shadow-glow-cyan transition-all duration-300 disabled:opacity-70"
          >
            {sent ? (<><CheckCircle2 className="h-4 w-4" /> Application Received</>) : (<>Submit Application <Send className="h-4 w-4" /></>)}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-xl glass px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-cyan/60"
      />
    </div>
  );
}
