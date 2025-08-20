
import { Navigation } from "@/components/Navigation";
import { Team } from "@/components/Team";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-cinematic-charcoal">
      <MetaTags 
        title="Our Team | Palmer House Productions | Video Production Experts"
        description="Meet the professional video production team at Palmer House Productions. Expert cinematographers, editors, and content strategists dedicated to creating impactful business videos."
        keywords="Palmer House Productions team, video production experts, professional videographers, content creation team, Seattle video production"
        ogTitle="Our Team | Palmer House Productions"
        ogDescription="Meet our professional video production team of experts and content strategists."
        canonicalUrl="https://www.palmerhouseproductions.com/team"
      />
      <StructuredData type="about" />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />
      <MainContent>
        <section className="pt-24 pb-16 bg-cinematic-charcoal/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-display font-black mb-8 text-video-white tracking-tight text-center">
              Meet Our <span className="text-gradient-1">Expert Team</span>
            </h1>
            <p className="text-xl text-video-white/80 text-center max-w-4xl mx-auto mb-16 leading-relaxed">
              Our team of video production specialists, content strategists, and creative professionals 
              work together to deliver exceptional results for your business. Each team member brings 
              unique expertise in cinematography, editing, storytelling, and business strategy.
            </p>
          </div>
        </section>
        <Team />
        
        <section className="py-16 bg-white/5 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-display font-black mb-8 text-video-white text-center">
              Why Our Team Approach Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white/5 rounded-xl video-shadow">
                <div className="w-16 h-16 bg-gradient-social-1 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">⚡</span>
                </div>
                <h3 className="text-xl font-display font-bold mb-3 text-video-white">Collaborative Process</h3>
                <p className="text-video-white/80">Each project benefits from our collective expertise, ensuring every video meets the highest standards.</p>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-xl video-shadow">
                <div className="w-16 h-16 bg-gradient-social-2 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">🎯</span>
                </div>
                <h3 className="text-xl font-display font-bold mb-3 text-video-white">Strategic Focus</h3>
                <p className="text-video-white/80">We combine creative vision with business strategy to create videos that drive real results.</p>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-xl video-shadow">
                <div className="w-16 h-16 bg-gradient-social-3 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">📈</span>
                </div>
                <h3 className="text-xl font-display font-bold mb-3 text-video-white">Proven Results</h3>
                <p className="text-video-white/80">Our track record speaks for itself - helping businesses grow through powerful video content.</p>
              </div>
            </div>
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default TeamPage;
