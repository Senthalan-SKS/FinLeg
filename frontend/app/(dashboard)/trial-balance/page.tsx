'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

const mockTrialBalance = [
  { id: '1', code: '1000', account: 'Cash', debit: 11500, credit: 0, type: 'asset' },
  { id: '2', code: '1100', account: 'Accounts Receivable', debit: 3500, credit: 0, type: 'asset' },
  { id: '3', code: '2000', account: 'Accounts Payable', debit: 0, credit: 4000, type: 'liability' },
  { id: '4', code: '3000', account: 'Owner Capital', debit: 0, credit: 15000, type: 'equity' },
  { id: '5', code: '4000', account: 'Revenue', debit: 0, credit: 15000, type: 'revenue' },
  { id: '6', code: '5000', account: 'Expenses', debit: 5000, credit: 0, type: 'expense' },
];

const totalDebits = mockTrialBalance.reduce((sum, item) => sum + item.debit, 0);
const totalCredits = mockTrialBalance.reduce((sum, item) => sum + item.credit, 0);

export default function TrialBalancePage() {
  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trial Balance</h1>
        <p className="text-muted-foreground mt-2">
          As of {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Trial Balance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Account Summary</CardTitle>
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
                {mockTrialBalance.map((item) => (
                  <tr key={item.id} className="border-b border-border hover:bg-secondary/50">
                    <td className="py-3 px-4">{item.code}</td>
                    <td className="py-3 px-4 font-medium">{item.account}</td>
                    <td className="py-3 px-4 text-right">
                      {item.debit > 0 ? `$${item.debit.toFixed(2)}` : '-'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {item.credit > 0 ? `$${item.credit.toFixed(2)}` : '-'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant="outline">{item.type}</Badge>
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-border bg-secondary/50 font-semibold">
                  <td colSpan={2} className="py-3 px-4">
                    Totals
                  </td>
                  <td className="py-3 px-4 text-right">${totalDebits.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">${totalCredits.toFixed(2)}</td>
                  <td className="py-3 px-4 text-center">
                    {Math.abs(totalDebits - totalCredits) < 0.01 ? (
                      <Badge className="bg-green-600">Balanced</Badge>
                    ) : (
                      <Badge variant="destructive">Unbalanced</Badge>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
