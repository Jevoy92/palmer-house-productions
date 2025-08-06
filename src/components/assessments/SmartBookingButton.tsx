import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, ArrowRight } from "lucide-react";
import { BookingPreparation } from "./BookingPreparation";

interface SmartBookingButtonProps {
  assessmentType: string;
  score: number;
  level: string;
  recommendations: string[];
  businessContext?: any;
  onDownloadResults?: () => void;
  buttonText?: string;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "secondary";
}

export const SmartBookingButton = ({
  assessmentType,
  score,
  level,
  recommendations,
  businessContext,
  onDownloadResults,
  buttonText,
  size = "default",
  variant = "default"
}: SmartBookingButtonProps) => {
  const [showBookingPrep, setShowBookingPrep] = useState(false);

  const handleOpenBooking = () => {
    setShowBookingPrep(true);
  };

  const callType = score >= 75 ? "Discovery" : "Strategy";
  const defaultButtonText = buttonText || `Book ${callType} Call`;

  return (
    <>
      <Button 
        onClick={handleOpenBooking}
        size={size}
        variant={variant}
        className="flex items-center gap-2"
      >
        <Calendar className="h-4 w-4" />
        {defaultButtonText}
        <ArrowRight className="h-4 w-4" />
      </Button>

      <Dialog open={showBookingPrep} onOpenChange={setShowBookingPrep}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sr-only">
            <DialogTitle>Book Your Call</DialogTitle>
          </DialogHeader>
          <BookingPreparation
            assessmentType={assessmentType}
            score={score}
            level={level}
            recommendations={recommendations}
            businessContext={businessContext}
            onDownloadResults={onDownloadResults}
            onBack={() => setShowBookingPrep(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};