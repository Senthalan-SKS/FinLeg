import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import { CheckCircle2, X, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for individuals and small businesses',
      features: [
        { text: 'Up to 100 transactions/month', included: true },
        { text: 'Basic financial reports', included: true },
        { text: 'Email support', included: true },
        { text: 'Single user account', included: true },
        { text: 'Mobile access', included: true },
        { text: 'API access', included: false },
        { text: 'Priority support', included: false },
      ],
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      description: 'Ideal for growing businesses',
      features: [
        { text: 'Unlimited transactions', included: true },
        { text: 'Advanced financial reports', included: true },
        { text: 'Priority email support', included: true },
        { text: 'Up to 5 user accounts', included: true },
        { text: 'Mobile access', included: true },
        { text: 'API access', included: true },
        { text: 'Custom integrations', included: true },
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large organizations',
      features: [
        { text: 'Unlimited everything', included: true },
        { text: 'Custom financial reports', included: true },
        { text: '24/7 phone support', included: true },
        { text: 'Unlimited user accounts', included: true },
        { text: 'Mobile access', included: true },
        { text: 'API access', included: true },
        { text: 'Dedicated account manager', included: true },
      ],
      highlighted: false,
    },
  ];

  const comparison = [
    { feature: 'Transactions', starter: '100/mo', pro: 'Unlimited', enterprise: 'Unlimited' },
    { feature: 'Reports', starter: 'Basic', pro: 'Advanced', enterprise: 'Custom' },
    { feature: 'Users', starter: '1', pro: '5', enterprise: 'Unlimited' },
    { feature: 'API Access', starter: '❌', pro: '✓', enterprise: '✓' },
    { feature: 'Support', starter: 'Email', pro: 'Priority', enterprise: '24/7 Phone' },
  ];

  return (
    <div className="space-y-0">
      {/* Header Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-50/50 to-background dark:from-blue-950/20">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">
            Choose the perfect plan for your financial management needs. Always fair, never hidden fees.
          </p>
          
          <div className="flex justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`flex flex-col border-0 shadow-lg transition-all duration-300 ${
                  plan.highlighted
                    ? 'md:scale-105 ring-2 ring-blue-600 shadow-2xl bg-gradient-to-br from-card to-card/80'
                    : 'hover:shadow-xl bg-gradient-to-br from-card to-card/80'
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 text-sm font-semibold rounded-t-lg">
                    ⭐ Most Popular
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-muted-foreground text-sm mt-2">{plan.description}</p>
                  <div className="mt-6">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2 text-sm">{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <Link href="/register" className="mb-8">
                    <Button
                      className={`w-full gap-2 ${
                        plan.highlighted
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                          : ''
                      }`}
                      variant={plan.highlighted ? 'default' : 'outline'}
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>

                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature.text} className="flex items-start gap-3">
                        {feature.included ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? 'text-foreground text-sm' : 'text-muted-foreground text-sm'}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Feature Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground">Starter</th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground">Professional</th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-secondary/30' : ''}>
                    <td className="py-4 px-4 font-medium text-foreground">{row.feature}</td>
                    <td className="py-4 px-4 text-center text-muted-foreground">{row.starter}</td>
                    <td className="py-4 px-4 text-center text-foreground font-medium">{row.pro}</td>
                    <td className="py-4 px-4 text-center text-foreground font-medium">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'Can I change plans anytime?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
              },
              {
                q: 'Do you offer a free trial?',
                a: 'Yes! All plans come with a 14-day free trial. No credit card required to start.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, bank transfers, and digital payment methods for maximum flexibility.',
              },
              {
                q: 'Is there a setup fee?',
                a: 'No setup fees at all. You only pay the monthly subscription price. Honest pricing, no surprises.',
              },
              {
                q: 'Do you offer annual billing?',
                a: 'Yes! Save 20% when you pay annually. Contact our sales team for custom enterprise pricing.',
              },
              {
                q: 'Can I cancel my subscription?',
                a: 'Absolutely. Cancel anytime with no penalties. Your data is always yours to download.',
              },
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-all">
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between font-semibold p-6">
                    {item.q}
                    <span className="transition-transform duration-300 group-open:rotate-180">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </summary>
                  <CardContent className="pb-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {item.a}
                    </p>
                  </CardContent>
                </details>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="text-lg text-muted-foreground">
            Start your free 14-day trial today. No credit card required.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
