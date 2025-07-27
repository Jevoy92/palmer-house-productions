import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  TrendingUp, 
  BookOpen, 
  Megaphone, 
  Award,
  ArrowRight,
  DollarSign,
  Clock,
  Heart,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getRecommendationForUseCase, getServiceForPersonality } from "@/lib/pricing";

interface FlipCardProps {
  front: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    gradient: string;
  };
  back: {
    title: string;
    content: string;
    cta: string;
    ctaAction: () => void;
  };
  isFlipped: boolean;
  onFlip: () => void;
}

const FlipCard = ({ front, back, isFlipped, onFlip }: FlipCardProps) => {
  return (
    <div 
      className="group perspective-1000 cursor-pointer"
      onClick={onFlip}
    >
      <div className={cn(
        "relative w-full h-80 transition-transform duration-700 transform-style-preserve-3d",
        isFlipped && "rotate-y-180"
      )}>
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className={cn(
            "w-full h-full rounded-3xl p-8 flex flex-col items-center justify-center text-center text-white relative overflow-hidden",
            front.gradient,
            "hover:scale-[1.02] transition-all duration-500 video-shadow-xl border border-white/20"
          )}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="p-4 bg-white/20 rounded-2xl mb-6 backdrop-blur-sm">
                <front.icon size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 leading-tight">{front.title}</h3>
              <p className="text-sm opacity-90 font-medium">{front.subtitle}</p>
            </div>
            <div className="absolute bottom-6 right-6 text-white/60">
              <span className="text-xs font-medium">Click to reveal →</span>
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="w-full h-full bg-white rounded-3xl p-8 flex flex-col justify-between video-shadow-xl border border-corporate-light/50">
            <div>
              <h3 className="text-xl font-bold text-corporate-dark mb-4 leading-tight">{back.title}</h3>
              <p className="text-sm text-corporate-gray leading-relaxed mb-6">{back.content}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                back.ctaAction();
              }}
              className="w-full py-4 px-6 gradient-social-1 text-white font-bold text-sm rounded-2xl hover:scale-[1.02] hover:video-shadow-xl transition-all duration-300 video-shadow flex items-center justify-center space-x-3"
            >
              <span>{back.cta}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const JeopardyCardGame = () => {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [selectedGameResult, setSelectedGameResult] = useState<string | null>(null);
  const navigate = useNavigate();

  const flipCard = (cardId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const handleBookCall = (source: string, data?: any) => {
    navigate('/contact', { 
      state: { 
        gameResult: source,
        selectedData: data,
        source: 'jeopardy_game' 
      } 
    });
  };

  // Game 1: "What's That Costing You?"
  const costingGameCards = [
    {
      id: "camera-fear",
      front: {
        title: "I hate how I look on camera",
        subtitle: "Common founder objection",
        icon: Users,
        gradient: "gradient-social-1"
      },
      back: {
        title: "Hidden Cost: Lost Credibility",
        content: "You're missing high-ticket clients who buy based on vibe and trust. Every month without video = potential $10k-50k in lost opportunities.",
        cta: "Book Strategy Call",
        ctaAction: () => handleBookCall("camera-fear")
      }
    },
    {
      id: "what-to-say",
      front: {
        title: "I don't know what to say",
        subtitle: "Content paralysis",
        icon: BookOpen,
        gradient: "gradient-social-2"
      },
      back: {
        title: "Hidden Cost: Cold Traffic Stays Cold",
        content: "Without clear messaging, leads don't engage. You're losing the emotional connection that drives retention and referrals.",
        cta: "Get Messaging Help",
        ctaAction: () => handleBookCall("messaging-help")
      }
    },
    {
      id: "no-consistency",
      front: {
        title: "I don't post consistently",
        subtitle: "Sporadic content creation",
        icon: Clock,
        gradient: "gradient-social-3"
      },
      back: {
        title: "Hidden Cost: Zero Compounding",
        content: "You're losing the compounding power of consistency. Inconsistent posting makes you look unreliable to potential clients.",
        cta: "Fix My Consistency",
        ctaAction: () => handleBookCall("consistency-help")
      }
    },
    {
      id: "cant-afford",
      front: {
        title: "I can't afford video right now",
        subtitle: "Budget concerns",
        icon: DollarSign,
        gradient: "gradient-social-4"
      },
      back: {
        title: "Hidden Cost: Leaking Money Daily",
        content: "You're already losing money in lost credibility. Every day without video broadcasts a scarcity mindset to potential clients.",
        cta: "See ROI Calculator",
        ctaAction: () => handleBookCall("affordability-concern")
      }
    },
    {
      id: "no-time",
      front: {
        title: "I don't have time to make content",
        subtitle: "Time management issue",
        icon: Clock,
        gradient: "gradient-social-1"
      },
      back: {
        title: "Hidden Cost: Explaining Everything 5x",
        content: "You're wasting 5+ hours per week re-explaining the same things. Video saves time while making you look organized.",
        cta: "Save Time With Video",
        ctaAction: () => handleBookCall("time-management")
      }
    },
    {
      id: "waiting-ready",
      front: {
        title: "I'm waiting until I'm more ready",
        subtitle: "Perfectionism trap",
        icon: Star,
        gradient: "gradient-social-2"
      },
      back: {
        title: "Hidden Cost: Perfect Costs Progress",
        content: "Delays cost traction. You look indecisive, which directly affects conversion rates and client confidence.",
        cta: "Start Imperfectly",
        ctaAction: () => handleBookCall("perfectionism-help")
      }
    },
    {
      id: "platform-confusion",
      front: {
        title: "What platform should I post on?",
        subtitle: "Analysis paralysis",
        icon: TrendingUp,
        gradient: "gradient-social-3"
      },
      back: {
        title: "Hidden Cost: Zero Visibility",
        content: "Paralysis = zero visibility. People don't know you exist during critical buying windows.",
        cta: "Get Platform Strategy",
        ctaAction: () => handleBookCall("platform-strategy")
      }
    },
    {
      id: "audience-not-social",
      front: {
        title: "My audience isn't on social media",
        subtitle: "Platform misconception",
        icon: Users,
        gradient: "gradient-social-4"
      },
      back: {
        title: "Hidden Cost: Invisible During Buying",
        content: "You're invisible during buying windows. Your brand feels outdated and inaccessible to modern buyers.",
        cta: "Modernize Your Approach",
        ctaAction: () => handleBookCall("audience-education")
      }
    },
    {
      id: "not-face-of-brand",
      front: {
        title: "I don't want to be the face of my brand",
        subtitle: "Personal brand resistance",
        icon: Heart,
        gradient: "gradient-social-1"
      },
      back: {
        title: "Hidden Cost: Expensive Trust Building",
        content: "You're paying more to manually earn trust. You're missing the easiest trust builder: authentic YOU.",
        cta: "Build Trust Faster",
        ctaAction: () => handleBookCall("personal-brand-help")
      }
    }
  ];

  // Game 2: "Infuse Your Personality"
  const personalityCards = [
    {
      id: "quiet-visionary",
      front: {
        title: "Quiet Visionary",
        subtitle: "Thoughtful, strategic, reflective",
        icon: BookOpen,
        gradient: "gradient-social-1"
      },
      back: {
        title: "Perfect Format: Voiceover Content",
        content: "Founder voiceovers with poetic visuals. Your wisdom shines through thoughtful narration over beautiful imagery.",
        cta: "Get Camera-Ready Coaching",
        ctaAction: () => handleBookCall("quiet-visionary", getServiceForPersonality("quiet-visionary"))
      }
    },
    {
      id: "high-energy-leader",
      front: {
        title: "High-Energy Leader",
        subtitle: "Dynamic, action-oriented, motivating",
        icon: TrendingUp,
        gradient: "gradient-social-2"
      },
      back: {
        title: "Perfect Format: Walk-and-Talk",
        content: "Raw footage, fast edits, strong calls-to-action. Your energy translates directly into viewer engagement and action.",
        cta: "Book High-Volume Shoot",
        ctaAction: () => handleBookCall("high-energy-leader", getServiceForPersonality("high-energy-leader"))
      }
    },
    {
      id: "natural-teacher",
      front: {
        title: "Natural Teacher",
        subtitle: "Educational, clear, helpful",
        icon: BookOpen,
        gradient: "gradient-social-3"
      },
      back: {
        title: "Perfect Format: Myth-Busting Reels",
        content: "Bite-sized clarity that generates leads through education. Your expertise becomes your best marketing tool.",
        cta: "Build FAQ Library",
        ctaAction: () => handleBookCall("natural-teacher", getServiceForPersonality("natural-teacher"))
      }
    },
    {
      id: "empathic-guide",
      front: {
        title: "Empathic Guide",
        subtitle: "Caring, supportive, human-first",
        icon: Heart,
        gradient: "gradient-social-4"
      },
      back: {
        title: "Perfect Format: Story-Driven Content",
        content: "Case studies and testimonial-based videos. Your empathy creates deep connections that convert at higher rates.",
        cta: "Get Monthly Content Kit",
        ctaAction: () => handleBookCall("empathic-guide", getServiceForPersonality("empathic-guide"))
      }
    }
  ];

  return (
    <section className="py-24 bg-corporate-light">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 gradient-social-3 rounded-full text-white font-bold text-lg mb-8 video-shadow">
            🎲 Interactive Discovery Games
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black mb-8 text-corporate-dark">
            What's Really <span className="text-gradient-1">Costing You?</span>
          </h2>
          <p className="text-xl text-corporate-gray max-w-3xl mx-auto font-medium mb-12">
            Click any card to reveal the hidden business costs of video avoidance
          </p>
        </div>

        {/* Game 1: What's That Costing You? */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-corporate-dark mb-8 text-center">
            💸 Game 1: Hidden Costs of Video Avoidance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {costingGameCards.map((card) => (
              <FlipCard
                key={card.id}
                front={card.front}
                back={card.back}
                isFlipped={flippedCards.has(card.id)}
                onFlip={() => flipCard(card.id)}
              />
            ))}
          </div>
        </div>

        {/* Game 2: Infuse Your Personality */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-corporate-dark mb-8 text-center">
            ✨ Game 2: Discover Your Video Personality
          </h3>
          <p className="text-lg text-corporate-gray text-center mb-8">
            Find the video format that matches your natural energy and style
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalityCards.map((card) => (
              <FlipCard
                key={card.id}
                front={card.front}
                back={card.back}
                isFlipped={flippedCards.has(card.id)}
                onFlip={() => flipCard(card.id)}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        {flippedCards.size > 0 && (
          <div className="text-center">
            <div className="bg-white p-8 rounded-3xl video-shadow-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-corporate-dark mb-4">
                Ready to Turn Insights into Action?
              </h3>
              <p className="text-corporate-gray mb-6">
                You've uncovered the real costs. Now let's build a video strategy that works for YOU.
              </p>
              <button
                onClick={() => handleBookCall("completed-games")}
                className="px-8 py-4 gradient-social-1 text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 video-shadow-lg inline-flex items-center space-x-2"
              >
                <span>Book Your Strategy Call</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};