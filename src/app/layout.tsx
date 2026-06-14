import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Windy & Clear — Chicago Air Quality',
  description:
    'Real-time air quality for every Chicago neighborhood. Plain language, no jargon. Built for Environmental Justice communities.',
  openGraph: {
    title: 'Windy & Clear',
    description: 'Know your air. Real-time Chicago air quality.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
