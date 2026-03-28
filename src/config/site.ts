export const siteConfig = {
  name: "2SkyMobile CRM",
  description: "CRM platform for internal workflows and partner management.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
  links: {
    github: "https://github.com/kulikman/2Skymobile-CRM",
  },
  nav: [
    { title: "Home", href: "/" },
    { title: "Dashboard", href: "/dashboard" },
  ],
} as const;
