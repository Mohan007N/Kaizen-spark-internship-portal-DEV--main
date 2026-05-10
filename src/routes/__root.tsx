import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "KaizenSpark Tech — Premier Tech Internships" },
      { name: "description", content: "Industry-grade internships in AI, Web, Cloud & Software. Real projects, expert mentors, and placement support." },
      { name: "author", content: "KaizenSpark Tech" },
      { property: "og:title", content: "KaizenSpark Tech — Premier Tech Internships" },
      { property: "og:description", content: "Build industry-ready skills. Ship real products. Get hired." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/logo.svg" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@KaizenSparkTech" },
      { name: "twitter:image", content: "/logo.svg" },
      { name: "theme-color", content: "#2563EB" },
    ],
    links: [
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/logo.svg",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/logo.svg",
      },
      {
        rel: "manifest",
        href: "/site.webmanifest",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster theme="dark" position="top-right" richColors closeButton />
    </>
  );
}
