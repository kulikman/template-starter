export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Template Starter";

export const ROUTES = {
  home: "/",
  login: "/login",
  signup: "/signup",
  dashboard: "/dashboard",
} as const;
