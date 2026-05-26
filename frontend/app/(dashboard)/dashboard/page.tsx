'use client';

import { StatCard } from '@/app/components/fintech/stat-card';
import { TransactionList } from '@/app/components/fintech/transaction-list';
import { FinanceChart } from '@/app/components/fintech/finance-chart';
import { TrendingUp, DollarSign, PieChart, Activity } from 'lucide-react';

const mockTransactions = [
  { id: '1', account: 'Checking', description: 'Office Supplies', amount: 125.50, type: 'debit' as const, date: 'Dec 1' },
  { id: '2', account: 'Savings', description: 'Interest Credit', amount: 50.00, type: 'credit' as const, date: 'Dec 1' },
  { id: '3', account: 'Checking', description: 'Client Payment', amount: 1200.00, type: 'credit' as const, date: 'Nov 30' },
  { id: '4', account: 'Checking', description: 'Equipment Purchase', amount: 450.00, type: 'debit' as const, date: 'Nov 29' },
];

const mockChartData = [
  { name: 'Jan', value: 45000 },
  { name: 'Feb', value: 52000 },
  { name: 'Mar', value: 48000 },
  { name: 'Apr', value: 61000 },
  { name: 'May', value: 55000 },
  { name: 'Jun', value: 67000 },
];

const mockExpenseData = [
  { name: 'Salaries', value: 35000 },
  { name: 'Operations', value: 15000 },
  { name: 'Marketing', value: 8000 },
  { name: 'Other', value: 4000 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back to your financial overview</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Assets"
          value="125,340"
          change={12}
          currency
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Total Liabilities"
          value="45,200"
          change={-5}
          currency
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Net Income"
          value="80,140"
          change={18}
          currency
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Account Balance"
          value="89,500"
          change={8}
          currency
          icon={<PieChart className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <FinanceChart
          title="Monthly Revenue"
          data={mockChartData}
          type="line"
          color="#3b82f6"
          height={300}
        />
        <FinanceChart
          title="Expense Distribution"
          data={mockExpenseData}
          type="bar"
          color="#8b5cf6"
          height={300}
        />
      </div>

      {/* Recent Transactions */}
      <TransactionList transactions={mockTransactions} title="Recent Transactions" />
    </div>
  );
}
