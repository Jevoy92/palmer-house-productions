import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Calendar, MessageCircle } from "lucide-react";

export const CondensedContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    window.location.href = '/contact';
  };

  const handleBookCall = () => {
    window.location.href = '/contact';
  };

  const handleStrategyAssessment = () => {
    window.location.href = '/content-strategy';
  };

  return (
    <section id="contact" className="py-24 bg-corporate-light">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 gradient-social-1 rounded-full text-white font-bold text-sm mb-6 video-shadow">
            💬 Get Started
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black mb-6 text-corporate-dark">
            Ready to Transform Your <span className="text-gradient-1">Video Strategy?</span>
          </h2>
          <p className="text-lg text-corporate-gray max-w-3xl mx-auto">
            Get personalized recommendations and start creating professional video content that drives results.
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Quick Actions */}
          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col gap-4 lg:space-y-4">
            <Card className="border-0 video-shadow hover:video-shadow-lg transition-all">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                  <div className="w-12 h-12 gradient-social-1 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-corporate-dark mb-1 text-base sm:text-lg">Book a Strategy Call</h3>
                    <p className="text-sm text-corporate-gray">Free 30-minute strategy session</p>
                  </div>
                  <Button 
                    onClick={handleBookCall} 
                    className="gradient-social-1 text-white w-full sm:w-auto min-h-[44px] px-6"
                    size="lg"
                  >
                    Book Call
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 video-shadow hover:video-shadow-lg transition-all">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                  <div className="w-12 h-12 gradient-social-2 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-corporate-dark mb-1 text-base sm:text-lg">Take Strategy Assessment</h3>
                    <p className="text-sm text-corporate-gray">Free personalized recommendations</p>
                  </div>
                  <Button 
                    onClick={handleStrategyAssessment} 
                    variant="outline" 
                    className="w-full sm:w-auto min-h-[44px] px-6"
                    size="lg"
                  >
                    Start Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Contact Form */}
          <Card className="border-0 video-shadow">
            <CardHeader className="p-4 sm:p-6 pb-3">
              <CardTitle className="text-lg sm:text-xl text-corporate-dark">Quick Message</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Your name"
                    className="mt-1 min-h-[44px]"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your@email.com"
                    className="mt-1 min-h-[44px]"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us about your video needs..."
                    rows={3}
                    className="mt-1 min-h-[88px] resize-none"
                  />
                </div>
                <Button type="submit" className="w-full gradient-social-1 text-white min-h-[48px]" size="lg">
                  Send Message
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};