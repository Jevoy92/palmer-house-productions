
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormData } from "./ContactFormSchema";

interface PersonalInfoFieldsProps {
  control: Control<FormData>;
}

export const PersonalInfoFields = ({ control }: PersonalInfoFieldsProps) => {
  return (
    <div className="bg-video-white p-6 rounded-2xl video-shadow border border-corporate-light">
      <h3 className="text-xl font-bold text-corporate-dark mb-6 flex items-center">
        <span className="w-8 h-8 bg-gradient-social-1 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">1</span>
        Your Information
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-corporate-dark font-medium">First Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="First name" 
                    className="bg-corporate-light border-transparent text-corporate-dark placeholder:text-corporate-gray rounded-xl focus:border-social-purple focus:ring-social-purple focus:bg-video-white transition-all duration-300" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-corporate-dark font-medium">Last Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Last name" 
                    className="bg-corporate-light border-transparent text-corporate-dark placeholder:text-corporate-gray rounded-xl focus:border-social-purple focus:ring-social-purple focus:bg-video-white transition-all duration-300" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-corporate-dark font-medium">Email</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="bg-corporate-light border-transparent text-corporate-dark placeholder:text-corporate-gray rounded-xl focus:border-social-purple focus:ring-social-purple focus:bg-video-white transition-all duration-300" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-corporate-dark font-medium">Phone</FormLabel>
              <FormControl>
                <Input 
                  type="tel" 
                  placeholder="(555) 123-4567" 
                  className="bg-corporate-light border-transparent text-corporate-dark placeholder:text-corporate-gray rounded-xl focus:border-social-purple focus:ring-social-purple focus:bg-video-white transition-all duration-300" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
