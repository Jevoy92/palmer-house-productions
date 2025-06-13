export type ServiceType = "consultation" | "base-glimpse" | "full-glimpse" | "monthly";
export type PlanType = "trailhead" | "basecamp" | "summit" | "hosting";

// New qualification types
export type BusinessProfileType = "solo" | "growing" | "established" | "agency" | "enterprise" | "nonprofit";
export type BusinessType = "service" | "product" | "saas" | "coaching" | "professional" | "media" | "nonprofit";
export type VideoUseCaseType = "lead-generation" | "training" | "onboarding" | "authority" | "education" | "sales";
export type ContentVolumeType = "1-2" | "3-4" | "5-8" | "8-plus";
export type TimelineType = "immediately" | "1-3-months" | "3-6-months" | "planning";
export type GeographicType = "seattle" | "national" | "international" | "online" | "custom";

export interface WizardData {
  // New qualification fields
  businessProfile?: BusinessProfileType;
  businessType?: BusinessType;
  videoUseCase?: VideoUseCaseType;
  contentVolume?: ContentVolumeType;
  timeline?: TimelineType;
  geographic?: GeographicType;
  geographicCustom?: string;
  
  // Existing fields
  serviceType?: ServiceType;
  planType?: PlanType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  challenge: string;
  budget: string;
}

export interface ContactWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialService?: string;
}
