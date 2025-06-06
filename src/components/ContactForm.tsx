import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(1, "Phone number is required"),
  challenge: z.string().min(1, "Please select a challenge"),
  pathway: z.string().min(1, "Please select a pathway"),
  message: z.string().optional(),
  referralSource: z.string().min(1, "Please tell us how you heard about us"),
  readiness: z.string().min(1, "Please tell us your timeline"),
});

interface ContactFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContactForm = ({ open, onOpenChange }: ContactFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      challenge: "",
      pathway: "",
      message: "",
      referralSource: "",
      readiness: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Handle form submission here
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
        <DialogHeader className="text-center mb-6">
          <DialogTitle className="text-3xl font-bold text-amber-400 mb-4">
            Ready to Chart Your Video Journey?
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-300 leading-relaxed space-y-4">
            <p>
              Every great story starts with a single step. Whether you're testing the waters or gearing up for a bold brand transformation, we'll meet you where you are—and guide you the rest of the way.
            </p>
            <p>
              Fill out the short form below so we can craft a pathway built just for you. No generic packages. No recycled content. Just a custom strategy that helps your brand stand out, scale up, and feel like you.
            </p>
          </DialogDescription>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-6"></div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
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
                control={form.control}
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
              control={form.control}
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
              control={form.control}
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

            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>

            <FormField
              control={form.control}
              name="challenge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300 text-base">
                    What challenge is your brand facing that you'd love to solve with video?
                  </FormLabel>
                  <p className="text-sm text-gray-400 mb-4">
                    This helps us recommend the best strategy for your goals—whether that's better visibility, stronger trust, or making sure people finally understand what you do.
                  </p>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="visibility" id="visibility" className="border-slate-600" />
                        <Label htmlFor="visibility" className="text-gray-300 cursor-pointer">
                          We're not showing up online like we should.
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="content" id="content" className="border-slate-600" />
                        <Label htmlFor="content" className="text-gray-300 cursor-pointer">
                          I want to post weekly but never know what to say.
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="quality" id="quality" className="border-slate-600" />
                        <Label htmlFor="quality" className="text-gray-300 cursor-pointer">
                          We have a great product, but our content doesn't reflect that.
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="connection" id="connection" className="border-slate-600" />
                        <Label htmlFor="connection" className="text-gray-300 cursor-pointer">
                          We need a better way to connect with customers visually.
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>

            <FormField
              control={form.control}
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

            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us more about your vision..." 
                      className="bg-slate-800 border-slate-600 text-white min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>

            <FormField
              control={form.control}
              name="referralSource"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">
                    How did you hear about us? <span className="text-amber-400">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-slate-800 border-slate-600 text-white">
                      <SelectItem value="friend" className="text-white hover:bg-slate-700">Referred by a friend</SelectItem>
                      <SelectItem value="instagram" className="text-white hover:bg-slate-700">Instagram</SelectItem>
                      <SelectItem value="tiktok" className="text-white hover:bg-slate-700">TikTok</SelectItem>
                      <SelectItem value="linkedin" className="text-white hover:bg-slate-700">LinkedIn</SelectItem>
                      <SelectItem value="event" className="text-white hover:bg-slate-700">At an event</SelectItem>
                      <SelectItem value="google" className="text-white hover:bg-slate-700">Google search</SelectItem>
                      <SelectItem value="bni" className="text-white hover:bg-slate-700">BNI or local group</SelectItem>
                      <SelectItem value="other" className="text-white hover:bg-slate-700">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>

            <FormField
              control={form.control}
              name="readiness"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">
                    How ready are you to start your content journey? <span className="text-amber-400">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                        <SelectValue placeholder="Select your timeline" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-slate-800 border-slate-600 text-white">
                      <SelectItem value="ready" className="text-white hover:bg-slate-700">I'm ready to go this month</SelectItem>
                      <SelectItem value="next-quarter" className="text-white hover:bg-slate-700">I'm exploring options for next quarter</SelectItem>
                      <SelectItem value="researching" className="text-white hover:bg-slate-700">I'm just researching for now</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-semibold hover:from-amber-400 hover:to-orange-400"
              >
                Send Signal
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
