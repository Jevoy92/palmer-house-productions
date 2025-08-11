import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Star, Timer, MessageSquare } from "lucide-react";

export const TrustSidebar = () => {
  return (
    <Card className="border-0 video-shadow">
      <CardHeader className="p-4 sm:p-6 pb-3">
        <CardTitle className="text-base sm:text-lg text-corporate-dark">You're in good hands</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <Star className="w-5 h-5 text-primary mt-0.5" aria-hidden="true" />
            <div>
              <div className="font-medium text-corporate-dark">Proven results</div>
              <p className="text-muted-foreground">Dozens of 5-star client reviews and repeat engagements.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Timer className="w-5 h-5 text-primary mt-0.5" aria-hidden="true" />
            <div>
              <div className="font-medium text-corporate-dark">Fast response</div>
              <p className="text-muted-foreground">We typically reply within one business day.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-primary mt-0.5" aria-hidden="true" />
            <div>
              <div className="font-medium text-corporate-dark">Secure & private</div>
              <p className="text-muted-foreground">Your details are kept confidential and never shared.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-primary mt-0.5" aria-hidden="true" />
            <div>
              <div className="font-medium text-corporate-dark">Clear next steps</div>
              <p className="text-muted-foreground">We’ll align on goals and recommend the right path for you.</p>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default TrustSidebar;
