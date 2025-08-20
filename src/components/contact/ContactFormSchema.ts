
import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(1, "Phone number is required"),
  challenge: z.string().min(1, "Please select a challenge"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().optional(),
  referralSource: z.string().min(1, "Please tell us how you heard about us"),
  readiness: z.string().min(1, "Please tell us your timeline"),
});

export type FormData = z.infer<typeof formSchema>;
