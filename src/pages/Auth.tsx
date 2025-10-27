import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FloatingFood } from '@/components/FloatingFood';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import logo from '@/assets/logo.png';

const Auth = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', { loginEmail, loginPassword });
    // TODO: Implement actual authentication
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup:', { signupName, signupEmail, signupPassword });
    // TODO: Implement actual authentication
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <FloatingFood />
      
      <Link 
        to="/" 
        className="absolute top-8 left-8 z-20 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </Link>

      <Card className="card-3d w-full max-w-md p-8 bg-card/90 backdrop-blur-lg relative z-10">
        <div className="flex items-center justify-center mb-8">
          <img src={logo} alt="NutriPlan" className="h-16 w-16" />
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-2 glow-text">Welcome to NutriPlan</h1>
        <p className="text-center text-muted-foreground mb-8">
          Start your journey to healthier, sustainable living
        </p>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login" className="btn-3d">Login</TabsTrigger>
            <TabsTrigger value="signup" className="btn-3d">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className="bg-background"
                />
              </div>
              <Button type="submit" className="w-full btn-3d bg-primary hover:bg-primary/90">
                Login
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="John Doe"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your@email.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                  className="bg-background"
                />
              </div>
              <Button type="submit" className="w-full btn-3d bg-primary hover:bg-primary/90">
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;
