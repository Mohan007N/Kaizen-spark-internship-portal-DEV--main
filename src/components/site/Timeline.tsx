import { FileText, UserCheck, GraduationCap, Code2, Award } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "./Domains";

const steps = [
  { i: FileText, t: "Apply", d: "Submit application" },
  { i: UserCheck, t: "Shortlist", d: "Quick screening call" },
  { i: GraduationCap, t: "Training", d: "Live cohort + curriculum" },
  { i: Code2, t: "Project", d: "Ship real product" },
  { i: Award, t: "Certificate", d: "Hiring placement" },
];

export function Timeline() {
  return (
    <section id="timeline" className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Internship Journey"
          title="From application to offer letter."
          sub="A streamlined 5-step path designed to maximize learning and outcomes."
        />

        <div className="mt-16 relative">
          {/* progress line */}
          <div className="absolute top-7 left-0 right-0 h-px bg-white/10 hidden md:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
            className="absolute top-7 left-0 right-0 h-px bg-gradient-to-r from-primary via-cyan to-sky hidden md:block glow-cyan"
          />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15 }}
                className="text-center relative"
              >
                <div className="mx-auto relative h-14 w-14 rounded-full bg-midnight ring-1 ring-cyan/40 flex items-center justify-center glow">
                  <s.i className="h-6 w-6 text-cyan" />
                  <span className="absolute -top-2 -right-2 h-6 w-6 text-xs font-bold rounded-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center text-white">
                    {i + 1}
                  </span>
                </div>
                <div className="mt-4 font-semibold">{s.t}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
