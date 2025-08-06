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
    window.location.href = '/discovery-call';
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

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Quick Actions */}
          <div className="space-y-4">
            <Card className="border-0 video-shadow hover:video-shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 gradient-social-1 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-corporate-dark mb-1">Book a Discovery Call</h3>
                    <p className="text-sm text-corporate-gray">Free 30-minute strategy session</p>
                  </div>
                  <Button onClick={handleBookCall} className="gradient-social-1 text-white">
                    Book Call
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 video-shadow hover:video-shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 gradient-social-2 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-corporate-dark mb-1">Take Strategy Assessment</h3>
                    <p className="text-sm text-corporate-gray">Free personalized recommendations</p>
                  </div>
                  <Button onClick={handleStrategyAssessment} variant="outline">
                    Start Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Contact Form */}
          <Card className="border-0 video-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-corporate-dark">Quick Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us about your video needs..."
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full gradient-social-1 text-white">
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