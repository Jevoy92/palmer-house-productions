// Video Generation API client
// This would connect to a backend service that uses Remotion to render videos

export interface VideoGenerationRequest {
  template: 'faq-video' | 'social-reel' | 'founder-video';
  props: Record<string, any>;
  outputFormat?: 'mp4' | 'webm';
  quality?: 'low' | 'medium' | 'high';
}

export interface VideoGenerationResponse {
  success: boolean;
  jobId: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  downloadUrl?: string;
  thumbnailUrl?: string;
  duration?: number;
  error?: string;
}

export interface VideoGenerationStatus {
  jobId: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number; // 0-100
  estimatedTimeRemaining?: number; // seconds
  downloadUrl?: string;
  thumbnailUrl?: string;
  error?: string;
}

// Mock API functions - these would call your actual backend service
export class VideoGenerationAPI {
  private static baseUrl = '/api/video-generation'; // This would be your actual API endpoint

  static async generateVideo(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
    try {
      // This would be an actual API call to your backend
      // For now, we'll simulate the response
      console.log('Generating video with request:', request);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      return {
        success: true,
        jobId,
        status: 'queued'
      };
    } catch (error) {
      console.error('Video generation failed:', error);
      return {
        success: false,
        jobId: '',
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  static async getVideoStatus(jobId: string): Promise<VideoGenerationStatus> {
    try {
      // This would be an actual API call to check status
      console.log('Checking status for job:', jobId);
      
      // Simulate different states based on job age
      const jobTimestamp = parseInt(jobId.split('_')[1]);
      const ageInSeconds = (Date.now() - jobTimestamp) / 1000;
      
      if (ageInSeconds < 5) {
        return {
          jobId,
          status: 'queued',
          progress: 0
        };
      } else if (ageInSeconds < 30) {
        const progress = Math.min(95, (ageInSeconds - 5) / 25 * 100);
        return {
          jobId,
          status: 'processing',
          progress,
          estimatedTimeRemaining: Math.max(0, 30 - ageInSeconds)
        };
      } else {
        return {
          jobId,
          status: 'completed',
          progress: 100,
          downloadUrl: `https://example.com/videos/${jobId}.mp4`,
          thumbnailUrl: `https://example.com/thumbnails/${jobId}.jpg`
        };
      }
    } catch (error) {
      console.error('Status check failed:', error);
      return {
        jobId,
        status: 'failed',
        progress: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  static async getPreviewUrl(template: string, props: Record<string, any>): Promise<string> {
    // This would generate a preview URL for the Remotion player
    const encodedProps = encodeURIComponent(JSON.stringify(props));
    return `http://localhost:3000/remotion/preview?composition=${template}&props=${encodedProps}`;
  }
}

// Hook for video generation with status polling
export const useVideoGeneration = () => {
  const generateVideo = async (request: VideoGenerationRequest) => {
    const response = await VideoGenerationAPI.generateVideo(request);
    
    if (!response.success) {
      throw new Error(response.error || 'Video generation failed');
    }
    
    return response;
  };

  const pollStatus = async (jobId: string, onProgress?: (status: VideoGenerationStatus) => void) => {
    const pollInterval = 2000; // 2 seconds
    
    return new Promise<VideoGenerationStatus>((resolve, reject) => {
      const poll = async () => {
        try {
          const status = await VideoGenerationAPI.getVideoStatus(jobId);
          
          if (onProgress) {
            onProgress(status);
          }
          
          if (status.status === 'completed') {
            resolve(status);
          } else if (status.status === 'failed') {
            reject(new Error(status.error || 'Video generation failed'));
          } else {
            setTimeout(poll, pollInterval);
          }
        } catch (error) {
          reject(error);
        }
      };
      
      poll();
    });
  };

  return {
    generateVideo,
    pollStatus,
    getPreviewUrl: VideoGenerationAPI.getPreviewUrl
  };
};