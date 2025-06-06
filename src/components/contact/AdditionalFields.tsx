
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
            <FormLabel className="text-black font-medium">Tell us about your project</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your vision..." 
                className="bg-apple-gray border-apple-gray-2 text-black placeholder:text-apple-gray-4 min-h-[100px] rounded-xl focus:border-apple-blue focus:ring-apple-blue" 
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
            <FormLabel className="text-black font-medium">How did you hear about us?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-apple-gray border-apple-gray-2 text-black rounded-xl focus:border-apple-blue">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white border-apple-gray-2 text-black rounded-xl">
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="social">Social Media</SelectItem>
                <SelectItem value="search">Google Search</SelectItem>
                <SelectItem value="other">Other</SelectItem>
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
            <FormLabel className="text-black font-medium">Project Timeline</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-apple-gray border-apple-gray-2 text-black rounded-xl focus:border-apple-blue">
                  <SelectValue placeholder="When would you like to start?" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white border-apple-gray-2 text-black rounded-xl">
                <SelectItem value="asap">This month</SelectItem>
                <SelectItem value="quarter">Next quarter</SelectItem>
                <SelectItem value="exploring">Just exploring</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
