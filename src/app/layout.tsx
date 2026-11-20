import type { Metadata, Viewport } from 'next';
import { profile } from '@/data/content';
import './globals.css';

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: `${profile.name} — ${profile.role} building scalable web applications, intelligent AI systems and real-time digital products.`,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: 'Engineering intelligent digital experiences.',
    type: 'website',
  },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#050505',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  );
}
