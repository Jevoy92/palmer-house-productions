
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
          <FormLabel className="text-black font-medium text-lg">
            Choose Your Plan
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 p-4 rounded-xl border border-apple-gray-2 hover:border-apple-blue transition-colors">
                <RadioGroupItem value="starter" id="starter" className="border-apple-gray-3 text-apple-blue" />
                <Label htmlFor="starter" className="text-black cursor-pointer flex-1">
                  <span className="font-semibold">Starter</span> — $1,500/month
                  <div className="text-apple-gray-4 text-sm">Perfect for solo brands</div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-xl border border-apple-gray-2 hover:border-apple-blue transition-colors">
                <RadioGroupItem value="growth" id="growth" className="border-apple-gray-3 text-apple-blue" />
                <Label htmlFor="growth" className="text-black cursor-pointer flex-1">
                  <span className="font-semibold">Growth</span> — $3,500/month
                  <div className="text-apple-gray-4 text-sm">For growing teams</div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-xl border border-apple-gray-2 hover:border-apple-blue transition-colors">
                <RadioGroupItem value="scale" id="scale" className="border-apple-gray-3 text-apple-blue" />
                <Label htmlFor="scale" className="text-black cursor-pointer flex-1">
                  <span className="font-semibold">Scale</span> — $7,500/month
                  <div className="text-apple-gray-4 text-sm">Authority building</div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-xl border border-apple-gray-2 hover:border-apple-blue transition-colors">
                <RadioGroupItem value="enterprise" id="enterprise" className="border-apple-gray-3 text-apple-blue" />
                <Label htmlFor="enterprise" className="text-black cursor-pointer flex-1">
                  <span className="font-semibold">Enterprise</span> — $20,000/month
                  <div className="text-apple-gray-4 text-sm">Elite execution</div>
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
