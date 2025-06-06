
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Control } from "react-hook-form";
import { FormData } from "./ContactFormSchema";

interface ChallengeFieldProps {
  control: Control<FormData>;
}

export const ChallengeField = ({ control }: ChallengeFieldProps) => {
  return (
    <FormField
      control={control}
      name="challenge"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-300 text-base">
            What challenge is your brand facing that you'd love to solve with video?
          </FormLabel>
          <p className="text-sm text-gray-400 mb-4">
            This helps us recommend the best strategy for your goals—whether that's better visibility, stronger trust, or making sure people finally understand what you do.
          </p>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="visibility" id="visibility" className="border-slate-600" />
                <Label htmlFor="visibility" className="text-gray-300 cursor-pointer">
                  We're not showing up online like we should.
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="content" id="content" className="border-slate-600" />
                <Label htmlFor="content" className="text-gray-300 cursor-pointer">
                  I want to post weekly but never know what to say.
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="quality" id="quality" className="border-slate-600" />
                <Label htmlFor="quality" className="text-gray-300 cursor-pointer">
                  We have a great product, but our content doesn't reflect that.
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="connection" id="connection" className="border-slate-600" />
                <Label htmlFor="connection" className="text-gray-300 cursor-pointer">
                  We need a better way to connect with customers visually.
                </Label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
