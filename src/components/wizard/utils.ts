
import { ServiceType, ServiceCategory } from "./types";

export const getServiceName = (serviceType?: ServiceType) => {
  switch (serviceType) {
    case "consultation": return "General Consultation";
    case "base-glimpse": return "Base Glimpse ($350)";
    case "full-glimpse": return "Full Glimpse ($750)";
    case "monthly": return "Monthly Services";
    default: return "Not specified";
  }
};

export const getServiceCategoryName = (serviceCategory?: ServiceCategory) => {
  switch (serviceCategory) {
    case "diy-downloads": return "DIY Digital Downloads";
    case "coaching": return "Camera-Ready Brand Coaching ($2,000)";
    case "monthly-content": return "Social Authority Kit ($3,000/month)";
    case "one-time-bundles": return "One-Time Problem-Solving Bundles";
    default: return "Not specified";
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
