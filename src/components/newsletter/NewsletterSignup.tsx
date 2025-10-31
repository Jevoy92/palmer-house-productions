import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { Mail } from 'lucide-react';

const newsletterSchema = z.object({
  email: z.string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" })
});

export const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    const validation = newsletterSchema.safeParse({ email });
    if (!validation.success) {
      toast({
        title: "Invalid Email",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // For now, we'll just show a success message
      // In the future, this could integrate with a newsletter service
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter!",
      });
      
      setEmail('');
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem subscribing you to our newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-purple-50 rounded-2xl p-8 mb-6 border border-purple-100">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center mb-3">
          <Mail className="text-pal-purple mr-2" size={24} />
          <h3 className="text-xl font-bold text-corporate-dark">Stay Updated</h3>
        </div>
        
        <p className="text-corporate-gray text-sm mb-6">
          Get the latest video production tips, client stories, and exclusive offers delivered to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-white border-purple-200 focus:border-pal-purple"
            disabled={isSubmitting}
            maxLength={255}
          />
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="bg-pal-purple hover:bg-pal-purple/90 text-white px-8 shadow-lg hover:shadow-xl transition-all"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
        
        <p className="text-xs text-corporate-gray mt-3">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};