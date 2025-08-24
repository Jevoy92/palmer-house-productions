import React from 'react';
import { Composition } from 'remotion';
import { FAQVideo, FAQVideoProps } from './templates/FAQVideo';
import { SocialReelVideo, SocialReelVideoProps } from './templates/SocialReelVideo';
import { FounderVideo, FounderVideoProps } from './templates/FounderVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="faq-video"
        component={FAQVideo}
        durationInFrames={900} // 30 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          question: "How do we handle client revisions?",
          answer: "We provide up to 3 rounds of revisions included in all our packages, with clear feedback forms to streamline the process.",
          brandColor: "#3B82F6",
          logo: ""
        }}
      />
      <Composition
        id="social-reel"
        component={SocialReelVideo}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          title: "5 Tips for Better Videos",
          tips: [
            "Plan your content",
            "Use good lighting",
            "Record clear audio",
            "Keep it concise",
            "Add captions"
          ],
          brandColor: "#3B82F6",
          logo: ""
        }}
      />
      <Composition
        id="founder-video"
        component={FounderVideo}
        durationInFrames={1800} // 60 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          founderName: "John Smith",
          companyName: "Your Company",
          tagline: "Transforming businesses through video",
          story: "I started this company to help businesses tell their stories through compelling video content.",
          brandColor: "#3B82F6",
          logo: ""
        }}
      />
    </>
  );
};