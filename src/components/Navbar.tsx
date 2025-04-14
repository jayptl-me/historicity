import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, History, BookOpen, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 rounded-xl shadow-lg bg-background/90 border border-border max-w-3xl w-[95vw] backdrop-blur-md ${
        isScrolled ? '' : 'bg-transparent shadow-none border-transparent'
      }`}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-serif font-bold tracking-wide">
                <span className="text-amber-600">History</span>
                <span className="text-slate-700">City</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/history" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <div className="flex items-center space-x-1">
                <History className="h-4 w-4" />
                <span>History</span>
              </div>
            </Link>
            <Link 
              to="/about" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <div className="flex items-center space-x-1">
                <Info className="h-4 w-4" />
                <span>About</span>
              </div>
            </Link>
            <Button asChild className="bg-amber-700 hover:bg-amber-800 ml-2">
              <Link to="/search">
                <div className="flex items-center space-x-1">
                  <BookOpen className="h-4 w-4" />
                  <span>Explore Now</span>
                </div>
              </Link>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/history" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <History className="h-4 w-4" />
                <span>History</span>
              </div>
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <Info className="h-4 w-4" />
                <span>About</span>
              </div>
            </Link>
            <Link 
              to="/search" 
              className="block px-3 py-2 rounded-md text-base font-medium bg-amber-700 text-white hover:bg-amber-800"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Explore Now</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
