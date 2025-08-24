import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, ExternalLink, CheckCircle, XCircle, Clock } from "lucide-react";
import { useVideoGeneration, VideoGenerationRequest, VideoGenerationStatus } from '@/lib/videoGeneration';

interface VideoGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: VideoGenerationRequest | null;
}

export const VideoGenerationModal: React.FC<VideoGenerationModalProps> = ({
  isOpen,
  onClose,
  request
}) => {
  const [status, setStatus] = useState<VideoGenerationStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { generateVideo, pollStatus } = useVideoGeneration();

  useEffect(() => {
    if (isOpen && request) {
      handleGeneration();
    }
  }, [isOpen, request]);

  const handleGeneration = async () => {
    if (!request) return;

    try {
      setError(null);
      setStatus(null);

      // Start video generation
      const response = await generateVideo(request);
      
      // Start polling for status updates
      await pollStatus(response.jobId, (currentStatus) => {
        setStatus(currentStatus);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    }
  };

  const handleDownload = () => {
    if (status?.downloadUrl) {
      window.open(status.downloadUrl, '_blank');
    }
  };

  const handleClose = () => {
    setStatus(null);
    setError(null);
    onClose();
  };

  const getStatusIcon = () => {
    if (error) return <XCircle className="w-5 h-5 text-destructive" />;
    if (!status) return <Clock className="w-5 h-5 text-muted-foreground" />;
    
    switch (status.status) {
      case 'queued':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'processing':
        return <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusText = () => {
    if (error) return 'Generation Failed';
    if (!status) return 'Initializing...';
    
    switch (status.status) {
      case 'queued':
        return 'Queued for Processing';
      case 'processing':
        return 'Generating Video...';
      case 'completed':
        return 'Video Ready!';
      case 'failed':
        return 'Generation Failed';
      default:
        return 'Unknown Status';
    }
  };

  const getTemplateDisplayName = (template: string) => {
    switch (template) {
      case 'faq-video':
        return 'FAQ Video';
      case 'social-reel':
        return 'Social Media Reel';
      case 'founder-video':
        return 'Founder Story';
      default:
        return template;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getStatusIcon()}
            Video Generation
          </DialogTitle>
          <DialogDescription>
            {request && `Generating ${getTemplateDisplayName(request.template)}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status */}
          <div className="text-center">
            <p className="text-lg font-semibold">{getStatusText()}</p>
            {status?.estimatedTimeRemaining && (
              <p className="text-sm text-muted-foreground">
                Est. {Math.ceil(status.estimatedTimeRemaining)}s remaining
              </p>
            )}
          </div>

          {/* Progress Bar */}
          {status && status.status !== 'failed' && (
            <div className="space-y-2">
              <Progress value={status.progress} className="w-full" />
              <p className="text-sm text-center text-muted-foreground">
                {Math.round(status.progress)}% complete
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive font-medium">Error:</p>
              <p className="text-sm text-destructive/80">{error}</p>
            </div>
          )}

          {/* Success State */}
          {status?.status === 'completed' && (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <p className="font-medium text-green-800">Video Generated Successfully!</p>
                </div>
                <p className="text-sm text-green-700">
                  Your video has been generated and is ready for download.
                </p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-3">
                <Button onClick={handleDownload} className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Video
                </Button>
                {status.thumbnailUrl && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(status.thumbnailUrl, '_blank')}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Preview
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Processing State Info */}
          {status && ['queued', 'processing'].includes(status.status) && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                Your video is being generated. This usually takes 30-60 seconds depending on length and complexity.
              </p>
            </div>
          )}

          {/* Close Button */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={status?.status === 'processing'}
            >
              {status?.status === 'processing' ? 'Generating...' : 'Close'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};