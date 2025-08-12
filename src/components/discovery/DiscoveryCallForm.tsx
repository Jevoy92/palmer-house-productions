
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trackContactFormSubmit, trackConversion } from "@/lib/analytics";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const DiscoveryCallForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    businessSize: '',
    goals: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Discovery call form submitted:', formData);
    trackContactFormSubmit('discovery');
    trackConversion('discovery_call');
    // Open Zoho booking for general consultation
    window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078320', '_blank', 'noopener,noreferrer');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-black mb-8 text-corporate-dark">
            Ready to <span className="text-gradient-1">Get Started?</span>
          </h2>
          <p className="text-xl text-corporate-gray max-w-2xl mx-auto font-medium">
            Fill out this quick form and we'll be in touch within 24 hours
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-corporate-light rounded-3xl p-8 video-shadow">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-corporate-dark font-medium mb-2">Name *</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="w-full"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-corporate-dark font-medium mb-2">Email *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="w-full"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-corporate-dark font-medium mb-2">Company</label>
              <Input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="w-full"
                placeholder="Your company name"
              />
            </div>
            <div>
              <label className="block text-corporate-dark font-medium mb-2">Business Size</label>
              <Select value={formData.businessSize} onValueChange={(value) => handleInputChange('businessSize', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select business size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solo">Solo/Freelancer</SelectItem>
                  <SelectItem value="small">Small Team (2-10)</SelectItem>
                  <SelectItem value="medium">Medium Business (11-50)</SelectItem>
                  <SelectItem value="large">Large Business (50+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-corporate-dark font-medium mb-2">Video Goals</label>
            <Textarea
              value={formData.goals}
              onChange={(e) => handleInputChange('goals', e.target.value)}
              className="w-full h-32"
              placeholder="What do you hope to achieve with video content? (e.g., team training, social media growth, customer education, lead generation)"
            />
          </div>

          <div className="text-center">
            <Button
              type="submit"
              className="px-10 py-4 gradient-social-1 text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 video-shadow-lg"
            >
              Book Discovery Call
            </Button>
            <p className="text-sm text-corporate-gray mt-4">
              Response time: Under 24 hours
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
