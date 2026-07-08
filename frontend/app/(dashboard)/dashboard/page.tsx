'use client';

import { useState, useEffect, useMemo } from 'react';
import { StatCard } from '@/app/components/fintech/stat-card';
import { FinanceChart } from '@/app/components/fintech/finance-chart';
import { TrendingUp, DollarSign, PieChart, Activity, RefreshCw, Calendar } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import type { GeneralLedgerResponse } from '@/app/lib/types';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatNum(value: number): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function DashboardPage() {
  const [ledgerData, setLedgerData] = useState<GeneralLedgerResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState('2026-01-01');
  const [toDate, setToDate] = useState('2026-12-31');

const fetchData = async (fDate?: string, tDate?: string) => {
    const fd = fDate ?? fromDate;
    const td = tDate ?? toDate;
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const tokenType = localStorage.getItem('tokenType') || 'Bearer';
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

      const response = await fetch(
        `${baseUrl}/ledgers/general?fromDate=${fd}&toDate=${td}`,
        {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `${tokenType} ${token}` } : {}),
          },
        }
      );

      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Failed to fetch ledger data');
      }
      setLedgerData(data.data);
    } catch (err: any) {
      setError(err.message || 'Could not connect to the API server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = useMemo(() => {
    if (!ledgerData) return null;
    const accounts = ledgerData.accounts;

    const totalAssets = accounts
      .filter(a => a.accountType === 'ASSET')
      .reduce((s, a) => s + a.balance, 0);

    const totalLiabilities = accounts
      .filter(a => a.accountType === 'LIABILITY')
      .reduce((s, a) => s + Math.abs(a.balance), 0);

    const totalRevenue = accounts
      .filter(a => a.accountType === 'REVENUE')
      .reduce((s, a) => s + (a.totalCredit - a.totalDebit), 0);

    const totalExpenses = accounts
      .filter(a => a.accountType === 'EXPENSE')
      .reduce((s, a) => s + a.balance, 0);

    const netIncome = totalRevenue - totalExpenses;
    const accountBalance = totalAssets - totalLiabilities;

    return { totalAssets, totalLiabilities, netIncome, accountBalance };
  }, [ledgerData]);

  const revenueChartData = useMemo(() => {
    if (!ledgerData) return [];
    const revenueAccounts = ledgerData.accounts.filter(a => a.accountType === 'REVENUE');

    const monthly: Record<number, number> = {};
    for (const account of revenueAccounts) {
      for (const tx of account.transactions) {
        const month = new Date(tx.transactionDate).getMonth();
        monthly[month] = (monthly[month] || 0) + (tx.creditAmount || 0);
      }
    }

    const monthsWithData = Object.keys(monthly).map(Number);
    if (monthsWithData.length === 0) return [];

    return Array.from({ length: Math.max(...monthsWithData) + 1 }, (_, i) => ({
      name: MONTHS[i],
      value: monthly[i] || 0,
    }));
  }, [ledgerData]);

  const expenseChartData = useMemo(() => {
    if (!ledgerData) return [];
    return ledgerData.accounts
      .filter(a => a.accountType === 'EXPENSE' && a.balance > 0)
      .map(a => ({ name: a.accountName, value: a.balance }));
  }, [ledgerData]);
  
  return (
    <div className="space-y-8 p-4 md:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back to your financial overview</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fetchData()}
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center justify-between gap-3">
          <span>{error}</span>
          <Button variant="outline" size="sm" onClick={() => fetchData()} className="h-8">
            Retry
          </Button>
        </div>
      )}

       <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">From Date</label>
              <Input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
            </div>
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">To Date</label>
              <Input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
            </div>
            <div className="shrink-0">
              <Button onClick={() => fetchData()} disabled={isLoading} className="gap-2 w-full sm:w-auto">
                <Calendar className="h-4 w-4" />
                Load
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex items-center justify-center p-12">
          <RefreshCw className="h-8 w-8 text-primary animate-spin" />
        </div>
      )}

      {!isLoading && stats && (
        <>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Assets"
              value={formatNum(stats.totalAssets)}
              currency
              icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Total Liabilities"
              value={formatNum(stats.totalLiabilities)}
              currency
              icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Net Income"
              value={formatNum(stats.netIncome)}
              currency
              icon={<Activity className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Account Balance"
              value={formatNum(stats.accountBalance)}
              currency
              icon={<PieChart className="h-4 w-4 text-muted-foreground" />}
            />
          </div>

          {(revenueChartData.length > 0 || expenseChartData.length > 0) && (
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              <FinanceChart
                title="Monthly Revenue"
                data={revenueChartData}
                type="line"
                color="#3b82f6"
                height={300}
              />
              <FinanceChart
                title="Expense Distribution"
                data={expenseChartData}
                type="bar"
                color="#8b5cf6"
                height={300}
              />
            </div>
          )}
        </>
      )}

      {!isLoading && !ledgerData && !error && (
        <div className="flex flex-col items-center justify-center p-12 text-muted-foreground">
          <p>No data available. Select a date range and click Load.</p>
        </div>
      )}
    </div>
  );
}
