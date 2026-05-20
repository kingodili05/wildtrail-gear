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
  metadataBase: new URL('https://wildtrailgear.store'),
  title: {
    default: 'WildTrail Gear — Equipping The Wild. Streaming The Adventure.',
    template: '%s · WildTrail Gear',
  },
  description:
    'Broadcast cameras, drones, off-grid power, fishing electronics, and field audio. Every order serialized and field-tested before it ships.',
  keywords: [
    'broadcast camera',
    'cinema camera',
    'professional drone',
    'fish finder',
    'off-grid power',
    'creator gear',
    'expedition equipment',
  ],
  openGraph: {
    title: 'WildTrail Gear — Premium Creator & Outdoor Gear',
    description:
      'Cameras, drones, off-grid power, fishing electronics, and field audio. Every order serialized.',
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
      <body className="min-h-[100dvh] flex flex-col">
        <Nav />
        <main className="flex-1 pt-20">{children}</main>
        <Ticker />
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
