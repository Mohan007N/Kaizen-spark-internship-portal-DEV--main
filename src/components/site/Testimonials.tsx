import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./Domains";

const items = [
  { n: "Aarav Mehta", r: "AI Intern → ML Engineer @ Google", q: "KaizenSpark turned theory into real shipped products. The mentorship genuinely changed my trajectory." },
  { n: "Priya Shah", r: "Web Intern → SDE @ Razorpay", q: "I went from tutorials to production code in three months. The cohort energy is unmatched." },
  { n: "Rohan Kapoor", r: "Cloud Intern → DevOps @ AWS", q: "Hands-on infra projects, brilliant mentors, and a real hiring pipeline. 10/10." },
  { n: "Ananya Iyer", r: "Data Intern → Analyst @ Swiggy", q: "The placement support is the real deal. I had four offers before graduation." },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const next = () => setI((i + 1) % items.length);
  const prev = () => setI((i - 1 + items.length) % items.length);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="Testimonials" title="Loved by future engineers." />

        <div className="mt-12 max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-strong border-gradient rounded-3xl p-8 md:p-12 text-center"
            >
              <div className="flex justify-center gap-1 text-cyan">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-6 text-lg md:text-xl font-display leading-relaxed">
                "{items[i].q}"
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center font-bold">
                  {items[i].n[0]}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">{items[i].n}</div>
                  <div className="text-xs text-muted-foreground">{items[i].r}</div>
                </div>
              </div>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button onClick={prev} className="glass rounded-full p-2 hover:bg-white/10 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-1.5">
              {items.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-cyan" : "w-1.5 bg-white/20"}`}
                />
              ))}
            </div>
            <button onClick={next} className="glass rounded-full p-2 hover:bg-white/10 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
