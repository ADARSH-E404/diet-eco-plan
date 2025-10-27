import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '@/assets/logo.png';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Meal Planner', path: '/meal-planner' },
    { name: 'Grocery List', path: '/grocery-list' },
    { name: 'Shopping Guide', path: '/shopping-guide' },
    { name: 'Statistics', path: '/statistics' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="NutriPlan" className="h-10 w-10 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold glow-text">NutriPlan</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/profile">
              <Button variant="ghost" className="btn-3d">
                Profile
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="btn-3d bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors ${
                  isActive(link.path) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 space-y-2">
              <Link to="/profile" onClick={() => setIsOpen(false)} className="block">
                <Button variant="ghost" className="w-full">
                  Profile
                </Button>
              </Link>
              <Link to="/auth" onClick={() => setIsOpen(false)} className="block">
                <Button className="w-full bg-primary">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
