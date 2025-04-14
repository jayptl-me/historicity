
import React from 'react';
import { motion } from 'framer-motion';
import { Network, Database, BarChart, Search, Brain, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';

const About: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Network className="h-10 w-10 text-amber-600" />,
      title: "Graph-Based Knowledge",
      description: "Graph RAG technology represents historical data as interconnected entities, creating a network of events, people, and places that reveals relationships across time."
    },
    {
      icon: <Database className="h-10 w-10 text-amber-600" />,
      title: "Contextual Retrieval",
      description: "Unlike traditional search, Graph RAG retrieves information based on contextual relevance and relationships, providing deeper insights into historical connections."
    },
    {
      icon: <Brain className="h-10 w-10 text-amber-600" />,
      title: "AI-Powered Summaries",
      description: "Advanced language models generate coherent, contextually rich narratives explaining how historical elements relate to each other."
    },
    {
      icon: <BarChart className="h-10 w-10 text-amber-600" />,
      title: "Precise Ranking",
      description: "The system prioritizes the most relevant historical connections, ensuring you see the most important relationships first."
    }
  ];

  const examples = [
    {
      question: "What were the key events leading to World War II?",
      explanation: "Graph RAG identifies causal relationships between events like the Treaty of Versailles, the Great Depression, and Hitler's rise to power, showing how they collectively contributed to the war."
    },
    {
      question: "How did the Industrial Revolution affect social classes?",
      explanation: "The system connects technological innovations to economic changes and social impacts, revealing multi-dimensional relationships across different domains of society."
    },
    {
      question: "What connections exist between Renaissance art and scientific progress?",
      explanation: "Graph RAG reveals relationships between artists and scientists, showing how artistic techniques influenced scientific observation and how scientific discoveries shaped artistic representation."
    }
  ];

  return (
    <PageLayout className="bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">About Graph RAG Technology</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how our advanced Graph Retrieval Augmented Generation technology
              helps uncover the hidden connections throughout history.
            </p>
          </motion.div>
        </section>
        
        {/* What is Graph RAG */}
        <section className="py-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <h2 className="text-3xl font-serif font-bold mb-4">What is Graph RAG?</h2>
              <p className="text-muted-foreground mb-4">
                Graph Retrieval Augmented Generation (Graph RAG) is an advanced AI technology that combines the power of knowledge graphs with generative AI models to provide more contextually rich and relationally aware information retrieval.
              </p>
              <p className="text-muted-foreground mb-4">
                Unlike traditional search engines that rely primarily on keyword matching, Graph RAG understands connections between entities - such as people, events, places, and concepts - providing a multidimensional view of historical information.
              </p>
              <p className="text-muted-foreground">
                For historical exploration, this means uncovering not just facts, but the complex web of relationships between historical events, figures, and locations, revealing cause-and-effect patterns and hidden influences that shaped our world.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 to-slate-100/30 rounded-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Network className="h-32 w-32 text-amber-500/80" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Key Features */}
        <section className="py-8 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif font-bold mb-4">Key Features of Graph RAG</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our implementation leverages several advanced capabilities to deliver insightful historical connections.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-lg p-6 border border-border"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-serif font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-8 md:py-16 bg-muted/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The process of turning your natural language query into rich historical insights.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-background w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Search className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">1. Query Processing</h3>
              <p className="text-muted-foreground">
                Your natural language query is analyzed to identify key historical concepts, entities, and relationships of interest.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-background w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Network className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">2. Graph Traversal</h3>
              <p className="text-muted-foreground">
                The knowledge graph is traversed to find relevant nodes (events, figures, locations) and the connections between them.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-background w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Brain className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">3. Narrative Generation</h3>
              <p className="text-muted-foreground">
                Retrieved information is synthesized into a coherent narrative that explains relationships and provides context.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Example Queries */}
        <section className="py-8 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif font-bold mb-4">Example Applications</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how Graph RAG reveals deeper insights with these example historical queries.
            </p>
          </motion.div>
          
          <div className="space-y-6">
            {examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-lg p-6 border border-border"
              >
                <h3 className="text-xl font-serif font-semibold mb-2">{example.question}</h3>
                <p className="text-muted-foreground">{example.explanation}</p>
                <div className="mt-4">
                  <Button 
                    variant="outline"
                    onClick={() => navigate(`/search?q=${encodeURIComponent(example.question)}`)}
                    className="text-amber-700 hover:text-amber-800 border-amber-200 hover:bg-amber-50"
                  >
                    Try This Query
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-12 md:py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-serif font-bold mb-4">Start Your Historical Exploration</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Ready to discover the intricate connections that shaped our history?
            </p>
            <Button
              size="lg"
              className="bg-amber-700 hover:bg-amber-800"
              onClick={() => navigate('/search')}
            >
              Explore Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </section>
      </div>
    </PageLayout>
  );
};

export default About;
