'use client';

import React from 'react';
import { BarChart3, Home, PieChart, Settings, LogOut, BookOpen } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const sidebarItems = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Chart of Accounts', href: '/account-management', icon: BookOpen },
  { label: 'Journal Entries', href: '/journal-entries', icon: BarChart3 },
  { label: 'Ledger', href: '/ledger', icon: PieChart },
  { label: 'Trial Balance', href: '/trial-balance', icon: BarChart3 },
  { label: 'Reports', href: '/reports', icon: PieChart },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenType');
    router.push('/login');
  };

  return (
    <aside className="hidden md:flex fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 flex-col border-r border-border bg-background">
      <div className="flex flex-col gap-1 p-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className="w-full justify-start gap-2"
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto border-t border-border p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
}

