import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { KaizenLogo } from "./KaizenLogo";

const links = [
  { label: "Home", href: "#home" },
  { label: "Internships", href: "#domains" },
  { label: "Programs", href: "#features" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#timeline" },
  { label: "Contact", href: "#apply" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <nav className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-center gap-3 group">
            <span className="relative flex h-10 w-10 items-center justify-center">
              <KaizenLogo size={32} />
            </span>
            <span className="font-display text-xl font-bold tracking-tight">
              KaizenSpark<span className="text-primary"> Tech</span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </a>
            <a
              href="#apply"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              Apply Now
            </a>
            <button
              className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors"
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden pb-4 border-t border-border mt-2"
            >
              <ul className="flex flex-col gap-1 pt-4">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      onClick={() => setOpen(false)}
                      href={l.href}
                      className="block px-4 py-3 rounded-lg hover:bg-accent text-sm font-medium transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <a
                  href="#apply"
                  onClick={() => setOpen(false)}
                  className="mt-2 text-center rounded-lg px-6 py-3 text-sm font-semibold text-white bg-primary"
                >
                  Apply Now
                </a>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
