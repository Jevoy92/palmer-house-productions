
import { z } from "zod";

export const glimpseContactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  website: z.string().optional(),
  currentChallenge: z.string().min(10, "Please describe your challenge in at least 10 characters"),
  timeline: z.enum(["immediate", "1-2-weeks", "1-month", "2-3-months", "exploring"], {
    required_error: "Please select a timeline",
  }),
  budget: z.enum(["under-5k", "5k-10k", "10k-25k", "25k-plus", "tbd"], {
    required_error: "Please select a budget range",
  }),
});

export type GlimpseContactFormData = z.infer<typeof glimpseContactFormSchema>;
