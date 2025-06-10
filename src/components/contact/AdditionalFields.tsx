
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
    <div className="bg-video-white p-6 rounded-2xl video-shadow border border-corporate-light">
      <h3 className="text-xl font-bold text-corporate-dark mb-6 flex items-center">
        <span className="w-8 h-8 bg-gradient-social-4 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">4</span>
        Additional Details
      </h3>
      
      <div className="space-y-6">
        <FormField
          control={control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-corporate-dark font-medium">Tell us about your project</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your vision..." 
                  className="bg-corporate-light border-transparent text-corporate-dark placeholder:text-corporate-gray min-h-[100px] rounded-xl focus:border-social-purple focus:ring-social-purple focus:bg-video-white transition-all duration-300" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="referralSource"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-corporate-dark font-medium">How did you hear about us?</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-corporate-light border-transparent text-corporate-dark rounded-xl focus:border-social-purple focus:bg-video-white transition-all duration-300">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-video-white border-corporate-light text-corporate-dark rounded-xl">
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
                <FormLabel className="text-corporate-dark font-medium">Project Timeline</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-corporate-light border-transparent text-corporate-dark rounded-xl focus:border-social-purple focus:bg-video-white transition-all duration-300">
                      <SelectValue placeholder="When would you like to start?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-video-white border-corporate-light text-corporate-dark rounded-xl">
                    <SelectItem value="asap">This month</SelectItem>
                    <SelectItem value="quarter">Next quarter</SelectItem>
                    <SelectItem value="exploring">Just exploring</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};
