
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WizardData } from "./types";
import { CheckCircle, Mail, Phone, Clock, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import confetti from "canvas-confetti";

interface ThankYouStepProps {
  data: WizardData;
  onClose: () => void;
  onNewInquiry: () => void;
}

export const ThankYouStep = ({ data, onClose, onNewInquiry }: ThankYouStepProps) => {
  useEffect(() => {
    // Trigger confetti when component mounts
    const triggerConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Second burst after a short delay
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      }, 300);
    };

    triggerConfetti();
  }, []);

  return (
    <div className="p-8 max-w-3xl mx-auto text-center">
      {/* Success Animation */}
      <div className="mb-8">
        <div className="w-20 h-20 mx-auto mb-6 relative">
          <CheckCircle className="w-20 h-20 text-social-green animate-pulse" />
        </div>
        <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
          Thank You, <span className="text-gradient-1">{data.firstName}</span>! ✨
        </h2>
        <p className="text-xl text-corporate-gray max-w-2xl mx-auto">
          Your project inquiry has been successfully submitted. We're excited to help bring your vision to life!
        </p>
      </div>

      {/* What Happens Next */}
      <Card className="bg-video-white border-0 video-shadow-lg mb-8">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-corporate-dark mb-6">What Happens Next?</h3>
          
          <div className="grid gap-6">
            <div className="flex items-start gap-4 text-left">
              <div className="w-8 h-8 rounded-full gradient-social-1 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-bold text-corporate-dark mb-1">We Review Your Inquiry</h4>
                <p className="text-corporate-gray">Our team will carefully review your project details and requirements.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 text-left">
              <div className="w-8 h-8 rounded-full gradient-social-1 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-bold text-corporate-dark mb-1">We'll Contact You Within 24 Hours</h4>
                <p className="text-corporate-gray">Expect a personalized response with next steps and any clarifying questions.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 text-left">
              <div className="w-8 h-8 rounded-full gradient-social-1 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-bold text-corporate-dark mb-1">Let's Create Something Amazing</h4>
                <p className="text-corporate-gray">We'll work together to turn your vision into reality with our expert team.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-corporate-light border-0 hover:video-shadow transition-all duration-300">
          <CardContent className="p-4 text-center">
            <Mail className="w-6 h-6 mx-auto mb-2 text-corporate-dark" />
            <h4 className="font-bold text-corporate-dark text-sm mb-1">Email</h4>
            <p className="text-corporate-gray text-xs">info@palmerhouseproductions.com</p>
          </CardContent>
        </Card>
        
        <Card className="bg-corporate-light border-0 hover:video-shadow transition-all duration-300">
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 mx-auto mb-2 text-corporate-dark" />
            <h4 className="font-bold text-corporate-dark text-sm mb-1">Response Time</h4>
            <p className="text-corporate-gray text-xs">Within 24 hours</p>
          </CardContent>
        </Card>
        
        <Card className="bg-corporate-light border-0 hover:video-shadow transition-all duration-300">
          <CardContent className="p-4 text-center">
            <Phone className="w-6 h-6 mx-auto mb-2 text-corporate-dark" />
            <h4 className="font-bold text-corporate-dark text-sm mb-1">Follow Up</h4>
            <p className="text-corporate-gray text-xs">Personalized consultation</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Button
            onClick={onNewInquiry}
            className="gradient-social-1 text-white font-bold py-3 hover:scale-105 transition-all duration-300"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Start New Inquiry
          </Button>
          
          <Button
            onClick={onClose}
            variant="outline"
            className="border-2 border-corporate-dark text-corporate-dark hover:bg-corporate-dark hover:text-white font-bold py-3 transition-all duration-300"
          >
            Close
          </Button>
        </div>
        
        <p className="text-sm text-corporate-gray">
          Keep an eye on your inbox for our response!
        </p>
      </div>
    </div>
  );
};
