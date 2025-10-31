import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Navbar } from '@/components/Navbar';
import { FloatingFood } from '@/components/FloatingFood';
import { Plus, Trash2, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface DailyEntry {
  id: string;
  entry_date: string;
  meal_type: string;
  food_name: string;
  calories: number | null;
  quantity: string | null;
  notes: string | null;
}

const DailyTracker = () => {
  const [entries, setEntries] = useState<DailyEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Form state
  const [entryDate, setEntryDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [mealType, setMealType] = useState('breakfast');
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const loadEntries = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      setUserId(session.user.id);
      await fetchEntries(session.user.id);
    };

    loadEntries();
  }, [navigate]);

  const fetchEntries = async (uid: string) => {
    const { data, error } = await supabase
      .from('daily_entries')
      .select('*')
      .eq('user_id', uid)
      .order('entry_date', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading entries:', error);
      return;
    }

    setEntries(data || []);
  };

  const handleAddEntry = async () => {
    if (!userId || !foodName.trim()) {
      toast({
        title: "Error",
        description: "Please fill in the food name.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('daily_entries')
        .insert({
          user_id: userId,
          entry_date: entryDate,
          meal_type: mealType,
          food_name: foodName,
          calories: calories ? parseInt(calories) : null,
          quantity: quantity || null,
          notes: notes || null,
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Entry added successfully.",
      });

      // Reset form
      setFoodName('');
      setCalories('');
      setQuantity('');
      setNotes('');
      
      // Refresh entries
      await fetchEntries(userId);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEntry = async (entryId: string) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('daily_entries')
        .delete()
        .eq('id', entryId);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Entry deleted successfully.",
      });

      await fetchEntries(userId);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getMealTypeColor = (type: string) => {
    switch (type) {
      case 'breakfast': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'lunch': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'dinner': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'snack': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <FloatingFood />
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3">Daily Food Tracker</h1>
            <p className="text-muted-foreground">Log your daily meals and track your nutrition</p>
          </div>

          {/* Add Entry Form */}
          <Card className="p-6 mb-8 card-3d">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Plus className="w-6 h-6" />
              Add New Entry
            </h2>

            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={entryDate}
                    onChange={(e) => setEntryDate(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="mealType">Meal Type</Label>
                  <Select value={mealType} onValueChange={setMealType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                      <SelectItem value="snack">Snack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="foodName">Food Name *</Label>
                <Input
                  id="foodName"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  placeholder="e.g., Oatmeal with berries"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="calories">Calories</Label>
                  <Input
                    id="calories"
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder="e.g., 250"
                  />
                </div>

                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g., 1 bowl"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any notes about this meal..."
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleAddEntry}
                className="btn-3d bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                <Plus className="w-4 h-4" />
                {loading ? 'Adding...' : 'Add Entry'}
              </Button>
            </div>
          </Card>

          {/* Entries List */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Your Entries
            </h2>

            {entries.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No entries yet. Add your first meal above!</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <Card key={entry.id} className="p-4 card-3d">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getMealTypeColor(entry.meal_type)}`}>
                            {entry.meal_type.charAt(0).toUpperCase() + entry.meal_type.slice(1)}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(entry.entry_date), 'MMM dd, yyyy')}
                          </span>
                        </div>
                        
                        <h3 className="font-semibold text-lg mb-1">{entry.food_name}</h3>
                        
                        <div className="flex gap-4 text-sm text-muted-foreground mb-2">
                          {entry.calories && <span>🔥 {entry.calories} cal</span>}
                          {entry.quantity && <span>📊 {entry.quantity}</span>}
                        </div>
                        
                        {entry.notes && (
                          <p className="text-sm text-muted-foreground italic">{entry.notes}</p>
                        )}
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="text-destructive hover:text-destructive/90"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DailyTracker;