
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { FormData } from "./ContactFormSchema";

interface AdditionalFieldsProps {
  control: Control<FormData>;
}

export const AdditionalFields = ({ control }: AdditionalFieldsProps) => {
  return (
    <>
      <FormField
        control={control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-deep-charcoal">Message</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Tell us more about your vision..." 
                className="bg-warm-beige border-warm-brown/30 text-deep-charcoal placeholder:text-muted-gray min-h-[100px] focus:border-accent-terracotta" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="referralSource"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-deep-charcoal">
              How did you hear about us? <span className="text-accent-terracotta">*</span>
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-warm-beige border-warm-brown/30 text-deep-charcoal focus:border-accent-terracotta">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-cream-white border-warm-brown/30 text-deep-charcoal">
                <SelectItem value="friend" className="text-deep-charcoal hover:bg-warm-beige">Referred by a friend</SelectItem>
                <SelectItem value="instagram" className="text-deep-charcoal hover:bg-warm-beige">Instagram</SelectItem>
                <SelectItem value="tiktok" className="text-deep-charcoal hover:bg-warm-beige">TikTok</SelectItem>
                <SelectItem value="linkedin" className="text-deep-charcoal hover:bg-warm-beige">LinkedIn</SelectItem>
                <SelectItem value="event" className="text-deep-charcoal hover:bg-warm-beige">At an event</SelectItem>
                <SelectItem value="google" className="text-deep-charcoal hover:bg-warm-beige">Google search</SelectItem>
                <SelectItem value="bni" className="text-deep-charcoal hover:bg-warm-beige">BNI or local group</SelectItem>
                <SelectItem value="other" className="text-deep-charcoal hover:bg-warm-beige">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="readiness"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-deep-charcoal">
              How ready are you to start your content journey? <span className="text-accent-terracotta">*</span>
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-warm-beige border-warm-brown/30 text-deep-charcoal focus:border-accent-terracotta">
                  <SelectValue placeholder="Select your timeline" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-cream-white border-warm-brown/30 text-deep-charcoal">
                <SelectItem value="ready" className="text-deep-charcoal hover:bg-warm-beige">I'm ready to go this month</SelectItem>
                <SelectItem value="next-quarter" className="text-deep-charcoal hover:bg-warm-beige">I'm exploring options for next quarter</SelectItem>
                <SelectItem value="researching" className="text-deep-charcoal hover:bg-warm-beige">I'm just researching for now</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
