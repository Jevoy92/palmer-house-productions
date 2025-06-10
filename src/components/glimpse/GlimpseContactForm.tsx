import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { GlimpseContactFormData, glimpseContactFormSchema } from "./GlimpseContactFormSchema";

export const GlimpseContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GlimpseContactFormData>({
    resolver: zodResolver(glimpseContactFormSchema),
  });

  const handleBaseGlimpse = () => {
    window.open('https://calendly.com/palmerhouseproductions-info/the-glimpse', '_blank');
  };

  const handleFullGlimpse = () => {
    window.open('https://calendly.com/palmerhouseproductions-info/the-full-glimpse', '_blank');
  };

  const onSubmit = async (data: GlimpseContactFormData) => {
    setIsSubmitting(true);
    console.log("Glimpse contact form submission:", data);
    
    try {
      // Create mailto link with form data
      const subject = `Glimpse Inquiry from ${data.firstName} ${data.lastName}`;
      const body = `
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company}
Website: ${data.website || 'Not provided'}

Challenge: ${data.currentChallenge}

Timeline: ${data.timeline}
Budget: ${data.budget}
      `;
      
      const mailtoLink = `mailto:information@palmerhouseproductions.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
      
      toast({
        title: "Email client opened!",
        description: "Your message has been prepared. Send it to complete your inquiry.",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Error opening email",
        description: "Please contact us directly at information@palmerhouseproductions.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-video-white rounded-3xl p-8 video-shadow-lg">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-display font-black text-corporate-dark mb-4">
          Ready for Your <span className="text-gradient-1">Glimpse</span>?
        </h3>
        <p className="text-lg text-corporate-gray mb-6">
          Choose your path or tell us about your vision.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={handleBaseGlimpse}
            className="flex-1 px-6 py-4 gradient-social-1 text-white font-bold rounded-2xl hover:scale-105 transition-all duration-300"
          >
            Book Base Glimpse ($350)
          </button>
          <button
            onClick={handleFullGlimpse}
            className="flex-1 px-6 py-4 gradient-social-2 text-white font-bold rounded-2xl hover:scale-105 transition-all duration-300"
          >
            Book Full Glimpse ($750)
          </button>
        </div>
        
        <div className="text-center text-corporate-gray mb-6">
          <span className="text-sm">Or fill out the form below for a custom consultation</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              {...register("firstName")}
              className="mt-1"
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              {...register("lastName")}
              className="mt-1"
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className="mt-1"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              className="mt-1"
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
              {...register("company")}
              className="mt-1"
            />
            {errors.company && (
              <p className="text-red-600 text-sm mt-1">{errors.company.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://yourwebsite.com"
              {...register("website")}
              className="mt-1"
            />
            {errors.website && (
              <p className="text-red-600 text-sm mt-1">{errors.website.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="currentChallenge">What's your biggest brand challenge right now? *</Label>
          <Textarea
            id="currentChallenge"
            {...register("currentChallenge")}
            placeholder="Tell us about what's not working with your current brand presence..."
            className="mt-1 min-h-[100px]"
          />
          {errors.currentChallenge && (
            <p className="text-red-600 text-sm mt-1">{errors.currentChallenge.message}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="timeline">Timeline *</Label>
            <select
              id="timeline"
              {...register("timeline")}
              className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              <option value="">Select timeline</option>
              <option value="immediate">Need it ASAP</option>
              <option value="1-2-weeks">1-2 weeks</option>
              <option value="1-month">Within a month</option>
              <option value="2-3-months">2-3 months</option>
              <option value="exploring">Just exploring</option>
            </select>
            {errors.timeline && (
              <p className="text-red-600 text-sm mt-1">{errors.timeline.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="budget">Budget Range *</Label>
            <select
              id="budget"
              {...register("budget")}
              className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              <option value="">Select budget</option>
              <option value="under-5k">Under $5k</option>
              <option value="5k-10k">$5k - $10k</option>
              <option value="10k-25k">$10k - $25k</option>
              <option value="25k-plus">$25k+</option>
              <option value="tbd">To be determined</option>
            </select>
            {errors.budget && (
              <p className="text-red-600 text-sm mt-1">{errors.budget.message}</p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full gradient-social-1 text-white font-bold text-lg py-6 rounded-2xl hover:scale-105 transition-all duration-300"
        >
          {isSubmitting ? "Preparing Email..." : "Send Custom Inquiry 📧"}
        </Button>
      </form>
    </div>
  );
};
