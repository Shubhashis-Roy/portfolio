/**
 * All portfolio content lives here — edit this file to update the site.
 *
 * Anything still in [square brackets] is a placeholder from the original design.
 * Placeholders in `stack` arrays render as dashed "to fill" tags.
 * Leave `liveUrl` / `repoUrl` empty ('') to show the disabled "View Project" button.
 */

export const profile = {
  name: 'Shubhashis Roy',
  initials: 'SR',
  role: 'Senior Software Engineer',
  experience: '3 years and 11 months',
  experienceShort: '3y 11m',
  email: 'shubhashisroy360@gmail.com',
  phone: '+91 96790 72397',
  /** WhatsApp number in international format, digits only (used for wa.me links). */
  whatsapp: '919679072397',
  /** Pre-filled text when a visitor opens the WhatsApp chat. */
  whatsappMessage: "Hi Shubhashis, I came across your portfolio and would like to connect.",
  linkedin: 'https://www.linkedin.com/in/shubhashis-roy-735119200/',
  github: 'https://github.com/Shubhashis-Roy',
  resumeUrl: '/Shubhashis_Full_Stack_AI_Engineer.pdf', // PDF lives in /public; previewed at /resume
};

/** Ids of the case studies; shared by `Experience.projectId` and `Project.id`. */
export type ProjectId = 'crushes' | 'player' | 'wellness' | 'healthcare' | 'pharma';

