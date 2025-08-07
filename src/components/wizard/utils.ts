
import { ServiceType, ServiceCategory } from "./types";

export const getServiceName = (serviceType?: ServiceType) => {
  switch (serviceType) {
    case "consultation": return "General Consultation";
    case "diy": return "DIY Downloads";
    case "coaching": return "Group Coaching";
    case "monthly": return "Monthly Content System";
    case "bundle": return "One-Time Bundles";
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

export const getZohoBookingUrl = (serviceType?: ServiceType) => {
  // All services now use the standardized strategy call URL
  return "https://palmerhouseproductions.zohobookings.com/#/4740771000000078004";
};
