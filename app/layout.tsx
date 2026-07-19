import type {Metadata} from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '600'], 
  variable: '--font-cormorant' 
});

const dmSans = DM_Sans({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500'], 
  variable: '--font-dmsans' 
});

export const metadata: Metadata = {
  title: 'Studio Élara | Beleza que conta histórias',
  description: 'Salão de beleza feminino premium com foco em noivas. Cabelo, maquiagem, unhas e pacotes exclusivos.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
