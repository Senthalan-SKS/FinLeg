'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Plus, Search, RefreshCw, Layers, Calendar, Database } from 'lucide-react';
import { JournalFormModal } from '@/app/components/fintech/journal-form-modal';
import { formatCurrency, formatDate } from '@/app/lib/utils';

interface JournalLine {
  id: string;
  accountId: string;
  accountName: string;
  accountCode: string;
  debitAmount: number;
  creditAmount: number;
  lineDescription: string;
}

interface JournalEntry {
  id: string;
  referenceNumber: string;
  transactionDate: string;
  description: string;
  totalDebit: number;
  totalCredit: number;
  status: string;
  lines: JournalLine[];
}


export default function JournalEntriesPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchJournals = async () => {

    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const tokenType = localStorage.getItem('tokenType') || 'Bearer';
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1'}/journals`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `${tokenType} ${token}` } : {}),
        },
      });

      const contentType = response.headers.get('content-type');
      let data: any = {};
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { success: response.ok, message: text || 'Failed to fetch journals.' };
      }

      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Failed to retrieve journals from backend.');
      }

      setEntries(data.data || []);
    } catch (err: any) {
      console.error('Error fetching journals:', err);
      setError(err.message || 'Could not connect to the API server. Backend may be offline or API is not ready.');
      // Auto fallback to demo data so user doesn't get a blank screen
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  // Filter entries
  const filteredEntries = entries.filter((entry) => {
    const term = searchTerm.toLowerCase();
    const matchesHeader = 
      entry.description.toLowerCase().includes(term) ||
      (entry.referenceNumber && entry.referenceNumber.toLowerCase().includes(term));
    
    const matchesLines = entry.lines?.some((line) => 
      line.accountName.toLowerCase().includes(term) ||
      line.accountCode.toLowerCase().includes(term) ||
      (line.lineDescription && line.lineDescription.toLowerCase().includes(term))
    );

    return matchesHeader || matchesLines;
  });

  // Group filtered entries by transactionDate
  const groupedEntries = filteredEntries.reduce((groups: { [key: string]: JournalEntry[] }, entry) => {
    const date = entry.transactionDate;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(entry);
    return groups;
  }, {});

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedEntries).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="space-y-6 p-4 md:p-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Journal Entries
          </h1>
          <p className="text-muted-foreground mt-1">Manage and view your Double-Entry journal transactions</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => fetchJournals()} 
            disabled={isLoading}
            className="gap-2 transition-all hover:bg-secondary active:scale-95"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-md hover:shadow-blue-500/10 active:scale-95 transition-all"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="h-4 w-4" />
            New Entry
          </Button>
        </div>
      </div>

      {/* Info status if using Demo data or API error */}
      {error && (
        <div className="p-3 rounded-lg bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 text-amber-600 dark:text-shadow-red-500 text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-slideInDown shadow-sm">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 shrink-0" />
            <span>
              {error ? `API Error: ${error}` : 'Unexpected error occurred.'} 
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => fetchJournals()}
            className="h-8 border-amber-500/30 text-amber-700 dark:text-amber-300 hover:bg-amber-500/15"
          >
            Retry Connection
          </Button>
        </div>
      )}

      {/* Search */}
      <Card className="shadow-sm border-muted">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by reference, account, code, or description..."
              className="pl-10 h-11 focus-visible:ring-primary focus-visible:ring-offset-1 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Entries List grouped by Date */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-12 space-y-4">
          <RefreshCw className="h-8 w-8 text-primary animate-spin" />
          <p className="text-muted-foreground text-sm animate-pulse-soft">Loading journal transactions...</p>
        </div>
      ) : sortedDates.length === 0 ? (
        <Card className="border-dashed border-2 py-12 flex flex-col items-center justify-center text-center">
          <Layers className="h-12 w-12 text-muted-foreground mb-4" />
          <CardTitle className="text-lg">No Journal Entries Found</CardTitle>
          <CardDescription className="max-w-xs mt-2">
            {searchTerm ? 'No entries match your search criteria. Try a different search term.' : 'Get started by creating your first journal entry transaction.'}
          </CardDescription>
          {searchTerm && (
            <Button variant="outline" className="mt-4" onClick={() => setSearchTerm('')}>
              Clear Search
            </Button>
          )}
        </Card>
      ) : (
        <div className="space-y-8">
          {sortedDates.map((date) => (
            <div key={date} className="space-y-4 animate-scaleIn">
              {/* Date Header */}
              <div className="flex items-center gap-2 pb-1 border-b border-border">
                <Calendar className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">
                  {formatDate(date)}
                </h3>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full font-medium">
                  {groupedEntries[date].length} {groupedEntries[date].length === 1 ? 'entry' : 'entries'}
                </span>
              </div>

              {/* Transactions on this Date */}
              <div className="grid grid-cols-1 gap-4">
                {groupedEntries[date].map((entry) => (
                  <Card key={entry.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow border-muted">
                    {/* Entry Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-muted/40 border-b border-border">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-sm font-semibold text-primary">{entry.referenceNumber}</span>
                          <Badge 
                            variant="success" 
                            className={
                              entry.status === 'POSTED' || entry.status === 'posted'
                                ? '' 
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 border border-amber-500/20'
                            }
                          >
                            {entry.status}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-foreground">{entry.description}</p>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-right shrink-0">
                        <div>
                          <span className="text-muted-foreground text-xs block">Total Debits</span>
                          <span className="font-bold text-foreground">{formatCurrency(entry.totalDebit)}</span>
                        </div>
                        <div className="border-r border-border h-8"></div>
                        <div>
                          <span className="text-muted-foreground text-xs block">Total Credits</span>
                          <span className="font-bold text-foreground">{formatCurrency(entry.totalCredit)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Entry Lines */}
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-muted/10 border-b border-border text-muted-foreground">
                              <th className="text-left py-2 px-6 font-medium">Account</th>
                              <th className="text-right py-2 px-6 font-medium w-32">Debit</th>
                              <th className="text-right py-2 px-6 font-medium w-32">Credit</th>
                              <th className="text-left py-2 px-6 font-medium">Line Description</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {entry.lines?.map((line) => (
                              <tr key={line.id} className="hover:bg-secondary/20 transition-colors">
                                <td className="py-2.5 px-6">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-muted-foreground bg-secondary/80 px-1.5 py-0.5 rounded text-[10px]">
                                      {line.accountCode}
                                    </span>
                                    <span className={`font-medium ${line.creditAmount > 0 ? 'pl-4 text-muted-foreground' : 'text-foreground'}`}>
                                      {line.accountName}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-2.5 px-6 text-right font-mono font-medium text-foreground">
                                  {line.debitAmount > 0 ? formatCurrency(line.debitAmount) : '-'}
                                </td>
                                <td className="py-2.5 px-6 text-right font-mono font-medium text-foreground">
                                  {line.creditAmount > 0 ? formatCurrency(line.creditAmount) : '-'}
                                </td>
                                <td className="py-2.5 px-6 text-muted-foreground">
                                  {line.lineDescription || '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Journal Modal */}
      {showCreateModal && (
        <JournalFormModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchJournals();
          }}
        />
      )}
    </div>
  );
}
