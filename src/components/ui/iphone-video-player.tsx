import { useRef, useState } from 'react';

interface IPhoneVideoPlayerProps {
  videoSrc?: string;
  imageSrc?: string;
  alt: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export const IPhoneVideoPlayer = ({
  videoSrc,
  imageSrc,
  alt,
  autoplay = true,
  loop = true,
  muted = true,
}: IPhoneVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* iPhone Device Frame */}
      <div className="relative bg-[#1a1a1a] rounded-[45px] p-2 shadow-2xl">
        {/* Screen Bezel */}
        <div className="relative bg-black rounded-[37px] overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-10" />
          
          {/* Video/Image Container */}
          <div className="relative aspect-[9/19.5] bg-black">
            {videoSrc ? (
              <video
                ref={videoRef}
                src={videoSrc}
                autoPlay={autoplay}
                loop={loop}
                muted={muted}
                playsInline
                className="w-full h-full object-cover"
                aria-label={alt}
                onClick={handlePlayPause}
              />
            ) : imageSrc ? (
              <img
                src={imageSrc}
                alt={alt}
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>
        </div>

        {/* Side Buttons */}
        <div className="absolute left-0 top-[20%] w-1 h-12 bg-[#0a0a0a] rounded-r-sm" />
        <div className="absolute left-0 top-[30%] w-1 h-16 bg-[#0a0a0a] rounded-r-sm" />
        <div className="absolute left-0 top-[42%] w-1 h-16 bg-[#0a0a0a] rounded-r-sm" />
        <div className="absolute right-0 top-[25%] w-1 h-20 bg-[#0a0a0a] rounded-l-sm" />
      </div>

      {/* Reflection Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[45px] pointer-events-none" />
    </div>
  );
};
