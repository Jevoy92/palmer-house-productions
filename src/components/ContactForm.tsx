
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border-0 apple-shadow-lg">
        <DialogHeader className="text-center mb-8 pt-6">
          <DialogTitle className="text-3xl font-sf font-semibold text-black mb-4">
            Let's Start Your Project
          </DialogTitle>
          <p className="text-lg text-apple-gray-4 leading-relaxed max-w-md mx-auto">
            Tell us about your vision and we'll create a custom strategy for your brand.
          </p>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-6 pb-6">
            <PersonalInfoFields control={form.control} />
            
            <div className="w-full h-px bg-apple-gray-2"></div>
            
            <ChallengeField control={form.control} />
            
            <div className="w-full h-px bg-apple-gray-2"></div>
            
            <PathwayField control={form.control} />
            
            <div className="w-full h-px bg-apple-gray-2"></div>
            
            <AdditionalFields control={form.control} />

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1 border-apple-gray-2 text-apple-gray-5 hover:bg-apple-gray rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-apple-blue text-white font-medium hover:bg-apple-blue/90 rounded-xl"
              >
                Send Message
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
