
import { ServiceType, ServiceCategory } from "./types";

export const getServiceName = (serviceType?: ServiceType) => {
  switch (serviceType) {
    case "consultation": return "General Consultation";
    case "diy": return "DIY Downloads";
    case "assets": return "Business Video Assets";
    case "bundles": return "Other Bundles";
    default: return "Not specified";
  }
};

export const getServiceCategoryName = (serviceCategory?: ServiceCategory) => {
  switch (serviceCategory) {
    case "diy-downloads": return "DIY Digital Downloads";
    case "coaching": return "DIY Coaching ($2,000)";
    case "monthly-content": return "Business Video Assets ($3,000-$15,000)";
    case "one-time-bundles": return "Other Bundles";
    default: return "Not specified";
  }
};

export const getZohoBookingUrl = (serviceType?: ServiceType) => {
  // All services now use the standardized strategy call URL
  return "https://palmerhouseproductions.zohobookings.com/#/4740771000000078004";
};
