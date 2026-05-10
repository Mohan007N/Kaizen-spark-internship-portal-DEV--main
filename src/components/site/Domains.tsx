import { Code2, Brain, Cloud, Smartphone, Shield, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const domains = [
  { i: Code2, t: "Software Engineering", d: "Enterprise-scale application development with modern frameworks and architectural patterns." },
  { i: Brain, t: "Artificial Intelligence", d: "Machine learning systems, neural networks, and intelligent automation solutions." },
  { i: Cloud, t: "Cloud Architecture", d: "Scalable infrastructure design and deployment across AWS, Azure, and Google Cloud." },
  { i: Smartphone, t: "Mobile Solutions", d: "Native and cross-platform mobile applications for iOS and Android ecosystems." },
  { i: Shield, t: "Cybersecurity", d: "Security architecture, threat analysis, and enterprise protection frameworks." },
  { i: BarChart3, t: "Data Engineering", d: "Large-scale data pipelines, analytics platforms, and business intelligence systems." },
];

export function Domains() {
  return (
    <section id="domains" className="py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Technology Domains"
          title="Specialized Learning Tracks"
          sub="Choose from six industry-aligned specializations designed in collaboration with enterprise partners."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((d, i) => (
            <motion.div
              key={d.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-xl p-8 bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary mb-6">
                <d.i className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{d.t}</h3>
              <p className="text-muted-foreground leading-relaxed">{d.d}</p>
              <div className="mt-6 inline-flex items-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more →
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary mb-6">
        {eyebrow}
      </div>
      <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
        {title}
      </h2>
      {sub && <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{sub}</p>}
    </div>
  );
}
