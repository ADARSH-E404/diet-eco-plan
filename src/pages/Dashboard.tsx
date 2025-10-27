import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { FloatingFood } from '@/components/FloatingFood';
import { 
  Calendar, 
  ShoppingCart, 
  Leaf, 
  TrendingUp,
  Apple,
  DollarSign,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const stats = [
    { icon: <Calendar className="w-6 h-6" />, label: 'Meals Planned', value: '42', color: 'text-primary' },
    { icon: <ShoppingCart className="w-6 h-6" />, label: 'Shopping Lists', value: '12', color: 'text-accent' },
    { icon: <Leaf className="w-6 h-6" />, label: 'CO₂ Saved', value: '23kg', color: 'text-primary' },
    { icon: <DollarSign className="w-6 h-6" />, label: 'Money Saved', value: '₹2,450', color: 'text-accent' },
  ];

  const recentMeals = [
    { name: 'Mediterranean Quinoa Bowl', calories: 420, time: 'Today', sustainable: true },
    { name: 'Green Smoothie Power', calories: 280, time: 'Yesterday', sustainable: true },
    { name: 'Grilled Chicken Salad', calories: 380, time: '2 days ago', sustainable: false },
  ];

  const upcomingGoals = [
    { title: 'Weekly Meal Prep', progress: 75, total: 7, completed: 5 },
    { title: 'Sustainable Shopping', progress: 60, total: 10, completed: 6 },
    { title: 'Calorie Target', progress: 85, total: 2000, completed: 1700 },
  ];

  return (
    <div className="min-h-screen relative">
      <FloatingFood />
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 glow-text">Welcome Back!</h1>
          <p className="text-xl text-muted-foreground">Here's your health and sustainability overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="card-3d p-6 bg-card border-border">
              <div className="flex items-center gap-4">
                <div className={`${stat.color}`}>{stat.icon}</div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <Card className="card-3d p-6 bg-card border-border">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Apple className="w-5 h-5 text-primary" />
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link to="/meal-planner">
                <Button className="w-full btn-3d bg-primary hover:bg-primary/90 justify-start">
                  <Calendar className="w-4 h-4" />
                  Plan New Meal
                </Button>
              </Link>
              <Link to="/grocery-list">
                <Button variant="outline" className="w-full btn-3d justify-start">
                  <ShoppingCart className="w-4 h-4" />
                  Create Shopping List
                </Button>
              </Link>
              <Link to="/shopping-guide">
                <Button variant="outline" className="w-full btn-3d justify-start">
                  <Leaf className="w-4 h-4" />
                  Sustainable Tips
                </Button>
              </Link>
              <Link to="/statistics">
                <Button variant="outline" className="w-full btn-3d justify-start">
                  <TrendingUp className="w-4 h-4" />
                  View Statistics
                </Button>
              </Link>
            </div>
          </Card>

          {/* Recent Meals */}
          <Card className="card-3d p-6 bg-card border-border lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Recent Meals</h2>
            <div className="space-y-3">
              {recentMeals.map((meal, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-secondary transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Apple className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{meal.name}</p>
                      <p className="text-sm text-muted-foreground">{meal.calories} cal • {meal.time}</p>
                    </div>
                  </div>
                  {meal.sustainable && (
                    <Leaf className="w-5 h-5 text-primary" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Goals Progress */}
        <Card className="card-3d p-6 bg-card border-border">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Your Goals
          </h2>
          <div className="space-y-4">
            {upcomingGoals.map((goal, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{goal.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {goal.completed} / {goal.total}
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
