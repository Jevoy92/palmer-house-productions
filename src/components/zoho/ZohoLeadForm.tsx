import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitZohoLead, ZohoLeadData } from "@/lib/zohoWebToLead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackContactFormSubmit, trackConversion } from "@/lib/analytics";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


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
  "Post-Production Only",
  "The 7 - Day :Launch",
  "The Founder's Brand Kit",
  "The Started Session",
  "YouTube Visibility Engine",
];

const PROJECT_TYPE_INFO: Record<string, string> = {
  "30 Reels in 30 Days": "Done-with-you short-form content sprint to build momentum fast.",
  "Coaching": "1:1 or team coaching on content strategy, on-camera performance, and systems.",
  "Commercial/Advertisement": "Scripted promotional video for campaigns and paid distribution.",
  "Corporate Video": "Company story, recruiting, training, or internal communications.",
  "External FAQ Buildout": "Answer buyer questions at scale with trust-building FAQ videos.",
  "Internal FAQ Buildout": "Document processes and onboard faster with evergreen internal videos.",
  "Monthly Content System": "Ongoing content engine: plan, produce, edit, and publish each month.",
  "Post-Production Only": "Editing and finishing for footage you already have.",
  "The 7 - Day :Launch": "Rapid go-to-market package to launch an offer in a week.",
  "The Founder's Brand Kit": "Evergreen founder story + signature content pillars.",
  "The Started Session": "Half-day focused session to unlock clarity and next steps.",
  "YouTube Visibility Engine": "YouTube strategy, production, and SEO to grow discoverability.",
  "Not sure yet": "Tell us about your goals and constraints — we'll recommend the best fit.",
};

const NOT_SURE_OPTION = "Not sure yet";

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
    projectType: defaultProjectType || NOT_SURE_OPTION,
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
          <Select
            value={form.projectType}
            onValueChange={(val) => setForm({ ...form, projectType: val })}
          >
            <SelectTrigger className="mt-1 w-full min-h-[44px]">
              <SelectValue placeholder="I'm not sure yet" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-background">
              <SelectItem value={NOT_SURE_OPTION}>
                <span className="truncate">Not sure yet</span>
              </SelectItem>
              {PROJECT_TYPES.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  <span className="truncate">{opt}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="mt-2">
            <p className="text-sm text-muted-foreground">
              {form.projectType
                ? PROJECT_TYPE_INFO[form.projectType] || "We’ll help you choose the best fit."
                : "Not sure? Pick “Not sure yet” and we’ll recommend the best fit."}
            </p>
          </div>
        </div>
        <div>
          <Label htmlFor="budget">Budget</Label>
          <Select value={form.budget} onValueChange={(val) => setForm({ ...form, budget: val })}>
            <SelectTrigger className="mt-1 w-full min-h-[44px]">
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>
            <SelectContent className="z-50">
              {BUDGETS.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="timeline">Timeline</Label>
          <Select value={form.timeline} onValueChange={(val) => setForm({ ...form, timeline: val })}>
            <SelectTrigger className="mt-1 w-full min-h-[44px]">
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent className="z-50">
              {TIMELINES.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Compare options trigger centered below the selects */}
      <div className="-mt-2 mb-2">
        <div className="w-full flex items-center justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" variant="ghost" className="text-primary min-h-[44px]">
                Compare options
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[min(100vw-2rem,80rem)] sm:max-w-2xl lg:max-w-5xl">
              <DialogHeader>
                <DialogTitle>Compare project options</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto">
                {PROJECT_TYPES.map((opt) => (
                  <div key={opt} className="p-4 rounded-lg border border-border bg-card">
                    <div className="font-semibold">{opt}</div>
                    <div className="text-muted-foreground text-sm">{PROJECT_TYPE_INFO[opt]}</div>
                  </div>
                ))}
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="font-semibold">Not sure yet</div>
                  <div className="text-muted-foreground text-sm">{PROJECT_TYPE_INFO["Not sure yet"]}</div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
