import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitZohoLead, ZohoLeadData } from "@/lib/zohoWebToLead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackContactFormSubmit, trackConversion } from "@/lib/analytics";

export type ZohoLeadFormProps = {
  title?: string;
  leadSource?: string; // e.g., "Website"
  defaultProjectType?: string; // Preselect LEADCF3
  compact?: boolean; // render without Card wrapper if true
};

const PROJECT_TYPES = [
  "30 Reels in 30 Days",
  "Coaching",
  "Commercial/Advertisement",
  "Corporate Video",
  "External FAQ Buildout",
  "Internal FAQ Buildout",
  "Monthly Content System",
  "Pos-Production Only",
  "The 7 - Day :Launch",
  "The Founder's Brand Kit",
  "The Started Session",
  "YouTube Visibility Engine",
];

const BUDGETS = [
  "Under $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "Unspecified",
];

const TIMELINES = [
  "Urgent (1-2 weeks)",
  "Standard (3-4 weeks)",
  "Extended (1-2 months)",
  "Flexible (2+ months)",
];

export const ZohoLeadForm = ({ title = "Start a Project", leadSource = "Website", defaultProjectType, compact }: ZohoLeadFormProps) => {
  const [form, setForm] = useState({
    company: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    projectType: defaultProjectType || "",
    budget: BUDGETS[0],
    timeline: "",
    description: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ZohoLeadData = {
      Company: form.company,
      "First Name": form.firstName,
      "Last Name": form.lastName,
      Email: form.email,
      Phone: form.phone,
      City: form.city,
      State: form.state,
      "Zip Code": form.zip,
      Country: form.country,
      LEADCF3: form.projectType,
      LEADCF2: form.budget,
      LEADCF4: form.timeline,
      Description: form.description,
      "Lead Source": leadSource,
    };

    try {
      trackContactFormSubmit("quick");
      trackConversion("contact_submit");
    } catch {}

    submitZohoLead(payload, { leadSource });
  };

  const FormInner = (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company">Company</Label>
          <Input id="company" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input id="state" required value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="zip">Zip Code</Label>
          <Input id="zip" required value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input id="country" required value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="projectType">Project Type</Label>
          <select
            id="projectType"
            required
            className="mt-1 w-full min-h-[44px] rounded-md border border-border bg-background px-3 py-2"
            value={form.projectType}
            onChange={(e) => setForm({ ...form, projectType: e.target.value })}
          >
            <option value="">-None-</option>
            {PROJECT_TYPES.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="budget">Budget</Label>
          <select
            id="budget"
            required
            className="mt-1 w-full min-h-[44px] rounded-md border border-border bg-background px-3 py-2"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
          >
            <option value="">-None-</option>
            {BUDGETS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="timeline">Timeline</Label>
          <select
            id="timeline"
            required
            className="mt-1 w-full min-h-[44px] rounded-md border border-border bg-background px-3 py-2"
            value={form.timeline}
            onChange={(e) => setForm({ ...form, timeline: e.target.value })}
          >
            <option value="">-None-</option>
            {TIMELINES.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={4}
          placeholder="Please provide additional details about your project..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <Button type="submit" className="w-full gradient-social-1 text-white min-h-[48px]">Submit Inquiry</Button>
    </form>
  );

  if (compact) return FormInner;

  return (
    <Card className="border-0 video-shadow">
      <CardHeader className="p-4 sm:p-6 pb-3">
        <CardTitle className="text-lg sm:text-xl text-corporate-dark">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">{FormInner}</CardContent>
    </Card>
  );
};

export default ZohoLeadForm;
