
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Clock, ArrowRight, Search, AlertCircle } from 'lucide-react';

import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

import { getSearchHistory, clearSearchHistory, HistoryItem } from '@/utils/historyStorage';

const History: React.FC = () => {
  const navigate = useNavigate();
  const [searchHistory, setSearchHistory] = useState<HistoryItem[]>([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    // Load search history
    setSearchHistory(getSearchHistory());
  }, []);

  const handleClearHistory = () => {
    clearSearchHistory();
    setSearchHistory([]);
    setIsConfirmOpen(false);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRedoSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <PageLayout className="bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-serif font-bold"
          >
            Your Search History
          </motion.h1>
          
          {searchHistory.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="text-red-500 hover:text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear History
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Clear Search History</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to clear your entire search history? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button 
                      variant="destructive" 
                      onClick={handleClearHistory}
                    >
                      Yes, Clear History
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </motion.div>
          )}
        </div>
        
        {searchHistory.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {searchHistory.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="font-medium text-lg">{item.query}</CardTitle>
                    <CardDescription className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(item.timestamp)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {item.response ? (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {item.response.summary}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        No results summary available
                      </p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="mr-2"
                      onClick={() => handleRedoSearch(item.query)}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Search Again
                    </Button>
                    
                    {item.response && (
                      <Button 
                        onClick={() => navigate(`/search?q=${encodeURIComponent(item.query)}`)}
                        className="bg-amber-700 hover:bg-amber-800"
                      >
                        View Results
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-muted mb-4">
              <AlertCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-2">No Search History</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You haven't made any historical searches yet. Start exploring to build your search history.
            </p>
            <Button 
              onClick={() => navigate('/search')}
              className="bg-amber-700 hover:bg-amber-800"
            >
              Start Exploring
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </PageLayout>
  );
};

export default History;
