'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { FileText, Download } from 'lucide-react';

const mockReports = [
  {
    id: '1',
    name: 'Income Statement',
    description: 'Shows revenue, expenses, and net income',
    generatedDate: '2024-12-01',
  },
  {
    id: '2',
    name: 'Balance Sheet',
    description: 'Displays assets, liabilities, and equity',
    generatedDate: '2024-12-01',
  },
  {
    id: '3',
    name: 'Cash Flow Statement',
    description: 'Shows cash inflows and outflows',
    generatedDate: '2024-11-30',
  },
  {
    id: '4',
    name: 'Profit & Loss Summary',
    description: 'Monthly profit and loss overview',
    generatedDate: '2024-11-30',
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground mt-2">Access and download financial reports</p>
      </div>

      {/* Reports Grid */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {mockReports.map((report) => (
          <Card key={report.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <CardTitle className="text-lg">{report.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      {report.description}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Generated: {new Date(report.generatedDate).toLocaleDateString()}
                </p>
                <Button size="sm" variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Generate New Report */}
      <Card>
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Generate custom financial reports based on your selection criteria
            </p>
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
              <Button variant="outline">Create Custom Report</Button>
              <Button variant="outline">Export All Data</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
