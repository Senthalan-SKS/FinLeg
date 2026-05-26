'use client';

import { useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Search } from 'lucide-react';

const mockLedgerAccounts = [
  {
    id: '1',
    code: '1000',
    name: 'Cash',
    openingBalance: 5000,
    debits: 8500,
    credits: 2000,
    closingBalance: 11500,
    type: 'asset',
  },
  {
    id: '2',
    code: '1100',
    name: 'Accounts Receivable',
    openingBalance: 2000,
    debits: 3000,
    credits: 1500,
    closingBalance: 3500,
    type: 'asset',
  },
  {
    id: '3',
    code: '2000',
    name: 'Accounts Payable',
    openingBalance: 3000,
    debits: 1000,
    credits: 2000,
    closingBalance: 4000,
    type: 'liability',
  },
  {
    id: '4',
    code: '4000',
    name: 'Revenue',
    openingBalance: 0,
    debits: 0,
    credits: 15000,
    closingBalance: 15000,
    type: 'revenue',
  },
];

export default function LedgerPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAccounts = mockLedgerAccounts.filter(
    (account) =>
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.code.includes(searchTerm)
  );

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      asset: 'default',
      liability: 'destructive',
      revenue: 'success',
      expense: 'outline',
    };
    return colors[type] || 'default';
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">General Ledger</h1>
        <p className="text-muted-foreground mt-2">View account balances and transaction history</p>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by account name or code..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Ledger Accounts */}
      <div className="grid gap-4">
        {filteredAccounts.map((account) => (
          <Card key={account.id}>
            <CardContent className="pt-6">
              <div className="grid gap-4 sm:grid-cols-6">
                <div>
                  <p className="text-xs text-muted-foreground">Account Code</p>
                  <p className="font-semibold">{account.code}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Account Name</p>
                  <p className="font-semibold">{account.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Opening Balance</p>
                  <p className="font-semibold">${account.openingBalance.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Debits</p>
                  <p className="font-semibold text-blue-600">${account.debits.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Credits</p>
                  <p className="font-semibold text-green-600">${account.credits.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Closing Balance</p>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">${account.closingBalance.toFixed(2)}</p>
                    <Badge variant={getTypeColor(account.type)}>{account.type}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
