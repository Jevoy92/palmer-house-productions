import type { BlogPost } from "./blog";

// Research articles are kept separate from evergreen field guides so figures and sources
// can be reviewed together before each dated update. See docs/research/source-ledger.md.
export const researchPosts: BlogPost[] = [
  {
    slug: "video-marketing-statistics-2026",
    title: "Video Marketing Statistics 2026: Adoption, Formats, and Barriers",
    excerpt: "A sourced answer to how businesses use video, what they make, and what stops others from starting.",
    category: "Research",
    palLane: "Evergreen",
    author: "Palmer House Research",
    readTime: "6 min read",
    date: "October 7, 2026",
    updated: "October 7, 2026",
    sections: [
      {
        heading: "How many businesses use video marketing?",
        paragraphs: [
          "In Wyzowl's 2026 State of Video Marketing survey, 91% of businesses use video as a marketing tool. That is a result from Wyzowl's survey, not a census of every business or a figure specific to small businesses.",
          "Wyzowl surveyed 266 unique respondents in late 2025, including marketing professionals and online consumers. Its business-adoption and marketer answers should not be mistaken for responses from its consumer group.",
        ],
        sources: [{ label: "Wyzowl, Video Marketing Statistics 2026 (survey and methodology)", url: "https://wyzowl.com/video-marketing-statistics/" }],
      },
      {
        heading: "What kinds of videos do marketers make?",
        paragraphs: [
          "Among video marketers in the same survey, 69% had created social media videos, 68% explainer videos, 57% testimonial videos, 23% training videos, 23% customer onboarding videos, and 16% employee onboarding videos. Respondents could report multiple types, so these percentages do not add to 100%.",
          "The figures describe reported use by the surveyed marketers. They do not show which format performs best for a particular business.",
        ],
        sources: [{ label: "Wyzowl, types of video created", url: "https://wyzowl.com/video-marketing-statistics/" }],
      },
      {
        heading: "Do businesses make video themselves or hire help?",
        paragraphs: [
          "Wyzowl reports that 59% of surveyed video marketers create video in house, 10% exclusively use external vendors, and 32% use a mix. The published percentages total 101% because of rounding.",
          "A business can therefore have an in-house workflow and still bring in outside help. This survey does not tell us the share of production spending going to each approach.",
        ],
        sources: [{ label: "Wyzowl, production approach", url: "https://wyzowl.com/video-marketing-statistics/" }],
      },
      {
        heading: "Why do some marketers avoid video?",
        paragraphs: [
          "Among surveyed marketers who do not use video, 24% said it was too expensive and another 24% did not feel it was needed. Lack of time was cited by 19%; 10% were unclear on its return, and 10% did not know where to start.",
          "These are answers from nonusers in Wyzowl's survey. They are not percentages of all businesses. That denominator matters when a number is quoted elsewhere.",
        ],
        sources: [{ label: "Wyzowl, reasons for not using video", url: "https://wyzowl.com/video-marketing-statistics/" }],
      },
      {
        heading: "How to cite these numbers",
        paragraphs: [
          "Use the year of the report and name the surveyed group beside the number. For example: In Wyzowl's 2026 survey of marketers and consumers, 91% of businesses reported using video as a marketing tool. Link directly to Wyzowl for the underlying research.",
          "This page is Palmer House Productions' independent explanation of published findings. It is not an original Palmer House survey. We will revise it when the source issues new results or corrects its methods.",
        ],
        sources: [{ label: "Original survey and citation policy: Wyzowl", url: "https://wyzowl.com/video-marketing-statistics/" }],
      },
    ],
  },
  {
    slug: "small-business-content-creator-statistics-2026",
    title: "Small Business Content Creation Statistics 2026: Who Does the Work?",
    excerpt: "How owners manage social media, identify as creators, and reach customers, with the survey population made clear.",
    category: "Research",
    palLane: "Reel",
    author: "Palmer House Research",
    readTime: "5 min read",
    date: "October 7, 2026",
    updated: "October 7, 2026",
    sections: [
      {
        heading: "Are small business owners becoming content creators?",
        paragraphs: [
          "In Constant Contact's Q2 2026 Small Business Now research, 73% of the surveyed small and medium business owners globally identified as creators in some capacity. That combines 40% who primarily identified as creators and 33% who saw themselves as owner-creator hybrids.",
          "This describes how respondents identified themselves. It does not mean 73% run a full-time creator business or publish video regularly.",
        ],
        sources: [{ label: "Constant Contact, Q2 2026 Small Business Now findings", url: "https://www.constantcontact.com/news/2026-06-10-the-rise-of-the-smb-creator-how-small-businesses-are-leveraging-social-media-and-ai-to-capture-consumer-attention" }],
      },
      {
        heading: "Who manages a small business's social media?",
        paragraphs: [
          "Constant Contact reports that 47% of owners in its global business sample personally handle all their social media management. The finding helps explain why time and production capacity matter to owner-run brands, but it does not establish how many hours they spend or what content they post.",
        ],
        sources: [{ label: "Constant Contact, owner social media management", url: "https://www.constantcontact.com/news/2026-06-10-the-rise-of-the-smb-creator-how-small-businesses-are-leveraging-social-media-and-ai-to-capture-consumer-attention" }],
      },
      {
        heading: "Where do people discover small businesses?",
        paragraphs: [
          "In the consumer portion of the same research, 49% of respondents reported using social media to find new small businesses, compared with 40% using search engines. These are results from surveyed consumers in four regions, not measured shares of all customer discovery worldwide.",
          "The two figures come from consumers; the creator and management figures above come from businesses. Keeping those groups separate prevents a convenient but false narrative about what any one owner or customer does.",
        ],
        sources: [{ label: "Constant Contact, consumer discovery findings", url: "https://www.constantcontact.com/news/2026-06-10-the-rise-of-the-smb-creator-how-small-businesses-are-leveraging-social-media-and-ai-to-capture-consumer-attention" }],
      },
      {
        heading: "Who was surveyed?",
        paragraphs: [
          "Constant Contact says the business portion analyzed 3,340 small and medium businesses and the consumer portion analyzed 2,255 people across the United States, United Kingdom, Canada, and Australia/New Zealand. The release reports global results across those surveyed markets and separately labels U.S.-specific figures.",
          "Palmer House did not conduct this survey. If you use a number above in your own article, credit and link to Constant Contact's original report; cite this page for our explanation or comparison.",
        ],
        sources: [{ label: "Constant Contact, Q2 2026 methodology", url: "https://www.constantcontact.com/news/2026-06-10-the-rise-of-the-smb-creator-how-small-businesses-are-leveraging-social-media-and-ai-to-capture-consumer-attention" }],
      },
    ],
  },
];
