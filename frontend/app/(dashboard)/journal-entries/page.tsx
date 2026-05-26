'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Plus, Search } from 'lucide-react';

const mockJournalEntries = [
  {
    id: '1',
    date: '2024-12-01',
    account: 'Cash',
    debit: 1000,
    credit: 0,
    description: 'Initial deposit',
    status: 'posted',
  },
  {
    id: '2',
    date: '2024-11-30',
    account: 'Expense',
    debit: 0,
    credit: 500,
    description: 'Office supplies',
    status: 'posted',
  },
];

export default function JournalEntriesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntries = mockJournalEntries.filter(
    (entry) =>
      entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.account.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Journal Entries</h1>
          <p className="text-muted-foreground mt-2">Manage your financial journal entries</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Entry
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by account or description..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Journal Entries Table */}
      <Card>
        <CardHeader>
          <CardTitle>Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Account</th>
                  <th className="text-right py-3 px-4 font-medium">Debit</th>
                  <th className="text-right py-3 px-4 font-medium">Credit</th>
                  <th className="text-left py-3 px-4 font-medium">Description</th>
                  <th className="text-center py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry) => (
                  <tr key={entry.id} className="border-b border-border hover:bg-secondary/50">
                    <td className="py-3 px-4">{entry.date}</td>
                    <td className="py-3 px-4">{entry.account}</td>
                    <td className="py-3 px-4 text-right">
                      {entry.debit > 0 ? `$${entry.debit.toFixed(2)}` : '-'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {entry.credit > 0 ? `$${entry.credit.toFixed(2)}` : '-'}
                    </td>
                    <td className="py-3 px-4">{entry.description}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant="success">{entry.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
