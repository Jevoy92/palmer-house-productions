import { Navigation } from '@/components/Navigation';
import { IndividualPalPage } from '@/components/pals/IndividualPalPage';
import { getPalById } from '@/lib/palsData';
import { MetaTags } from '@/components/seo/MetaTags';

export default function SpotlightPal() {
  const pal = getPalById('spotlight-pal');
  
  if (!pal) {
    return <div>Pal not found</div>;
  }

  return (
    <>
      <MetaTags
        title="Spotlight Pal - Cinematic Storytelling Expert | Palmer House Productions"
        description="Meet Spotlight Pal, your cinematic storytelling expert. Specializing in brand films, commercials, and premium video production."
        keywords="cinematic video, brand storytelling, commercial production, premium video, brand films, high-end video production"
      />
      <Navigation />
      <IndividualPalPage pal={pal} />
    </>
  );
}