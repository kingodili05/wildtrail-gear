import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Rajdhani } from 'next/font/google';
import Nav from '@/components/Nav';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import Ticker from '@/components/Ticker';
import './globals.css';

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://wildtrail.gear'),
  title: {
    default: 'WildTrail Gear — Equipping The Wild. Streaming The Adventure.',
    template: '%s · WildTrail Gear',
  },
  description:
    'Luxury tactical expedition outfitter. Industrial power, broadcast-grade field streaming, and precision tools for operators who run remote base camps.',
  keywords: [
    'tactical gear',
    'expedition equipment',
    'off-grid generator',
    'bonded streaming',
    'thermal drone',
    'precision archery',
  ],
  openGraph: {
    title: 'WildTrail Gear — Luxury Tactical Expedition Outfitter',
    description:
      'Hand-built power, broadcast, and precision systems for the operators who pitch camp where the maps end.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${rajdhani.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 pt-20">{children}</main>
        <Ticker />
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
