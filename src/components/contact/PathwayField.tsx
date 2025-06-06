
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Control } from "react-hook-form";
import { FormData } from "./ContactFormSchema";

interface PathwayFieldProps {
  control: Control<FormData>;
}

export const PathwayField = ({ control }: PathwayFieldProps) => {
  return (
    <FormField
      control={control}
      name="pathway"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-deep-charcoal text-base">
            What pathways are you interested in? <span className="text-accent-terracotta">*</span>
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="trailhead" id="trailhead" className="border-warm-brown text-accent-terracotta" />
                <Label htmlFor="trailhead" className="text-deep-charcoal cursor-pointer">
                  <span className="font-semibold text-accent-terracotta">Trailhead</span> — $1,500/month → For solo brands ready to start telling their story
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="basecamp" id="basecamp" className="border-warm-brown text-accent-terracotta" />
                <Label htmlFor="basecamp" className="text-deep-charcoal cursor-pointer">
                  <span className="font-semibold text-accent-terracotta">Basecamp</span> — $3,500/month → For growing teams who need consistent video presence
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="summit" id="summit" className="border-warm-brown text-accent-terracotta" />
                <Label htmlFor="summit" className="text-deep-charcoal cursor-pointer">
                  <span className="font-semibold text-accent-terracotta">Summit</span> — $7,500/month → For brands scaling authority with serious storytelling
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="horizon" id="horizon" className="border-warm-brown text-accent-terracotta" />
                <Label htmlFor="horizon" className="text-deep-charcoal cursor-pointer">
                  <span className="font-semibold text-accent-terracotta">Horizon</span> — $20,000/month → For high-end enterprises demanding elite execution
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
