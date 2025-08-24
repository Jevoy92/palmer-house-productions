import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';

export interface FAQVideoProps extends Record<string, unknown> {
  question: string;
  answer: string;
  brandColor: string;
  logo?: string;
}

export const FAQVideo: React.FC<FAQVideoProps> = ({
  question,
  answer,
  brandColor,
  logo,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Animation values
  const questionOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const answerOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const questionScale = interpolate(frame, [0, 30], [0.8, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${brandColor}15, ${brandColor}05)`,
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
            right: '60px',
            width: '100px',
            height: '100px',
          }}
        >
          <img src={logo} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      )}

      {/* Question */}
      <Sequence from={0} durationInFrames={durationInFrames}>
        <div
          style={{
            opacity: questionOpacity,
            transform: `scale(${questionScale})`,
            textAlign: 'center',
            marginBottom: '60px',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: brandColor,
              marginBottom: '20px',
              lineHeight: '1.2',
            }}
          >
            FAQ
          </h1>
          <h2
            style={{
              fontSize: '48px',
              fontWeight: '600',
              color: '#1f2937',
              lineHeight: '1.3',
              maxWidth: '1200px',
            }}
          >
            {question}
          </h2>
        </div>
      </Sequence>

      {/* Answer */}
      <Sequence from={60} durationInFrames={durationInFrames - 60}>
        <div
          style={{
            opacity: answerOpacity,
            textAlign: 'center',
            maxWidth: '1400px',
          }}
        >
          <p
            style={{
              fontSize: '36px',
              color: '#4b5563',
              lineHeight: '1.5',
              fontWeight: '400',
            }}
          >
            {answer}
          </p>
        </div>
      </Sequence>

      {/* Palmer House Productions watermark */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '60px',
          color: '#9ca3af',
          fontSize: '24px',
          fontWeight: '500',
        }}
      >
        Palmer House Productions
      </div>
    </AbsoluteFill>
  );
};