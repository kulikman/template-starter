"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/** Mobile menu toggle icon — renders hamburger or X based on open state. */
function MenuIcon({ isOpen }: { isOpen: boolean }): React.ReactElement {
  return (
    <svg
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      {isOpen ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  )
}

/** Site logo — displays the app name as a styled wordmark. */
function Logo(): React.ReactElement {
  return (
    <Link
      href="/"
      className="text-lg font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity"
    >
      {siteConfig.name}
    </Link>
  )
}

/**
 * Desktop navigation links.
 * Highlights the active route using the current pathname.
 */
function DesktopNav({ pathname }: { pathname: string }): React.ReactElement {
  return (
    <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
      {siteConfig.nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
            pathname === item.href
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

/**
 * Mobile navigation drawer.
 * Rendered below the header bar when the hamburger menu is open.
 */
function MobileNav({
  isOpen,
  pathname,
}: {
  isOpen: boolean
  pathname: string
}): React.ReactElement | null {
  if (!isOpen) return null

  return (
    <nav
      className="md:hidden border-t border-border bg-background px-4 pb-4 pt-2"
      aria-label="Mobile navigation"
    >
      <ul className="flex flex-col gap-1">
        {siteConfig.nav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/**
 * Site-wide header with logo, desktop navigation, and a collapsible mobile menu.
 * Place inside the root layout above the main content area.
 */
export function Header(): React.ReactElement {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <DesktopNav pathname={pathname} />

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <MenuIcon isOpen={isMobileMenuOpen} />
        </Button>
      </div>

      <MobileNav isOpen={isMobileMenuOpen} pathname={pathname} />
    </header>
  )
}
