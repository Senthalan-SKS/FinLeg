import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

interface TransactionItem {
  id: string;
  account: string;
  description: string;
  amount: number;
  type: 'debit' | 'credit';
  date: string;
}

interface TransactionListProps {
  transactions: TransactionItem[];
  title?: string;
}

export function TransactionList({ transactions, title = 'Recent Transactions' }: TransactionListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">
                  {transaction.account} • {transaction.date}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={transaction.type === 'credit' ? 'success' : 'default'}>
                  {transaction.type}
                </Badge>
                <span className={`font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
