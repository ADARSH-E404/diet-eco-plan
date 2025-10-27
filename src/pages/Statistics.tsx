import { Card } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { FloatingFood } from '@/components/FloatingFood';
import { TrendingUp, Leaf, DollarSign, Flame, Calendar, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Statistics = () => {
  const monthlyStats = [
    { month: 'Jan', meals: 28, co2: 12, savings: 1200 },
    { month: 'Feb', meals: 32, co2: 15, savings: 1450 },
    { month: 'Mar', meals: 35, co2: 18, savings: 1650 },
    { month: 'Apr', meals: 42, co2: 23, savings: 2450 },
  ];

  const topMeals = [
    { name: 'Mediterranean Quinoa Bowl', count: 12, sustainable: true },
    { name: 'Green Smoothie Power', count: 10, sustainable: true },
    { name: 'Avocado Toast Supreme', count: 8, sustainable: true },
    { name: 'Grilled Chicken Salad', count: 7, sustainable: false },
    { name: 'Overnight Oats Delight', count: 6, sustainable: true },
  ];

  const impactMetrics = [
    {
      icon: <Leaf className="w-8 h-8" />,
      label: 'Total CO₂ Saved',
      value: '78kg',
      change: '+15%',
      color: 'text-primary',
      bgColor: 'from-primary/20 to-primary/5',
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      label: 'Money Saved',
      value: '₹8,450',
      change: '+22%',
      color: 'text-accent',
      bgColor: 'from-accent/20 to-accent/5',
    },
    {
      icon: <Flame className="w-8 h-8" />,
      label: 'Avg Daily Calories',
      value: '1,850',
      change: '-8%',
      color: 'text-primary',
      bgColor: 'from-primary/20 to-primary/5',
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      label: 'Current Streak',
      value: '23 days',
      change: '+23',
      color: 'text-accent',
      bgColor: 'from-accent/20 to-accent/5',
    },
  ];

  return (
    <div className="min-h-screen relative">
      <FloatingFood />
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 glow-text flex items-center gap-3">
            <TrendingUp className="w-10 h-10" />
            Impact & Statistics
          </h1>
          <p className="text-xl text-muted-foreground">
            Track your health journey and environmental impact
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {impactMetrics.map((metric, index) => (
            <Card 
              key={index} 
              className={`card-3d p-6 bg-gradient-to-br ${metric.bgColor} border-border`}
            >
              <div className={`${metric.color} mb-3`}>{metric.icon}</div>
              <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
              <p className="text-3xl font-bold mb-2">{metric.value}</p>
              <Badge className={`${metric.color} bg-opacity-20`}>
                {metric.change} this month
              </Badge>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Monthly Progress Chart */}
          <Card className="card-3d p-6 bg-card border-border lg:col-span-2">
            <h2 className="text-xl font-semibold mb-6">Monthly Progress</h2>
            <div className="space-y-6">
              {monthlyStats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{stat.month}</span>
                    <div className="flex gap-4 text-muted-foreground">
                      <span>{stat.meals} meals</span>
                      <span>{stat.co2}kg CO₂</span>
                      <span>₹{stat.savings}</span>
                    </div>
                  </div>
                  <div className="relative h-8 bg-background rounded-lg overflow-hidden">
                    <div 
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent transition-all duration-500"
                      style={{ width: `${(stat.meals / 50) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Meals */}
          <Card className="card-3d p-6 bg-card border-border">
            <h2 className="text-xl font-semibold mb-6">Top Meals</h2>
            <div className="space-y-3">
              {topMeals.map((meal, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-background rounded-lg hover:bg-secondary transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{meal.name}</p>
                    <p className="text-xs text-muted-foreground">{meal.count} times</p>
                  </div>
                  {meal.sustainable && (
                    <Leaf className="w-4 h-4 text-primary" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Environmental Impact Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="card-3d p-6 bg-card border-border">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Leaf className="w-6 h-6 text-primary" />
              Sustainability Breakdown
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Eco-Friendly Meals</span>
                  <span className="text-sm text-primary font-bold">85%</span>
                </div>
                <div className="h-3 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: '85%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Local Products</span>
                  <span className="text-sm text-primary font-bold">72%</span>
                </div>
                <div className="h-3 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: '72%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Minimal Packaging</span>
                  <span className="text-sm text-primary font-bold">68%</span>
                </div>
                <div className="h-3 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: '68%' }} />
                </div>
              </div>
            </div>
          </Card>

          <Card className="card-3d p-6 bg-card border-border">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-accent" />
              Impact Comparison
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Your CO₂ savings equal to</p>
                <p className="text-2xl font-bold text-primary">156 trees planted</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-accent/20 to-accent/5 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Your waste reduction equal to</p>
                <p className="text-2xl font-bold text-accent">420 plastic bags saved</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Water conservation equal to</p>
                <p className="text-2xl font-bold text-primary">2,340 liters saved</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Achievements Section */}
        <Card className="card-3d p-8 bg-gradient-to-r from-primary/20 to-accent/20 border-primary/50 glow-border text-center">
          <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl font-bold mb-3">You're Making a Difference!</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Your sustainable choices have helped reduce carbon emissions equivalent to driving <span className="text-primary font-bold">450km less</span> by car. Keep up the amazing work!
          </p>
          <Badge className="bg-primary text-primary-foreground text-lg px-6 py-2">
            Top 5% Eco-Conscious Users
          </Badge>
        </Card>
      </main>
    </div>
  );
};

export default Statistics;
