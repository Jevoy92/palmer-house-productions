export type Industry = {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  metaDescription: string;
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
    title: "Pacific Northwest Healthcare Video Production for Clearer Communication",
    subtitle:
      "Video production for healthcare teams across Washington and Oregon, including staff training, patient education, service explanations, and trust-building stories.",
    metaDescription:
      "Healthcare video production across Washington and Oregon for staff training, patient education, service explanations, and trust-building stories.",
    intro: [
      "Palmer House Productions creates healthcare video systems that make recurring education, training, and service information easier to understand and reuse.",
      "We begin with your audience, workflow, privacy requirements, and internal review process; then develop scripts, production plans, and delivery formats for your team to approve. Your legal, clinical, privacy, and accessibility owners remain the final authority on regulated content.",
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
        body: "Professional development videos that support consistent instruction, covering safety protocols, internal procedures, and new technology guides.",
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
        stat: "Consistent",
        label: "Staff Instruction",
        body: "Give teams a repeatable explanation of approved procedures and expectations.",
      },
      {
        stat: "Reusable",
        label: "Onboarding Support",
        body: "Turn recurring orientation topics into a library new hires can revisit.",
      },
      {
        stat: "Clearer",
        label: "Patient Education",
        body: "Explain services, preparation, and next steps in accessible language.",
      },
      {
        stat: "Reviewable",
        label: "Compliance Support",
        body: "Build internal review and approval into the production workflow.",
      },
    ],
    faqs: [
      {
        q: "Can you work with healthcare privacy and consent requirements?",
        a: "Yes. We coordinate with your privacy, legal, and clinical contacts on access, releases, protected information, and internal review. Your organization approves the final requirements and content.",
      },
      {
        q: "How do you minimize disruption to clinical operations?",
        a: "We plan crew size, equipment, locations, and production windows around your facility's workflow, subject to the access and safety rules your team provides.",
      },
      {
        q: "Do your videos meet accessibility requirements?",
        a: "Captions, transcripts, audio-description planning, and alternate delivery formats can be included in scope. Your accessibility or compliance owner should validate the final requirements.",
      },
    ],
  },
  manufacturing: {
    slug: "manufacturing",
    name: "Manufacturing",
    eyebrow: "Manufacturing Solutions",
    title: "Seattle & PNW Manufacturing Video Production for Training & Process Clarity",
    subtitle:
      "Video production for aerospace suppliers, food processors, fabricators, and other manufacturers across Washington — built to document processes, support training, and share capabilities.",
    metaDescription:
      "Manufacturing video production across Washington for process documentation, workforce training, recruitment, and capability marketing.",
    intro: [
      "Palmer House Productions creates manufacturing video systems for repeatable training, process documentation, recruitment, and capability marketing.",
      "We start with your audience, work area, site rules, subject-matter experts, and approval process; then plan scripts, camera positions, protective equipment, and production windows with your site contact.",
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
        body: "Professional development videos that support your approved safety program, covering protocols, equipment operation, and emergency response.",
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
        stat: "Repeatable",
        label: "Safety Instruction",
        body: "Give every shift access to the same approved demonstration and message.",
      },
      {
        stat: "On Demand",
        label: "Training Access",
        body: "Let workers revisit procedures without waiting for a live session.",
      },
      {
        stat: "Visible",
        label: "Process Clarity",
        body: "Show critical steps and quality checks in the actual work environment.",
      },
      {
        stat: "Credible",
        label: "Recruiting Stories",
        body: "Help candidates understand the work, environment, and team before applying.",
      },
    ],
    faqs: [
      {
        q: "Can you film on an active production floor?",
        a: "Yes. We use manufacturing-specific equipment and techniques designed to capture accurate procedures while minimizing disruption to your shift schedule.",
      },
      {
        q: "Can you support OSHA-related safety training?",
        a: "We can turn your approved safety protocols, equipment procedures, and emergency guidance into video. Your safety and compliance owners remain responsible for reviewing the content against current requirements.",
      },
      {
        q: "Can training scale across multiple shifts and facilities?",
        a: "Yes — video can give each shift and facility access to the same approved instruction while preserving site-specific notes where procedures differ.",
      },
    ],
  },
  technology: {
    slug: "technology",
    name: "Technology",
    eyebrow: "Technology Solutions",
    title: "Seattle Tech Video Production for Product Education & Adoption",
    subtitle:
      "From SaaS startups in South Lake Union to enterprise software teams on the Eastside — we create product demos, developer documentation, and launch content that helps users adopt your technology faster.",
    metaDescription:
      "Seattle technology video production for product demos, tutorials, developer education, launches, and reusable customer onboarding.",
    intro: [
      "Palmer House Productions creates technology video systems for SaaS and cloud platforms, developer tools and APIs, enterprise software, mobile apps, and technical products.",
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
        stat: "Guided",
        label: "Faster Adoption",
        body: "Help users see the right workflow and next step without parsing a long document.",
      },
      {
        stat: "Self-Serve",
        label: "Support Answers",
        body: "Turn recurring setup and feature questions into reusable resources.",
      },
      {
        stat: "Visual",
        label: "Product Clarity",
        body: "Show interfaces, interactions, and outcomes in the context users need.",
      },
      {
        stat: "Focused",
        label: "Conversion Support",
        body: "Connect product capabilities to specific buyer problems and use cases.",
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
    title: "Seattle Professional Services Video That Builds Authority & Client Trust",
    subtitle:
      "From downtown Seattle law firms to Bellevue consulting practices and Tacoma financial advisors — we create video content that showcases your expertise, builds trust with Pacific Northwest clients, and positions your firm as the clear choice in competitive markets.",
    metaDescription:
      "Professional services video production for Pacific Northwest firms that need authority content, client stories, and clear service explanations.",
    intro: [
      "Palmer House Productions creates professional-services video systems for law firms, accounting and finance teams, consultants, and architecture and engineering practices.",
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
        stat: "Clearer",
        label: "Qualified Inquiries",
        body: "Help prospects understand who you serve and when your expertise fits.",
      },
      {
        stat: "Visible",
        label: "Build Authority",
        body: "Let partners and subject-matter experts explain how they think and work.",
      },
      {
        stat: "Credible",
        label: "Sales Support",
        body: "Give business-development teams proof, explanations, and stories to share.",
      },
      {
        stat: "Reusable",
        label: "Scale Your Expertise",
        body: "Answer recurring questions without requiring the same live explanation every time.",
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
    title: "Pacific Northwest Education Video Production for Learning and Engagement",
    subtitle:
      "Video production for colleges, K-12 districts, training programs, museums, libraries, and learning organizations across the Pacific Northwest.",
    metaDescription:
      "Education video production across the Pacific Northwest for instruction, professional development, recruitment, and community storytelling.",
    intro: [
      "Palmer House Productions creates education video systems for instruction, professional development, recruitment, campus communication, and donor storytelling.",
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
        stat: "Human",
        label: "Enrollment Stories",
        body: "Help prospective students and families hear directly from your community.",
      },
      {
        stat: "Reusable",
        label: "Scale Learning",
        body: "Give learners access to approved lessons, demonstrations, and explanations on demand.",
      },
      {
        stat: "Visual",
        label: "Explain Clearly",
        body: "Combine demonstration, narration, graphics, and captions for complex topics.",
      },
      {
        stat: "Specific",
        label: "Donor Engagement",
        body: "Show the people, programs, and needs behind a fundraising message.",
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
    title: "Washington Government Video Production for Clear Public Communication",
    subtitle:
      "Video production for public agencies across Washington, including workforce training, service explanations, public information, recruitment, and community updates.",
    metaDescription:
      "Washington government video production for workforce training, public information, service explanations, recruitment, and community updates.",
    intro: [
      "Palmer House Productions creates government video systems that help agencies explain services, train teams, recruit staff, and communicate with the public more consistently.",
      "We begin with your audience, procurement constraints, access rules, records requirements, accessibility criteria, and approval chain. We then plan scripts, production, captions, transcripts, and delivery formats for the appropriate agency owners to review.",
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
        stat: "Consistent",
        label: "Preparedness Training",
        body: "Give departments access to the same approved emergency guidance.",
      },
      {
        stat: "Reusable",
        label: "Scale Training",
        body: "Share repeatable workforce instruction across locations and schedules.",
      },
      {
        stat: "Plain-Language",
        label: "Citizen Service",
        body: "Explain eligibility, processes, deadlines, and next steps in a visual format.",
      },
      {
        stat: "Human",
        label: "Attract Talent",
        body: "Show candidates the mission, roles, workplace, and people behind public service.",
      },
    ],
    faqs: [
      {
        q: "Can you support Section 508 accessibility requirements?",
        a: "Captions, transcripts, audio-description planning, and specified file formats can be included in scope. Your agency's accessibility and legal owners should review and approve the final requirements and deliverables.",
      },
      {
        q: "Can you work with agency access and security protocols?",
        a: "We coordinate crew lists, equipment, production areas, and required access steps with your designated contact. Projects that require formal clearances are scoped only after those requirements are confirmed.",
      },
      {
        q: "Can video help improve emergency preparedness across departments?",
        a: "Yes — standardized emergency response and disaster preparedness training delivered on video ensures every department and location responds consistently.",
      },
    ],
  },
};

export const industryList = Object.values(industries);
