import { createFileRoute } from "@tanstack/react-router";
import { AnimatedBackground } from "@/components/site/AnimatedBackground";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Partners } from "@/components/site/Partners";
import { Domains } from "@/components/site/Domains";
import { Features } from "@/components/site/Features";
import { Projects } from "@/components/site/Projects";
import { Timeline } from "@/components/site/Timeline";
import { Testimonials } from "@/components/site/Testimonials";
import { ApplyForm } from "@/components/site/ApplyForm";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KaizenSpark Tech — Launch Your Tech Career with Real Internships" },
      {
        name: "description",
        content:
          "Industry-grade internships in AI, Web, Cloud & Software. Real projects, expert mentors, and placement support at KaizenSpark Tech.",
      },
      { property: "og:title", content: "KaizenSpark Tech — Premier Tech Internships" },
      { property: "og:description", content: "Build industry-ready skills. Ship real products. Get hired." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <Domains />
        <Features />
        <Projects />
        <Timeline />
        <Testimonials />
        <ApplyForm />
      </main>
      <Footer />
    </div>
  );
}
