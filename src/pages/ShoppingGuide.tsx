import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { FloatingFood } from '@/components/FloatingFood';
import { Leaf, Recycle, ShoppingBag, TrendingDown, Award, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ShoppingGuide = () => {
  const tips = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Choose Local & Seasonal',
      description: 'Local produce reduces transportation emissions and supports local farmers. Seasonal foods are fresher and more sustainable.',
      impact: 'Reduces CO₂ by up to 40%',
      color: 'from-primary/20 to-primary/5',
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      title: 'Minimize Packaging',
      description: 'Opt for products with minimal or recyclable packaging. Bring reusable bags and containers.',
      impact: 'Prevents 500kg plastic waste/year',
      color: 'from-accent/20 to-accent/5',
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: 'Buy in Bulk',
      description: 'Bulk buying reduces packaging waste and often saves money. Store properly to prevent spoilage.',
      impact: 'Saves up to ₹5,000/year',
      color: 'from-primary/20 to-primary/5',
    },
    {
      icon: <TrendingDown className="w-8 h-8" />,
      title: 'Reduce Food Waste',
      description: 'Plan meals ahead, store food properly, and use leftovers creatively to minimize waste.',
      impact: 'Saves ₹10,000+ annually',
      color: 'from-accent/20 to-accent/5',
    },
  ];

  const ecoProducts = [
    {
      name: 'Organic Vegetables Bundle',
      price: '₹450',
      saving: '₹100',
      co2: '2.5kg saved',
      rating: 4.8,
      sustainable: true,
    },
    {
      name: 'Local Farm Eggs (12 pack)',
      price: '₹180',
      saving: '₹30',
      co2: '0.8kg saved',
      rating: 4.9,
      sustainable: true,
    },
    {
      name: 'Biodegradable Cleaning Set',
      price: '₹320',
      saving: '₹80',
      co2: '1.2kg saved',
      rating: 4.7,
      sustainable: true,
    },
    {
      name: 'Reusable Storage Bags (10 pack)',
      price: '₹250',
      saving: '₹0',
      co2: '5kg saved/year',
      rating: 4.9,
      sustainable: true,
    },
  ];

  return (
    <div className="min-h-screen relative">
      <FloatingFood />
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 glow-text flex items-center gap-3">
            <Leaf className="w-10 h-10" />
            Sustainable Shopping Guide
          </h1>
          <p className="text-xl text-muted-foreground">
            Make eco-friendly choices that benefit both your health and the planet
          </p>
        </div>

        {/* Tips Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {tips.map((tip, index) => (
            <Card 
              key={index} 
              className={`card-3d p-6 bg-gradient-to-br ${tip.color} border-border`}
            >
              <div className="text-primary mb-4">{tip.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
              <p className="text-muted-foreground mb-4">{tip.description}</p>
              <Badge className="bg-primary/20 text-primary">
                <Award className="w-3 h-3 mr-1" />
                {tip.impact}
              </Badge>
            </Card>
          ))}
        </div>

        {/* Eco-Friendly Products */}
        <Card className="card-3d p-6 bg-card border-border mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Recommended Eco-Products</h2>
            <Badge className="bg-primary text-primary-foreground">
              <Leaf className="w-3 h-3 mr-1" />
              Certified Sustainable
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ecoProducts.map((product, index) => (
              <Card key={index} className="p-4 bg-background border-border hover:border-primary transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">
                    ⭐ {product.rating}
                  </Badge>
                  <Badge className="bg-primary/20 text-primary text-xs">
                    <Leaf className="w-3 h-3" />
                  </Badge>
                </div>
                
                <h3 className="font-semibold mb-2">{product.name}</h3>
                
                <div className="space-y-1 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-bold text-primary">{product.price}</span>
                  </div>
                  {product.saving !== '₹0' && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">You Save</span>
                      <span className="text-accent">{product.saving}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">CO₂ Impact</span>
                    <span className="text-primary">{product.co2}</span>
                  </div>
                </div>

                <Button size="sm" className="w-full btn-3d bg-primary hover:bg-primary/90">
                  Add to List
                </Button>
              </Card>
            ))}
          </div>
        </Card>

        {/* Impact Calculator */}
        <Card className="card-3d p-8 bg-gradient-to-r from-primary/20 to-accent/20 border-primary/50 glow-border text-center">
          <Info className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-3">Your Potential Impact</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            By following these sustainable shopping practices, you could save up to <span className="text-primary font-bold">₹15,000 per year</span> and reduce your carbon footprint by <span className="text-primary font-bold">50kg CO₂</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-3d bg-primary hover:bg-primary/90">
              Calculate My Impact
            </Button>
            <Button size="lg" variant="outline" className="btn-3d border-primary">
              View Full Guide
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default ShoppingGuide;
