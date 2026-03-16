import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mrbnb.cl'),
  title: {
    default: 'Mr.BnB — Transformamos Departamentos en Hoteles | Gestión Airbnb Santiago',
    template: '%s | Mr.BnB',
  },
  description:
    'Administración profesional de propiedades en renta corta en Santiago. +60 propiedades, 4.81 en Airbnb, Superhost. Más rentabilidad, cero estrés, servicio premium.',
  keywords: [
    'gestión airbnb santiago',
    'administración airbnb chile',
    'arriendo corto plazo santiago',
    'inversión inmobiliaria chile',
    'property management santiago',
    'renta corta departamentos',
    'administración departamentos turísticos',
    'superhost santiago',
    'Mr.BnB',
  ],
  authors: [{ name: 'Mr.BnB' }],
  creator: 'Mr.BnB',
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://mrbnb.cl',
    siteName: 'Mr.BnB',
    title: 'Mr.BnB — Transformamos Departamentos en Hoteles',
    description:
      'Administración profesional de propiedades en renta corta. +60 propiedades en Santiago. Superhost.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Mr.BnB' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mr.BnB — Gestión Profesional Airbnb Santiago',
    description: 'Más rentabilidad. Cero estrés. Servicio Premium.',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: './',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  },
  themeColor: '#1e3a5f',
}

// JSON-LD Schema
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://mrbnb.cl',
  name: 'Mr.BnB',
  logo: 'https://mrbnb.cl/icon-512.png',
  image: 'https://mrbnb.cl/icon-512.png',
  description: 'Administración profesional de propiedades en renta corta en Santiago, Chile.',
  url: 'https://mrbnb.cl',
  telephone: '+56958034957',
  email: 'clientes@mrbnb.cl',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Santiago',
    addressRegion: 'RM',
    addressCountry: 'CL',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.81',
    bestRating: '5',
    ratingCount: '320',
  },
  sameAs: ['https://www.instagram.com/mrbnb.cl', 'https://www.linkedin.com/company/mr-bnb'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios Mr.BnB',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Administración de Renta Corta',
          description: 'Gestión integral de propiedades en Airbnb y Booking',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Corretaje con visión de renta corta',
          description: 'Asesoría en compra y venta de propiedades para inversión',
        },
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {children}

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
