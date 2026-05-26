export type TransactionType = 'debit' | 'credit';
export type AccountType = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
export type ReportType = 'income-statement' | 'balance-sheet' | 'cash-flow';

export interface Transaction {
  id: string;
  account: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  account: string;
  debit: number;
  credit: number;
  description: string;
  status: 'draft' | 'posted';
}

export interface LedgerAccount {
  id: string;
  code: string;
  name: string;
  openingBalance: number;
  debits: number;
  credits: number;
  closingBalance: number;
  type: AccountType;
}

export interface StatData {
  title: string;
  value: string;
  change?: number;
  currency?: boolean;
}
