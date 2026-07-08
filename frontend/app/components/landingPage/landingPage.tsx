import Link from 'next/link';
import { ArrowRight, BarChart3, BookOpen, CheckCircle2, ShieldCheck, Sparkles, Layers, BadgeCheck, LineChart, Wallet } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';

const features = [
  {
    icon: BookOpen,
    title: 'Double-entry accounting',
    description: 'Keep every journal balanced with a ledger-first workflow built for accuracy and auditability.',
  },
  {
    icon: BarChart3,
    title: 'Real-time visibility',
    description: 'Review cash flow, ledger positions, and trial balance signals from one unified operating view.',
  },
  {
    icon: ShieldCheck,
    title: 'Operational trust',
    description: 'Premium UI, clear controls, and a structure designed to support secure financial operations.',
  },
];

const highlights = [
  'Direct login and registration flows',
  'Dashboard-ready product entry points',
  'Ledger, journal, and reporting modules',
  'Clean interface with premium visual hierarchy',
];

const metrics = [
  { value: '99.9%', label: 'calculation reliability' },
  { value: '24/7', label: 'system access' },
  { value: '1 flow', label: 'from landing to product' },
];

export default function LandingPage() {
  return (
    <main className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_34%),linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--secondary)/0.35)_100%)]">
      <div className="absolute inset-0 -z-10 opacity-70 [background-image:linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 lg:px-8">
        <header className="flex items-center justify-between rounded-2xl border border-border/70 bg-background/75 px-4 py-3 backdrop-blur-xl shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight text-foreground">FinLed</p>
              <p className="text-xs text-muted-foreground">Financial ledger system</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#product" className="transition-colors hover:text-foreground">Product</a>
            <a href="#cta" className="transition-colors hover:text-foreground">Get started</a>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/login" className="hidden rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex">
              Sign in
            </Link>
            <Link href="/register" className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition-shadow hover:shadow-blue-600/30">
              Start free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </header>

        <div className="grid flex-1 items-center gap-16 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm">
              <BadgeCheck className="h-4 w-4 text-blue-600" />
              Premium accounting experience for modern teams
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
                A refined financial ledger built to feel fast, clear, and trustworthy.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                FinLed connects your landing experience directly to the product workflow, giving users a premium entry point into accounts, journals, ledgers, and reporting.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition-shadow hover:shadow-blue-600/30">
                Create account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full border border-border/80 bg-background/70 px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/60">
                Open dashboard
              </Link>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/75 p-4 text-sm text-foreground shadow-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div id="product" className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-blue-600/15 via-cyan-500/10 to-transparent blur-2xl" />
            <Card className="overflow-hidden border-border/70 bg-background/85 shadow-[0_30px_90px_rgba(15,23,42,0.18)] backdrop-blur-xl">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center justify-between border-b border-border/70 pb-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">FinLed Workspace</p>
                    <p className="text-xs text-muted-foreground">Connected to dashboard and ledger modules</p>
                  </div>
                  <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">
                    System online
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-border/70 bg-gradient-to-b from-blue-600/10 to-transparent p-4">
                    <Wallet className="h-5 w-5 text-blue-600" />
                    <p className="mt-4 text-sm text-muted-foreground">Current balance</p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">$137,850</p>
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-gradient-to-b from-cyan-500/10 to-transparent p-4">
                    <LineChart className="h-5 w-5 text-cyan-600" />
                    <p className="mt-4 text-sm text-muted-foreground">Month trend</p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">+12.4%</p>
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-gradient-to-b from-slate-500/10 to-transparent p-4">
                    <Layers className="h-5 w-5 text-slate-700" />
                    <p className="mt-4 text-sm text-muted-foreground">Modules connected</p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">4 core</p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-border/70 bg-secondary/30 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">Recent system activity</p>
                    <p className="text-xs text-muted-foreground">Live operational context</p>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      'Journal entry posted and balanced',
                      'Trial balance validated successfully',
                      'Ledger account updated in real time',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-xl bg-background/80 px-3 py-2 text-sm text-muted-foreground">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <section id="features" className="grid gap-4 py-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-border/70 bg-background/80 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/15 to-cyan-500/15 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 text-lg font-semibold text-foreground">{feature.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="grid gap-4 py-10 md:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-border/70 bg-background/70 p-6 text-center shadow-sm">
              <p className="text-3xl font-semibold tracking-tight text-foreground">{metric.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </section>

        <section id="cta" className="mb-6 rounded-[2rem] border border-border/70 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-6 py-10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.28)] md:px-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl space-y-2">
              <p className="text-sm font-medium text-blue-200">Ready for production use</p>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Connect users straight from the landing page into your financial system.
              </h2>
            </div>
            <div className="flex gap-3">
              <Link href="/register" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-slate-950 transition-colors hover:bg-slate-100">
                Get started
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10">
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
