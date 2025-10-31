import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FloatingFood } from '@/components/FloatingFood';
import { Navbar } from '@/components/Navbar';
import { Leaf, ShoppingCart, TrendingUp, Users, Heart, Globe } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const Home = () => {
  const features = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'AI Meal Planning',
      description: 'Personalized meal plans based on your dietary preferences and nutritional goals.',
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: 'Smart Grocery Lists',
      description: 'Automatically generated shopping lists with real-time price tracking in ₹.',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Sustainable Shopping',
      description: 'Eco-friendly product recommendations to reduce your carbon footprint.',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Impact Tracking',
      description: 'Monitor your environmental impact and celebrate sustainable choices.',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Health Insights',
      description: 'Detailed nutritional analysis and health recommendations.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community Support',
      description: 'Join a community of health-conscious, eco-friendly shoppers.',
    },
  ];

  return (
    <div className="min-h-screen relative">
      <FloatingFood />
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center pt-16"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="container mx-auto px-4 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">
            Smart Diet & Grocery Planner
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            AI-powered meal planning, smart grocery lists, and sustainable shopping—all in Indian Rupees (₹)
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="btn-3d bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="btn-3d border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6">
                Explore Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need for <span className="text-primary">Healthy Living</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools to help you eat better, shop smarter, and live sustainably
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="card-3d p-6 bg-card border-border hover:border-primary transition-colors"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <Card className="card-3d p-12 text-center bg-gradient-to-r from-primary/20 to-accent/20 border-primary/50 glow-border">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Lifestyle?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users making healthier, more sustainable choices every day
            </p>
            <Link to="/auth">
              <Button size="lg" className="btn-3d bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                Get Started for Free
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border relative z-10">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 HealthyCart. All rights reserved. Making the world healthier and greener.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
