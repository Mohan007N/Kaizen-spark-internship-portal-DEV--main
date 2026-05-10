const partners = [
  "Stripe", "AWS", "Firebase", "Vercel", "Linear", "Notion", "GitHub", "OpenAI", "Figma", "Cloudflare",
];

export function Partners() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by growing companies
        </p>

        <div className="mt-8 relative overflow-hidden mask-fade">
          <div className="flex gap-16 animate-marquee w-max">
            {[...partners, ...partners].map((p, i) => (
              <span
                key={i}
                className="font-display text-2xl md:text-3xl font-semibold text-muted-foreground/60 hover:text-foreground transition-colors whitespace-nowrap"
              >
                {p}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  );
}
