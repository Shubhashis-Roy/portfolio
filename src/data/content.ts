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
  role: 'AI Full-Stack Engineer',
  experience: '3 years and 11 months',
  experienceShort: '3y 11m',
  email: '', // e.g. 'you@domain.com' — shows "[your.email@domain.com]" until set
  linkedin: '', // full URL
  github: '', // full URL
  resumeUrl: '', // e.g. '/resume.pdf' — put the PDF in /public
};

export type Experience = {
  company: string;
  current?: boolean;
  role: string;
  dates: string;
  summary: string;
  tags: string[];
};

export const experience: Experience[] = [
  {
    company: 'Medici',
    current: true,
    role: '[Role title]',
    dates: '[Start date]',
    summary:
      'Building an AI-powered healthcare platform that streamlines clinical intake, AI-assisted treatment plans, physician review, patient approval and pharmacy fulfillment.',
    tags: ['Next.js', 'TypeScript', 'OpenAI', 'Anthropic Claude', 'AWS Bedrock', 'Supabase'],
  },
  {
    company: 'Appycodes',
    role: '[Role title]',
    dates: '[Dates]',
    summary:
      'Worked on an AI-powered player intelligence platform for scouting, predictive performance analysis and strategic team management.',
    tags: ['Predictive analytics', 'AI recommendations', 'Dashboards'],
  },
  {
    company: 'Kenneth Tech',
    role: '[Role title]',
    dates: '[Dates]',
    summary:
      'Built responsive interfaces and backend services for a secure, scalable pharmaceutical e-commerce platform covering product management and transactions.',
    tags: ['E-commerce', 'Full-stack', 'Backend services'],
  },
];

export type Project = {
  id: 'crushes' | 'player' | 'wellness' | 'healthcare' | 'pharma';
  num: string;
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
  liveUrl?: string;
  repoUrl?: string;
  previewLabel: string;
  /** Your role — shown in the modal (placeholder until filled) */
  myRole?: string;
};

