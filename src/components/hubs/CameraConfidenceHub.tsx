import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Heart, 
  Zap, 
  Shield,
  PlayCircle,
  Download,
  Users,
  CheckCircle,
  ArrowRight,
  Star
} from "lucide-react";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface Resource {
  id: string;
  title: string;
  type: 'video' | 'guide' | 'template' | 'checklist';
  duration?: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  downloadLink?: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  improvement: string;
}

export const CameraConfidenceHub = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [emailForResources, setEmailForResources] = useState('');

  const resources: Resource[] = [
    {
      id: 'confidence-foundations',
      title: 'Camera Confidence Foundations',
      type: 'video',
      duration: '15 min',
      description: 'Master the mental and physical basics of confident on-camera presence',
      level: 'beginner'
    },
    {
      id: 'body-language-guide',
      title: 'Powerful Body Language Guide',
      type: 'guide',
      description: 'Complete guide to commanding body language that builds authority',
      level: 'beginner'
    },
    {
      id: 'script-templates',
      title: 'Confidence-Building Script Templates',
      type: 'template',
      description: 'Proven script frameworks that eliminate awkward pauses and hesitation',
      level: 'intermediate'
    },
    {
      id: 'pre-recording-checklist',
      title: 'Pre-Recording Confidence Checklist',
      type: 'checklist',
      description: 'Step-by-step preparation routine to feel camera-ready every time',
      level: 'beginner'
    },
    {
      id: 'advanced-techniques',
      title: 'Advanced Presence Techniques',
      type: 'video',
      duration: '22 min',
      description: 'Professional techniques for commanding attention and building trust',
      level: 'advanced'
    },
    {
      id: 'recovery-strategies',
      title: 'Mistake Recovery Strategies',
      type: 'guide',
      description: 'How to gracefully handle mistakes and maintain confidence',
      level: 'intermediate'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Sarah Chen",
      role: "Marketing Director",
      company: "Tech Startup",
      quote: "I went from avoiding the camera to confidently leading our video marketing. The transformation was incredible.",
      rating: 5,
      improvement: "90% increase in video engagement"
    },
    {
      name: "Marcus Rodriguez",
      role: "CEO",
      company: "Consulting Firm",
      quote: "These techniques helped me become the confident spokesperson our company needed. Game-changing content.",
      rating: 5,
      improvement: "3x more speaking opportunities"
    },
    {
      name: "Jennifer Park",
      role: "Sales Manager",
      company: "Software Company",
      quote: "My team's video confidence improved dramatically. We're closing more deals through video presentations.",
      rating: 5,
      improvement: "45% higher close rate"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Resources', count: resources.length },
    { id: 'video', label: 'Video Training', count: resources.filter(r => r.type === 'video').length },
    { id: 'guide', label: 'Guides', count: resources.filter(r => r.type === 'guide').length },
    { id: 'template', label: 'Templates', count: resources.filter(r => r.type === 'template').length },
    { id: 'checklist', label: 'Checklists', count: resources.filter(r => r.type === 'checklist').length }
  ];

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.type === selectedCategory);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return PlayCircle;
      case 'guide': return Download;
      case 'template': return Download;
      case 'checklist': return CheckCircle;
      default: return Download;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-social-green/20 text-social-green';
      case 'intermediate': return 'bg-social-orange/20 text-social-orange';
      case 'advanced': return 'bg-social-purple/20 text-social-purple';
      default: return 'bg-corporate-light text-corporate-gray';
    }
  };

  const handleResourceAccess = (resourceId: string) => {
    if (!emailForResources) {
      alert('Please enter your email to access resources');
      return;
    }
    
    trackEvent('camera_confidence_resource_accessed', {
      resource_id: resourceId,
      email: emailForResources,
      category: selectedCategory
    });
    
    alert('Resource access link sent to your email!');
  };

  const handleGetAllResources = () => {
    if (!emailForResources) {
      alert('Please enter your email to access all resources');
      return;
    }
    
    trackEvent('camera_confidence_bundle_requested', {
      email: emailForResources,
      resources_count: resources.length
    });
    
    alert('Complete Camera Confidence bundle sent to your email!');
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="inline-block px-6 py-3 gradient-social-1 rounded-full text-white font-bold text-lg mb-8 video-shadow">
          🎬 Camera Confidence Crisis
        </div>
        <h1 className="text-5xl md:text-6xl font-display font-black mb-8 text-corporate-dark">
          Overcome Your
          <br />
          <span className="text-gradient-1">Camera Confidence Crisis</span>
        </h1>
        <p className="text-xl text-corporate-gray max-w-3xl mx-auto font-medium mb-12">
          Transform from camera-shy to camera-confident with our proven framework. 
          Join thousands who've overcome their video anxiety and built commanding on-camera presence.
        </p>
        
        <div className="flex items-center justify-center space-x-8 mb-12">
          <div className="text-center">
            <div className="text-3xl font-black text-gradient-1">5,000+</div>
            <div className="text-sm text-corporate-gray">People Helped</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-gradient-2">92%</div>
            <div className="text-sm text-corporate-gray">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-gradient-3">14 Days</div>
            <div className="text-sm text-corporate-gray">Average Transformation</div>
          </div>
        </div>
      </section>

      {/* Problem Identification */}
      <section className="mb-16">
        <Card className="bg-gradient-to-br from-social-pink/10 to-social-purple/10 border-0 video-shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-corporate-dark text-center mb-8">
              Do You Experience Camera Confidence Crisis?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-white rounded-xl">
                <Heart className="w-8 h-8 text-social-pink mx-auto mb-3" />
                <h3 className="font-bold text-corporate-dark mb-2">Heart Racing</h3>
                <p className="text-sm text-corporate-gray">Anxiety spikes when recording starts</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl">
                <Zap className="w-8 h-8 text-social-orange mx-auto mb-3" />
                <h3 className="font-bold text-corporate-dark mb-2">Mind Blanks</h3>
                <p className="text-sm text-corporate-gray">Forgetting everything you planned to say</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl">
                <Shield className="w-8 h-8 text-social-blue mx-auto mb-3" />
                <h3 className="font-bold text-corporate-dark mb-2">Avoiding Videos</h3>
                <p className="text-sm text-corporate-gray">Procrastinating on video content</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl">
                <Camera className="w-8 h-8 text-social-green mx-auto mb-3" />
                <h3 className="font-bold text-corporate-dark mb-2">Self-Conscious</h3>
                <p className="text-sm text-corporate-gray">Worried about how you look and sound</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-lg text-corporate-dark font-medium">
                You're not alone. <span className="text-gradient-1">78% of professionals</span> struggle with camera confidence.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Email Capture */}
      <section className="mb-16">
        <Card className="bg-gradient-to-br from-video-white to-corporate-light border-0 video-shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-corporate-dark mb-4">
                Get Instant Access to Camera Confidence Resources
              </h2>
              <p className="text-corporate-gray">
                Enter your email to unlock our complete camera confidence toolkit
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={emailForResources}
                onChange={(e) => setEmailForResources(e.target.value)}
                className="flex-1 px-4 py-3 border border-corporate-gray rounded-lg"
              />
              <Button 
                onClick={handleGetAllResources}
                className="gradient-social-1 text-white px-6 py-3 hover:scale-105 transition-all"
              >
                Get Resources
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Resource Categories */}
      <section className="mb-12">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedCategory === category.id
                  ? 'gradient-social-1 text-white'
                  : 'bg-corporate-light text-corporate-gray hover:bg-corporate-gray hover:text-white'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>
      </section>

      {/* Resources Grid */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource) => {
            const ResourceIcon = getResourceIcon(resource.type);
            return (
              <Card key={resource.id} className="bg-white border border-corporate-light hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="gradient-social-2 p-3 rounded-xl">
                      <ResourceIcon className="w-6 h-6 text-white" />
                    </div>
                    <Badge className={getLevelColor(resource.level)}>
                      {resource.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-corporate-dark">
                    {resource.title}
                  </CardTitle>
                  {resource.duration && (
                    <div className="text-sm text-corporate-gray">
                      ⏱️ {resource.duration}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-corporate-gray mb-6">
                    {resource.description}
                  </p>
                  <Button 
                    onClick={() => handleResourceAccess(resource.id)}
                    className="w-full gradient-social-1 text-white hover:scale-105 transition-all"
                  >
                    Access Resource
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Success Stories */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-corporate-dark mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-corporate-gray">
            Real transformations from our camera confidence program
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gradient-to-br from-video-white to-corporate-light border-0 video-shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-social-yellow fill-current" />
                  ))}
                </div>
                <div className="text-gradient-1 font-bold text-lg">
                  {testimonial.improvement}
                </div>
              </CardHeader>
              <CardContent>
                <blockquote className="text-corporate-gray italic mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-sm text-corporate-dark">
                  <div className="font-bold">{testimonial.name}</div>
                  <div>{testimonial.role}, {testimonial.company}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <Card className="bg-gradient-to-br from-corporate-dark to-corporate-gray text-white border-0 video-shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Camera Confidence?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join our comprehensive coaching program and overcome your camera confidence crisis once and for all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.open('/services/group-coaching', '_blank')}
              className="bg-white text-corporate-dark px-8 py-3 hover:scale-105 transition-all"
            >
              Join Group Coaching
            </Button>
            <Button 
              onClick={() => window.open('/discovery-call', '_blank')}
              variant="outline"
              className="border-white text-white px-8 py-3 hover:bg-white hover:text-corporate-dark transition-all"
            >
              Book Discovery Call
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
};