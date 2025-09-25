import { useEffect, useRef, useState } from 'react';
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

interface VideoBackgroundRemoverProps {
  src: string;
  className?: string;
  width?: number;
  height?: number;
  isVisible?: boolean;
}

const MAX_DIMENSION = 512; // Smaller for better performance with video frames

export const VideoBackgroundRemover = ({ 
  src, 
  className = "", 
  width = 320, 
  height = 320,
  isVisible = false 
}: VideoBackgroundRemoverProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const outputCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [segmenter, setSegmenter] = useState<any>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const animationRef = useRef<number>();

  // Load the segmentation model
  useEffect(() => {
    const loadModel = async () => {
      try {
        console.log('Loading background removal model...');
        const model = await pipeline(
          'image-segmentation', 
          'Xenova/segformer-b0-finetuned-ade-512-512',
          { device: 'webgpu' }
        );
        setSegmenter(model);
        setIsModelLoaded(true);
        console.log('Model loaded successfully');
      } catch (error) {
        console.error('Error loading model:', error);
        // Fallback to CPU if WebGPU fails
        try {
          const model = await pipeline(
            'image-segmentation', 
            'Xenova/segformer-b0-finetuned-ade-512-512'
          );
          setSegmenter(model);
          setIsModelLoaded(true);
          console.log('Model loaded on CPU');
        } catch (fallbackError) {
          console.error('Failed to load model on CPU:', fallbackError);
        }
      }
    };

    loadModel();
  }, []);

  // Process video frames
  const processFrame = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const outputCanvas = outputCanvasRef.current;
    
    if (!video || !canvas || !outputCanvas || !segmenter || !isModelLoaded) {
      return;
    }

    const ctx = canvas.getContext('2d');
    const outputCtx = outputCanvas.getContext('2d');
    
    if (!ctx || !outputCtx) return;

    try {
      // Set canvas dimensions
      const aspectRatio = video.videoWidth / video.videoHeight;
      let canvasWidth = Math.min(MAX_DIMENSION, video.videoWidth);
      let canvasHeight = canvasWidth / aspectRatio;
      
      if (canvasHeight > MAX_DIMENSION) {
        canvasHeight = MAX_DIMENSION;
        canvasWidth = canvasHeight * aspectRatio;
      }

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      outputCanvas.width = width;
      outputCanvas.height = height;

      // Draw current frame to canvas
      ctx.drawImage(video, 0, 0, canvasWidth, canvasHeight);
      
      // Get image data
      const imageData = canvas.toDataURL('image/jpeg', 0.6);
      
      // Process with AI model (throttled for performance)
      if (!isProcessing) {
        setIsProcessing(true);
        
        try {
          const result = await segmenter(imageData);
          
          if (result && Array.isArray(result) && result[0]?.mask) {
            // Clear output canvas
            outputCtx.clearRect(0, 0, width, height);
            
            // Draw original frame scaled to output size
            outputCtx.drawImage(video, 0, 0, width, height);
            
            // Create temporary canvas for mask processing
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvasWidth;
            tempCanvas.height = canvasHeight;
            const tempCtx = tempCanvas.getContext('2d');
            
            if (tempCtx) {
              // Draw frame to temp canvas
              tempCtx.drawImage(video, 0, 0, canvasWidth, canvasHeight);
              const frameData = tempCtx.getImageData(0, 0, canvasWidth, canvasHeight);
              
              // Apply mask
              for (let i = 0; i < result[0].mask.data.length; i++) {
                // Keep subject (invert mask), remove background
                const alpha = Math.round((1 - result[0].mask.data[i]) * 255);
                frameData.data[i * 4 + 3] = alpha;
              }
              
              tempCtx.putImageData(frameData, 0, 0);
              
              // Draw processed frame to output canvas
              outputCtx.clearRect(0, 0, width, height);
              outputCtx.drawImage(tempCanvas, 0, 0, width, height);
            }
          }
        } catch (error) {
          console.error('Frame processing error:', error);
          // Fallback: draw original frame
          outputCtx.drawImage(video, 0, 0, width, height);
        }
        
        setIsProcessing(false);
      } else {
        // While processing, just draw the original frame
        outputCtx.drawImage(video, 0, 0, width, height);
      }
    } catch (error) {
      console.error('Frame drawing error:', error);
    }

    // Continue animation loop if video is playing and visible
    if (video && !video.paused && isVisible) {
      animationRef.current = requestAnimationFrame(processFrame);
    }
  };

  // Handle video play/pause
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      if (isVisible && segmenter) {
        animationRef.current = requestAnimationFrame(processFrame);
      }
    };

    const handlePause = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, segmenter, isModelLoaded]);

  // Start/stop processing when visibility changes
  useEffect(() => {
    const video = videoRef.current;
    if (video && !video.paused && isVisible && segmenter && isModelLoaded) {
      animationRef.current = requestAnimationFrame(processFrame);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, isModelLoaded]);

  return (
    <div className={`relative ${className}`}>
      {/* Hidden original video */}
      <video
        ref={videoRef}
        className="absolute opacity-0 pointer-events-none"
        loop
        muted
        playsInline
        preload="metadata"
        crossOrigin="anonymous"
      >
        <source src={src} type="video/webm" />
      </video>

      {/* Hidden processing canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Visible output canvas with transparent background */}
      <canvas
        ref={outputCanvasRef}
        className="rounded-3xl"
        width={width}
        height={height}
      />

      {/* Loading indicator */}
      {!isModelLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-3xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pal-purple mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Loading AI model...</p>
          </div>
        </div>
      )}
    </div>
  );
};
