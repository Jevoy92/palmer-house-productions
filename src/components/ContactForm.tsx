
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData } from "./contact/ContactFormSchema";
import { PersonalInfoFields } from "./contact/PersonalInfoFields";
import { ChallengeField } from "./contact/ChallengeField";
import { ServiceField } from "./contact/ServiceField";
import { AdditionalFields } from "./contact/AdditionalFields";
import { useEffect } from "react";

interface ContactFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContactForm = ({ open, onOpenChange }: ContactFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      challenge: "",
      service: "",
      message: "",
      referralSource: "",
      readiness: "",
    },
  });

  // Check for selected path when form opens
  useEffect(() => {
    if (open) {
      const selectedPath = localStorage.getItem('selectedPath');
      if (selectedPath) {
        form.setValue('service', selectedPath);
        form.setValue('message', `I'm interested in the ${selectedPath} service for my brand.`);
        // Clear the stored path
        localStorage.removeItem('selectedPath');
      }
    }
  }, [open, form]);

  const onSubmit = (values: FormData) => {
    console.log(values);
    
    // Create mailto link with form data
    const subject = `Project Inquiry from ${values.firstName} ${values.lastName}`;
    const body = `
Name: ${values.firstName} ${values.lastName}
Email: ${values.email}
Phone: ${values.phone || 'Not provided'}

Challenge: ${values.challenge}
Service: ${values.service}

Message: ${values.message}

Referral Source: ${values.referralSource || 'Not provided'}
Readiness: ${values.readiness || 'Not provided'}
    `;
    
    const mailtoLink = `mailto:info@palmerhouseproductions.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-video-white to-corporate-light rounded-3xl border-0 video-shadow-lg">
        <DialogHeader className="text-center mb-8 pt-6">
          <DialogTitle className="text-3xl font-display font-bold text-corporate-dark mb-4">
            Let's Start Your <span className="text-gradient-1">Project</span>
          </DialogTitle>
          <p className="text-lg text-corporate-gray leading-relaxed max-w-md mx-auto">
            Tell us about your vision and we'll create a custom strategy for your brand.
          </p>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-6 pb-6">
            <PersonalInfoFields control={form.control} />
            
            <div className="w-full h-px bg-gradient-social-1 opacity-30"></div>
            
            <ChallengeField control={form.control} />
            
            <div className="w-full h-px bg-gradient-social-1 opacity-30"></div>
            
            <ServiceField control={form.control} />
            
            <div className="w-full h-px bg-gradient-social-1 opacity-30"></div>
            
            <AdditionalFields control={form.control} />

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1 border-corporate-gray text-corporate-gray hover:bg-corporate-light hover:border-corporate-dark rounded-xl transition-all duration-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 gradient-social-1 text-white font-medium hover:scale-105 transition-all duration-300 rounded-xl video-shadow"
              >
                Send Message ✨
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
