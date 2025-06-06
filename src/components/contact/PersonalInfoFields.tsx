
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormData } from "./ContactFormSchema";

interface PersonalInfoFieldsProps {
  control: Control<FormData>;
}

export const PersonalInfoFields = ({ control }: PersonalInfoFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">First Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="First name" 
                  className="bg-slate-800 border-slate-600 text-white" 
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
              <FormLabel className="text-gray-300">Last Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Last name" 
                  className="bg-slate-800 border-slate-600 text-white" 
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
            <FormLabel className="text-gray-300">Email</FormLabel>
            <FormControl>
              <Input 
                type="email" 
                placeholder="your@email.com" 
                className="bg-slate-800 border-slate-600 text-white" 
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
            <FormLabel className="text-gray-300">Phone</FormLabel>
            <FormControl>
              <Input 
                type="tel" 
                placeholder="(555) 123-4567" 
                className="bg-slate-800 border-slate-600 text-white" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
