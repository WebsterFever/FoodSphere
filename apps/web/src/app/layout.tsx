import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FoodSphere',
  description: 'Discover, create, and plan better meals.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
