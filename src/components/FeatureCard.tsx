import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  gradient?: 'primary' | 'secondary' | 'harvest';
}

const FeatureCard = ({ title, description, icon, href, gradient = 'primary' }: FeatureCardProps) => {
  const gradientClasses = {
    primary: 'gradient-primary',
    secondary: 'gradient-secondary',
    harvest: 'gradient-harvest',
  };

  return (
    <Card className="group hover:shadow-medium transition-spring border-border bg-card">
      <CardHeader className="pb-3">
        <div className={`w-12 h-12 rounded-lg ${gradientClasses[gradient]} flex items-center justify-center mb-3`}>
          {icon}
        </div>
        <CardTitle className="text-lg text-card-foreground group-hover:text-primary transition-smooth">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Button 
          asChild 
          variant="ghost" 
          className="w-full justify-between group-hover:bg-muted/50 transition-smooth"
        >
          <Link to={href}>
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;