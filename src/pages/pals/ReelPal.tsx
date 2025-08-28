import { Navigation } from '@/components/Navigation';
import { IndividualPalPage } from '@/components/pals/IndividualPalPage';
import { getPalById } from '@/lib/palsData';
import { MetaTags } from '@/components/seo/MetaTags';

export default function ReelPal() {
  const pal = getPalById('reel-pal');
  
  if (!pal) {
    return <div>Pal not found</div>;
  }

  return (
    <>
      <MetaTags
        title="Reel Pal - Social Media Video Expert | Palmer House Productions"
        description="Meet Reel Pal, your social media video expert. Specializing in short-form content, TikToks, Reels, and viral video strategies that stop the scroll."
        keywords="social media video, TikTok creation, Instagram Reels, short-form content, viral videos, social media marketing"
      />
      <Navigation />
      <IndividualPalPage pal={pal} />
    </>
  );
}