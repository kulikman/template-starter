export const siteConfig = {
  name: "Template Starter",
  description: "Universal Next.js + Supabase starter — fork and rename for your product.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
  links: {
    github: "https://github.com/kulikman/template-starter",
  },
  nav: [
    { title: "Home", href: "/" },
    { title: "Dashboard", href: "/dashboard" },
  ],
} as const;
