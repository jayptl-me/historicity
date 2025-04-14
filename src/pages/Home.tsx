
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Network, History as HistoryIcon, Compass } from 'lucide-react';

import PageLayout from '@/components/PageLayout';
import SearchBar from '@/components/ui/SearchBar';
import { Button } from '@/components/ui/button';
import { getTrendingQueries } from '@/services/api';

const Home = () => {
  const navigate = useNavigate();
  const [trendingQueries, setTrendingQueries] = useState<string[]>([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const queries = await getTrendingQueries();
        setTrendingQueries(queries.slice(0, 4)); // Only get the first 4 for the homepage
      } catch (error) {
        console.error('Failed to fetch trending queries', error);
      }
    };

    fetchTrending();
  }, []);

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const features = [
    {
      icon: <Network className="h-8 w-8 text-amber-600" />,
      title: "Knowledge Graph Exploration",
      description: "Discover connections between historical events, figures, and locations powered by Graph RAG technology."
    },
    {
      icon: <Compass className="h-8 w-8 text-amber-600" />,
      title: "Deep Exploration",
      description: "Dive deeper into specific historical connections to uncover intricate relationships and detailed context."
    },
    {
      icon: <HistoryIcon className="h-8 w-8 text-amber-600" />,
      title: "Personal History",
      description: "Track your exploration journey with a saved history of your most interesting historical queries."
    }
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-[url('/old-paper-texture.jpg')] bg-cover opacity-20 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-foreground leading-tight mb-6">
              <span className="text-amber-600">HistoryCity</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 font-source">
              Explore the intricate web of historical events, figures, and locations through our powerful knowledge graph powered by Graph RAG technology.
            </p>
            
            <SearchBar onSearch={handleSearch} showTrending={true} />
            
            <div className="mt-8">
              <Button 
                size="lg" 
                className="bg-amber-700 hover:bg-amber-800"
                onClick={() => navigate('/search')}
              >
                <span>Explore Now</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">Discover Historical Connections</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-source">
              Our platform uses advanced Graph Retrieval Augmented Generation to reveal the hidden relationships throughout history.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="history-card p-6"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-playfair font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground font-source">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Trending Queries Section */}
      {trendingQueries.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">Popular Explorations</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto font-source">
                Discover what others are exploring about history's most fascinating moments.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trendingQueries.map((query, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="cursor-pointer"
                  onClick={() => handleSearch(query)}
                >
                  <div className="history-card p-6 h-full transition-colors duration-300">
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-amber-600" />
                      {query}
                    </h3>
                    <div className="flex justify-end">
                      <Button 
                        variant="ghost"
                        size="sm"
                        className="text-amber-700 hover:text-amber-800 hover:bg-amber-50 -mr-2 -mb-2"
                      >
                        Explore
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button 
                variant="outline"
                onClick={() => navigate('/search')}
                className="border-amber-200 text-amber-800 hover:bg-amber-50"
              >
                View All Topics
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
};

export default Home;
