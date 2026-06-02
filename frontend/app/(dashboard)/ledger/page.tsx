'use client';

import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Pagination } from '@/app/components/ui/pagination';
import { Search, RefreshCw, Database, ChevronDown, ChevronRight, Calendar } from 'lucide-react';
import { formatCurrency, formatDate } from '@/app/lib/utils';
import type {
  GeneralLedgerResponse,
  GeneralLedgerAccountResponse,
  GeneralLedgerTransactionResponse,
} from '@/app/lib/types';

const ACCOUNTS_PER_PAGE = 10;

function computeRunningBalance(transactions: GeneralLedgerTransactionResponse[]): (GeneralLedgerTransactionResponse & { runningBalance: number })[] {
  let running = 0;
  return transactions.map((t) => {
    running += (t.debitAmount || 0) - (t.creditAmount || 0);
    return { ...t, runningBalance: running };
  });
}

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

export default function LedgerPage() {
  const [ledgerData, setLedgerData] = useState<GeneralLedgerResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingDemoData, setIsUsingDemoData] = useState(false);

  const [fromDate, setFromDate] = useState('2026-01-01');
  const [toDate, setToDate] = useState('2026-12-31');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedAccounts, setExpandedAccounts] = useState<Set<string>>(new Set());

  const fetchLedger = async (forceDemo = false) => {
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
        data = { success: response.ok, data: null, message: text || 'Failed to fetch ledger.' };
      }

      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Failed to retrieve ledger from backend.');
      }

      setLedgerData(data.data);
    } catch (err: any) {
      console.error('Error fetching ledger:', err);
      setError(err.message || 'Could not connect to the API server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLedger();
  }, []);

  const filteredAccounts = useMemo(() => {
    if (!ledgerData) return [];
    const term = searchTerm.toLowerCase();
    return ledgerData.accounts.filter(
      (a) =>
        a.accountName.toLowerCase().includes(term) ||
        a.accountCode.toLowerCase().includes(term) ||
        a.accountType.toLowerCase().includes(term)
    );
  }, [ledgerData, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredAccounts.length / ACCOUNTS_PER_PAGE));
  const paginatedAccounts = filteredAccounts.slice(
    (currentPage - 1) * ACCOUNTS_PER_PAGE,
    currentPage * ACCOUNTS_PER_PAGE
  );

  const toggleAccount = (accountId: string) => {
    setExpandedAccounts((prev) => {
      const next = new Set(prev);
      if (next.has(accountId)) next.delete(accountId);
      else next.add(accountId);
      return next;
    });
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">General Ledger</h1>
          <p className="text-muted-foreground mt-1">
            View account balances, transactions, and running totals
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fetchLedger()}
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Info / Demo Banner */}
      {isUsingDemoData && (
        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm flex items-center gap-2">
          <Database className="h-4 w-4 shrink-0" />
          <span>Viewing demo data. The API server could not be reached.</span>
        </div>
      )}

      {error && !isUsingDemoData && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span>{error}</span>
          <Button variant="outline" size="sm" onClick={() => fetchLedger()} className="h-8">
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
                onClick={() => { setCurrentPage(1); fetchLedger(); }}
                disabled={isLoading}
                className="w-full gap-2"
              >
                <Calendar className="h-4 w-4" />
                Load Ledger
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
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Loading */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-12 space-y-4">
          <RefreshCw className="h-8 w-8 text-primary animate-spin" />
          <p className="text-muted-foreground text-sm">Loading general ledger...</p>
        </div>
      )}

      {/* No data */}
      {!isLoading && !ledgerData && !error && (
        <Card className="border-dashed border-2 py-12 flex flex-col items-center justify-center text-center">
          <Database className="h-12 w-12 text-muted-foreground mb-4" />
          <CardTitle className="text-lg">No Ledger Data</CardTitle>
          <CardDescription className="max-w-xs mt-2">
            Select a date range and click Load Ledger to view account transactions.
          </CardDescription>
        </Card>
      )}

      {/* Empty after search */}
      {!isLoading && ledgerData && filteredAccounts.length === 0 && (
        <Card className="border-dashed border-2 py-12 flex flex-col items-center justify-center text-center">
          <Search className="h-12 w-12 text-muted-foreground mb-4" />
          <CardTitle className="text-lg">No Matching Accounts</CardTitle>
          <CardDescription className="max-w-xs mt-2">
            No accounts match your search criteria. Try a different search term.
          </CardDescription>
          {searchTerm && (
            <Button variant="outline" className="mt-4" onClick={() => setSearchTerm('')}>
              Clear Search
            </Button>
          )}
        </Card>
      )}

      {/* Ledger Accounts */}
      {!isLoading && paginatedAccounts.length > 0 && (
        <div className="space-y-4">
          {paginatedAccounts.map((account) => {
            const isExpanded = expandedAccounts.has(account.accountId);
            const transactions = account.transactions || [];
            const txWithBalance = computeRunningBalance(transactions);

            return (
              <Card key={account.accountId} className="overflow-hidden">
                {/* Account Header (always visible) */}
                <button
                  onClick={() => toggleAccount(account.accountId)}
                  className="w-full text-left p-4 bg-muted/30 hover:bg-muted/50 transition-colors border-b border-border flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                    <span className="font-mono text-sm text-muted-foreground bg-background px-1.5 py-0.5 rounded text-[10px]">
                      {account.accountCode}
                    </span>
                    <span className="font-semibold">{account.accountName}</span>
                    <Badge variant={getTypeVariant(account.accountType)} className="text-[10px]">
                      {account.accountType}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-6 text-sm shrink-0">
                    <div className="text-right">
                      <span className="text-muted-foreground text-xs block">Debit</span>
                      <span className="font-mono font-medium text-blue-600">{formatCurrency(account.totalDebit)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-muted-foreground text-xs block">Credit</span>
                      <span className="font-mono font-medium text-green-600">{formatCurrency(account.totalCredit)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-muted-foreground text-xs block">Balance</span>
                      <span className={`font-mono font-bold ${account.balance >= 0 ? 'text-foreground' : 'text-destructive'}`}>
                        {formatCurrency(account.balance)}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                      {transactions.length} txns
                    </span>
                  </div>
                </button>

                {/* Transactions Table (expandable) */}
                {isExpanded && (
                  <CardContent className="p-0">
                    {txWithBalance.length === 0 ? (
                      <div className="p-6 text-center text-sm text-muted-foreground">
                        No transactions for this account in the selected period.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-muted/10 border-b border-border text-muted-foreground">
                              <th className="text-left py-2.5 px-4 font-medium">Date</th>
                              <th className="text-left py-2.5 px-4 font-medium">Reference</th>
                              <th className="text-left py-2.5 px-4 font-medium">Description</th>
                              <th className="text-right py-2.5 px-4 font-medium w-28">Debit</th>
                              <th className="text-right py-2.5 px-4 font-medium w-28">Credit</th>
                              <th className="text-right py-2.5 px-4 font-medium w-28">Running Balance</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {txWithBalance.map((tx) => (
                              <tr key={tx.journalEntryId + tx.debitAmount + tx.creditAmount} className="hover:bg-secondary/20 transition-colors">
                                <td className="py-2 px-4 whitespace-nowrap">{formatDate(tx.transactionDate)}</td>
                                <td className="py-2 px-4 font-mono text-muted-foreground">{tx.referenceNumber}</td>
                                <td className="py-2 px-4 max-w-[200px] truncate" title={tx.lineDescription || tx.description}>
                                  {tx.lineDescription || tx.description || '-'}
                                </td>
                                <td className="py-2 px-4 text-right font-mono text-blue-600">
                                  {tx.debitAmount > 0 ? formatCurrency(tx.debitAmount) : '-'}
                                </td>
                                <td className="py-2 px-4 text-right font-mono text-green-600">
                                  {tx.creditAmount > 0 ? formatCurrency(tx.creditAmount) : '-'}
                                </td>
                                <td className="py-2 px-4 text-right font-mono font-medium">
                                  {formatCurrency(tx.runningBalance)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="bg-muted/20 border-t-2 border-border font-semibold">
                              <td colSpan={3} className="py-2.5 px-4 text-sm">Total</td>
                              <td className="py-2.5 px-4 text-right font-mono text-blue-600 text-sm">
                                {formatCurrency(account.totalDebit)}
                              </td>
                              <td className="py-2.5 px-4 text-right font-mono text-green-600 text-sm">
                                {formatCurrency(account.totalCredit)}
                              </td>
                              <td className="py-2.5 px-4 text-right font-mono text-sm">
                                {formatCurrency(account.balance)}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            );
          })}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          <div className="text-center text-xs text-muted-foreground">
            Showing {(currentPage - 1) * ACCOUNTS_PER_PAGE + 1}–
            {Math.min(currentPage * ACCOUNTS_PER_PAGE, filteredAccounts.length)} of{' '}
            {filteredAccounts.length} accounts
          </div>
        </div>
      )}
    </div>
  );
}
