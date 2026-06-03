import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { ArrowRight, BarChart3, Lock, Zap, Smartphone, Users, TrendingUp, CheckCircle2, Shield, Zap as ZapIcon } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: Zap,
      title: 'Fast & Efficient',
      description: 'Record and track transactions quickly with our intuitive interface. Automated workflows save hours of manual work.',
      color: 'from-blue-600 to-blue-500'
    },
    {
      icon: Lock,
      title: 'Secure & Reliable',
      description: 'Bank-level security with encrypted data and automatic backups. Your financial data is always protected.',
      color: 'from-purple-600 to-purple-500'
    },
    {
      icon: BarChart3,
      title: 'Smart Reports',
      description: 'Generate comprehensive financial reports instantly. Visualize trends with beautiful, interactive charts.',
      color: 'from-pink-600 to-pink-500'
    }
  ];

  const benefits = [
    'Real-time transaction tracking',
    'Automated reconciliation',
    'Multi-account management',
    'Financial forecasting',
    'Compliance-ready reports',
    'Integration-ready API'
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CFO, Tech Startup',
      content: 'FinLed transformed how we manage finances. The intuitive interface and powerful reports have been game-changers.',
      initials: 'SJ'
    },
    {
      name: 'Michael Chen',
      role: 'Accounting Manager',
      content: 'We cut our accounting time by 60% using FinLed. The automation features are incredibly powerful.',
      initials: 'MC'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Freelance Accountant',
      content: 'As a freelancer managing multiple clients, FinLed has been essential. Professional and easy to use.',
      initials: 'ER'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for small businesses',
      features: [
        'Up to 100 transactions/month',
        'Basic reporting',
        'Single account',
        'Email support',
        'Manual backups'
      ],
      highlighted: false
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      description: 'Most popular for growing businesses',
      features: [
        'Unlimited transactions',
        'Advanced reporting',
        'Multiple accounts',
        'Priority support',
        'Automatic backups',
        'API access'
      ],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large organizations',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom integrations',
        '24/7 phone support',
        'Advanced security',
        'Custom reports'
      ],
      highlighted: false
    }
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" style={{ animation: 'blob 7s infinite', animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" style={{ animation: 'blob 7s infinite', animationDelay: '4s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8 animate-slideInLeft">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 w-fit">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
                <span className="text-sm font-medium text-blue-900 dark:text-blue-200">
                  🎉 Transform Your Financial Management
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight space-y-2">
                <div className="gradient-text">
                  Professional Financial
                </div>
                <div className="text-foreground">Ledger Management</div>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl">
                Streamline your accounting workflow with our modern, intuitive financial ledger management system. Built for professionals who demand precision and efficiency.
              </p>

              {/* Feature List */}
              <div className="space-y-3 pt-4">
                {['✨ Real-time financial tracking', '🔄 Automated journal entries', '📊 Advanced reporting'].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 group"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right Column - Visual Dashboard Preview */}
            <div className="relative animate-slideInRight hidden lg:block">
              <div className="relative z-10">
                <div className="glass rounded-2xl p-8 space-y-4 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-semibold text-foreground">Dashboard Overview</h3>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-600/20 to-blue-600/5 rounded-lg p-4 border border-blue-600/20">
                      <div className="text-xs text-muted-foreground">Total Assets</div>
                      <div className="text-2xl font-bold text-blue-600 mt-2">$245K</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-600/20 to-purple-600/5 rounded-lg p-4 border border-purple-600/20">
                      <div className="text-xs text-muted-foreground">Total Liabilities</div>
                      <div className="text-2xl font-bold text-purple-600 mt-2">$89K</div>
                    </div>
                  </div>

                  <div className="h-40 bg-gradient-to-b from-blue-600/10 to-transparent rounded-lg flex items-end justify-around px-4 py-4 gap-2">
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full h-24 bg-blue-600 rounded-t-lg animate-pulse"></div>
                      <span className="text-xs text-muted-foreground">Jan</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full h-32 bg-blue-600 rounded-t-lg animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                      <span className="text-xs text-muted-foreground">Feb</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full h-36 bg-blue-600 rounded-t-lg animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <span className="text-xs text-muted-foreground">Mar</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute top-10 -left-10 glass rounded-xl p-4 w-48 animate-float backdrop-blur-xl border border-white/20">
                <div className="text-2xl font-bold text-green-600">+32%</div>
                <p className="text-xs text-muted-foreground mt-1">Revenue Growth YoY</p>
              </div>
              <div className="absolute bottom-20 -right-10 glass rounded-xl p-4 w-48 animate-float backdrop-blur-xl border border-white/20" style={{ animationDelay: '1s' }}>
                <div className="text-2xl font-bold text-orange-600">-12%</div>
                <p className="text-xs text-muted-foreground mt-1">Operating Costs Reduced</p>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
        `}</style>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for professional financial management in one elegant platform
            </p>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-card to-card/80 backdrop-blur">
                  <CardHeader className="pb-4">
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose FinLed?</h2>
                <p className="text-lg text-muted-foreground">
                  We've built the most intuitive and powerful financial management platform for modern businesses.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 group">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle2 className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="glass rounded-2xl p-8 space-y-6 backdrop-blur-xl">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Enterprise Security</h3>
                    <p className="text-sm text-muted-foreground">ISO 27001 Certified</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <ZapIcon className="w-6 h-6 text-purple-600" />
                  <div>
                    <h3 className="font-semibold">99.9% Uptime</h3>
                    <p className="text-sm text-muted-foreground">Guaranteed SLA</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <Users className="w-6 h-6 text-pink-600" />
                  <div>
                    <h3 className="font-semibold">24/7 Support</h3>
                    <p className="text-sm text-muted-foreground">Expert help always available</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                  <div>
                    <h3 className="font-semibold">Trusted by 10K+ Businesses</h3>
                    <p className="text-sm text-muted-foreground">Growing every day</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Loved by Finance Professionals</h2>
            <p className="text-lg text-muted-foreground">
              Hear from businesses that have transformed their financial management with FinLed
            </p>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/80">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  
                  <p className="text-foreground leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center gap-3 pt-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">
              Choose the perfect plan for your business. Always fair, never hidden fees.
            </p>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`border-0 overflow-hidden transition-all duration-300 ${
                  plan.highlighted
                    ? 'md:scale-105 shadow-2xl ring-2 ring-blue-600 bg-gradient-to-br from-card to-card/80'
                    : 'shadow-lg hover:shadow-xl bg-gradient-to-br from-card to-card/80'
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <CardContent className="pt-8 pb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                  
                  <div className="mb-8">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm ml-2">{plan.period}</span>
                  </div>

                  <Button
                    className={`w-full mb-8 ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                        : ''
                    }`}
                    variant={plan.highlighted ? 'default' : 'outline'}
                  >
                    Get Started
                  </Button>

                  <div className="space-y-4">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Have questions? We have answers.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: 'Is my data secure?',
                answer: 'Yes. We use bank-level encryption (AES-256) and comply with GDPR, SOC 2, and ISO 27001 standards. Your data is backed up hourly.'
              },
              {
                question: 'Can I import my existing data?',
                answer: 'Absolutely. We support CSV imports and have integrations with popular accounting software. Our team can help with data migration.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, wire transfers, and ACH payments. Enterprise customers can arrange custom billing.'
              },
              {
                question: 'Is there a free trial?',
                answer: 'Yes! Start with our free trial (no credit card required). You get 30 days full access to all features.'
              }
            ].map((faq, idx) => (
              <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6">
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between font-semibold">
                      {faq.question}
                      <span className="transition-transform duration-300 group-open:rotate-180">
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </summary>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10 -z-10"></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Ready to Transform Your Finance?</h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of professionals who trust FinLed for their financial management.
              Start your free trial today—no credit card required.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

