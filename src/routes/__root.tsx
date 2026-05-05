import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

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
      { title: "Havrut | Heritage Chronograph · Geneva" },
      { name: "description", content: "Havrut Heritage Chronograph — Swiss-engineered, hand-finished, and limited to 500 pieces worldwide. Reserve yours before the June 15, 2026 launch." },
      { name: "author", content: "Havrut" },
      { name: "keywords", content: "Havrut, luxury watch, Swiss chronograph, limited edition watch, Geneva timepiece, heritage watch, hand-finished watch" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#0a2a1a" },
      // Open Graph
      { property: "og:title", content: "Havrut | Heritage Chronograph · Geneva" },
      { property: "og:description", content: "Swiss-engineered, hand-finished, limited to 500 pieces worldwide. Witness the unveiling on June 15, 2026." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.havrut.watch" },
      { property: "og:site_name", content: "Havrut" },
      { property: "og:image", content: "https://www.havrut.watch/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Havrut Heritage Chronograph — Limited to 500 Pieces" },
      { property: "og:locale", content: "en_US" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@HavrutWatch" },
      { name: "twitter:creator", content: "@HavrutWatch" },
      { name: "twitter:title", content: "Havrut | Heritage Chronograph · Geneva" },
      { name: "twitter:description", content: "Swiss-engineered, hand-finished, limited to 500 pieces worldwide. Reserve yours before June 15, 2026." },
      { name: "twitter:image", content: "https://www.havrut.watch/og-image.png" },
      { name: "twitter:image:alt", content: "Havrut Heritage Chronograph — Limited to 500 Pieces" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Favicon
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/jpg", sizes: "32x32", href: "/favicon.jpg" },
      { rel: "icon", type: "image/jpg", sizes: "16x16", href: "/favicon.jpg" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      // Fonts
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@500;700&display=swap",
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
  return <Outlet />;
}