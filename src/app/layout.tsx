import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Template Starter",
  description: "Next.js App Router, TypeScript, Tailwind, Supabase — clone and customize.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
