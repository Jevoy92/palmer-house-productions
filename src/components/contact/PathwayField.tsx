
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
          <FormLabel className="text-gray-300 text-base">
            What pathways are you interested in? <span className="text-amber-400">*</span>
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="trailhead" id="trailhead" className="border-slate-600" />
                <Label htmlFor="trailhead" className="text-gray-300 cursor-pointer">
                  <span className="font-semibold text-amber-400">Trailhead</span> — $1,500/month → For solo brands ready to start telling their story
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="basecamp" id="basecamp" className="border-slate-600" />
                <Label htmlFor="basecamp" className="text-gray-300 cursor-pointer">
                  <span className="font-semibold text-amber-400">Basecamp</span> — $3,500/month → For growing teams who need consistent video presence
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="summit" id="summit" className="border-slate-600" />
                <Label htmlFor="summit" className="text-gray-300 cursor-pointer">
                  <span className="font-semibold text-amber-400">Summit</span> — $7,500/month → For brands scaling authority with serious storytelling
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="horizon" id="horizon" className="border-slate-600" />
                <Label htmlFor="horizon" className="text-gray-300 cursor-pointer">
                  <span className="font-semibold text-amber-400">Horizon</span> — $20,000/month → For high-end enterprises demanding elite execution
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
