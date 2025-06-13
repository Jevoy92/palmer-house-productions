
export type ServiceType = "consultation" | "base-glimpse" | "full-glimpse" | "monthly";
export type PlanType = "trailhead" | "basecamp" | "summit" | "hosting";

export interface WizardData {
  serviceType?: ServiceType;
  planType?: PlanType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  challenge: string;
  timeline: string;
  budget: string;
}

export interface ContactWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialService?: string;
}
