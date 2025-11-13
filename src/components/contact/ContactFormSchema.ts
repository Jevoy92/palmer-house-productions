
import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z.string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  email: z.string()
    .trim()
    .email("Please enter a valid email")
    .max(255, "Email must be less than 255 characters"),
  phone: z.string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number must be less than 20 characters")
    .regex(/^[0-9\s\-\+\(\)]+$/, "Phone number can only contain numbers, spaces, and symbols: - + ( )"),
  challenge: z.string()
    .min(1, "Please select a challenge"),
  pathway: z.string()
    .min(1, "Please select a pathway"),
  message: z.string()
    .optional()
    .refine(val => !val || val.length <= 2000, {
      message: "Message must be less than 2000 characters"
    }),
  referralSource: z.string()
    .min(1, "Please tell us how you heard about us")
    .max(200, "Response must be less than 200 characters"),
  readiness: z.string()
    .min(1, "Please tell us your timeline"),
});

export type FormData = z.infer<typeof formSchema>;
