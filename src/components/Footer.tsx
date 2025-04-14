
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center">
              <span className="text-lg font-serif font-bold tracking-wide">
                <span className="text-amber-600">History</span>
                <span className="text-slate-700">City</span>
              </span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Uncover history's hidden connections with our knowledge graph powered exploration tool.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-muted-foreground hover:text-foreground transition-colors">
                  Your History
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Graph RAG
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-muted-foreground hover:text-foreground transition-colors">
                  Explore Connections
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Connect */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HistoryCity. All rights reserved.</p>
          <p className="mt-1">Built with Graph RAG technology for historical knowledge exploration.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
