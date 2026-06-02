'use client';

import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { AccountFormModal } from '@/app/components/fintech/account-form-modal';
import { Search, RefreshCw, Database, Plus, Pencil } from 'lucide-react';
import type { Account } from '@/app/lib/types';

function getTypeVariant(type: string): 'default' | 'destructive' | 'success' | 'outline' {
  const map: Record<string, 'default' | 'destructive' | 'success' | 'outline'> = {
    ASSET: 'default',
    LIABILITY: 'destructive',
    EQUITY: 'outline',
    REVENUE: 'success',
    EXPENSE: 'outline',
  };
  return map[type] || 'default';
}

export default function AccountManagementPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    const tokenType = localStorage.getItem('tokenType') || 'Bearer';
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `${tokenType} ${token}` } : {}),
    };
  };

  const fetchAccounts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/accounts`, {
        headers: getAuthHeaders(),
      });

      const contentType = response.headers.get('content-type');
      let data: any = {};
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { success: response.ok, data: null, message: text || 'Failed to fetch accounts.' };
      }

      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Failed to retrieve accounts.');
      }

      setAccounts(data.data || []);
    } catch (err: any) {
      setError(err.message || 'Could not connect to the API server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const filteredAccounts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return accounts.filter(
      (a) =>
        a.name.toLowerCase().includes(term) ||
        a.code.toLowerCase().includes(term) ||
        a.type.toLowerCase().includes(term)
    );
  }, [accounts, searchTerm]);

  const openCreate = () => {
    setEditingAccount(null);
    setModalMode('create');
  };

  const openEdit = (account: Account) => {
    setEditingAccount(account);
    setModalMode('edit');
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingAccount(null);
  };

  const handleSuccess = () => {
    closeModal();
    fetchAccounts();
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chart of Accounts</h1>
          <p className="text-muted-foreground mt-1">
            Manage your chart of accounts &mdash; create and view accounts
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchAccounts} disabled={isLoading} className="gap-2">
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button size="sm" onClick={openCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            New Account
          </Button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span>{error}</span>
          <Button variant="outline" size="sm" onClick={fetchAccounts} className="h-8">
            Retry
          </Button>
        </div>
      )}

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by account name, code, or type..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Loading */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-12 space-y-4">
          <RefreshCw className="h-8 w-8 text-primary animate-spin" />
          <p className="text-muted-foreground text-sm">Loading accounts...</p>
        </div>
      )}

      {/* No data */}
      {!isLoading && accounts.length === 0 && !error && (
        <Card className="border-dashed border-2 py-12 flex flex-col items-center justify-center text-center">
          <Database className="h-12 w-12 text-muted-foreground mb-4" />
          <CardTitle className="text-lg">No Accounts Found</CardTitle>
          <CardDescription className="max-w-xs mt-2">
            Get started by creating your first account.
          </CardDescription>
          <Button className="mt-4 gap-2" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Create Account
          </Button>
        </Card>
      )}

      {/* Empty search result */}
      {!isLoading && accounts.length > 0 && filteredAccounts.length === 0 && (
        <Card className="border-dashed border-2 py-12 flex flex-col items-center justify-center text-center">
          <Search className="h-12 w-12 text-muted-foreground mb-4" />
          <CardTitle className="text-lg">No Matching Accounts</CardTitle>
          <CardDescription className="max-w-xs mt-2">
            No accounts match your search criteria. Try a different search term.
          </CardDescription>
          <Button variant="outline" className="mt-4" onClick={() => setSearchTerm('')}>
            Clear Search
          </Button>
        </Card>
      )}

      {/* Accounts table */}
      {!isLoading && filteredAccounts.length > 0 && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/30 border-b border-border text-muted-foreground">
                  <th className="text-left py-3 px-4 font-medium w-24">Code</th>
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium w-32">Type</th>
                  <th className="text-center py-3 px-4 font-medium w-24">Postable</th>
                  <th className="text-center py-3 px-4 font-medium w-24">Status</th>
                  <th className="text-center py-3 px-4 font-medium w-20">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                      {account.code}
                    </td>
                    <td className="py-3 px-4 font-medium">{account.name}</td>
                    <td className="py-3 px-4">
                      <Badge variant={getTypeVariant(account.type)} className="text-[10px]">
                        {account.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant={account.postable ? 'default' : 'secondary'} className="text-[10px]">
                        {account.postable ? 'Yes' : 'No'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant={account.active ? 'success' : 'destructive'} className="text-[10px]">
                        {account.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(account)} title="Edit account">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Modal */}
      {modalMode && (
        <AccountFormModal
          mode={modalMode}
          account={editingAccount}
          onClose={closeModal}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