export const projects: Project[] = [
  {
    id: 'crushes',
    num: '01',
    name: 'Crushes',
    title: 'Crushes — Social Matching Platform',
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
    num: '02',
    name: 'AI-Powered Player Intelligence Platform',
    title: 'AI-Powered Player Intelligence Platform',
    short: 'Player Intelligence',
    category: 'AI / Sports Analytics',
    org: 'Professional work · Appycodes',
    owner: 'Professional work · Appycodes',
    desc: 'An AI-powered decision-support system designed to transform player scouting, predictive performance analysis, and team management through intelligent recommendations.',
    caps: ['Player performance analysis', 'Player fitness indicators', 'Predictive analytics', 'Player scouting', 'Strategic team management', 'Play / bench / trade / release recommendations'],
    features: ['Player performance analysis', 'Player fitness indicators', 'Predictive analytics', 'Player scouting', 'Strategic team management', 'Recommendations to play, bench, trade, or release players'],
    tags: ['Predictive analytics', 'Recommendations', '[Add stack]'],
    stack: ['[Add stack]'],
    flow: ['Player data', 'Performance & fitness analysis', 'Predictive models', 'AI recommendations', 'Team decisions'],
    privateProduct: true,
    previewLabel: 'Concept dashboard · illustrative data',
  },
  {
    id: 'wellness',
    num: '03',
    name: 'AI-Powered Mental Wellness Assistant',
    title: 'AI-Powered Mental Wellness Assistant',
    short: 'Wellness Assistant',
    category: 'Generative AI / RAG',
    owner: 'Generative AI project',
    desc: 'A context-aware AI mental wellness assistant powered by GPT-4.1 and a Qdrant-based RAG pipeline, delivering personalized responses through intelligent retrieval and conversational interactions.',
    caps: ['GPT-4.1 conversations', 'Retrieval-Augmented Generation', 'Qdrant vector search', 'Real-time chat', 'Voice calls'],
    features: ['GPT-4.1 conversations', 'Retrieval-Augmented Generation (RAG)', 'Qdrant vector retrieval', 'Real-time chat', 'Voice calls'],
    tags: ['GPT-4.1', 'RAG', 'Qdrant', 'Real-time chat', 'Voice'],
    stack: ['GPT-4.1', 'RAG', 'Qdrant', 'Real-time chat', 'Voice calls'],
    flow: ['User message / voice', 'Qdrant retrieval', 'Context assembly', 'GPT-4.1 response'],
    liveUrl: '',
    repoUrl: '',
    previewLabel: 'Concept interface',
  },
  {
    id: 'healthcare',
    num: '04',
    name: 'AI-Powered Healthcare Platform',
    title: 'AI-Powered Healthcare Platform',
    short: 'Healthcare Platform',
    category: 'Healthcare / Generative AI',
    org: 'Professional experience · product development at Medici',
    owner: 'Professional experience · product development at Medici',
    desc: 'An AI-powered healthcare platform designed to streamline clinical consultations, patient intake, treatment-plan generation, physician review, and pharmacy fulfillment.',
    caps: ['AI-powered clinical intake', 'AI-assisted treatment plans', 'Physician review workflows', 'Patient approval & checkout', 'Secure patient messaging', 'Pharmacy fulfillment', 'Payment & shipping integrations'],
    features: ['AI-powered clinical intake', 'AI-assisted treatment-plan generation', 'Physician review workflows', 'Patient approval and checkout', 'Secure patient messaging', 'Pharmacy fulfillment', 'Payment and shipping integrations'],
    tags: ['Next.js', 'React', 'TypeScript', 'OpenAI', 'Anthropic Claude', 'AWS Bedrock', 'Vercel AI SDK', 'Supabase', 'Drizzle ORM'],
    stack: ['Next.js', 'React', 'TypeScript', 'OpenAI', 'Anthropic Claude', 'AWS Bedrock', 'Vercel AI SDK', 'Supabase', 'Drizzle ORM'],
    flow: ['Clinical intake', 'AI treatment plan', 'Physician review', 'Patient approval & checkout', 'Pharmacy fulfillment'],
    privateProduct: true,
    previewLabel: 'Concept preview · not product screenshots',
  },
  {
    id: 'pharma',
    num: '05',
    name: 'Pharmaceutical E-Commerce Platform',
    title: 'Pharmaceutical E-Commerce Platform',
    short: 'Pharma E-Commerce',
    category: 'E-Commerce / Full-Stack Development',
    org: 'Professional work · Kenneth Tech',
    owner: 'Professional work · Kenneth Tech',
    desc: 'A secure and scalable pharmaceutical e-commerce platform with responsive interfaces and backend services for product management, transactions, and seamless shopping experiences.',
    caps: ['Responsive storefront interfaces', 'Product management services', 'Secure transactions', 'Scalable backend services'],
    features: ['Responsive shopping interfaces', 'Product management', 'Secure transactions', 'Scalable backend services'],
    tags: ['E-commerce', 'Full-stack', '[Add stack]'],
    stack: ['E-commerce', 'Full-stack', '[Add stack]'],
    flow: ['Product listing', 'Product details', 'Cart', 'Checkout'],
    privateProduct: true,
    previewLabel: 'Concept storefront · placeholder products',
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: 'Frontend', items: ['Next.js', 'React', 'TypeScript'] },
  { group: 'AI & LLMs', items: ['OpenAI', 'GPT-4.1', 'Anthropic Claude', 'AWS Bedrock', 'Vercel AI SDK', 'RAG'] },
  { group: 'Data', items: ['Supabase', 'Drizzle ORM', 'Qdrant'] },
  { group: 'Real-time & Cloud', items: ['WebRTC', 'Socket.IO', 'AWS SES'] },
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
    text: 'Live matching, chat and video calling with WebRTC and Socket.IO — fast, responsive, event-driven.',
  },
  {
    icon: 'platform' as const,
    title: 'Scalable web platforms',
    text: 'Type-safe full-stack applications with Next.js, React, TypeScript and modern data layers.',
  },
];
