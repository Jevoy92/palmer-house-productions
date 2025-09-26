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
    <div className="bg-gradient-to-r from-pal-orange/10 to-pal-purple/10 rounded-lg p-6 mb-6">
      <div className="max-w-md mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
          <Mail className="text-pal-purple mr-2" size={24} />
          <h3 className="text-lg font-bold text-corporate-dark">Stay Updated</h3>
        </div>
        
        <p className="text-corporate-gray text-sm mb-4">
          Get the latest video production tips, client stories, and exclusive offers delivered to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
            disabled={isSubmitting}
            maxLength={255}
          />
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="bg-pal-purple hover:bg-pal-purple/90 text-white"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
        
        <p className="text-xs text-corporate-gray mt-2">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};