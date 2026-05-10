import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SectionHeading } from "./Domains";

const projects = [
  {
    name: "NeuralChat AI",
    stack: ["React", "OpenAI", "Node"],
    grad: "from-primary via-blue-tint to-cyan",
    desc: "Conversational AI with vector memory.",
  },
  {
    name: "CloudOps Dashboard",
    stack: ["Next.js", "AWS", "Tailwind"],
    grad: "from-cyan via-sky to-primary",
    desc: "Realtime infra metrics across regions.",
  },
  {
    name: "FinSight Analytics",
    stack: ["Python", "PostgreSQL", "D3"],
    grad: "from-blue-tint via-primary to-cyan",
    desc: "Predictive market dashboards for SMBs.",
  },
  {
    name: "SecureGuard",
    stack: ["Go", "Docker", "K8s"],
    grad: "from-soft-blue via-primary to-sky",
    desc: "Zero-trust auth for microservices.",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Live Project Showcase"
          title="Real products. Real users."
          sub="A glimpse at projects shipped by KaizenSpark interns this season."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl glass border-gradient"
            >
              <div className="relative h-44 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${p.grad} transition-transform duration-700 group-hover:scale-110`} />
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
                <div className="absolute top-3 right-3 glass rounded-lg p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="text-[10px] uppercase tracking-wider rounded-md bg-tech-surface/60 px-2 py-1 text-sky">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
