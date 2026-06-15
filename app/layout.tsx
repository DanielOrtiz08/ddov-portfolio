// @ts-ignore: allow side-effect CSS import without module declarations
import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ddov.dev'),
  title: {
    default: 'Daniel Ortiz - Portfolio',
    template: '%s | Daniel Ortiz',
  },
  description:
    'Backend Engineer specializing in Java, Spring Boot, and Cloud Computing. Building scalable distributed systems and microservices architectures.',
  keywords: [
    'Backend Engineer',
    'Java Developer',
    'Spring Boot',
    'Microservices',
    'Cloud Computing',
    'AWS',
    'Azure',
    'Software Engineer',
  ],
  authors: [{ name: 'Daniel David Ortiz Villanueva' }],
  creator: 'Daniel David Ortiz Villanueva',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ddov.dev',
    siteName: 'Daniel Ortiz Portfolio',
    title: 'Daniel Ortiz - Backend Engineer | Java | Spring Boot | Cloud',
    description:
      'Backend Engineer specializing in Java, Spring Boot, and Cloud Computing. Building scalable distributed systems and microservices architectures.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Daniel Ortiz Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daniel Ortiz - Backend Engineer',
    description:
      'Backend Engineer specializing in Java, Spring Boot, and Cloud Computing.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/favicon.png',
    shortcut: '/images/favicon.png', 
    apple: '/images/favicon.png',
  },
  manifest: '/site.webmanifest',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a1a' },
  ],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
