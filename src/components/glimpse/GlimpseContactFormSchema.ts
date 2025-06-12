
import { z } from "zod";

export const glimpseContactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  website: z.string()
    .optional()
    .refine((val) => {
      if (!val || val === "") return true;
      
      // Accept various URL formats:
      // - Full URLs with protocol (http://, https://)
      // - URLs starting with www.
      // - Plain domain names
      const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)?$/;
      return urlPattern.test(val);
    }, {
      message: "Please enter a valid website (e.g., yoursite.com or www.yoursite.com)"
    }),
  currentChallenge: z.string().min(10, "Please describe your challenge in at least 10 characters"),
  timeline: z.enum(["immediate", "1-2-weeks", "1-month", "2-3-months", "exploring"], {
    required_error: "Please select a timeline",
  }),
  budget: z.enum(["under-5k", "5k-10k", "10k-25k", "25k-plus", "tbd"], {
    required_error: "Please select a budget range",
  }),
});

export type GlimpseContactFormData = z.infer<typeof glimpseContactFormSchema>;
