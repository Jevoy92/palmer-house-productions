
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
          <FormLabel className="text-deep-charcoal text-base">
            What challenge is your brand facing that you'd love to solve with video?
          </FormLabel>
          <p className="text-sm text-muted-gray mb-4">
            This helps us recommend the best strategy for your goals—whether that's better visibility, stronger trust, or making sure people finally understand what you do.
          </p>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="visibility" id="visibility" className="border-warm-brown text-accent-terracotta" />
                <Label htmlFor="visibility" className="text-deep-charcoal cursor-pointer">
                  We're not showing up online like we should.
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="content" id="content" className="border-warm-brown text-accent-terracotta" />
                <Label htmlFor="content" className="text-deep-charcoal cursor-pointer">
                  I want to post weekly but never know what to say.
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="quality" id="quality" className="border-warm-brown text-accent-terracotta" />
                <Label htmlFor="quality" className="text-deep-charcoal cursor-pointer">
                  We have a great product, but our content doesn't reflect that.
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="connection" id="connection" className="border-warm-brown text-accent-terracotta" />
                <Label htmlFor="connection" className="text-deep-charcoal cursor-pointer">
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
