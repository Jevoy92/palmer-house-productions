import { Navigation } from '@/components/Navigation';
import { IndividualPalPage } from '@/components/pals/IndividualPalPage';
import { getPalById } from '@/lib/palsData';
import { MetaTags } from '@/components/seo/MetaTags';

export default function EvergreenPal() {
  const pal = getPalById('evergreen-pal');
  
  if (!pal) {
    return <div>Pal not found</div>;
  }

  return (
    <>
      <MetaTags
        title="Evergreen Pal - Long-term Content Expert | Palmer House Productions"
        description="Meet Evergreen Pal, your long-term content expert. Specializing in YouTube development, authority content, and evergreen video strategies."
        keywords="YouTube marketing, evergreen content, authority building, educational videos, thought leadership, content strategy"
      />
      <Navigation />
      <IndividualPalPage pal={pal} />
    </>
  );
}