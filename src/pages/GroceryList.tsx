import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Navbar } from '@/components/Navbar';
import { FloatingFood } from '@/components/FloatingFood';
import { ShoppingCart, Plus, Trash2, Download, Leaf } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const GroceryList = () => {
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState([
    { id: 1, name: 'Organic Spinach', category: 'Vegetables', price: 45, checked: false, sustainable: true },
    { id: 2, name: 'Brown Rice', category: 'Grains', price: 120, checked: false, sustainable: true },
    { id: 3, name: 'Chicken Breast', category: 'Protein', price: 280, checked: true, sustainable: false },
    { id: 4, name: 'Greek Yogurt', category: 'Dairy', price: 85, checked: false, sustainable: true },
    { id: 5, name: 'Avocado', category: 'Vegetables', price: 60, checked: false, sustainable: true },
    { id: 6, name: 'Quinoa', category: 'Grains', price: 340, checked: false, sustainable: true },
    { id: 7, name: 'Almonds', category: 'Nuts', price: 450, checked: false, sustainable: true },
  ]);

  const categories = [...new Set(items.map(item => item.category))];
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const checkedPrice = items.filter(item => item.checked).reduce((sum, item) => sum + item.price, 0);

  const handleAddItem = () => {
    if (newItem.trim()) {
      setItems([...items, {
        id: Date.now(),
        name: newItem,
        category: 'Other',
        price: 0,
        checked: false,
        sustainable: false,
      }]);
      setNewItem('');
    }
  };

  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen relative">
      <FloatingFood />
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 glow-text flex items-center gap-3">
            <ShoppingCart className="w-10 h-10" />
            Smart Grocery List
          </h1>
          <p className="text-xl text-muted-foreground">
            Organize your shopping with real-time price tracking
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Grocery List */}
          <Card className="card-3d p-6 bg-card border-border lg:col-span-2">
            <div className="mb-6">
              <div className="flex gap-2">
                <Input
                  placeholder="Add new item..."
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                  className="bg-background flex-1"
                />
                <Button onClick={handleAddItem} className="btn-3d bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {categories.map((category) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold mb-3 text-primary">{category}</h3>
                  <div className="space-y-2">
                    {items
                      .filter(item => item.category === category)
                      .map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-3 bg-background rounded-lg hover:bg-secondary transition-colors"
                        >
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={() => toggleItem(item.id)}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${item.checked ? 'line-through text-muted-foreground' : ''}`}>
                                {item.name}
                              </span>
                              {item.sustainable && (
                                <Leaf className="w-4 h-4 text-primary" />
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground">₹{item.price}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteItem(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Summary Panel */}
          <div className="space-y-6">
            <Card className="card-3d p-6 bg-card border-border">
              <h2 className="text-xl font-semibold mb-4">Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">Total Items</span>
                  <span className="font-semibold">{items.length}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">Checked Items</span>
                  <span className="font-semibold">{items.filter(i => i.checked).length}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">Checked Total</span>
                  <span className="font-semibold text-primary">₹{checkedPrice}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">Total Cost</span>
                  <span className="font-bold text-primary">₹{totalPrice}</span>
                </div>
              </div>

              <Button className="w-full mt-6 btn-3d bg-primary hover:bg-primary/90">
                <Download className="w-4 h-4" />
                Export List
              </Button>
            </Card>

            <Card className="card-3d p-6 bg-gradient-to-br from-primary/20 to-accent/20 border-primary/50">
              <div className="flex items-start gap-3">
                <Leaf className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Sustainability Score</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {Math.round((items.filter(i => i.sustainable).length / items.length) * 100)}% of your items are eco-friendly
                  </p>
                  <Badge className="bg-primary text-primary-foreground">Great Choice!</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GroceryList;
