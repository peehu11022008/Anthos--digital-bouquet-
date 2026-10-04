import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { AmbientLayer } from '@/components/ambient/AmbientLayer';
import { Flower2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Anthos — A Calming Digital Flower-Gifting World',
  description:
    'Create beautiful virtual bouquets from scratch, write personal letters, and gift calming digital blossoms.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col justify-between relative bg-cream">
        {/* Ambient floating petals and sparkles */}
        <AmbientLayer />

        {/* Global Peaceful Header */}
        <header className="sticky top-0 z-40 bg-cream/80 backdrop-blur-md border-b border-blush/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group select-none">
              <div className="w-9 h-9 rounded-full bg-blush-light flex items-center justify-center text-blush-dark transition-transform group-hover:rotate-12">
                <Flower2 size={20} />
              </div>
              <span className="font-display text-2xl text-text-dark tracking-wide">
                Anthos
              </span>
            </Link>

            {/* Navigation links */}
            <nav className="flex items-center gap-2 sm:gap-4 select-none">
              <Link
                href="/create"
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-blush text-text-dark hover:bg-blush-dark shadow-petal transition-all active:scale-95"
              >
                Create Bouquet
              </Link>
              <Link
                href="/garden"
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-text-soft hover:text-text-dark hover:bg-cream-dark transition-colors"
              >
                My Garden
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 relative z-10">{children}</main>

        {/* Peaceful Footer */}
        <footer className="border-t border-blush/20 bg-cream/60 py-6 mt-12 relative z-10 select-none">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-xs text-text-soft font-medium">
              Anthos &mdash; Make something beautiful. Give it meaning.
            </p>
            <p className="text-[11px] text-text-muted mt-1">
              A peaceful digital sanctuary for thoughtful gifting.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
