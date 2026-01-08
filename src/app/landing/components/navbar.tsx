"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useTheme } from '@/hooks/use-theme'

// Navigation items based on your Figma design
const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Explore', href: '/explore' },
  { name: 'Knowledge-Base', href: '#knowledge-base' },
]

// Smooth scroll function
const smoothScrollTo = (targetId: string) => {
  if (targetId.startsWith('#')) {
    const element = document.querySelector(targetId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }
}

// Helper to check if a nav item is active
const isNavItemActive = (itemHref: string, pathname: string | null) => {
  return itemHref === '/' ? pathname === '/' : pathname?.includes(itemHref.replace('#', ''))
}

// Helper to handle nav item clicks
const handleNavClick = (href: string, e: React.MouseEvent, callback?: () => void) => {
  if (href.startsWith('#')) {
    e.preventDefault()
    callback?.()
    setTimeout(() => smoothScrollTo(href), callback ? 100 : 0)
  } else {
    callback?.()
  }
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { theme } = useTheme()
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  // Resolve system theme to actual light/dark
  useEffect(() => {
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      setResolvedTheme(systemTheme)
      
      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = (e: MediaQueryListEvent) => {
        setResolvedTheme(e.matches ? 'dark' : 'light')
      }
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    } else {
      setResolvedTheme(theme as 'light' | 'dark')
    }
  }, [theme])

  // Choose logo based on theme
  const logoSrc = resolvedTheme === 'dark' ? '/icons/antital_logo_white.svg' : '/antital_logo.svg'

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#EAEAEA] bg-background">
      {/* Header Container - responsive padding, height: 80px */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 xl:px-[104px] py-4 h-20">
        {/* Header Content - tight spacing on smaller screens */}
        <div className="flex items-center gap-1 md:gap-2 lg:gap-4 xl:gap-6 h-12">
          {/* Logo Container - positioned at far left, slightly smaller on md screens */}
          <Link href="/" className="flex items-center h-12 shrink-0">
            <Image
              src={logoSrc}
              alt="Antital"
              width={108}
              height={32}
              className="h-7 lg:h-8 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>

          {/* Navigation Container - compact spacing, takes only needed space */}
          <nav className="hidden lg:flex items-center gap-1 shrink-0">
            {navigationItems.map((item) => {
              const isActive = isNavItemActive(item.href, pathname)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className={`px-2 lg:px-3 py-2 h-12 flex items-center transition-colors rounded-lg whitespace-nowrap ${
                    isActive
                      ? 'text-[#A7B832]' // Active link color from Figma
                      : 'text-[#858585] hover:text-foreground' // Inactive link color from Figma
                  }`}
                  style={{
                    fontFamily: isActive ? 'var(--font-rethink-sans)' : 'var(--font-dm-sans)',
                    fontSize: '15px',
                    lineHeight: '21px',
                    fontWeight: isActive ? 500 : 400,
                    letterSpacing: isActive ? 'normal' : '0.01em',
                  }}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Search Input - Desktop - grows to fill available space */}
          <div className="hidden md:flex flex-1 min-w-[200px] max-w-[600px]">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search for anything..."
                className="h-12 px-4 pr-10 bg-[#F4F5F7] border-[#EAEAEA] rounded border text-foreground placeholder:text-[#A2A3A1]"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '14px',
                  lineHeight: '17px',
                  fontWeight: 400,
                }}
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-[#A2A3A1]" />
            </div>
          </div>

          {/* Account Actions - compact on smaller screens, don't shrink */}
          <div className="hidden lg:flex items-center gap-1.5 shrink-0">
            <Button 
              className="bg-[#365852] hover:bg-[#365852]/90 text-white px-3 lg:px-4 py-2 rounded-lg font-medium h-12 min-w-[100px] lg:min-w-[110px]"
              asChild
              style={{
                fontFamily: 'var(--font-rethink-sans)',
                fontSize: '15px',
                lineHeight: '21px',
                fontWeight: 500,
              }}
            >
              <Link href="/auth/sign-up">Invest now</Link>
            </Button>
            <Button 
              variant="outline"
              className="border-[#A8A8A8] text-foreground hover:!bg-[#A7B832] hover:!text-[#11110F] hover:!border-[#A7B832] dark:hover:!bg-[#A7B832] dark:hover:!text-[#11110F] dark:hover:!border-[#A7B832] bg-transparent px-3 lg:px-4 py-2 rounded-lg font-medium h-12 min-w-[105px] lg:min-w-[116px]"
              asChild
              style={{
                fontFamily: 'var(--font-rethink-sans)',
                fontSize: '15px',
                lineHeight: '21px',
                fontWeight: 500,
              }}
            >
              <Link href="/raise-funds">Raise funds</Link>
            </Button>
          </div>

          {/* Mobile Menu Button - pushed to the right */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden ml-auto">
              <Button variant="ghost" className="h-12 w-12 p-0 focus-visible:outline-none focus-visible:ring-0">
                <Menu className="!h-8 !w-8" strokeWidth={2.5} />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] pt-16">
              <div className="flex flex-col gap-8">
                {/* Mobile Search */}
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search for anything..."
                    className="h-12 pl-4 pr-10 bg-[#F4F5F7] border-[#EAEAEA] rounded-md text-foreground placeholder:text-[#A2A3A1]"
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: '14px',
                      lineHeight: '17px',
                    }}
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A2A3A1]" />
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-1">
                  {navigationItems.map((item) => {
                    const isActive = isNavItemActive(item.href, pathname)
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleNavClick(item.href, e, () => setIsOpen(false))}
                        className={`px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? 'text-[#A7B832] bg-[#A7B832]/10'
                            : 'text-[#858585] hover:text-foreground hover:bg-accent'
                        }`}
                        style={{
                          fontFamily: isActive ? 'var(--font-rethink-sans)' : 'var(--font-dm-sans)',
                          fontSize: '16px',
                          lineHeight: '21px',
                          fontWeight: isActive ? 500 : 400,
                        }}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                </nav>

                {/* Divider */}
                <div className="border-t border-[#EAEAEA]" />

                {/* Mobile Actions - Invest now first, then Raise funds */}
                <div className="flex flex-col gap-3">
                  <Button 
                    className="w-full h-12 bg-[#365852] hover:bg-[#365852]/90 text-white rounded-lg"
                    style={{
                      fontFamily: 'var(--font-rethink-sans)',
                      fontSize: '16px',
                      lineHeight: '21px',
                      fontWeight: 500,
                    }}
                    asChild
                  >
                    <Link href="/auth/sign-up" onClick={() => setIsOpen(false)}>
                      Invest now
                    </Link>
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full h-12 border-[#A8A8A8] text-foreground hover:!bg-[#A7B832] hover:!text-[#11110F] hover:!border-[#A7B832] dark:hover:!bg-[#A7B832] dark:hover:!text-[#11110F] dark:hover:!border-[#A7B832] rounded-lg"
                    style={{
                      fontFamily: 'var(--font-rethink-sans)',
                      fontSize: '16px',
                      lineHeight: '21px',
                      fontWeight: 500,
                    }}
                    asChild
                  >
                    <Link href="/raise-funds" onClick={() => setIsOpen(false)}>
                      Raise funds
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

