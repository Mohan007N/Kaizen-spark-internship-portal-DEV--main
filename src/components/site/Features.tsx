import { Rocket, Users, BadgeCheck, Clock3, Target } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "./Domains";

const items = [
  { i: Rocket, t: "Industry-Grade Projects", d: "Deliver production-ready solutions that impact real business outcomes and user experiences." },
  { i: Users, t: "Expert Mentorship", d: "Direct access to senior technologists from Fortune 500 companies and leading tech firms." },
  { i: BadgeCheck, t: "Professional Certification", d: "Earn industry-recognized credentials that validate your technical expertise." },
  { i: Clock3, t: "Flexible Engagement", d: "Structured yet adaptable learning paths designed for working professionals." },
  { i: Target, t: "Career Acceleration", d: "Comprehensive placement support including interview preparation and partner introductions." },
];

export function Features() {
  return (
    <section id="features" className="py-32 bg-accent/30">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Program Excellence"
          title="Comprehensive Professional Development"
          sub="A meticulously designed curriculum that combines technical mastery with career readiness."
        />

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-all duration-300"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-6">
                <it.i className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{it.t}</h3>
              <p className="text-muted-foreground leading-relaxed">{it.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
