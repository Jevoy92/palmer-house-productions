
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
    <div className="bg-video-white p-6 rounded-2xl video-shadow border border-corporate-light">
      <FormField
        control={control}
        name="challenge"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xl font-bold text-corporate-dark mb-2 flex items-center">
              <span className="w-8 h-8 bg-gradient-social-2 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
              What's your biggest challenge?
            </FormLabel>
            <p className="text-corporate-gray mb-6">
              Help us understand your goals so we can recommend the best approach.
            </p>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="space-y-3"
              >
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-corporate-light hover:bg-gradient-to-r hover:from-social-purple/10 hover:to-social-pink/10 transition-all duration-300 border border-transparent hover:border-social-purple/20">
                  <RadioGroupItem value="visibility" id="visibility" className="border-corporate-gray data-[state=checked]:bg-social-purple data-[state=checked]:border-social-purple" />
                  <Label htmlFor="visibility" className="text-corporate-dark cursor-pointer flex-1 font-medium">
                    We need better online visibility
                  </Label>
                </div>
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-corporate-light hover:bg-gradient-to-r hover:from-social-purple/10 hover:to-social-pink/10 transition-all duration-300 border border-transparent hover:border-social-purple/20">
                  <RadioGroupItem value="content" id="content" className="border-corporate-gray data-[state=checked]:bg-social-purple data-[state=checked]:border-social-purple" />
                  <Label htmlFor="content" className="text-corporate-dark cursor-pointer flex-1 font-medium">
                    Consistent content creation
                  </Label>
                </div>
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-corporate-light hover:bg-gradient-to-r hover:from-social-purple/10 hover:to-social-pink/10 transition-all duration-300 border border-transparent hover:border-social-purple/20">
                  <RadioGroupItem value="quality" id="quality" className="border-corporate-gray data-[state=checked]:bg-social-purple data-[state=checked]:border-social-purple" />
                  <Label htmlFor="quality" className="text-corporate-dark cursor-pointer flex-1 font-medium">
                    Professional content quality
                  </Label>
                </div>
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-corporate-light hover:bg-gradient-to-r hover:from-social-purple/10 hover:to-social-pink/10 transition-all duration-300 border border-transparent hover:border-social-purple/20">
                  <RadioGroupItem value="connection" id="connection" className="border-corporate-gray data-[state=checked]:bg-social-purple data-[state=checked]:border-social-purple" />
                  <Label htmlFor="connection" className="text-corporate-dark cursor-pointer flex-1 font-medium">
                    Better customer connection
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
