import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { CheckCircle2, Trophy, Zap, Users, Globe, Award, Mail, Phone, MapPin } from 'lucide-react';

export default function AboutPage() {
  const achievements = [
    { icon: Trophy, title: '10,000+', subtitle: 'Active Users' },
    { icon: Globe, title: '50+', subtitle: 'Countries' },
    { icon: Zap, title: '99.9%', subtitle: 'Uptime' },
    { icon: Award, title: '5 Stars', subtitle: 'Average Rating' },
  ];

  const team = [
    { name: 'Sarah Johnson', role: 'Founder & CEO', icon: '👩‍💼' },
    { name: 'Michael Chen', role: 'CTO & Co-Founder', icon: '👨‍💻' },
    { name: 'Lisa Anderson', role: 'Head of Product', icon: '🎯' },
    { name: 'David Smith', role: 'Head of Finance', icon: '📊' },
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-blue-50/50 to-background dark:from-blue-950/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text">About FinLed</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Revolutionizing financial management for modern businesses since 2024.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="border-0 shadow-lg hover:shadow-xl transition-all">
                  <CardContent className="pt-6 text-center">
                    <Icon className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                    <div className="text-2xl font-bold">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.subtitle}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              Empowering businesses with modern tools for financial success.
            </p>
          </div>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80">
            <CardHeader>
              <CardTitle className="text-2xl">Building the Future of Finance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                At FinLed, we believe that financial management should be simple, accessible, and
                affordable for everyone. Our mission is to empower businesses and accountants with
                modern tools that make financial tracking and reporting effortless.
              </p>
              <p>
                Founded in 2024, FinLed has quickly become the trusted choice for financial
                professionals who demand reliability, security, and ease of use.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardHeader>
                <CheckCircle2 className="w-8 h-8 text-green-600 mb-4" />
                <CardTitle>Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We maintain the highest standards of accuracy and honesty in everything we do.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardHeader>
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-4" />
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We continuously improve our platform with cutting-edge features and technology.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardHeader>
                <CheckCircle2 className="w-8 h-8 text-purple-600 mb-4" />
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We strive for perfection in our products and customer service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Leadership Team</h2>
            <p className="text-lg text-muted-foreground">
              Experienced professionals dedicated to financial excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name} className="border-0 shadow-lg hover:shadow-xl transition-all group">
                <CardContent className="pt-6 text-center">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{member.icon}</div>
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Get in Touch</h2>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600/10 to-purple-600/10">
            <CardContent className="pt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex gap-4 items-start">
                  <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">hello@FinLed.com</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Phone className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <MapPin className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-muted-foreground">123 Finance Street, New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

