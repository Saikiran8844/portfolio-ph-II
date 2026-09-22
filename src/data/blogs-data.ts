export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "Shopify Dev" | "Software Dev" | "Growth & Marketing";
  summary: string;
  readTime: string;
  date: string;
  tags: string[];
  gradient: string;
  accentColor: string;
  highlightMetric?: {
    value: string;
    label: string;
  };
  keyTakeaways: string[];
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string;
      codeSnippet?: string;
      tips?: string[];
    }[];
    conclusion: string;
  };
}

export const BLOGS_DATA: BlogPost[] = [
  {
    id: "shopify-cro-speed",
    slug: "architecting-high-speed-shopify-storefronts",
    title: "Architecting High-Speed Shopify Storefronts for Maximum Conversion",
    subtitle: "Custom Liquid optimization, lazy loading pipelines, and sub-second Core Web Vitals.",
    category: "Shopify Dev",
    summary:
      "A deep dive into how we re-engineered custom Liquid themes, eliminated render-blocking app scripts, and unlocked sub-second First Contentful Paint to drive a 38% conversion surge.",
    readTime: "6 min read",
    date: "Mar 2026",
    tags: ["Shopify Liquid", "Core Web Vitals", "CRO", "Performance"],
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accentColor: "#10b981",
    highlightMetric: {
      value: "+38%",
      label: "Conversion Rate Increase",
    },
    keyTakeaways: [
      "Eliminate render-blocking third-party scripts via dynamic resource hints and deferred execution.",
      "Inline critical above-the-fold CSS while pre-rendering collection hero assets with responsive srcset.",
      "Implement predictive prefetching on product navigation cards for instant 50ms page transitions.",
    ],
    content: {
      intro:
        "Every 100ms delay in page load time costs e-commerce stores up to 7% in lost sales. When engineering CarrotKart.live, our mandate was straightforward: build a visually stunning Shopify storefront that maintains sub-second mobile load times globally.",
      sections: [
        {
          heading: "1. Taming App Bloat & Deferring Third-Party JavaScript",
          body: "The single biggest culprit behind slow Shopify stores is unmanaged third-party app scripts injected into the <head>. By deferring non-critical analytics, reviews, and tracking tags until after DOMContentLoaded, we regained control of main thread execution.",
          codeSnippet: `// Defer non-critical tracking & chat widgets until idle
window.addEventListener('load', () => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => initializeHeavyAppScripts());
  } else {
    setTimeout(initializeHeavyAppScripts, 1500);
  }
});`,
        },
        {
          heading: "2. Micro-Interactions Without JavaScript Overhead",
          body: "Instead of importing heavy UI libraries for product card hover zooms, color swatch previews, and variant toggles, we leveraged modern CSS container queries, CSS variables, and lightweight Vanilla JS micro-listeners.",
          tips: [
            "Use native HTML <dialog> and popover APIs for mobile slide-out cart drawers.",
            "Utilize CSS aspect-ratio to completely prevent layout shift (CLS = 0.00).",
            "Leverage Shopify CDN automatic WebP/AVIF transformation on all product imagery.",
          ],
        },
      ],
      conclusion:
        "Fast e-commerce storefronts aren't just an engineering flex; they are a direct revenue multiplier. Optimizing your Shopify code directly elevates ROAS and organic Google rankings.",
    },
  },
  {
    id: "headless-shopify-nextjs",
    slug: "headless-shopify-nextjs-storefront-api",
    title: "Headless Shopify with Next.js 15: When to Make the Leap",
    subtitle: "Evaluating Storefront API, edge caching, and app ecosystem trade-offs.",
    category: "Shopify Dev",
    summary:
      "When does going headless actually make sense? An objective architectural comparison between modern Shopify Liquid versus Next.js headless storefronts.",
    readTime: "8 min read",
    date: "Feb 2026",
    tags: ["Headless Commerce", "Next.js", "GraphQL", "Storefront API"],
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    accentColor: "#3b82f6",
    highlightMetric: {
      value: "0.4s",
      label: "First Contentful Paint",
    },
    keyTakeaways: [
      "Liquid with Sections Everywhere is fast enough for 90% of brands with zero hosting overhead.",
      "Headless shines when integrating complex custom configure-price-quote (CPQ) or bespoke 3D visualizers.",
      "Use Next.js Incremental Static Regeneration (ISR) and Edge middleware for geographic inventory routing.",
    ],
    content: {
      intro:
        "The headless commerce hype often leads founders to over-engineer their stacks prematurely. Having architected both production Shopify Liquid setups and headless Next.js platforms, here is the honest decision matrix.",
      sections: [
        {
          heading: "1. The Hidden Costs of Going Headless",
          body: "When you leave monolithic Shopify Liquid, you take on hosting infrastructure, CDN caching policies, internationalized URL routing, and app integration middleware. Unless your brand demands custom 3D web configurators or multi-origin catalog aggregation, modern Liquid remains exceptionally competitive.",
        },
        {
          heading: "2. The True Power of Headless: Incremental Static Regeneration",
          body: "For enterprise stores with 50,000+ SKUs, Next.js ISR allows pre-rendering high-traffic landing pages statically while dynamically refreshing inventory counts via webhook invalidation.",
          codeSnippet: `// Next.js Route Handler for real-time Shopify webhook revalidation
export async function POST(req: Request) {
  const { id, handle } = await req.json();
  revalidatePath(\`/products/\${handle}\`);
  return Response.json({ revalidated: true, now: Date.now() });
}`,
        },
      ],
      conclusion:
        "Choose headless if your user experience demands application-grade state and dynamic graphics. Stick with custom Liquid if your core goal is rapid iteration and out-of-the-box Shopify app ecosystem support.",
    },
  },
  {
    id: "ecommerce-cro-playbook",
    slug: "ecommerce-cro-psychology-playbook",
    title: "The E-Commerce CRO Playbook: Engineering High-Converting Product Pages",
    subtitle: "Tactical UI psychology, sticky buy buttons, and eliminating checkout friction.",
    category: "Growth & Marketing",
    summary:
      "Proven UX patterns and behavioral triggers that turn casual visitors into loyal buyers. Reducing cart abandonment through smart sticky actions and transparent shipping guarantees.",
    readTime: "5 min read",
    date: "Jan 2026",
    tags: ["CRO Strategy", "E-Commerce", "UX Psychology", "AOV Growth"],
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    accentColor: "#f59e0b",
    highlightMetric: {
      value: "-24%",
      label: "Cart Abandonment Rate",
    },
    keyTakeaways: [
      "Implement a persistent mobile bottom bar with quick add-to-cart and dynamic price updates.",
      "Place social proof and delivery guarantees directly within the visual eye-line of the CTA.",
      "Eliminate unexpected fees at checkout by offering clear shipping progress bars in the cart drawer.",
    ],
    content: {
      intro:
        "Driving paid traffic to an e-commerce store without dialing in your on-page conversion rate is like pouring water into a leaky bucket. Here are the core UX interventions that yield measurable conversion lifts.",
      sections: [
        {
          heading: "1. The Mobile Sticky Add-to-Cart Bar",
          body: "On mobile devices, once the shopper scrolls past the initial buy button to read reviews or specs, conversion drops by up to 20% if they have to scroll back up. A lightweight sticky bottom bar with variant options and a clear Add-to-Cart button solves this instantly.",
        },
        {
          heading: "2. The Cart Drawer Free-Shipping Tier Progress Bar",
          body: "Shoppers love achieving milestones. By adding a dynamic progress bar showing 'Add $12 more for Free Express Delivery', we consistently see a 15% to 22% bump in Average Order Value (AOV).",
          tips: [
            "Highlight risk-free guarantees: 'Free 30-Day Returns · 100% Carbon Neutral Delivery'.",
            "Auto-select the most popular variant by default to minimize decision fatigue.",
            "Display customer photos and authentic verified reviews above product specifications.",
          ],
        },
      ],
      conclusion:
        "Conversion optimization is not guesswork. It is a scientific discipline of removing user anxiety, maximizing clarity, and minimizing interaction friction.",
    },
  },
  {
    id: "react19-supabase-systems",
    slug: "building-production-fullstack-react19-supabase",
    title: "Building Production Full-Stack Apps with React 19 & Supabase",
    subtitle: "Row-level security, optimistic UI updates, and automated document generation engines.",
    category: "Software Dev",
    summary:
      "How we architected LegalAssistant AI using Supabase Postgres, cryptographic access controls, and client-side templating pipelines to handle thousands of confidential legal dossiers.",
    readTime: "7 min read",
    date: "Dec 2025",
    tags: ["React 19", "Supabase", "TypeScript", "Document Automation"],
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    accentColor: "#8b5cf6",
    highlightMetric: {
      value: "10k+",
      label: "Automated Dossiers Generated",
    },
    keyTakeaways: [
      "Use Postgres Row-Level Security (RLS) to enforce strict enterprise multi-tenancy at the database layer.",
      "Offload heavy PDF and DOCX templating to web workers to preserve 60fps UI responsiveness.",
      "Leverage React 19 optimistic hooks for instant zero-latency document edits.",
    ],
    content: {
      intro:
        "Legal applications demand uncompromising data isolation and rapid document turnover. In LegalAssistant AI, attorneys generate complex filings in seconds while ensuring strict client confidentiality.",
      sections: [
        {
          heading: "1. Row-Level Security as the Defense Core",
          body: "Never rely solely on API route checks for authorization. In Supabase Postgres, RLS ensures that even if a frontend query is misconfigured, data can never cross organization boundaries.",
          codeSnippet: `-- Strict RLS Policy enforcing multi-tenant firm isolation
CREATE POLICY "Attorneys can only view their firm cases"
ON cases FOR SELECT
USING (auth.jwt() ->> 'firm_id' = firm_id);`,
        },
        {
          heading: "2. Client-Side DOCX Templating Without Server Latency",
          body: "By processing template merges directly on the client with docxtemplater and JSZip, we saved significant server compute costs while giving attorneys instant live previews.",
        },
      ],
      conclusion:
        "The combination of Supabase backend primitives and modern React 19 state enables individual engineers to deliver software of enterprise scale and reliability.",
    },
  },
  {
    id: "retention-email-marketing",
    slug: "retention-engineering-ecommerce-repeat-buyers",
    title: "Retention Engineering: Turning One-Time Shoppers into Brand Evangelists",
    subtitle: "Automated lifecycle marketing, post-purchase hooks, and VIP loyalty triggers.",
    category: "Growth & Marketing",
    summary:
      "Acquisition costs continue to climb. Learn how automated Klaviyo triggers, post-purchase replenishment loops, and VIP rewards turn single transactions into lifetime value.",
    readTime: "5 min read",
    date: "Nov 2025",
    tags: ["Email Marketing", "Retention", "Klaviyo", "LTV"],
    gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    accentColor: "#f43f5e",
    highlightMetric: {
      value: "+42%",
      label: "60-Day Repeat Order Rate",
    },
    keyTakeaways: [
      "Trigger the first post-purchase email within 20 minutes focused entirely on order reassurance and brand story.",
      "Calculate personalized replenishment cycles based on product category consumption rates.",
      "Reward repeat customers with early access to limited product drops rather than generic discounts.",
    ],
    content: {
      intro:
        "Acquiring a new customer is 5x more expensive than retaining an existing one. For direct-to-consumer brands, long-term profitability lives or dies on repeat purchase rates.",
      sections: [
        {
          heading: "1. The 4-Part Post-Purchase Lifecycle Sequence",
          body: "Most brands only send a boring receipt. High-growth brands trigger: 1) The Founder Welcome & Order Expectation email, 2) Delivery Day Care & How-To Guide, 3) 14-Day Check-in & Review Request, and 4) Tailored Replenishment Reminder.",
        },
        {
          heading: "2. Segmenting VIPs by Real Lifetime Value",
          body: "Identify customers who place 3+ orders and grant them exclusive access to founder AMAs, bespoke packaging, or private collections. This builds genuine brand affinity that shields you from ad auction volatility.",
        },
      ],
      conclusion:
        "Retention engineering is the highest ROI marketing channel in e-commerce. Build software and communication loops that make customers feel remembered.",
    },
  },
  {
    id: "streaming-ai-lowlatency",
    slug: "streaming-llm-conversational-agents-production",
    title: "Streaming LLMs & Voice Synthesis: Zero-Latency Conversational AI",
    subtitle: "Server-Sent Events, streaming markdown parsing, and low-latency token pipelines.",
    category: "Software Dev",
    summary:
      "Architecture patterns behind real-time AI Interview Assistant: handling continuous token streams, voice synchronization, and responsive evaluating rubrics without UI jank.",
    readTime: "7 min read",
    date: "Oct 2025",
    tags: ["Generative AI", "SSE", "Next.js", "WebSockets"],
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    accentColor: "#06b6d4",
    highlightMetric: {
      value: "<120ms",
      label: "Time-to-First-Token",
    },
    keyTakeaways: [
      "Use Server-Sent Events (SSE) instead of polling for buttery-smooth token generation.",
      "Buffer incomplete markdown tokens on the fly to prevent flickering code blocks and syntax trees.",
      "Parallelize audio synthesis with text generation to speak responses the millisecond the first sentence completes.",
    ],
    content: {
      intro:
        "In AI-driven mock interviews, latency ruins the illusion of realism. If a candidate answers a technical question and waits 4 seconds for an evaluation, the conversational flow collapses. Here is how we achieved real-time streaming cadence.",
      sections: [
        {
          heading: "1. Chunked Sentence-Level Audio Synthesis",
          body: "Rather than waiting for the entire LLM evaluation to finish before generating audio, we split streaming tokens into sentence chunks at punctuation marks and immediately pipe them to the voice synthesizer.",
          codeSnippet: `// Stream sentence parser for immediate speech playback
let sentenceBuffer = "";
for await (const chunk of textStream) {
  sentenceBuffer += chunk;
  if (/[.!?]\\s$/.test(sentenceBuffer)) {
    queueVoicePlayback(sentenceBuffer.trim());
    sentenceBuffer = "";
  }
}`,
        },
      ],
      conclusion:
        "Speed is UX in Generative AI. Engineering for streaming and optimistic execution creates experiences that feel effortless and human.",
    },
  },
];
