'use client';

import { useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Label } from '@/app/components/ui/label';
import { Select } from '@/app/components/ui/select-simple';
import { X } from 'lucide-react';
import type { Account } from '@/app/lib/types';

const ACCOUNT_TYPES = ['ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE'] as const;

interface AccountFormModalProps {
  mode: 'create' | 'edit';
  account?: Account | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function AccountFormModal({ mode, account, onClose, onSuccess }: AccountFormModalProps) {
  const isEdit = mode === 'edit';

  const [code, setCode] = useState(isEdit ? account!.code : '');
  const [name, setName] = useState(isEdit ? account!.name : '');
  const [type, setType] = useState(isEdit ? account!.type : 'ASSET');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    const tokenType = localStorage.getItem('tokenType') || 'Bearer';
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `${tokenType} ${token}` } : {}),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const url = isEdit
        ? `${baseUrl}/accounts/${account!.id}`
        : `${baseUrl}/accounts`;

      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ code, name, type }),
      });

      const contentType = response.headers.get('content-type');
      let data: any = {};
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { success: response.ok, data: null, message: text || 'Request failed.' };
      }

      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Request failed.');
      }

      onSuccess();
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{isEdit ? 'Edit Account' : 'Create Account'}</CardTitle>
            <CardDescription>
              {isEdit
                ? `Update account ${account!.code}`
                : 'Add a new account to the chart of accounts'}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Account Code</Label>
              <Input
                id="code"
                placeholder="e.g. 1011"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Account Name</Label>
              <Input
                id="name"
                placeholder="e.g. liquid cash"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Account Type</Label>
              <Select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {ACCOUNT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>
            </div>

            {submitError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                {submitError}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? isEdit
                    ? 'Updating...'
                    : 'Creating...'
                  : isEdit
                    ? 'Update Account'
                    : 'Create Account'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
