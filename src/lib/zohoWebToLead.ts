export type ZohoLeadData = {
  Company: string;
  "First Name": string;
  "Last Name": string;
  Email: string;
  Phone: string;
  City: string;
  State: string;
  "Zip Code": string;
  Country: string;
  LEADCF3: string; // Project Type
  LEADCF2: string; // Budget
  LEADCF4: string; // Timeline
  Description?: string;
  "Lead Source"?: string;
};

// Zoho Web-to-Lead form configuration (from your embed)
const ZOHO_WEB_TO_LEAD_ENDPOINT = "https://crm.zoho.com/crm/WebToLeadForm";
const ZOHO_KEYS = {
  xnQsjsdp: "a6b8a735a02f2d8a66cf52e2d55a8355e75a51132b10d4c810d571ed2b58f6ff",
  xmIwtLD:
    "e16265ea542f133fa16fa068df29282c0fe148612bfa35da5b910b8dd4242de0c4984696b3b92b646e2d6ab42ba1036b",
  actionType: "TGVhZHM=",
};

export type SubmitZohoLeadOptions = {
  leadSource?: string; // Defaults to "Website"
  redirectUrl?: string; // Defaults to `${origin}/thank-you`
  serviceParam?: string; // optional param appended as hidden input named `service`
};

export const submitZohoLead = (data: ZohoLeadData, options: SubmitZohoLeadOptions = {}) => {
  if (typeof window === "undefined") return;

  const form = document.createElement("form");
  form.method = "POST";
  form.action = ZOHO_WEB_TO_LEAD_ENDPOINT;
  form.acceptCharset = "UTF-8";

  const add = (name: string, value: string) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  };

  // Required Zoho keys
  add("xnQsjsdp", ZOHO_KEYS.xnQsjsdp);
  add("xmIwtLD", ZOHO_KEYS.xmIwtLD);
  add("actionType", ZOHO_KEYS.actionType);
  add("zc_gad", "");

  // Redirect back to our site after submission
  const origin = window.location.origin;
  add("returnURL", options.redirectUrl || `${origin}/thank-you`);

  // Lead source
  add("Lead Source", options.leadSource || data["Lead Source"] || "Website");

  // Standard fields
  add("Company", data.Company);
  add("First Name", data["First Name"]);
  add("Last Name", data["Last Name"]);
  add("Email", data.Email);
  add("Phone", data.Phone);
  add("City", data.City);
  add("State", data.State);
  add("Zip Code", data["Zip Code"]);
  add("Country", data.Country);

  // Custom picklists
  add("LEADCF3", data.LEADCF3);
  add("LEADCF2", data.LEADCF2);
  add("LEADCF4", data.LEADCF4);

  if (data.Description) add("Description", data.Description);

  if (options.serviceParam) add("service", options.serviceParam);

  document.body.appendChild(form);
  form.submit();
  // No cleanup needed; navigation will occur.
};
