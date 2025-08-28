import { useState } from 'react';
import { PalsHero } from '@/components/pals/PalsHero';
import { PalsFinder } from '@/components/pals/PalsFinder';
import { PalCard } from '@/components/pals/PalCard';
import { Button } from '@/components/ui/button';
import { PALS_DATA } from '@/lib/palsData';
import { Users, Expand, Minimize } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PalmerHousePals() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [showFinder, setShowFinder] = useState(false);
  const navigate = useNavigate();

  const toggleCard = (palId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(palId)) {
      newExpanded.delete(palId);
    } else {
      newExpanded.add(palId);
    }
    setExpandedCards(newExpanded);
  };

  const expandAll = () => {
    setExpandedCards(new Set(PALS_DATA.map(pal => pal.id)));
  };

  const collapseAll = () => {
    setExpandedCards(new Set());
  };

  return (
    <>

      <main className="min-h-screen">
        {/* Hero Section */}
        <PalsHero />

        {/* Find Your Pal Section */}
        {showFinder ? (
          <PalsFinder />
        ) : (
          <section className="py-16 bg-accent/5">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Not Sure Which Pal is Right for You?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Take our quick assessment to get a personalized recommendation based on your specific needs and goals.
              </p>
              <Button 
                onClick={() => setShowFinder(true)}
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
              >
                Find My Perfect Pal
                <Users className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </section>
        )}

        {/* Meet the Pals Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Meet Your Video Production Guides
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Each Pal specializes in different types of video solutions, ensuring you get exactly what you need
              </p>
              
              {/* Controls */}
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={expandAll}
                  disabled={expandedCards.size === PALS_DATA.length}
                  className="flex items-center gap-2"
                >
                  <Expand className="w-4 h-4" />
                  Expand All
                </Button>
                <Button
                  variant="outline"
                  onClick={collapseAll}
                  disabled={expandedCards.size === 0}
                  className="flex items-center gap-2"
                >
                  <Minimize className="w-4 h-4" />
                  Collapse All
                </Button>
              </div>
            </div>

            {/* Pals Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {PALS_DATA.map((pal) => (
                <PalCard
                  key={pal.id}
                  pal={pal}
                  isExpanded={expandedCards.has(pal.id)}
                  onToggle={() => toggleCard(pal.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Still Need Help Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Still Not Sure Which Path to Take?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              No problem! Our team is here to help you navigate your options and find the perfect video solution for your unique needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/contact')}
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-8"
              >
                Book a Strategy Call
              </Button>
              <Button 
                onClick={() => navigate('/video-packages')}
                variant="outline"
                size="lg"
                className="px-8"
              >
                Browse All Packages
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Free Strategy Call:</strong> 30-minute consultation to understand your goals and recommend the best approach
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}