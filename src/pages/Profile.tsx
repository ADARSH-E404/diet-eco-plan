import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navbar } from '@/components/Navbar';
import { FloatingFood } from '@/components/FloatingFood';
import { User, Mail, Phone, MapPin, Save, Camera } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [dietPreference, setDietPreference] = useState('balanced');
  const [calorieGoal, setCalorieGoal] = useState('2000');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      setUserId(session.user.id);
      setEmail(session.user.email || '');

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();

      if (error) {
        console.error('Error loading profile:', error);
        return;
      }

      if (profile) {
        setName(profile.full_name || '');
        setPhone(profile.phone || '');
        setLocation(profile.location || '');
        setDietPreference(profile.diet_preference || 'balanced');
        setCalorieGoal(profile.calorie_goal?.toString() || '2000');
      }
    };

    loadProfile();
  }, [navigate]);

  const handleSave = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: name,
          phone,
          location,
          diet_preference: dietPreference,
          calorie_goal: parseInt(calorieGoal),
        })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your profile has been updated.",
      });
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

  const achievements = [
    { title: 'Meal Master', description: '50 meals planned', earned: true },
    { title: 'Eco Warrior', description: '100kg CO₂ saved', earned: true },
    { title: 'Budget Pro', description: '₹10,000 saved', earned: true },
    { title: 'Streak Legend', description: '30 day streak', earned: false },
  ];

  return (
    <div className="min-h-screen relative">
      <FloatingFood />
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 glow-text flex items-center gap-3">
            <User className="w-10 h-10" />
            Profile Settings
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Form */}
          <Card className="card-3d p-6 bg-card border-border lg:col-span-2">
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
            
            {/* Avatar Section */}
            <div className="flex items-center gap-6 mb-8 pb-6 border-b border-border">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold">
                  {name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center btn-3d">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{name || 'User'}</h3>
                <p className="text-muted-foreground">{email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-background"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10 bg-background"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <h3 className="text-lg font-semibold mb-4">Diet Preferences</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Diet Type</Label>
                    <Select value={dietPreference} onValueChange={setDietPreference}>
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

                  <div className="space-y-2">
                    <Label htmlFor="calorie-goal">Daily Calorie Goal</Label>
                    <Input
                      id="calorie-goal"
                      type="number"
                      value={calorieGoal}
                      onChange={(e) => setCalorieGoal(e.target.value)}
                      className="bg-background"
                    />
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleSave} 
                className="w-full btn-3d bg-primary hover:bg-primary/90 mt-6"
                disabled={loading}
              >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </Card>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card className="card-3d p-6 bg-card border-border">
              <h3 className="text-lg font-semibold mb-4">Your Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Meals Planned</span>
                  <span className="font-bold text-primary">142</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">CO₂ Saved</span>
                  <span className="font-bold text-primary">78kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Money Saved</span>
                  <span className="font-bold text-primary">₹8,450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Current Streak</span>
                  <span className="font-bold text-accent">23 days</span>
                </div>
              </div>
            </Card>

            {/* Achievements */}
            <Card className="card-3d p-6 bg-card border-border">
              <h3 className="text-lg font-semibold mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg transition-colors ${
                      achievement.earned 
                        ? 'bg-primary/20 border border-primary/30' 
                        : 'bg-background border border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      {achievement.earned && (
                        <Badge className="bg-primary">
                          ✓
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
