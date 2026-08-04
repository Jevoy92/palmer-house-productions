export type Industry = {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string[];
  painPoints: string[];
  solutions: { title: string; body: string }[];
  useCases: string[];
  outcomes: { stat: string; label: string; body: string }[];
  faqs: { q: string; a: string }[];
};

export const industries: Record<string, Industry> = {
  healthcare: {
    slug: "healthcare",
    name: "Healthcare",
    eyebrow: "Healthcare Solutions",
    title: "Pacific Northwest Healthcare Video Production That Saves Lives & Drives Growth",
    subtitle:
      "From HIPAA-compliant staff training at Puget Sound hospital systems to patient education for clinics across Washington and Oregon — we create video content that improves clinical outcomes and positions your organization as a regional leader.",
    intro: [
      "Our expertise spans hospitals and health systems, private practices, pharmaceutical companies, and medical education programs. We understand the unique challenges and opportunities in healthcare — from compliance requirements to patient trust.",
      "Every healthcare video project follows the same proven process: discovery to understand your goals, audience, and compliance requirements; planning to develop scripts, storyboards, and timelines tailored to your environment; production with healthcare-specific equipment and techniques that minimize disruption; and delivery with accessibility features and compliance documentation built in.",
    ],
    painPoints: [
      "Clinical errors caused by inconsistent staff training",
      "Slow onboarding for new clinical staff",
      "Patients who don't follow treatment plans because instructions weren't clear",
      "Difficulty maintaining Joint Commission and CMS documentation requirements",
    ],
    solutions: [
      {
        title: "Educational Videos",
        body: "Clear, accessible content that helps patients understand procedures, treatments, and wellness practices — including treatment explanations, pre/post-op instructions, and wellness programs.",
      },
      {
        title: "Training Content",
        body: "Professional development videos that enhance skills and ensure consistent care standards, covering compliance training, safety protocols, and new technology guides.",
      },
      {
        title: "Promotional Videos",
        body: "Compelling narratives that showcase your organization's mission and build community trust through patient testimonials, facility tours, and staff spotlights.",
      },
    ],
    useCases: [
      "Hospitals & Health Systems — large-scale video projects for complex healthcare environments",
      "Private Practices — personalized content for specialty clinics and individual practitioners",
      "Pharmaceutical — educational and promotional content for medical products and treatments",
      "Medical Education — training materials for medical schools and continuing education programs",
    ],
    outcomes: [
      {
        stat: "Up to 45%",
        label: "Reduce Medical Errors",
        body: "Video training improves retention and reduces clinical errors.",
      },
      {
        stat: "60% Faster",
        label: "Faster Onboarding",
        body: "Get new clinical staff up to speed in half the time.",
      },
      {
        stat: "30% Improvement",
        label: "Better Patient Outcomes",
        body: "Educated patients have better treatment adherence.",
      },
      {
        stat: "100% Compliant",
        label: "Maintain Accreditation",
        body: "Meet Joint Commission and CMS documentation requirements.",
      },
    ],
    faqs: [
      {
        q: "Can you produce HIPAA-compliant video content?",
        a: "Yes. We follow HIPAA-compliant production practices for staff training, patient education, and testimonial content across Puget Sound hospital systems and clinics throughout Washington and Oregon.",
      },
      {
        q: "How do you minimize disruption to clinical operations?",
        a: "We use healthcare-specific equipment and techniques, and plan production schedules around your facility's workflow so filming doesn't interrupt patient care.",
      },
      {
        q: "Do your videos meet accessibility requirements?",
        a: "Every project is delivered with accessibility features and compliance documentation, so your content is ready for accreditation review.",
      },
    ],
  },
  manufacturing: {
    slug: "manufacturing",
    name: "Manufacturing",
    eyebrow: "Manufacturing Solutions",
    title: "Seattle & PNW Manufacturing Video Production That Trains Teams & Reduces Risk",
    subtitle:
      "From Boeing suppliers in the Kent Valley to food processors in Tacoma and aerospace manufacturers across Washington State — we create video content that standardizes training, reduces workplace incidents, and scales your manufacturing knowledge across every shift and facility.",
    intro: [
      "Our expertise spans automotive manufacturing, aerospace and defense, food and beverage, and chemical processing — each with its own regulatory and safety demands.",
      "We follow a proven process: discovery to understand your goals, audience, and compliance requirements; planning to develop scripts, storyboards, and timelines tailored to your manufacturing environment; production with manufacturing-specific equipment ensuring minimal disruption; and delivery optimized for your platforms with accessibility features and compliance documentation.",
    ],
    painPoints: [
      "Workplace accidents from inconsistent safety training",
      "Slow ramp-up time for new hires and cross-trained workers",
      "Production defects caused by non-standardized processes",
      "High turnover due to weak onboarding and culture",
    ],
    solutions: [
      {
        title: "Training Content",
        body: "Professional development videos that ensure OSHA compliance and reduce workplace incidents — covering safety protocols, equipment operation, and emergency response.",
      },
      {
        title: "Operational Videos",
        body: "Standard operating procedures and quality control content that improves efficiency, including SOPs, quality control, and lean manufacturing training.",
      },
      {
        title: "Brand Videos",
        body: "Compelling narratives that showcase your capabilities and attract top talent through facility tours, recruitment content, and company culture videos.",
      },
    ],
    useCases: [
      "Automotive Manufacturing — assembly line training and quality assurance for automotive production",
      "Aerospace & Defense — precision manufacturing and compliance for strict regulatory requirements",
      "Food & Beverage — food safety, HACCP compliance, and sanitation procedures",
      "Chemical Processing — hazardous materials handling and process safety management",
    ],
    outcomes: [
      {
        stat: "Up to 70%",
        label: "Reduce Accidents",
        body: "Video safety training dramatically reduces workplace incidents.",
      },
      {
        stat: "3x Faster",
        label: "Faster Training",
        body: "Get workers productive faster with video training.",
      },
      {
        stat: "45% Fewer Defects",
        label: "Improve Quality",
        body: "Standardized training reduces production errors.",
      },
      {
        stat: "35% Increase",
        label: "Better Retention",
        body: "Strong culture videos improve employee retention.",
      },
    ],
    faqs: [
      {
        q: "Can you film on an active production floor?",
        a: "Yes. We use manufacturing-specific equipment and techniques designed to capture accurate procedures while minimizing disruption to your shift schedule.",
      },
      {
        q: "Do you produce OSHA-compliant safety training?",
        a: "We build safety protocol, equipment operation, and emergency response training designed to meet OSHA compliance and documentation needs.",
      },
      {
        q: "Can training scale across multiple shifts and facilities?",
        a: "Yes — video training standardizes knowledge so every shift and facility receives the exact same instruction, cutting onboarding time and reducing defects.",
      },
    ],
  },
  technology: {
    slug: "technology",
    name: "Technology",
    eyebrow: "Technology Solutions",
    title: "Seattle Tech Video Production That Accelerates Product Adoption",
    subtitle:
      "From SaaS startups in South Lake Union to enterprise software teams on the Eastside — we create product demos, developer documentation, and launch content that helps users adopt your technology faster.",
    intro: [
      "Our expertise spans SaaS and cloud platforms, developer tools and APIs, enterprise software, and mobile apps — from startups to enterprise software companies.",
      "We follow a proven process: discovery to understand your product, users, and technical requirements; planning to create scripts, storyboards, and technical documentation strategies; production with screen capture, animations, and technical demonstrations; and delivery with interactive elements, captions, and multi-platform formatting.",
    ],
    painPoints: [
      "Users struggling to adopt new product features",
      "High support ticket volume for common questions",
      "Low trial-to-paid conversion rates",
      "Inconsistent onboarding across customer segments",
    ],
    solutions: [
      {
        title: "Demo Videos",
        body: "Engaging product demonstrations that showcase features and drive conversions, including product walkthroughs, feature highlights, and use case demos.",
      },
      {
        title: "Tutorial Content",
        body: "Step-by-step guides that help users master your product quickly — getting started guides, advanced tutorials, and best practices.",
      },
      {
        title: "Launch Videos",
        body: "Compelling launch content that generates buzz and drives adoption for product launches, feature announcements, and company updates.",
      },
    ],
    useCases: [
      "SaaS Companies (South Lake Union & Beyond) — product demos and onboarding content that reduce churn and help users get value faster",
      "Enterprise Software (Eastside Corridor) — implementation training, admin guides, and integration tutorials for complex B2B deployments",
      "Developer Tools & Open Source (Seattle) — API documentation, SDK tutorials, and developer community content",
      "Mobile & Consumer Apps (PNW) — app store previews and feature highlights that drive downloads",
      "Hardware & IoT (Washington State) — product demonstrations and setup guides that reduce returns",
      "Cybersecurity (Pacific Northwest) — security awareness training, compliance documentation, and incident response guides",
    ],
    outcomes: [
      {
        stat: "3x Faster",
        label: "Faster Adoption",
        body: "Users adopt products quicker with video training.",
      },
      {
        stat: "40% Reduction",
        label: "Reduce Support Tickets",
        body: "Self-service video resources decrease support load.",
      },
      {
        stat: "85% Satisfaction",
        label: "Better User Experience",
        body: "Video documentation improves user satisfaction.",
      },
      {
        stat: "2x Higher",
        label: "Boost Conversions",
        body: "Product demos double trial-to-paid conversion.",
      },
    ],
    faqs: [
      {
        q: "Can you handle screen capture and technical demonstrations?",
        a: "Yes. Our production process is built around screen capture, animations, and technical demonstrations, so product demos and tutorials look polished and accurate.",
      },
      {
        q: "Do you build content for developer audiences?",
        a: "We produce API and SDK documentation with code examples and walkthroughs, plus help center and knowledge base video libraries for developer-focused products.",
      },
      {
        q: "Will videos work across our knowledge base and marketing channels?",
        a: "Every video is delivered with interactive elements, captions, and multi-platform formatting so it works in your app, help center, and marketing site.",
      },
    ],
  },
  "professional-services": {
    slug: "professional-services",
    name: "Professional Services",
    eyebrow: "Professional Services Solutions",
    title: "Seattle Professional Services Video That Builds Authority & Wins Clients",
    subtitle:
      "From downtown Seattle law firms to Bellevue consulting practices and Tacoma financial advisors — we create video content that showcases your expertise, builds trust with Pacific Northwest clients, and positions your firm as the clear choice in competitive markets.",
    intro: [
      "Our expertise spans law firms, accounting and finance, consulting firms, and architecture and engineering practices.",
      "We follow a proven process: discovery to understand your firm, clients, and competitive positioning; planning to develop messaging, content strategy, and production timelines; production that reflects your firm's professionalism; and delivery optimized for your website, social media, and business development needs.",
    ],
    painPoints: [
      "Prospects who don't understand the value of complex services",
      "Difficulty differentiating from competitors on price alone",
      "Slow lead generation from written content alone",
      "Limited capacity to demonstrate expertise at scale",
    ],
    solutions: [
      {
        title: "Authority Videos",
        body: "Expert content that positions your firm as trusted advisors and industry leaders through expert interviews, industry insights, and webinar content.",
      },
      {
        title: "Social Proof",
        body: "Compelling client testimonials and case studies that build trust and credibility, including case studies and success stories.",
      },
      {
        title: "Marketing Videos",
        body: "Professional content that supports new business development and differentiates your firm — firm introductions, service explanations, and pitch support.",
      },
    ],
    useCases: [
      "Law Firms — practice area explanations and thought leadership for legal professionals",
      "Accounting & Finance — financial education and service explanations that build trust",
      "Consulting Firms — methodology showcases and transformation stories",
      "Architecture & Engineering — project showcases and technical expertise demonstrations",
    ],
    outcomes: [
      {
        stat: "5x More Inquiries",
        label: "Generate More Leads",
        body: "Video content drives significantly more qualified leads.",
      },
      {
        stat: "3x Trust Factor",
        label: "Build Authority",
        body: "Video establishes expertise faster than written content.",
      },
      {
        stat: "40% Higher Close Rate",
        label: "Win More Business",
        body: "Prospects who watch videos are more likely to engage.",
      },
      {
        stat: "24/7 Availability",
        label: "Scale Your Expertise",
        body: "Multiply your reach without multiplying your time.",
      },
    ],
    faqs: [
      {
        q: "How does video help us win more clients than competitors?",
        a: "Video establishes trust and expertise faster than written content, so prospects arrive at the consultation already confident in your firm's ability to help them.",
      },
      {
        q: "Can you produce content that explains complex services simply?",
        a: "Yes — our service explanation videos are designed specifically to simplify complex offerings so prospects understand your value before they ever talk to you.",
      },
      {
        q: "Do you work with partners and executives on camera?",
        a: "We handle executive interviews and expert commentary regularly, guiding subject matter experts through a comfortable, professional on-camera process.",
      },
    ],
  },
  education: {
    slug: "education",
    name: "Education",
    eyebrow: "Education Solutions",
    title: "Pacific Northwest Education Video Production That Inspires Learning & Drives Growth",
    subtitle:
      "From UW and WSU to community colleges and K-12 districts across Washington — we create video content that enhances learning outcomes, attracts students, engages donors, and positions your Pacific Northwest institution as a leader in student success.",
    intro: [
      "Our expertise spans K-12 schools and districts, colleges and universities, online learning platforms, and museums and libraries.",
      "We follow a proven process: discovery to understand your goals, audience, and learning objectives; planning to develop scripts, storyboards, and timelines tailored to your educational environment; production with education-specific equipment ensuring minimal disruption; and delivery optimized for your platforms with accessibility features and learning analytics.",
    ],
    painPoints: [
      "Declining enrollment and difficulty standing out to prospective students",
      "Inconsistent faculty training and professional development",
      "Low information retention from text-based learning materials",
      "Difficulty engaging donors and community supporters",
    ],
    solutions: [
      {
        title: "Educational Videos",
        body: "Clear, engaging content that enhances learning outcomes and scales your teaching impact — course modules, lecture capture, and tutorial content.",
      },
      {
        title: "Training Content",
        body: "Professional development videos that enhance teaching skills and ensure institutional compliance, covering PD training, technology training, and best practices.",
      },
      {
        title: "Promotional Videos",
        body: "Compelling narratives that showcase your institution's mission and attract students through campus tours, student testimonials, and program showcases.",
      },
    ],
    useCases: [
      "K-12 Schools & Districts — parent communication, teacher training, and student safety education",
      "Colleges & Universities — recruitment videos, course content, and institutional branding",
      "Online Learning Platforms — scalable course production and platform tutorials",
      "Museums & Libraries — exhibit tours, educational programming, and virtual events",
    ],
    outcomes: [
      {
        stat: "45% Increase",
        label: "Boost Enrollment",
        body: "Video tours and testimonials drive enrollment growth.",
      },
      {
        stat: "10x Reach",
        label: "Scale Learning",
        body: "Deliver quality education to unlimited students.",
      },
      {
        stat: "60% Better",
        label: "Improve Retention",
        body: "Video learning increases information retention.",
      },
      {
        stat: "3x More Donors",
        label: "Increase Giving",
        body: "Compelling stories inspire more generous giving.",
      },
    ],
    faqs: [
      {
        q: "Can you film on active school or campus grounds?",
        a: "Yes. We use education-specific equipment and techniques planned around your calendar to ensure filming doesn't disrupt classes or campus operations.",
      },
      {
        q: "Do you handle student privacy and consent requirements?",
        a: "We work with your administration to follow institutional privacy policies and consent procedures for any student, staff, or family appearing on camera.",
      },
      {
        q: "Can video content help with fundraising and donor engagement?",
        a: "Yes — compelling story-driven video is one of the most effective tools for inspiring donor giving and building lasting community support for your mission.",
      },
    ],
  },
  government: {
    slug: "government",
    name: "Government",
    eyebrow: "Government Solutions",
    title: "Washington Government Video Production That Serves the Public Good",
    subtitle:
      "From City of Seattle departments to King County agencies and Washington State offices — we create compliant, Section 508-accessible video content that helps Pacific Northwest government agencies fulfill their mission and build public trust.",
    intro: [
      "Our expertise spans federal agencies, state and local government, law enforcement, and public services — each with its own compliance and communication requirements.",
      "We follow a proven process: discovery to understand your agency's mission, audience, and compliance requirements; planning to develop scripts, storyboards, and timelines that meet government standards; production with security clearances and protocols ensuring minimal disruption; and delivery with Section 508 compliance, public records documentation, and approved file formats.",
    ],
    painPoints: [
      "Inconsistent emergency preparedness across departments and locations",
      "Low citizen understanding of available services and procedures",
      "Difficulty attracting qualified candidates for public sector roles",
      "Public trust and transparency challenges",
    ],
    solutions: [
      {
        title: "Training Content",
        body: "Professional development videos that ensure consistent procedures and enhance workforce capabilities — compliance training, safety protocols, and technology training.",
      },
      {
        title: "Citizen Education",
        body: "Clear, accessible content that helps citizens understand services, rights, and procedures, including service explanations and public awareness campaigns.",
      },
      {
        title: "Promotional Videos",
        body: "Compelling narratives that showcase your agency's mission and build community trust through agency updates, success stories, and recruitment videos.",
      },
    ],
    useCases: [
      "Federal Agencies — large-scale training and communication for federal departments",
      "State & Local Government — municipal video content for community engagement and services",
      "Law Enforcement — training and transparency videos for police departments",
      "Public Services — educational content for citizen information and engagement",
    ],
    outcomes: [
      {
        stat: "60% Better Preparedness",
        label: "Improve Public Safety",
        body: "Video training improves emergency response readiness.",
      },
      {
        stat: "10x Efficiency",
        label: "Scale Training",
        body: "Train employees across locations consistently.",
      },
      {
        stat: "45% Satisfaction Increase",
        label: "Better Citizen Service",
        body: "Informed citizens are more satisfied with services.",
      },
      {
        stat: "3x More Applicants",
        label: "Attract Talent",
        body: "Compelling recruitment videos attract quality candidates.",
      },
    ],
    faqs: [
      {
        q: "Can you meet Section 508 accessibility requirements?",
        a: "Yes. Every government project is delivered with Section 508 compliance, public records documentation, and approved file formats built in.",
      },
      {
        q: "Do you work with agencies requiring security clearances or protocols?",
        a: "We follow your agency's security clearances and protocols during production to ensure minimal disruption to operations and full compliance with your standards.",
      },
      {
        q: "Can video help improve emergency preparedness across departments?",
        a: "Yes — standardized emergency response and disaster preparedness training delivered on video ensures every department and location responds consistently.",
      },
    ],
  },
};

export const industryList = Object.values(industries);
