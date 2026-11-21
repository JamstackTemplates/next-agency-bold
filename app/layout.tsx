import '@fontsource/anton/400.css';
import '@fontsource-variable/dm-sans';
import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/700.css';
import '@fontsource/caveat-brush/400.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { business } from '../content/business';
import { asset } from '../lib/paths';
import { site } from '../lib/site';
import './tailwind.input.css';

const ogImageUrl = site.url ? `${site.url}/og.png` : asset('/og.png');
const description = site.description || business.introduction;

export const metadata: Metadata = {
  title: { default: business.name, template: `%s — ${business.name}` },
  description,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: {
    type: 'website',
    siteName: business.name,
    title: business.name,
    description,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: `${business.name} — ${business.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: business.name,
    description,
    images: [ogImageUrl],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-bg text-ink antialiased">
        <ThemeProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="overflow-x-clip">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
