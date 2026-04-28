import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const heading = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: 'IBKS CLOTHING | Adorned in Strength and Dignity',
  description: 'Lagos premier boutique specializing in traditional Nigerian heritage and modern corporate excellence.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}