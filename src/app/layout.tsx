import type { Metadata, Viewport } from 'next';
import { profile } from '@/data/content';
import { THEME_STORAGE_KEY } from '@/galaxy/palette';
import './globals.css';

/**
 * Public URL of the site, used for absolute og:url / link-preview URLs.
 * On Vercel, VERCEL_PROJECT_PRODUCTION_URL is set automatically (and follows a custom domain once added).
 */
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  title: `${profile.name} - ${profile.role}`,
  description: `${profile.name} - ${profile.role} building scalable web applications, intelligent AI systems and real-time digital products.`,
  openGraph: {
    title: `${profile.name} - ${profile.role}`,
    description: 'Engineering intelligent digital experiences.',
    type: 'website',
    url: '/',
    siteName: profile.name,
  },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#050505',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="normal" suppressHydrationWarning>
      <head>
        {/* Apply the saved theme before first paint (no flash). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t==="dark"||t==="normal")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      {/* Browser extensions (e.g. ColorZilla) add attributes to <body> before React loads. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
