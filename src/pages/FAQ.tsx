import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Search } from "lucide-react";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { Navigation } from "@/components/Navigation";
import { StructuredData } from "@/components/seo/StructuredData";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { EnhancedFooter } from "@/components/seo/EnhancedFooter";
import { FAQSchema } from "@/components/seo/FAQSchema";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Update page title for better SEO
  useEffect(() => {
    document.title = "FAQ | Palmer House Productions";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Complete FAQ covering Palmer House Productions video content systems, pricing, processes, and services. Find answers to all your video production questions.');
    }
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "content-systems", label: "Content Systems" },
    { id: "internal-external", label: "Internal & External Video" },
    { id: "packages-pricing", label: "Packages & Pricing" },
    { id: "ownership-support", label: "Ownership & Support" },
    { id: "implementation", label: "Implementation" },
    { id: "measurement", label: "ROI & Results" },
    { id: "process", label: "Process & Next Steps" }
  ];

  const faqs = [
    // Content Systems & Strategy
    {
      category: "content-systems",
      question: "What is a video content system and why does my business need one?",
      answer: "A content system is a library of videos built around your key business challenges—onboarding, training, lead gen, and more—so you stop repeating yourself and start scaling smarter. It's about creating assets that save you time and money every month, not one-off content that fades into the ether."
    },
    {
      category: "content-systems",
      question: "How does your system approach save me money compared to traditional training or marketing?",
      answer: "You pay once, use forever. Our systems replace repeated meetings, PDF manuals, or scattered live trainings with evergreen, on-demand video that works for you 24/7, not just during business hours."
    },
    {
      category: "content-systems",
      question: "How do you determine which videos my business actually needs?",
      answer: "We don't guess. Every project starts with a discovery process to map your pain points—whether it's lead generation, onboarding, support, or process consistency. Then we design your system to target those problems, not just fill space."
    },
    {
      category: "content-systems",
      question: "What kinds of business problems can a video content system solve?",
      answer: "We tackle repetitive onboarding, inconsistent training, customer FAQs, sales objections, employee engagement, multi-location communication, and much more—anywhere your team or customers need clear, repeatable information."
    },
    {
      category: "content-systems",
      question: "How do you ensure the content system stays up to date as our business changes?",
      answer: "We design everything modular, so you can update, replace, or add new videos without redoing the whole library. Need quarterly refreshers? We'll support you with ongoing packages."
    },
    {
      category: "content-systems",
      question: "Can your systems work for remote or hybrid teams?",
      answer: "Absolutely. All our content is cloud-delivered—accessible from anywhere, at any time, so whether your team's in the office or all over the world, your message stays consistent."
    },

    // Internal Communications, Training, & Onboarding
    {
      category: "internal-external",
      question: "How does video onboarding save time for my managers and HR team?",
      answer: "One great onboarding video answers 90% of new hire questions, so managers can stop repeating themselves and new employees get up to speed fast—even if they start remotely or after hours."
    },
    {
      category: "internal-external",
      question: "Can you help us reduce training costs and increase retention?",
      answer: "Yes. Training videos make learning stick and can be rewatched anytime. You'll see fewer repeated questions, faster ramp-ups, and better compliance—without another lunch-and-learn."
    },
    {
      category: "internal-external",
      question: "We have high turnover. Does this help?",
      answer: "A repeatable video system means every new hire, no matter when they start, gets the exact same message and training—no more missing steps, no more tribal knowledge gaps."
    },
    {
      category: "internal-external",
      question: "How do you keep internal communications clear across large or growing teams?",
      answer: "We build internal video libraries that act as a single source of truth. Updates? Just swap out the relevant video and notify your team. No more miscommunication across 10 departments."
    },
    {
      category: "internal-external",
      question: "Can you build content to support our managers as we scale?",
      answer: "Yes—manager toolkits, leadership messages, process rollouts, and internal FAQ videos help every leader stay consistent, even as you add new locations or teams."
    },

    // External-Facing Video, Social & Marketing
    {
      category: "internal-external",
      question: "Can you create videos optimized for social media like TikTok, Instagram, and LinkedIn?",
      answer: "Absolutely. Our \"Social Authority Kit\" and reels bundles are built to create snackable, scroll-stopping content for each platform—captions, thumbnails, and sizing all dialed in."
    },
    {
      category: "internal-external",
      question: "What's included in your YouTube Visibility Engine?",
      answer: "You get 2–3 long-form YouTube videos per month, with content strategy, scripting, filming, cinematic edits, SEO optimization, and thumbnails that actually get clicks."
    },
    {
      category: "internal-external",
      question: "Do you handle both short-form and long-form video?",
      answer: "Yes. We cover everything: 15-second vertical reels for TikTok/IG, punchy mid-length pieces, and full 10-minute brand stories for YouTube—each built with its own strategy."
    },
    {
      category: "internal-external",
      question: "Will your videos help us generate more leads or awareness?",
      answer: "Definitely. We design explainer videos, social proof, and \"hero\" content that attracts new leads and helps your team convert prospects—without doubling your ad spend."
    },
    {
      category: "internal-external",
      question: "Can you help us automate responding to common customer questions?",
      answer: "Yes. We create external-facing FAQ videos for your website and social—your prospects get their answers, and your team gets their time back."
    },
    {
      category: "internal-external",
      question: "How do I get started creating content for my business on TikTok or Instagram?",
      answer: "Our \"DIY Reels\" guide and our hands-on coaching help you build confidence and film high-impact videos at home, even if you've never recorded before."
    },
    {
      category: "internal-external",
      question: "What if I want to level up my brand's YouTube channel?",
      answer: "Our YouTube Visibility Engine gives you a full video series plan, on-camera support, SEO, and ongoing creative direction to keep your channel growing (not collecting dust)."
    },
    {
      category: "internal-external",
      question: "Can you help us build a consistent brand across all platforms?",
      answer: "Yes. We design each content system for multi-platform delivery, so your message looks and feels cohesive—whether it's on YouTube, LinkedIn, or your company intranet."
    },

    // Packages, Process, and Pricing
    {
      category: "packages-pricing",
      question: "Do you offer monthly video content packages?",
      answer: "Yes, our \"Social Authority Kit\" delivers hero videos, reels, and social proof content every month, so you never run out of fresh, on-brand assets. Minimum 3-month commitment."
    },
    {
      category: "packages-pricing",
      question: "How do your one-time bundles work?",
      answer: "We offer targeted solutions like Internal FAQ Buildouts, External FAQ Videos, Reels Blitzes, and rapid launches. Each solves a specific problem fast—without a long-term contract."
    },
    {
      category: "packages-pricing",
      question: "What's included in your Internal FAQ Buildout?",
      answer: "Up to 15 short videos (60–90 seconds each) covering onboarding, hiring, process training, and internal comms. Clean, professional, and ready to use."
    },
    {
      category: "packages-pricing",
      question: "What about External FAQ Buildouts?",
      answer: "Same structure, but aimed at customer onboarding, objections, product demos, and sales. Each video is easy to embed on your site, email to prospects, or share on socials."
    },
    {
      category: "packages-pricing",
      question: "How do your \"30 Reels in 30 Days\" and \"7-Day Launch\" bundles work?",
      answer: "You get a concentrated blast of content—ideal for events, launches, or quick visibility. Full-day or half-day shoots, rapid editing, ready-to-post delivery."
    },
    {
      category: "packages-pricing",
      question: "Do you offer a starter package for first-timers?",
      answer: "Yes—the \"Starter Session\" is a $500 mini-package with a 30-minute shoot and three edited videos. Simple, accessible, and capped to ensure quality."
    },
    {
      category: "packages-pricing",
      question: "Are your digital products really for DIYers?",
      answer: "Absolutely—guides like \"25 DIY Reels\" and the \"Video Strategy Blueprint\" are designed for founders and small teams who want to level up fast, with or without a film crew."
    },
    {
      category: "packages-pricing",
      question: "What's included in the Camera-Ready Brand group coaching?",
      answer: "Live cohort sessions, assignments, direct feedback, and a private group to help you get on camera, build your first 3–5 videos, and conquer video nerves."
    },
    {
      category: "packages-pricing",
      question: "What's the \"Business Bonus Pack\"?",
      answer: "It's our bundle of DIY guides, coaching, and scripts—free with monthly packages or any major bundle. Perfect for teams who want to practice, plan, or sharpen their on-camera skills."
    },

    // Ownership, Access, and Support
    {
      category: "ownership-support",
      question: "Do we own the video content?",
      answer: "Yes. Upon final payment, you own all footage, finished videos, and source files—use them however and wherever you want."
    },
    {
      category: "ownership-support",
      question: "Can we edit or update videos ourselves in the future?",
      answer: "You'll get all the assets you need for easy updates, or you can book us for refreshers and add-ons as your business grows."
    },
    {
      category: "ownership-support",
      question: "What support do you offer after delivery?",
      answer: "Ongoing clients get regular check-ins and support. For one-time bundles, we're always available for follow-up edits, new projects, or system expansions."
    },
    {
      category: "ownership-support",
      question: "How do I know if my team is actually using the content?",
      answer: "We help you set up platforms that track views, completion, and engagement, so you can see which assets are working and which need a refresh."
    },
    {
      category: "ownership-support",
      question: "How secure is our video library?",
      answer: "Your assets are delivered through secure, cloud-based platforms, with download options and private link sharing for internal-only resources."
    },

    // Implementation & Adoption
    {
      category: "implementation",
      question: "Will you help with rollout and team adoption?",
      answer: "Absolutely. We guide you through onboarding your team and embedding your content system into daily workflows—so your investment *actually* gets used."
    },
    {
      category: "implementation",
      question: "Can you integrate our video system with our existing tools?",
      answer: "We can help you connect your content to your intranet, learning platforms, or CRM for seamless access and tracking."
    },
    {
      category: "implementation",
      question: "Can you customize training or onboarding for specific departments?",
      answer: "Yes—each system is tailored to your unique workflows. Need sales onboarding, warehouse safety, or HR process breakdowns? We script and shoot for your reality."
    },
    {
      category: "implementation",
      question: "How do you keep things easy for people who hate being on camera?",
      answer: "We coach every client through the process—simple scripts, natural delivery, and as many takes as you need. Our On-Camera Confidence mini-course is included."
    },
    {
      category: "implementation",
      question: "Do you offer teleprompter support or scripting?",
      answer: "Always. From bullet points to full scripts, we make sure you sound clear, confident, and like yourself—never robotic."
    },
    {
      category: "implementation",
      question: "What if our team is camera-shy?",
      answer: "No worries. We offer remote coaching, pre-filming Q&As, and can even provide pro voiceover if needed."
    },

    // Measurement, ROI, and Results
    {
      category: "measurement",
      question: "How do I measure the ROI of a video content system?",
      answer: "You'll see faster onboarding, reduced repetitive questions, better sales conversion, and time saved by leadership. We help you benchmark results before and after."
    },
    {
      category: "measurement",
      question: "Will this actually improve employee engagement?",
      answer: "Engagement goes up when people can watch, rewatch, and learn at their own pace—instead of slogging through PDFs or endless email threads."
    },
    {
      category: "measurement",
      question: "What about ongoing content needs as our company grows?",
      answer: "Monthly clients get regular new videos, fresh ideas, and system audits so you never outgrow your assets."
    },
    {
      category: "measurement",
      question: "Can we get help updating our system every year or quarter?",
      answer: "Yes—book a quarterly or annual refresh and keep your content system razor-sharp as your business evolves."
    },

    // Process & Next Steps
    {
      category: "process",
      question: "What's the first step to working with Palmer House Productions?",
      answer: "Book a discovery call. We map your pain points, your goals, and your bottlenecks before recommending any solution."
    },
    {
      category: "process",
      question: "How long does the full content system process take?",
      answer: "Most systems are ready in 4–8 weeks, depending on your scope and schedule."
    },
    {
      category: "process",
      question: "Can you work with companies outside of Seattle?",
      answer: "Yes—we work nationwide, offer remote planning, and travel for shoots as needed. Many products (downloads, coaching) are 100% remote."
    },
    {
      category: "process",
      question: "Is there a limit to how many videos we can make in a system?",
      answer: "We price by bundle or by need. Monthly packages have set deliverables; custom systems can be quoted for any scale."
    },
    {
      category: "process",
      question: "Can you create content for our next product or event launch?",
      answer: "Yes! Our launch bundles deliver rapid-turnaround brand videos, social cutdowns, and all the assets you need for a major push."
    },
    {
      category: "process",
      question: "How does Palmer House Productions stay ahead of trends?",
      answer: "We're constantly studying platforms, formats, and content psychology—so your videos aren't just beautiful, they're effective (and built to last)."
    },
    {
      category: "process",
      question: "How do I know which package or system is right for my business?",
      answer: "That's what the discovery call is for—we listen first, then point you to the best fit. No pressure, no cookie-cutter answers, just smart solutions for your stage."
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <StructuredData />
      <FAQSchema faqs={filteredFaqs.map(faq => ({ question: faq.question, answer: faq.answer }))} />
      <MainContent>
        <section className="pt-24 pb-16 bg-video-white">
          <div className="max-w-6xl mx-auto px-6">
            <BreadcrumbNavigation />
            
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-3 gradient-social-1 rounded-full text-white font-bold text-lg mb-8">
                <HelpCircle className="inline-block mr-2" size={20} />
                The Complete FAQ Guide
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
                Every <span className="text-gradient-1">Question</span> Answered
              </h1>
              <p className="text-xl md:text-2xl text-corporate-gray mb-8 max-w-4xl mx-auto">
                Your complete guide to video content systems, pricing, and process. Find exactly what you're looking for.
              </p>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-12">
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'gradient-social-1 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="text-center mb-8">
              <p className="text-corporate-gray">
                Showing {filteredFaqs.length} of {faqs.length} questions
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4 mb-16">
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl video-shadow overflow-hidden">
                  <button
                    className="w-full text-left p-6 hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center min-h-[80px] touch-manipulation"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3 className="text-lg md:text-xl font-bold text-corporate-dark pr-4 leading-tight">
                      {faq.question}
                    </h3>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-corporate-gray flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-corporate-gray flex-shrink-0" />
                    )}
                  </button>
                  {openIndex === index && (
                     <div 
                      id={`faq-answer-${index}`}
                      className="px-6 pb-6 text-corporate-gray leading-relaxed text-base md:text-lg"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* No Results Message */}
            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-corporate-gray mb-4">No questions match your search.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="px-6 py-3 gradient-social-1 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Show All Questions
                </button>
              </div>
            )}

            {/* Contact CTA */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-social-purple/10 to-social-pink/10 rounded-3xl p-8 border border-social-purple/20">
                <h3 className="text-3xl font-display font-black text-corporate-dark mb-4">
                  Still Have Questions?
                </h3>
                <p className="text-lg text-corporate-gray mb-6">
                  We'd love to chat about your specific project and how we can help bring your vision to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-block px-8 py-4 gradient-social-1 text-white font-bold rounded-2xl hover:scale-105 transition-all duration-300 video-shadow"
                  >
                    Get In Touch
                  </a>
                  <a
                    href="/discovery-call"
                    className="inline-block px-8 py-4 border-2 border-social-purple text-social-purple font-bold rounded-2xl hover:bg-social-purple hover:text-white transition-all duration-300"
                  >
                    Book Discovery Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainContent>
      <EnhancedFooter />
    </div>
  );
};

export default FAQ;