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

export interface GeneralLedgerTransactionResponse {
  journalEntryId: string;
  referenceNumber: string;
  transactionDate: string;
  description: string;
  lineDescription: string;
  debitAmount: number;
  creditAmount: number;
}

export interface GeneralLedgerAccountResponse {
  accountId: string;
  accountCode: string;
  accountName: string;
  accountType: string;
  totalDebit: number;
  totalCredit: number;
  balance: number;
  transactions: GeneralLedgerTransactionResponse[];
}

export interface GeneralLedgerResponse {
  totalDebits: number;
  totalCredits: number;
  accounts: GeneralLedgerAccountResponse[];
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
