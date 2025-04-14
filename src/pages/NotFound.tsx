
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md px-4"
        >
          <h1 className="text-6xl font-serif font-bold text-amber-600 mb-4">404</h1>
          <h2 className="text-2xl font-medium mb-4">Historical Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The historical record you're looking for seems to be lost in time. Perhaps it's in a different timeline or hasn't been documented yet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Home className="h-4 w-4" />
              <span>Return Home</span>
            </Button>
            <Button
              onClick={() => navigate('/search')}
              className="bg-amber-700 hover:bg-amber-800 flex items-center space-x-2"
            >
              <Search className="h-4 w-4" />
              <span>Explore History</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
