'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, LogIn } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isMarketing = pathname?.startsWith('/(marketting)') || pathname === '/';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const navLinks = isMarketing
    ? [
        { href: '#features', label: 'Features' },
        { href: '#pricing', label: 'Pricing' },
        { href: '/about', label: 'About' },
      ]
    : [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/journal-entries', label: 'Journal Entries' },
        { href: '/ledger', label: 'Ledger' },
        { href: '/reports', label: 'Reports' },
      ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-2xl font-bold gradient-text group-hover:scale-105 transition-transform">
              FinLeg
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hover:bg-secondary transition-colors"
              title="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {isMarketing && (
              <Link href="/login" className="hidden md:flex">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            )}

            <Link href={isMarketing ? "/register" : "/dashboard"} className="hidden md:flex">
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-shadow">
                {isMarketing ? 'Get Started' : 'Dashboard'}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="flex flex-col gap-2 border-t border-border py-4 md:hidden animate-slideInDown">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-border pt-4 mt-4 space-y-2">
              {isMarketing && (
                <Link href="/login" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    Sign In
                  </Button>
                </Link>
              )}
              <Link href={isMarketing ? "/register" : "/dashboard"} className="block">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  {isMarketing ? 'Get Started' : 'Dashboard'}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
