import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Share2, Mail, Calendar, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ResultsExportProps {
  assessmentType: string;
  score: number;
  level: string;
  recommendations: string[];
  businessContext?: any;
  onScheduleConsultation?: () => void;
}

export const ResultsExport = ({ 
  assessmentType, 
  score, 
  level, 
  recommendations, 
  businessContext,
  onScheduleConsultation 
}: ResultsExportProps) => {
  
  const generatePDFContent = () => {
    const content = `
Video Marketing Assessment Results
Assessment Type: ${assessmentType}
Score: ${score}%
Readiness Level: ${level}

Key Recommendations:
${recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

Generated on: ${new Date().toLocaleDateString()}
    `.trim();
    
    return content;
  };

  const handleDownloadPDF = () => {
    const content = generatePDFContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${assessmentType}-results-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Results Downloaded",
      description: "Your assessment results have been downloaded successfully.",
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: `My ${assessmentType} Results`,
      text: `I scored ${score}% on my video marketing assessment!`,
      url: window.location.href
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        toast({
          title: "Shared Successfully",
          description: "Your results have been shared.",
        });
      } catch (error) {
        // Fallback to copy to clipboard
        copyToClipboard(shareData.url);
      }
    } else {
      copyToClipboard(window.location.href);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Link Copied",
        description: "Assessment link copied to clipboard.",
      });
    });
  };

  const handleEmailResults = () => {
    const subject = encodeURIComponent(`My ${assessmentType} Results`);
    const body = encodeURIComponent(generatePDFContent());
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    window.open(mailtoLink);
  };

  const handleBookConsultation = () => {
    if (onScheduleConsultation) {
      onScheduleConsultation();
    } else {
      // Fallback to external calendar link
      window.open('https://calendly.com/your-calendar', '_blank');
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Share & Save Your Results
        </CardTitle>
        <CardDescription>
          Keep your assessment results for future reference or share with your team.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownloadPDF}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleShare}
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleEmailResults}
            className="flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            Email
          </Button>
          
          <Button 
            size="sm" 
            onClick={handleBookConsultation}
            className="flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            Book Call
          </Button>
        </div>

        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Assessment Summary</h4>
              <p className="text-sm text-muted-foreground">
                Score: {score}% • Level: {level}
              </p>
            </div>
            <Badge variant="outline">
              {new Date().toLocaleDateString()}
            </Badge>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Want a detailed strategy session based on these results?
          </p>
          <Button onClick={handleBookConsultation} className="w-full">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Free 30-Min Strategy Call
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};