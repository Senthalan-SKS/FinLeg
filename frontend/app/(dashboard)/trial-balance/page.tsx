'use client';

import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { RefreshCw, Database, Calendar, Search, Scale, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '@/app/lib/utils';
import type { GeneralLedgerResponse, GeneralLedgerAccountResponse } from '@/app/lib/types';

interface TrialBalanceRow {
  accountId: string;
  code: string;
  name: string;
  type: string;
  debit: number;
  credit: number;
}

function computeTrialBalance(accounts: GeneralLedgerAccountResponse[]): TrialBalanceRow[] {
  return accounts.map((a) => {
    return {
      accountId: a.accountId,
      code: a.accountCode,
      name: a.accountName,
      type: a.accountType,
      // Positive means Debit, Negative means Credit
      debit: a.balance > 0 ? a.balance : 0,
      credit: a.balance < 0 ? Math.abs(a.balance) : 0,
    };
  });
}

function getTypeBadgeVariant(type: string): 'default' | 'destructive' | 'success' | 'outline' {
  const map: Record<string, 'default' | 'destructive' | 'success' | 'outline'> = {
    ASSET: 'default',
    LIABILITY: 'destructive',
    EQUITY: 'outline',
    REVENUE: 'success',
    EXPENSE: 'outline',
  };
  return map[type] || 'default';
}

export default function TrialBalancePage() {
  const [ledgerData, setLedgerData] = useState<GeneralLedgerResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingDemoData, setIsUsingDemoData] = useState(false);

  const [fromDate, setFromDate] = useState('2026-01-01');
  const [toDate, setToDate] = useState('2026-12-31');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTrialBalance = async (forceDemo = false) => {
    if (forceDemo) {
      setLedgerData(null);
      setIsUsingDemoData(true);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsUsingDemoData(false);

    try {
      const token = localStorage.getItem('token');
      const tokenType = localStorage.getItem('tokenType') || 'Bearer';
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

      const response = await fetch(
        `${baseUrl}/ledgers/general?fromDate=${fromDate}&toDate=${toDate}`,
        {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `${tokenType} ${token}` } : {}),
          },
        }
      );

      const contentType = response.headers.get('content-type');
      let data: any = {};
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { success: response.ok, data: null, message: text || 'Failed to fetch trial balance.' };
      }

      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Failed to retrieve trial balance from backend.');
      }

      setLedgerData(data.data);
    } catch (err: any) {
      console.error('Error fetching trial balance:', err);
      setError(err.message || 'Could not connect to the API server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrialBalance();
  }, []);

  const filteredRows = useMemo(() => {
    if (!ledgerData) return [];
    const rows = computeTrialBalance(ledgerData.accounts);
    const term = searchTerm.toLowerCase();
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(term) ||
        r.code.toLowerCase().includes(term) ||
        r.type.toLowerCase().includes(term)
    );
  }, [ledgerData, searchTerm]);

  const totalDebit = filteredRows.reduce((s, r) => s + r.debit, 0);
  const totalCredit = filteredRows.reduce((s, r) => s + r.credit, 0);
  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01;

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trial Balance</h1>
          <p className="text-muted-foreground mt-1">
            Verify that total debits equal total credits for the selected period
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fetchTrialBalance()}
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Info / Error Banner */}
      {isUsingDemoData && (
        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm flex items-center gap-2">
          <Database className="h-4 w-4 shrink-0" />
          <span>Viewing demo data. The API server could not be reached.</span>
        </div>
      )}

      {error && !isUsingDemoData && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span>{error}</span>
          <Button variant="outline" size="sm" onClick={() => fetchTrialBalance()} className="h-8">
            Retry
          </Button>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">From Date</label>
              <Input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">To Date</label>
              <Input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">&nbsp;</label>
              <Button
                onClick={() => fetchTrialBalance()}
                disabled={isLoading}
                className="w-full gap-2"
              >
                <Calendar className="h-4 w-4" />
                Load Trial Balance
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
          <p className="text-muted-foreground text-sm">Loading trial balance...</p>
        </div>
      )}

      {/* No data */}
      {!isLoading && !ledgerData && !error && (
        <Card className="border-dashed border-2 py-12 flex flex-col items-center justify-center text-center">
          <Scale className="h-12 w-12 text-muted-foreground mb-4" />
          <CardTitle className="text-lg">No Trial Balance Data</CardTitle>
          <CardDescription className="max-w-xs mt-2">
            Select a date range and click Load Trial Balance to view account balances.
          </CardDescription>
        </Card>
      )}

      {/* Trial Balance Table */}
      {!isLoading && filteredRows.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Account Summary</CardTitle>
              <Badge
                variant={isBalanced ? 'success' : 'destructive'}
                className="gap-1.5 px-3 py-1 text-xs"
              >
                {isBalanced ? (
                  <Scale className="h-3.5 w-3.5" />
                ) : (
                  <AlertTriangle className="h-3.5 w-3.5" />
                )}
                {isBalanced ? 'Balanced' : 'Unbalanced'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium">Code</th>
                    <th className="text-left py-3 px-4 font-medium">Account</th>
                    <th className="text-right py-3 px-4 font-medium">Debit</th>
                    <th className="text-right py-3 px-4 font-medium">Credit</th>
                    <th className="text-center py-3 px-4 font-medium">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((row) => (
                    <tr key={row.accountId} className="border-b border-border hover:bg-secondary/50">
                      <td className="py-3 px-4 font-mono text-xs">{row.code}</td>
                      <td className="py-3 px-4 font-medium">{row.name}</td>
                      <td className="py-3 px-4 text-right font-mono">
                        {row.debit > 0 ? formatCurrency(row.debit) : '-'}
                      </td>
                      <td className="py-3 px-4 text-right font-mono">
                        {row.credit > 0 ? formatCurrency(row.credit) : '-'}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant={getTypeBadgeVariant(row.type)} className="text-[10px]">
                          {row.type}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-border bg-muted/50 font-semibold">
                    <td colSpan={2} className="py-3 px-4 text-sm">
                      Totals
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-blue-600">
                      {formatCurrency(totalDebit)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-green-600">
                      {formatCurrency(totalCredit)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge
                        variant={isBalanced ? 'success' : 'destructive'}
                        className="text-[10px]"
                      >
                        {isBalanced ? 'Balanced' : 'Unbalanced'}
                      </Badge>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {!isBalanced && (
              <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>
                  The trial balance is off by {formatCurrency(Math.abs(totalDebit - totalCredit))}.
                  Please review the journal entries for this period.
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
