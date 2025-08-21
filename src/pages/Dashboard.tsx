import { useEffect, useState } from 'react';
import { 
  Cloud, 
  Bug, 
  TrendingUp, 
  CreditCard, 
  Shield, 
  FileText, 
  Lightbulb,
  MapPin,
  Thermometer,
  Droplets
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/FeatureCard';
import heroImage from '@/assets/agri-hero.jpg';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      title: 'Weather Forecast',
      description: '5-day weather prediction with agricultural recommendations',
      icon: <Cloud className="w-6 h-6 text-white" />,
      href: '/weather',
      gradient: 'secondary' as const,
    },
    {
      title: 'Pest Detection',
      description: 'AI-powered plant disease and pest identification',
      icon: <Bug className="w-6 h-6 text-white" />,
      href: '/pest-detection',
      gradient: 'primary' as const,
    },
    {
      title: 'Market Prices',
      description: 'Real-time crop prices and market trends',
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      href: '/market-prices',
      gradient: 'harvest' as const,
    },
    {
      title: 'Loan Services',
      description: 'Agricultural loans and financial assistance',
      icon: <CreditCard className="w-6 h-6 text-white" />,
      href: '/loans',
      gradient: 'primary' as const,
    },
    {
      title: 'Insurance',
      description: 'Crop insurance guidance and premium calculator',
      icon: <Shield className="w-6 h-6 text-white" />,
      href: '/insurance',
      gradient: 'secondary' as const,
    },
    {
      title: 'Gov Schemes',
      description: 'Government agricultural schemes and subsidies',
      icon: <FileText className="w-6 h-6 text-white" />,
      href: '/schemes',
      gradient: 'harvest' as const,
    },
  ];

  return (
    <div className="min-h-screen gradient-earth">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Indian agriculture landscape" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 gradient-primary opacity-80"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Welcome to Agri-Assist
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Empowering Indian farmers with modern agricultural technology and comprehensive farming solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8 py-3 shadow-medium hover:shadow-strong transition-spring"
              >
                <Bug className="w-5 h-5 mr-2" />
                Quick Pest Detection
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-3 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Cloud className="w-5 h-5 mr-2" />
                Check Weather
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="shadow-soft border-border bg-card/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Today's Weather</CardTitle>
                <Thermometer className="h-4 w-4 ml-auto text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">28°C</div>
                <p className="text-xs text-muted-foreground">Sunny, Good for farming</p>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-border bg-card/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Location</CardTitle>
                <MapPin className="h-4 w-4 ml-auto text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">Delhi</div>
                <p className="text-xs text-muted-foreground">PIN: 110001</p>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-border bg-card/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Humidity</CardTitle>
                <Droplets className="h-4 w-4 ml-auto text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">65%</div>
                <p className="text-xs text-muted-foreground">Optimal for crops</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Farming Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to make informed decisions about your crops, weather, and farm management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Card className="gradient-harvest shadow-strong border-0">
            <CardContent className="p-8">
              <Lightbulb className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Transform Your Farming?
              </h3>
              <p className="text-xl text-white/90 mb-6">
                Join thousands of farmers already using Agri-Assist to increase their crop yield and profits
              </p>
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8 py-3"
              >
                Complete Your Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;