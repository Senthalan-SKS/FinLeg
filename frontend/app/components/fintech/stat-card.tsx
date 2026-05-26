import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  currency?: boolean;
  icon?: React.ReactNode;
}

export function StatCard({ title, value, change, currency = false, icon }: StatCardProps) {
  const isPositive = (change ?? 0) >= 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{currency ? '$' : ''}{value}</div>
        {change !== undefined && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
            {isPositive ? (
              <ArrowUpRight className="h-4 w-4 text-green-600" />
            ) : (
              <ArrowDownLeft className="h-4 w-4 text-red-600" />
            )}
            <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
              {Math.abs(change)}%
            </span>
            <span>from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
