import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navbar } from '@/components/Navbar';
import { FloatingFood } from '@/components/FloatingFood';
import { Calendar, Sparkles, Apple, Clock, Flame } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const MealPlanner = () => {
  const [selectedDay, setSelectedDay] = useState('monday');
  const [dietType, setDietType] = useState('balanced');

  const suggestionsByDay: Record<string, Array<{ name: string; type: string; calories: number; protein: string; time: string; sustainable: boolean; price: string }>> = {
    monday: [
      { name: 'Avocado Toast with Poached Eggs', type: 'Breakfast', calories: 350, protein: '18g', time: '15 min', sustainable: true, price: '₹120' },
      { name: 'Mediterranean Quinoa Bowl', type: 'Lunch', calories: 480, protein: '22g', time: '25 min', sustainable: true, price: '₹180' },
      { name: 'Grilled Salmon with Vegetables', type: 'Dinner', calories: 520, protein: '35g', time: '30 min', sustainable: false, price: '₹350' },
      { name: 'Greek Yogurt with Berries', type: 'Snack', calories: 180, protein: '12g', time: '5 min', sustainable: true, price: '₹80' },
    ],
    tuesday: [
      { name: 'Oats Porridge with Banana', type: 'Breakfast', calories: 320, protein: '10g', time: '10 min', sustainable: true, price: '₹60' },
      { name: 'Paneer Tikka Salad', type: 'Lunch', calories: 450, protein: '28g', time: '20 min', sustainable: true, price: '₹160' },
      { name: 'Chicken Stir Fry with Brown Rice', type: 'Dinner', calories: 540, protein: '38g', time: '25 min', sustainable: false, price: '₹300' },
      { name: 'Roasted Chana', type: 'Snack', calories: 150, protein: '8g', time: '5 min', sustainable: true, price: '₹40' },
    ],
    wednesday: [
      { name: 'Masala Omelette', type: 'Breakfast', calories: 300, protein: '20g', time: '10 min', sustainable: true, price: '₹50' },
      { name: 'Dal Khichdi with Salad', type: 'Lunch', calories: 480, protein: '16g', time: '30 min', sustainable: true, price: '₹120' },
      { name: 'Tofu Curry with Quinoa', type: 'Dinner', calories: 510, protein: '30g', time: '30 min', sustainable: true, price: '₹220' },
      { name: 'Peanut Butter Apple Slices', type: 'Snack', calories: 200, protein: '7g', time: '5 min', sustainable: true, price: '₹70' },
    ],
    thursday: [
      { name: 'Idli with Sambar', type: 'Breakfast', calories: 330, protein: '12g', time: '20 min', sustainable: true, price: '₹80' },
      { name: 'Grilled Veg Sandwich', type: 'Lunch', calories: 420, protein: '14g', time: '15 min', sustainable: true, price: '₹110' },
      { name: 'Fish Curry with Rice', type: 'Dinner', calories: 560, protein: '36g', time: '35 min', sustainable: false, price: '₹340' },
      { name: 'Buttermilk', type: 'Snack', calories: 90, protein: '4g', time: '2 min', sustainable: true, price: '₹30' },
    ],
    friday: [
      { name: 'Smoothie Bowl', type: 'Breakfast', calories: 320, protein: '12g', time: '10 min', sustainable: true, price: '₹100' },
      { name: 'Chickpea Buddha Bowl', type: 'Lunch', calories: 470, protein: '24g', time: '25 min', sustainable: true, price: '₹150' },
      { name: 'Pasta in Tomato Basil Sauce', type: 'Dinner', calories: 530, protein: '18g', time: '25 min', sustainable: true, price: '₹200' },
      { name: 'Protein Bar', type: 'Snack', calories: 220, protein: '15g', time: '—', sustainable: true, price: '₹120' },
    ],
    saturday: [
      { name: 'Paratha with Curd', type: 'Breakfast', calories: 380, protein: '10g', time: '20 min', sustainable: true, price: '₹90' },
      { name: 'Chicken Caesar Wrap', type: 'Lunch', calories: 520, protein: '32g', time: '20 min', sustainable: false, price: '₹220' },
      { name: 'Stir-Fried Veggies + Tofu', type: 'Dinner', calories: 490, protein: '28g', time: '20 min', sustainable: true, price: '₹180' },
      { name: 'Cucumber Sticks with Hummus', type: 'Snack', calories: 160, protein: '6g', time: '5 min', sustainable: true, price: '₹70' },
    ],
    sunday: [
      { name: 'Pancakes with Honey', type: 'Breakfast', calories: 400, protein: '12g', time: '20 min', sustainable: true, price: '₹130' },
      { name: 'Veg Biryani + Raita', type: 'Lunch', calories: 600, protein: '16g', time: '40 min', sustainable: true, price: '₹200' },
      { name: 'Roast Chicken with Greens', type: 'Dinner', calories: 580, protein: '40g', time: '40 min', sustainable: false, price: '₹360' },
      { name: 'Fruit Salad', type: 'Snack', calories: 180, protein: '3g', time: '5 min', sustainable: true, price: '₹90' },
    ],
  };

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="min-h-screen relative">
      <FloatingFood />
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 glow-text flex items-center gap-3">
            <Calendar className="w-10 h-10" />
            AI Meal Planner
          </h1>
          <p className="text-xl text-muted-foreground">
            Let AI create personalized meal plans based on your preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Preferences Panel */}
          <Card className="card-3d p-6 bg-card border-border">
            <h2 className="text-xl font-semibold mb-4">Your Preferences</h2>
            <div className="space-y-4">
              <div>
                <Label>Diet Type</Label>
                <Select value={dietType} onValueChange={setDietType}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="low-carb">Low Carb</SelectItem>
                    <SelectItem value="high-protein">High Protein</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Daily Calorie Target</Label>
                <Input type="number" defaultValue="2000" className="bg-background" />
              </div>

              <div>
                <Label>Number of Meals</Label>
                <Select defaultValue="4">
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 Meals</SelectItem>
                    <SelectItem value="4">4 Meals</SelectItem>
                    <SelectItem value="5">5 Meals</SelectItem>
                    <SelectItem value="6">6 Meals</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full btn-3d bg-primary hover:bg-primary/90">
                <Sparkles className="w-4 h-4" />
                Generate AI Plan
              </Button>
            </div>
          </Card>

          {/* Week View */}
          <Card className="card-3d p-6 bg-card border-border lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">This Week's Plan</h2>
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {weekDays.map((day) => (
                <Button
                  key={day}
                  variant={selectedDay === day.toLowerCase() ? 'default' : 'outline'}
                  className="btn-3d min-w-fit"
                  onClick={() => setSelectedDay(day.toLowerCase())}
                >
                  {day.slice(0, 3)}
                </Button>
              ))}
            </div>

            <div className="space-y-4">
              {(suggestionsByDay[selectedDay] || []).map((meal, index) => (
                <Card key={index} className="p-4 bg-background border-border hover:border-primary transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary">{meal.type}</Badge>
                        {meal.sustainable && (
                          <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                            Eco-Friendly
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg">{meal.name}</h3>
                    </div>
                    <span className="text-lg font-bold text-primary">{meal.price}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      {meal.calories} cal
                    </span>
                    <span className="flex items-center gap-1">
                      <Apple className="w-4 h-4" />
                      {meal.protein}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {meal.time}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="btn-3d bg-primary hover:bg-primary/90 flex-1">
                      Add to Plan
                    </Button>
                    <Button size="sm" variant="outline" className="btn-3d">
                      Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MealPlanner;
