'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Mail, Lock, User, Building, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Frontend validations
    if (!formData.companyName.trim()) {
      setError('Company Name is required.');
      return;
    }
    if (!formData.fullName.trim()) {
      setError('Full Name is required.');
      return;
    }
    if (!formData.email.trim()) {
      setError('Email is required.');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1'}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const contentType = response.headers.get('content-type');
      let data: any = {};
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { success: response.ok, message: text || (response.ok ? 'Success' : 'Registration failed') };
      }

      if (!response.ok || data.success === false) {
        setError(data.message || 'Registration failed. Please check your credentials and try again.');
      } else {
        setSuccess(data.message || 'Account created successfully! Redirecting...');
        setFormData({
          companyName: '',
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError('Could not connect to the authentication server. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="animate-scaleIn shadow-lg border-muted">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse-soft">
            FinLeg
          </div>
        </div>
        <CardTitle className="text-center text-2xl font-bold tracking-tight">Create Account</CardTitle>
        <CardDescription className="text-center">
          Get started with your financial ledger
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 dark:bg-destructive/5 border-l-4 border-l-destructive border-y border-r border-destructive/20 text-destructive text-sm flex items-start gap-3 animate-slideInDown shadow-sm">
            <AlertCircle className="h-5 w-5 shrink-0 text-destructive/90 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold block text-destructive">Registration Failed</span>
              <span className="text-destructive/80 text-xs mt-0.5 block leading-relaxed">{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/5 border-l-4 border-l-emerald-500 border-y border-r border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm flex items-start gap-3 animate-slideInDown shadow-sm">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500/90 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold block text-emerald-600 dark:text-emerald-400">Success</span>
              <span className="text-emerald-600/80 dark:text-emerald-400/80 text-xs mt-0.5 block leading-relaxed">{success}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <div className="relative">
              <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="companyName"
                placeholder="Finled Pvt Ltd"
                className="pl-10 focus-visible:ring-primary focus-visible:ring-offset-1 transition-all"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                disabled={isLoading || !!success}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="fullName"
                placeholder="John Doe"
                className="pl-10 focus-visible:ring-primary focus-visible:ring-offset-1 transition-all"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                disabled={isLoading || !!success}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-10 focus-visible:ring-primary focus-visible:ring-offset-1 transition-all"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isLoading || !!success}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="•••••••• (min 8 characters)"
                className="pl-10 focus-visible:ring-primary focus-visible:ring-offset-1 transition-all"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={isLoading || !!success}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="pl-10 focus-visible:ring-primary focus-visible:ring-offset-1 transition-all"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                disabled={isLoading || !!success}
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]" 
            disabled={isLoading || !!success}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

