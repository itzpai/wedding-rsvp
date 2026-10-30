import type { Metadata } from 'next';
import { Special_Elite } from 'next/font/google';
import './globals.css';

const specialElite = Special_Elite({ subsets: ['latin'], weight: '400', variable: '--font-special-elite' });

export const metadata: Metadata = {
  title: 'Pyae & Mon — November 7, 2026',
  description: 'Join Pyae & Mon at Sky Star Hotel, Yangon, on November 7, 2026.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={specialElite.variable}>{children}</body></html>;
}
