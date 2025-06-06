
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData } from "./contact/ContactFormSchema";
import { PersonalInfoFields } from "./contact/PersonalInfoFields";
import { ChallengeField } from "./contact/ChallengeField";
import { PathwayField } from "./contact/PathwayField";
import { AdditionalFields } from "./contact/AdditionalFields";

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
      pathway: "",
      message: "",
      referralSource: "",
      readiness: "",
    },
  });

  const onSubmit = (values: FormData) => {
    console.log(values);
    // Handle form submission here
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-cream-white border-warm-brown/30">
        <DialogHeader className="text-center mb-6">
          <DialogTitle className="text-3xl font-bold text-accent-terracotta mb-4">
            Ready to Chart Your Video Journey?
          </DialogTitle>
          <DialogDescription className="text-lg text-muted-gray leading-relaxed space-y-4">
            <p>
              Every great story starts with a single step. Whether you're testing the waters or gearing up for a bold brand transformation, we'll meet you where you are—and guide you the rest of the way.
            </p>
            <p>
              Fill out the short form below so we can craft a pathway built just for you. No generic packages. No recycled content. Just a custom strategy that helps your brand stand out, scale up, and feel like you.
            </p>
          </DialogDescription>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-accent-terracotta to-transparent mx-auto mt-6"></div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <PersonalInfoFields control={form.control} />
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-warm-brown/30 to-transparent"></div>
            
            <ChallengeField control={form.control} />
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-warm-brown/30 to-transparent"></div>
            
            <PathwayField control={form.control} />
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-warm-brown/30 to-transparent"></div>
            
            <AdditionalFields control={form.control} />

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1 border-warm-brown text-muted-gray hover:bg-warm-beige"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-accent-terracotta to-warm-brown text-cream-white font-semibold hover:from-accent-terracotta/90 hover:to-warm-brown/90"
              >
                Send Signal
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
