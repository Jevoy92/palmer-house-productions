
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
    <div className="bg-video-white p-6 rounded-2xl video-shadow border border-corporate-light">
      <FormField
        control={control}
        name="pathway"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xl font-bold text-corporate-dark mb-6 flex items-center">
              <span className="w-8 h-8 bg-gradient-social-3 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">3</span>
              Choose Your Plan
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="space-y-3"
              >
                <div className="flex items-center space-x-4 p-5 rounded-xl bg-corporate-light hover:bg-gradient-to-r hover:from-social-orange/10 hover:to-social-yellow/10 transition-all duration-300 border border-transparent hover:border-social-orange/20">
                  <RadioGroupItem value="starter" id="starter" className="border-corporate-gray data-[state=checked]:bg-social-orange data-[state=checked]:border-social-orange" />
                  <Label htmlFor="starter" className="text-corporate-dark cursor-pointer flex-1">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold text-lg">Starter</span>
                        <div className="text-corporate-gray text-sm">Perfect for solo brands</div>
                      </div>
                      <span className="text-xl font-black text-gradient-2">$1,500/month</span>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-4 p-5 rounded-xl bg-corporate-light hover:bg-gradient-to-r hover:from-social-orange/10 hover:to-social-yellow/10 transition-all duration-300 border border-transparent hover:border-social-orange/20">
                  <RadioGroupItem value="growth" id="growth" className="border-corporate-gray data-[state=checked]:bg-social-orange data-[state=checked]:border-social-orange" />
                  <Label htmlFor="growth" className="text-corporate-dark cursor-pointer flex-1">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold text-lg">Growth</span>
                        <div className="text-corporate-gray text-sm">For growing teams</div>
                      </div>
                      <span className="text-xl font-black text-gradient-2">$3,500/month</span>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-4 p-5 rounded-xl bg-corporate-light hover:bg-gradient-to-r hover:from-social-orange/10 hover:to-social-yellow/10 transition-all duration-300 border border-transparent hover:border-social-orange/20">
                  <RadioGroupItem value="scale" id="scale" className="border-corporate-gray data-[state=checked]:bg-social-orange data-[state=checked]:border-social-orange" />
                  <Label htmlFor="scale" className="text-corporate-dark cursor-pointer flex-1">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold text-lg">Scale</span>
                        <div className="text-corporate-gray text-sm">Authority building</div>
                      </div>
                      <span className="text-xl font-black text-gradient-2">$7,500/month</span>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-4 p-5 rounded-xl bg-corporate-light hover:bg-gradient-to-r hover:from-social-orange/10 hover:to-social-yellow/10 transition-all duration-300 border border-transparent hover:border-social-orange/20">
                  <RadioGroupItem value="enterprise" id="enterprise" className="border-corporate-gray data-[state=checked]:bg-social-orange data-[state=checked]:border-social-orange" />
                  <Label htmlFor="enterprise" className="text-corporate-dark cursor-pointer flex-1">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold text-lg">Enterprise</span>
                        <div className="text-corporate-gray text-sm">Elite execution</div>
                      </div>
                      <span className="text-xl font-black text-gradient-2">$20,000/month</span>
                    </div>
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
