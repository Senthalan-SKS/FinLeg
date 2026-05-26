'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [formData, setFormData] = useState({
    companyName: 'My Company',
    email: 'admin@example.com',
    phone: '+1 (555) 123-4567',
    fiscalYear: 'January - December',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Settings saved:', formData);
    alert('Settings saved successfully');
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account and preferences</p>
      </div>

      {/* Company Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Update your company details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fiscalYear">Fiscal Year</Label>
            <Input
              id="fiscalYear"
              name="fiscalYear"
              value={formData.fiscalYear}
              onChange={handleChange}
            />
          </div>
          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Theme Preferences</CardTitle>
          <CardDescription>Customize your interface appearance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2 grid-cols-3 sm:grid-cols-4">
            <Button
              variant={theme === 'light' ? 'default' : 'outline'}
              onClick={() => setTheme('light')}
              className="gap-2"
            >
              <Sun className="h-4 w-4" />
              <span className="hidden sm:inline">Light</span>
            </Button>
            <Button
              variant={theme === 'dark' ? 'default' : 'outline'}
              onClick={() => setTheme('dark')}
              className="gap-2"
            >
              <Moon className="h-4 w-4" />
              <span className="hidden sm:inline">Dark</span>
            </Button>
            <Button
              variant={theme === 'system' ? 'default' : 'outline'}
              onClick={() => setTheme('system')}
              className="col-span-1 sm:col-span-2"
            >
              <span>System</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Account Management</CardTitle>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">
            Change Password
          </Button>
          <Button variant="outline" className="w-full">
            Two-Factor Authentication
          </Button>
          <Button variant="destructive" className="w-full">
            Logout All Sessions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
