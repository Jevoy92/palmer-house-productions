import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';

export interface FounderVideoProps extends Record<string, unknown> {
  founderName: string;
  companyName: string;
  tagline: string;
  story: string;
  brandColor: string;
  logo?: string;
}

export const FounderVideo: React.FC<FounderVideoProps> = ({
  founderName,
  companyName,
  tagline,
  story,
  brandColor,
  logo,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const nameOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const taglineOpacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const storyOpacity = interpolate(frame, [180, 210], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #f8fafc, ${brandColor}10)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Logo */}
      {logo && (
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: '60px',
            width: '120px',
            height: '120px',
          }}
        >
          <img src={logo} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      )}

      {/* Meet the Founder */}
      <Sequence from={0} durationInFrames={90}>
        <div
          style={{
            opacity: titleOpacity,
            textAlign: 'center',
            marginBottom: '60px',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: brandColor,
              marginBottom: '20px',
            }}
          >
            Meet the Founder
          </h1>
        </div>
      </Sequence>

      {/* Founder Name */}
      <Sequence from={60} durationInFrames={durationInFrames - 60}>
        <div
          style={{
            opacity: nameOpacity,
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          <h2
            style={{
              fontSize: '64px',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '20px',
            }}
          >
            {founderName}
          </h2>
          <p
            style={{
              fontSize: '42px',
              color: '#6b7280',
              fontWeight: '500',
            }}
          >
            Founder of {companyName}
          </p>
        </div>
      </Sequence>

      {/* Tagline */}
      <Sequence from={120} durationInFrames={durationInFrames - 120}>
        <div
          style={{
            opacity: taglineOpacity,
            textAlign: 'center',
            marginBottom: '60px',
          }}
        >
          <p
            style={{
              fontSize: '48px',
              color: brandColor,
              fontWeight: '600',
              fontStyle: 'italic',
              maxWidth: '1200px',
              lineHeight: '1.3',
            }}
          >
            "{tagline}"
          </p>
        </div>
      </Sequence>

      {/* Story */}
      <Sequence from={180} durationInFrames={durationInFrames - 180}>
        <div
          style={{
            opacity: storyOpacity,
            textAlign: 'center',
            maxWidth: '1400px',
          }}
        >
          <p
            style={{
              fontSize: '36px',
              color: '#4b5563',
              lineHeight: '1.6',
              fontWeight: '400',
            }}
          >
            {story}
          </p>
        </div>
      </Sequence>

      {/* Call to Action */}
      <div
        style={{
          position: 'absolute',
          bottom: '60px',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <p
          style={{
            fontSize: '32px',
            color: brandColor,
            fontWeight: '600',
            marginBottom: '20px',
          }}
        >
          Ready to tell your story?
        </p>
        <p
          style={{
            fontSize: '24px',
            color: '#6b7280',
            fontWeight: '500',
          }}
        >
          Contact Palmer House Productions today
        </p>
      </div>
    </AbsoluteFill>
  );
};