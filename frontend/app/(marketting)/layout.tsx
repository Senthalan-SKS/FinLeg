import { Navbar } from '@/app/components/layout/navbar';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { ArrowRight, BarChart3, Lock, Zap } from 'lucide-react';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      
      {/* Professional Footer */}
      <footer className="border-t border-border bg-gradient-to-b from-background to-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold gradient-text">FinLed</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Professional financial ledger management for modern businesses.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Twitter</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">LinkedIn</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">GitHub</a>
              </div>
            </div>

            {/* Product */}
            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <div className="space-y-3">
                <Link href="/features" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
                <Link href="/pricing" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
                <Link href="/security" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Security</Link>
                <Link href="/roadmap" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Roadmap</Link>
              </div>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <div className="space-y-3">
                <Link href="/about" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
                <Link href="/blog" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
                <Link href="/careers" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</Link>
                <Link href="/contact" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
              </div>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="font-semibold">Legal</h4>
              <div className="space-y-3">
                <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
                <Link href="/terms" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
                <Link href="/cookies" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Cookies</Link>
                <Link href="/gdpr" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">GDPR</Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                &copy; 2024 FinLed. All rights reserved.
              </p>
              <div className="flex gap-4">
                <span className="text-xs text-muted-foreground">🌍 Global</span>
                <span className="text-xs text-muted-foreground">🔒 Secure</span>
                <span className="text-xs text-muted-foreground">⚡ Fast</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