/** Opens a WhatsApp chat with the pre-filled message. */
export const whatsappUrl = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(profile.whatsappMessage)}`;

export type Experience = {
  company: string;
  current?: boolean;
  role: string;
  dates: string;
  /** Office + working arrangement, e.g. 'Austin, USA · Remote' */
  location?: string;
  summary: string;
  /** Short highlights — keep each to roughly 60 characters so they stay two lines. */
  highlights?: string[];
  tags: string[];
  /** Square company logo in /public, shown LinkedIn-style beside the company name. */
  logo?: string;
  /** Products built in this role — each rendered in full inside the Experience section. */
  projectIds?: ProjectId[];
};

export const experience: Experience[] = [
  {
    company: 'Medici',
    logo: '/logos/medici.png',
    current: true,
    role: 'Senior Software Engineer',
    dates: 'January 2026 - Present',
    location: 'Austin, USA · Remote',
    summary:
      'Building an AI-powered healthcare platform that streamlines clinical intake, AI-assisted treatment plans, physician review, patient approval and pharmacy fulfillment.',
    highlights: [
      'AI intake consult that files a structured clinical record.',
      'Interview split from record-writing, so gaps bounce back live.',
      'Durable AI plan queue with claim, retry and dead-letter.',
      'Physician portal: approve, revise, reject, clinical override.',
      'Netvalve payments: hosted checkout, refunds and reconciliation.',
      'Pharmetika pharmacy API: order submit and webhook status sync.',
      'UPS shipping: labels, rating, declared-value insurance, tracking.',
    ],
    tags: ['Next.js', 'TypeScript', 'Bun', 'Hono', 'Node.js', 'Socket.IO', 'OpenAI', 'Anthropic Claude', 'AWS Bedrock', 'Drizzle', 'Supabase', 'UPS', 'Postgres', 'AWS', 'Docker'],
    projectIds: ['healthcare'],
  },
  {
    company: 'Appycodes',
    logo: '/logos/appycodes.jpg',
    role: 'Full Stack Software Engineer',
    dates: 'December 2023 - December 2025',
    location: 'Siliguri, India',
    summary:
      'Full-stack engineer on two AI products - sports decision support, and Zonely, a mental wellness platform.',
    tags: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'Socket.IO', 'WebRTC', 'MySQL', 'GPT-4.1', 'RAG', 'Qdrant', 'Real-time chat', 'Voice calls', 'AWS', 'Docker'],
    projectIds: ['player', 'wellness'],
  },
  {
    company: 'Kenneth Tech',
    logo: '/logos/kenneth-tech.png',
    role: 'Software Engineer',
    dates: 'January 2023 - November 2023',
    location: 'Chandigarh Area, India',
    summary:
      'Built a secure, scalable MERN-stack e-commerce platform where customers buy pharmaceutical products - working across the full product cycle from ideation to UI to implementation.',
    highlights: [
      'End-to-end product cycle: ideation, UI and implementation.',
      'React + Redux storefront and customer-facing interface.',
      'Express REST APIs backing catalogue, orders and operations.',
      'Razorpay payment gateway integration for checkout.',
    ],
    tags: ['React', 'Redux', 'Node.js', 'Express.js', 'REST API', 'MongoDB', 'Razorpay'],
    projectIds: ['pharma'],
  },
];

export type Project = {
  id: ProjectId;
  /** 'personal' projects get their own section; 'professional' ones render inside Experience. */
  kind: 'personal' | 'professional';
  /** Title shown on the card */
  name: string;
  /** Full title shown in the case-study modal */
  title: string;
  /** Short title for modal prev/next buttons */
  short: string;
  subtitle?: string;
  category: string;
  /** Pill shown under the title, e.g. "Professional work · Appycodes" */
  org?: string;
  /** Owner line in the case-study modal */
  owner: string;
  desc: string;
  /** Capability bullets on the card */
  caps: string[];
  /** Capability bullets in the case-study modal */
  features: string[];
  /** Tags on the card */
  tags: string[];
  /** Stack in the case-study modal */
  stack: string[];
  flow: string[];
  /** Company products with no public link */
  privateProduct?: boolean;
  /** Shown under "Links" in the case-study modal, e.g. why there's no public URL. */
  linkNote?: string;
  /** Skip the concept mockup for this one (Experience section). */
  hideMockup?: boolean;
  liveUrl?: string;
  repoUrl?: string;
  /** Where the product ships - grouped per app, e.g. 'Consumer app' -> iOS / Android. */
  links?: { group: string; label: string; url: string }[];
  previewLabel: string;
  /** Your role — shown in the modal (placeholder until filled) */
  myRole?: string;
};

export const projects: Project[] = [
  {
    id: 'crushes',
    kind: 'personal',
    name: 'Crushes',
    title: 'Crushes - Social Matching Platform',
    short: 'Crushes',
    subtitle: 'Social Matching Platform',
    category: 'Social / Real-Time Application',
    owner: 'Featured project',
    desc: 'A full-stack social matching platform featuring real-time matching, chat, and video calling. Built with WebRTC and Socket.IO, featuring an animated infinite-swipe interface, automated match notifications, and AWS SES email campaigns.',
    caps: ['Real-time matching', 'Interactive infinite-swipe experience', 'Real-time chat', 'Video calling using WebRTC', 'Socket.IO integration', 'Automated match notifications', 'AWS SES email campaigns'],
    features: ['Real-time matching', 'Interactive infinite-swipe experience', 'Real-time chat', 'Video calling using WebRTC', 'Socket.IO integration', 'Automated match notifications', 'AWS SES email campaigns'],
    tags: ['WebRTC', 'Socket.IO', 'AWS SES', 'Real-time'],
    stack: ['WebRTC', 'Socket.IO', 'AWS SES'],
    flow: ['Infinite-swipe UI', 'Real-time matching', 'Socket.IO chat', 'WebRTC video', 'SES notifications'],
    liveUrl: '',
    repoUrl: '',
    previewLabel: 'Concept mockups · placeholder imagery',
  },
  {
    id: 'player',
    kind: 'professional',
    name: 'AI-Powered Player Intelligence Platform',
    title: 'AI-Powered Player Intelligence Platform',
    short: 'Player Intelligence',
    category: 'AI / Sports Analytics',
    org: 'Professional work · Appycodes',
    owner: 'Professional work · Appycodes',
    desc: 'A decision-support system for Rajasthan Royals, a professional T20 cricket franchise. It scouts players, predicts form from performance and fitness indicators, and answers the questions a team actually asks: who to trade and for whom, which eleven gives the best odds against a specific opponent, and who to bowl when the match is on the line.',
    caps: ['Player scouting and valuation', 'Predictive performance modelling', 'Fitness and workload indicators', 'Best eleven for a given opponent', 'Trade analysis between franchises', 'Death-over bowling recommendations'],
    features: ['Player scouting and valuation', 'Predictive performance modelling', 'Fitness and workload indicators', 'Best eleven for a given opponent', 'Trade analysis between franchises', 'Death-over bowling recommendations', 'Play, bench, trade or release calls', 'Win-probability driven team decisions'],
    tags: ['Predictive analytics', 'AI recommendations'],
    stack: [],
    flow: ['Player & match data', 'Form and fitness models', 'Win-probability simulation', 'AI recommendations', 'Squad & match decisions'],
    privateProduct: true,
    linkNote: 'Internal product for Rajasthan Royals - no public URL.',
    hideMockup: true,
    previewLabel: 'Concept dashboard · illustrative data',
    myRole:
      'Developed the decision-support system end to end - the scouting and performance-analysis surfaces, the predictive ' +
      'models over form and fitness indicators, and the recommendation layer that turns them into play, bench, trade or ' +
      'release calls, squad selection against a given opponent, and bowling choices in the closing overs.',
  },
  {
    id: 'wellness',
    kind: 'professional',
    name: 'Zonely - AI Mental Wellness Platform',
    title: 'Zonely - AI Mental Wellness Platform',
    short: 'Zonely',
    category: 'Generative AI / RAG',
    org: 'Professional work · Appycodes',
    owner: 'Professional work · Appycodes',
    desc: 'A wellness platform where people bring a problem - career, stress, low mood - and talk it through with a vetted expert over chat or voice. When that expert is offline, their AI stand-in carries the conversation, grounded in a GPT-4.1 and Qdrant RAG pipeline. A wallet handles balances and payouts, and a quiz game pays out rewards.',
    caps: ['Expert matching by problem area', 'Real-time chat with experts', 'In-app voice calls', 'AI stand-in when the expert is offline', 'GPT-4.1 responses grounded in RAG', 'Wallet, balances and payouts'],
    features: ['Expert matching by problem area', 'Real-time chat with experts', 'In-app voice calls', 'AI stand-in when the expert is offline', 'GPT-4.1 responses grounded in RAG', 'Qdrant vector retrieval', 'Wallet, balances and payouts', 'Quiz game with reward payouts'],
    tags: ['GPT-4.1', 'RAG', 'Qdrant', 'Real-time chat', 'Voice calls', 'Wallet', 'Rewards'],
    stack: ['GPT-4.1', 'RAG', 'Qdrant', 'Real-time chat', 'Voice calls', 'Wallet', 'Rewards'],
    flow: ['User describes a problem', 'Matched with an expert', 'Chat or voice call', 'AI stand-in when offline', 'Qdrant retrieval', 'GPT-4.1 response'],
    privateProduct: true,
    hideMockup: true,
    liveUrl: 'https://www.zonely.app/',
    links: [
      { group: 'Zonely · consumer app', label: 'iOS', url: 'https://apps.apple.com/in/app/zonely-casual-conversations/id6748334295' },
      { group: 'Zonely · consumer app', label: 'Android', url: 'https://www.zonely.app/' },
      { group: 'Zonely Buddy · expert app', label: 'iOS', url: 'https://apps.apple.com/in/app/zonely-buddy/id6748642878' },
      { group: 'Zonely Buddy · expert app', label: 'Android', url: 'https://play.google.com/store/apps/details?id=com.zonelybuddyapp&hl=en_IN' },
    ],
    previewLabel: 'Concept interface',
    myRole:
      'Built the GPT-4.1 RAG pipeline on Qdrant that grounds each reply in the expert\'s own material, so the AI stand-in ' +
      'answers in their voice rather than generically. I also implemented the real-time chat and voice-call layer, the ' +
      'wallet that tracks balances, top-ups and payouts, and the quiz and rewards system.',
  },
  {
    id: 'healthcare',
    kind: 'professional',
    name: 'AI-Powered Healthcare Platform',
    title: 'AI-Powered Healthcare Platform',
    short: 'Healthcare Platform',
    category: 'Healthcare / Generative AI',
    org: 'Professional experience · product development at Medici',
    owner: 'Professional experience · product development at Medici',
    desc: 'An AI-powered healthcare platform designed to streamline clinical consultations, patient intake, treatment-plan generation, physician review, and pharmacy fulfillment.',
    caps: ['AI-powered clinical intake', 'AI-assisted treatment plans', 'Physician review workflows', 'Patient approval & checkout', 'Secure patient messaging', 'Pharmacy fulfillment', 'Payment & shipping integrations'],
    features: ['AI-powered clinical intake', 'AI-assisted treatment-plan generation', 'Physician review workflows', 'Clinical override for escalated intakes', 'Patient approval and checkout', 'Secure patient messaging', 'Scheduled protocol check-ins', 'Renewal, reorder and re-intake flows', 'Pharmacy fulfillment', 'Payment and shipping integrations'],
    tags: ['Next.js', 'React', 'TypeScript', 'Bun', 'Hono', 'OpenAI', 'Anthropic Claude', 'AWS Bedrock', 'Vercel AI SDK', 'Supabase', 'Drizzle ORM', 'Postgres'],
    stack: ['Next.js', 'React', 'TypeScript', 'Bun', 'Hono', 'OpenAI', 'Anthropic Claude', 'AWS Bedrock', 'Vercel AI SDK', 'Supabase', 'Drizzle ORM', 'Postgres'],
    flow: ['AI intake consult', 'AI treatment plan', 'Member proposal', 'Physician review', 'Approval & checkout', 'Pharmacy or UPS fulfilment', 'Protocol check-ins'],
    privateProduct: true,
    hideMockup: true,
    liveUrl: 'https://www.medicipeptides.com/',
    previewLabel: 'Concept preview · not product screenshots',
    myRole:
      'Senior engineer working across a Bun + Hono API and two Next.js apps - AI, payment and shipping integrations. ' +
      'I built the AI consult pipeline, keeping the intake interview separate from the record builder so missing answers ' +
      'surface while the patient is still in session, plus the durable job queue behind treatment-plan generation. ' +
      'I also own the commerce and fulfilment path - Netvalve checkout and refunds, Pharmetika order submission and status ' +
      'sync, and the UPS shipping lane - all routed through a single fulfilment transition so the three channels can never drift.',
  },
  {
    id: 'pharma',
    kind: 'professional',
    name: 'Pharmaceutical E-Commerce Platform',
    title: 'Pharmaceutical E-Commerce Platform',
    short: 'Pharma E-Commerce',
    category: 'E-Commerce / Full-Stack Development',
    org: 'Professional work · Kenneth Tech',
    owner: 'Professional work · Kenneth Tech',
    desc: 'A secure, scalable end-user e-commerce application built on the MERN stack, where customers browse and purchase pharmaceutical products - with a React and Redux storefront, REST APIs for business operations, and Razorpay payments.',
    caps: ['React + Redux storefront', 'REST APIs for business operations', 'Razorpay payment integration', 'Secure, scalable MERN backend'],
    features: ['End-user storefront in React', 'State management with Redux', 'REST APIs for business operations', 'Product catalogue and orders', 'Razorpay payment gateway', 'Secure, scalable MERN architecture'],
    tags: ['React', 'Redux', 'Express.js', 'MongoDB', 'Razorpay'],
    stack: ['React', 'Redux', 'Node.js', 'Express.js', 'REST API', 'MongoDB', 'Razorpay'],
    flow: ['Product listing', 'Product details', 'Cart', 'Razorpay checkout', 'Order processing'],
    privateProduct: true,
    hideMockup: true,
    previewLabel: 'Concept storefront · placeholder products',
    myRole:
      'Took part in the full product development cycle, from ideation through UI design to implementation. I focused on ' +
      'the user interface in React with Redux, developed the REST APIs that support the business operations, and ' +
      'integrated the Razorpay payment gateway into checkout.',
  },
];

/** Side projects — shown in the "Personal Projects" section. */
export const personalProjects = projects.filter((p) => p.kind === 'personal');

/** Products built in a role — shown inside that role's Experience entry. */
export const projectById = (id: ProjectId) => projects.find((p) => p.id === id);

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'C/C++'] },
  { group: 'Frontend', items: ['React.js', 'Next.js', 'React Native', 'Redux', 'Shopify', 'Tailwind CSS', 'Material-UI'] },
  { group: 'Backend', items: ['Node.js', 'Express.js', 'FastAPI', 'GraphQL', 'MongoDB', 'MySQL', 'PostgreSQL', 'Supabase', 'REST APIs', 'Redis', 'Socket.IO', 'WebRTC'] },
  { group: 'Generative AI', items: ['OpenAI', 'AWS Bedrock / Anthropic', 'AI Agents & Tool Calling', 'Vercel AI SDK', 'RAG', 'Prompt Engineering', 'Embeddings', 'Vector DB'] },
  { group: 'Tools', items: ['AWS', 'Git', 'GitHub', 'Docker', 'VS Code', 'Linux'] },
];

export const focusAreas = [
  {
    icon: 'ai' as const,
    title: 'Intelligent systems',
    text: 'LLM-powered features, retrieval-augmented generation and AI decision support built into real products.',
  },
  {
    icon: 'realtime' as const,
    title: 'Real-time products',
    text: 'Real-time chat, voice calls and video calls with WebRTC and Socket.IO - fast, responsive, event-driven.',
  },
  {
    icon: 'platform' as const,
    title: 'Scalable web platforms',
    text: 'Type-safe full-stack applications with Next.js, React, TypeScript, Node.js, FastAPI and modern data layers.',
  },
];
