import { Navigation } from '@/components/Navigation';
import { IndividualPalPage } from '@/components/pals/IndividualPalPage';
import { getPalById } from '@/lib/palsData';
import { MetaTags } from '@/components/seo/MetaTags';

export default function SystemPal() {
  const pal = getPalById('system-pal');
  
  if (!pal) {
    return <div>Pal not found</div>;
  }

  return (
    <>
      <MetaTags
        title="System Pal - Business Systems Video Expert | Palmer House Productions"
        description="Meet System Pal, your business systems video expert. Specializing in training videos, process documentation, and scalable video systems."
        keywords="training videos, business systems, process documentation, employee onboarding, video training, workflow optimization"
      />
      <Navigation />
      <IndividualPalPage pal={pal} />
    </>
  );
}