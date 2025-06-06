
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
            <FormLabel className="text-gray-300">Message</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Tell us more about your vision..." 
                className="bg-slate-800 border-slate-600 text-white min-h-[100px]" 
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
            <FormLabel className="text-gray-300">
              How did you hear about us? <span className="text-amber-400">*</span>
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-slate-800 border-slate-600 text-white">
                <SelectItem value="friend" className="text-white hover:bg-slate-700">Referred by a friend</SelectItem>
                <SelectItem value="instagram" className="text-white hover:bg-slate-700">Instagram</SelectItem>
                <SelectItem value="tiktok" className="text-white hover:bg-slate-700">TikTok</SelectItem>
                <SelectItem value="linkedin" className="text-white hover:bg-slate-700">LinkedIn</SelectItem>
                <SelectItem value="event" className="text-white hover:bg-slate-700">At an event</SelectItem>
                <SelectItem value="google" className="text-white hover:bg-slate-700">Google search</SelectItem>
                <SelectItem value="bni" className="text-white hover:bg-slate-700">BNI or local group</SelectItem>
                <SelectItem value="other" className="text-white hover:bg-slate-700">Other</SelectItem>
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
            <FormLabel className="text-gray-300">
              How ready are you to start your content journey? <span className="text-amber-400">*</span>
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue placeholder="Select your timeline" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-slate-800 border-slate-600 text-white">
                <SelectItem value="ready" className="text-white hover:bg-slate-700">I'm ready to go this month</SelectItem>
                <SelectItem value="next-quarter" className="text-white hover:bg-slate-700">I'm exploring options for next quarter</SelectItem>
                <SelectItem value="researching" className="text-white hover:bg-slate-700">I'm just researching for now</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
