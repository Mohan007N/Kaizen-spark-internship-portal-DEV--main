import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { KaizenLogo } from "./KaizenLogo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-accent/20">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-10 w-10 items-center justify-center">
                <KaizenLogo size={32} />
              </span>
              <span className="font-display text-xl font-bold">
                KaizenSpark<span className="text-primary"> Tech</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-6">
              Transforming aspiring technologists into enterprise-ready professionals through 
              industry-aligned internship programs and comprehensive career development.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-primary" /> 
              <a href="mailto:hello@kaizenspark.tech" className="hover:text-foreground transition-colors">
                hello@kaizenspark.tech
              </a>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold mb-4">Company</div>
            <ul className="space-y-3 text-sm">
              <li><a className="text-muted-foreground hover:text-foreground transition-colors" href="#timeline">About Us</a></li>
              <li><a className="text-muted-foreground hover:text-foreground transition-colors" href="#features">Programs</a></li>
              <li><a className="text-muted-foreground hover:text-foreground transition-colors" href="#projects">Success Stories</a></li>
              <li><a className="text-muted-foreground hover:text-foreground transition-colors" href="#apply">Careers</a></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold mb-4">Resources</div>
            <ul className="space-y-3 text-sm">
              <li><a className="text-muted-foreground hover:text-foreground transition-colors" href="#domains">Specializations</a></li>
              <li><a className="text-muted-foreground hover:text-foreground transition-colors" href="#">Documentation</a></li>
              <li><a className="text-muted-foreground hover:text-foreground transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="text-muted-foreground hover:text-foreground transition-colors" href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} KaizenSpark Tech. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[Linkedin, Github, Twitter].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="h-9 w-9 rounded-lg border border-border hover:border-primary hover:bg-primary/5 flex items-center justify-center transition-all"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
