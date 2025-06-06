
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
          <FormLabel className="text-black font-medium text-lg">
            What's your biggest challenge?
          </FormLabel>
          <p className="text-apple-gray-4 mb-6">
            Help us understand your goals so we can recommend the best approach.
          </p>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 p-4 rounded-xl hover:bg-apple-gray transition-colors">
                <RadioGroupItem value="visibility" id="visibility" className="border-apple-gray-3 text-apple-blue" />
                <Label htmlFor="visibility" className="text-black cursor-pointer flex-1">
                  We need better online visibility
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-xl hover:bg-apple-gray transition-colors">
                <RadioGroupItem value="content" id="content" className="border-apple-gray-3 text-apple-blue" />
                <Label htmlFor="content" className="text-black cursor-pointer flex-1">
                  Consistent content creation
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-xl hover:bg-apple-gray transition-colors">
                <RadioGroupItem value="quality" id="quality" className="border-apple-gray-3 text-apple-blue" />
                <Label htmlFor="quality" className="text-black cursor-pointer flex-1">
                  Professional content quality
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-xl hover:bg-apple-gray transition-colors">
                <RadioGroupItem value="connection" id="connection" className="border-apple-gray-3 text-apple-blue" />
                <Label htmlFor="connection" className="text-black cursor-pointer flex-1">
                  Better customer connection
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
