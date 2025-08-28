import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { PALS_DATA, getPalRecommendation, Pal } from '@/lib/palsData';
import { useNavigate } from 'react-router-dom';

const QUIZ_QUESTIONS = [
  {
    id: 'timeline',
    question: 'What\'s your typical project timeline?',
    options: [
      { value: 'quick', label: 'Need it fast (1-2 weeks)', keywords: ['social', 'quick'] },
      { value: 'systematic', label: 'Build over time (1-3 months)', keywords: ['system', 'training'] },
      { value: 'longterm', label: 'Long-term strategy (3+ months)', keywords: ['authority', 'youtube'] },
      { value: 'premium', label: 'Quality over speed', keywords: ['cinematic', 'premium'] }
    ]
  },
  {
    id: 'audience',
    question: 'Who\'s your primary audience?',
    options: [
      { value: 'social', label: 'Social media followers', keywords: ['social', 'reels'] },
      { value: 'internal', label: 'Internal team/employees', keywords: ['training', 'onboard'] },
      { value: 'industry', label: 'Industry professionals', keywords: ['authority', 'long-term'] },
      { value: 'customers', label: 'Premium customers/clients', keywords: ['brand', 'cinematic'] }
    ]
  },
  {
    id: 'goal',
    question: 'What\'s your main goal?',
    options: [
      { value: 'engagement', label: 'Drive engagement & followers', keywords: ['social', 'quick'] },
      { value: 'efficiency', label: 'Streamline processes', keywords: ['system', 'training'] },
      { value: 'authority', label: 'Build thought leadership', keywords: ['authority', 'youtube'] },
      { value: 'impact', label: 'Create lasting brand impact', keywords: ['cinematic', 'brand'] }
    ]
  }
];

export const PalsFinder = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [recommendation, setRecommendation] = useState<Pal | null>(null);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (optionValue: string) => {
    const selectedOption = QUIZ_QUESTIONS[currentQuestion].options.find(opt => opt.value === optionValue);
    const newAnswers = [...answers, ...selectedOption!.keywords];
    setAnswers(newAnswers);

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz complete - generate recommendation
      const recommendedPal = getPalRecommendation(newAnswers);
      setRecommendation(recommendedPal);
      setIsComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsComplete(false);
    setRecommendation(null);
    setShowAll(false);
  };

  const handleGetStarted = (pal: Pal) => {
    navigate(pal.ctaUrl);
  };

  if (isComplete && recommendation) {
    return (
      <section className="py-16 bg-gradient-to-br from-background to-accent/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <CheckCircle className="w-4 h-4" />
              Perfect Match Found!
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Meet Your Recommended Guide
            </h2>
            <p className="text-muted-foreground">
              Based on your answers, here's the Pal that best fits your needs:
            </p>
          </div>

          {/* Recommended Pal */}
          <Card className="mb-8 ring-2 ring-primary/20 bg-gradient-to-br from-background to-primary/5">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${recommendation.gradient} p-1`}>
                  <div className="w-full h-full rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                    <img 
                      src={recommendation.character} 
                      alt={`${recommendation.name} character`}
                      className="w-16 h-16 object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">{recommendation.name}</CardTitle>
                  <p className="text-primary font-medium mb-2">{recommendation.tagline}</p>
                  <p className="text-muted-foreground">{recommendation.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Perfect for:</h4>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.services.primary.map((service, index) => (
                      <Badge key={index} className="bg-primary/10 text-primary border-primary/20">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Key Strengths:</h4>
                  <div className="space-y-1">
                    {recommendation.strengths.slice(0, 3).map((strength, index) => (
                      <div key={index} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        {strength}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => handleGetStarted(recommendation)}
                  className={`flex-1 bg-gradient-to-r ${recommendation.gradient} hover:opacity-90 text-white`}
                  size="lg"
                >
                  {recommendation.ctaText}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/contact')}
                  size="lg"
                >
                  Book Strategy Call
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Show Other Options */}
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => setShowAll(!showAll)}
              className="mb-6"
            >
              {showAll ? 'Hide' : 'See'} Other Pals
              <ArrowRight className={`w-4 h-4 ml-2 transition-transform ${showAll ? 'rotate-90' : ''}`} />
            </Button>

            {showAll && (
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {PALS_DATA.filter(pal => pal.id !== recommendation.id).map((pal) => (
                  <Card key={pal.id} className="text-left hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${pal.gradient} p-0.5`}>
                          <div className="w-full h-full rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                            <img 
                              src={pal.character} 
                              alt={`${pal.name} character`}
                              className="w-8 h-8 object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold">{pal.name}</h4>
                          <p className="text-xs text-muted-foreground">{pal.tagline}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button 
                        onClick={() => handleGetStarted(pal)}
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                      >
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <Button
              variant="ghost"
              onClick={resetQuiz}
              className="text-muted-foreground"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-accent/10 to-background">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Find Your Perfect Pal
          </h2>
          <p className="text-muted-foreground mb-6">
            Answer a few quick questions and we'll recommend the best guide for your video journey
          </p>
          
          {/* Progress Bar */}
          <div className="w-full bg-border rounded-full h-2 mb-8">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">
              Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold text-center text-foreground mb-6">
              {QUIZ_QUESTIONS[currentQuestion].question}
            </h3>
            
            <div className="grid gap-3">
              {QUIZ_QUESTIONS[currentQuestion].options.map((option) => (
                <Button
                  key={option.value}
                  variant="outline"
                  onClick={() => handleAnswer(option.value)}
                  className="p-4 h-auto text-left justify-start hover:bg-primary/5 hover:border-primary/20 transition-all"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            variant="ghost"
            onClick={resetQuiz}
            className="text-muted-foreground"
          >
            Start Over
          </Button>
        </div>
      </div>
    </section>
  );
};