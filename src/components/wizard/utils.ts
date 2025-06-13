
import { ServiceType, PlanType } from "./types";

export const getServiceName = (serviceType?: ServiceType) => {
  switch (serviceType) {
    case "consultation": return "General Consultation";
    case "base-glimpse": return "Base Glimpse ($350)";
    case "full-glimpse": return "Full Glimpse ($750)";
    case "monthly": return "Monthly Services";
    default: return "Not specified";
  }
};

export const getPlanName = (planType?: PlanType) => {
  switch (planType) {
    case "trailhead": return "Trailhead ($1,500/month)";
    case "basecamp": return "Basecamp ($3,500/month)";
    case "summit": return "Summit ($7,500/month)";
    case "hosting": return "Monthly Hosting ($20,000/month)";
    default: return "Not applicable";
  }
};

export const getCalendlyUrl = (serviceType?: ServiceType) => {
  switch (serviceType) {
    case "consultation": return "https://calendly.com/palmerhouseproductions-info/general-strategy-call";
    case "base-glimpse": return "https://calendly.com/palmerhouseproductions-info/the-glimpse";
    case "full-glimpse": return "https://calendly.com/palmerhouseproductions-info/the-full-glimpse";
    case "monthly": return "https://calendly.com/palmerhouseproductions-info/discovery-call";
    default: return "https://calendly.com/palmerhouseproductions-info/general-strategy-call";
  }
};
