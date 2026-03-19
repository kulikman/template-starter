export const siteConfig = {
  name: "App",
  description: "Description of your application",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
  links: {
    github: "https://github.com/2sky-labs",
  },
  nav: [
    { title: "Home", href: "/" },
    { title: "Dashboard", href: "/dashboard" },
  ],
} as const;
