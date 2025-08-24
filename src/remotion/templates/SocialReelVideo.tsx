import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';

export interface SocialReelVideoProps extends Record<string, unknown> {
  title: string;
  tips: string[];
  brandColor: string;
  logo?: string;
}

export const SocialReelVideo: React.FC<SocialReelVideoProps> = ({
  title,
  tips,
  brandColor,
  logo,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const titleScale = interpolate(frame, [0, 20], [0.9, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${brandColor}, ${brandColor}dd)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px 40px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Logo */}
      {logo && (
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '40px',
            width: '60px',
            height: '60px',
          }}
        >
          <img src={logo} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      )}

      {/* Title */}
      <Sequence from={0} durationInFrames={60}>
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            textAlign: 'center',
            marginBottom: '80px',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: 'white',
              textShadow: '0 4px 12px rgba(0,0,0,0.3)',
              lineHeight: '1.2',
            }}
          >
            {title}
          </h1>
        </div>
      </Sequence>

      {/* Tips */}
      {tips.map((tip, index) => {
        const startFrame = 60 + index * 30;
        const opacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
          extrapolateRight: 'clamp',
        });
        const scale = interpolate(frame, [startFrame, startFrame + 15], [0.8, 1], {
          extrapolateRight: 'clamp',
        });

        return (
          <Sequence key={index} from={startFrame} durationInFrames={90}>
            <div
              style={{
                opacity,
                transform: `scale(${scale})`,
                display: 'flex',
                alignItems: 'center',
                marginBottom: '40px',
                background: 'rgba(255,255,255,0.1)',
                padding: '30px',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                width: '100%',
                maxWidth: '800px',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '30px',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: brandColor,
                  }}
                >
                  {index + 1}
                </span>
              </div>
              <span
                style={{
                  fontSize: '36px',
                  color: 'white',
                  fontWeight: '600',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }}
              >
                {tip}
              </span>
            </div>
          </Sequence>
        );
      })}

      {/* Palmer House Productions watermark */}
      <div
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '40px',
          color: 'rgba(255,255,255,0.8)',
          fontSize: '20px',
          fontWeight: '500',
        }}
      >
        @PalmerHouseProductions
      </div>
    </AbsoluteFill>
  );
};