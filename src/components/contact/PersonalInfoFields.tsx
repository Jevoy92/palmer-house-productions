
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
              <FormLabel className="text-black font-medium">First Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="First name" 
                  className="bg-apple-gray border-apple-gray-2 text-black placeholder:text-apple-gray-4 rounded-xl focus:border-apple-blue focus:ring-apple-blue" 
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
              <FormLabel className="text-black font-medium">Last Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Last name" 
                  className="bg-apple-gray border-apple-gray-2 text-black placeholder:text-apple-gray-4 rounded-xl focus:border-apple-blue focus:ring-apple-blue" 
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
            <FormLabel className="text-black font-medium">Email</FormLabel>
            <FormControl>
              <Input 
                type="email" 
                placeholder="your@email.com" 
                className="bg-apple-gray border-apple-gray-2 text-black placeholder:text-apple-gray-4 rounded-xl focus:border-apple-blue focus:ring-apple-blue" 
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
            <FormLabel className="text-black font-medium">Phone</FormLabel>
            <FormControl>
              <Input 
                type="tel" 
                placeholder="(555) 123-4567" 
                className="bg-apple-gray border-apple-gray-2 text-black placeholder:text-apple-gray-4 rounded-xl focus:border-apple-blue focus:ring-apple-blue" 
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
