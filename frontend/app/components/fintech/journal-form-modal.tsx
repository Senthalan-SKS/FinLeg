'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Label } from '@/app/components/ui/label';
import { Select } from '@/app/components/ui/select-simple';
import { X, Plus, Trash2, AlertTriangle } from 'lucide-react';
import type { Account } from '@/app/lib/types';

interface LineInput {
  id: string;
  accountId: string;
  debitAmount: number;
  creditAmount: number;
  lineDescription: string;
}

interface JournalFormModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function JournalFormModal({ onClose, onSuccess }: JournalFormModalProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactionDate, setTransactionDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('');
  const [lines, setLines] = useState<LineInput[]>([
    { id: crypto.randomUUID(), accountId: '', debitAmount: 0, creditAmount: 0, lineDescription: '' },
    { id: crypto.randomUUID(), accountId: '', debitAmount: 0, creditAmount: 0, lineDescription: '' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    const tokenType = localStorage.getItem('tokenType') || 'Bearer';
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `${tokenType} ${token}` } : {}),
    };
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(`${baseUrl}/accounts`, { headers: getAuthHeaders() });
        const contentType = response.headers.get('content-type');
        let data: any = {};
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        }
        if (response.ok && data.success !== false) {
          setAccounts(data.data || []);
        }
      } catch {
        // silently fail — accounts dropdown will just be empty
      }
    };
    fetchAccounts();
  }, []);

  const totalDebits = lines.reduce((s, l) => s + Number(l.debitAmount || 0), 0);
  const totalCredits = lines.reduce((s, l) => s + Number(l.creditAmount || 0), 0);
  const isBalanced = Math.abs(totalDebits - totalCredits) < 0.001;

  const addLine = () => {
    setLines((prev) => [
      ...prev,
      { id: crypto.randomUUID(), accountId: '', debitAmount: 0, creditAmount: 0, lineDescription: '' },
    ]);
  };

  const removeLine = (id: string) => {
    if (lines.length <= 2) return;
    setLines((prev) => prev.filter((l) => l.id !== id));
  };

  const updateLine = (id: string, field: keyof LineInput, value: string | number) => {
    setLines((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!isBalanced) {
      setSubmitError('Total debits must equal total credits.');
      return;
    }

    setIsSubmitting(true);

    try {
      const body = {
        transactionDate,
        description,
        lines: lines.map((l) => ({
          accountId: l.accountId,
          debitAmount: Number(l.debitAmount) || 0,
          creditAmount: Number(l.creditAmount) || 0,
          lineDescription: l.lineDescription || undefined,
        })),
      };

      const response = await fetch(`${baseUrl}/journals`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
      });

      const contentType = response.headers.get('content-type');
      let data: any = {};
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { success: response.ok, data: null, message: text || 'Request failed.' };
      }

      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Failed to create journal entry.');
      }

      onSuccess();
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const accountOptions = accounts.filter((a) => a.active).map((a) => ({
    value: a.id,
    label: `${a.code} — ${a.name}`,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto py-8">
      <Card className="w-full max-w-2xl mx-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>New Journal Entry</CardTitle>
            <CardDescription>Create a double-entry journal transaction</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Date & Description */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transactionDate">Transaction Date</Label>
                <Input
                  id="transactionDate"
                  type="date"
                  value={transactionDate}
                  onChange={(e) => setTransactionDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="e.g. widraw1"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Lines */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Journal Lines</Label>
                <Button type="button" variant="outline" size="sm" onClick={addLine} className="gap-1">
                  <Plus className="h-3 w-3" />
                  Add Line
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/30 border-b border-border text-muted-foreground text-xs">
                      <th className="text-left py-2 px-2 font-medium w-[40%]">Account</th>
                      <th className="text-right py-2 px-2 font-medium w-[18%]">Debit</th>
                      <th className="text-right py-2 px-2 font-medium w-[18%]">Credit</th>
                      <th className="text-left py-2 px-2 font-medium w-[24%]">Description</th>
                      <th className="w-8" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {lines.map((line) => (
                      <tr key={line.id}>
                        <td className="py-1.5 px-2">
                          <Select
                            value={line.accountId}
                            onChange={(e) => updateLine(line.id, 'accountId', e.target.value)}
                            required
                            className="text-xs"
                          >
                            <option value="">Select account</option>
                            {accountOptions.map((o) => (
                              <option key={o.value} value={o.value}>
                                {o.label}
                              </option>
                            ))}
                          </Select>
                        </td>
                        <td className="py-1.5 px-2">
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            value={line.debitAmount || ''}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              updateLine(line.id, 'debitAmount', val);
                              if (val > 0) updateLine(line.id, 'creditAmount', 0);
                            }}
                            className="text-right text-xs h-9"
                          />
                        </td>
                        <td className="py-1.5 px-2">
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            value={line.creditAmount || ''}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              updateLine(line.id, 'creditAmount', val);
                              if (val > 0) updateLine(line.id, 'debitAmount', 0);
                            }}
                            className="text-right text-xs h-9"
                          />
                        </td>
                        <td className="py-1.5 px-2">
                          <Input
                            placeholder="Optional"
                            value={line.lineDescription}
                            onChange={(e) => updateLine(line.id, 'lineDescription', e.target.value)}
                            className="text-xs h-9"
                          />
                        </td>
                        <td className="py-1.5 px-2 text-center">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            disabled={lines.length <= 2}
                            onClick={() => removeLine(line.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm border-t border-border pt-3">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Total Debits:</span>
                  <span className="font-mono font-semibold">{totalDebits.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Total Credits:</span>
                  <span className="font-mono font-semibold">{totalCredits.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  {isBalanced ? (
                    <span className="text-green-600 font-medium">Balanced</span>
                  ) : (
                    <span className="text-destructive font-medium flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      Unbalanced
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Error */}
            {submitError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                {submitError}
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Posting...' : 'Post Journal Entry'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
