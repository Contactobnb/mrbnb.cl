import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio — +60 Propiedades en Santiago',
  description:
    'Explora las +60 propiedades administradas por Mr.BnB en Santiago. Rating promedio 4.81 en Airbnb, 8.9 en Booking. Casos de éxito comprobados.',
  openGraph: {
    title: 'Portfolio — +60 Propiedades en Santiago | Mr.BnB',
    description:
      'Explora las +60 propiedades administradas por Mr.BnB en Santiago. Rating promedio 4.81 en Airbnb.',
    type: 'website',
  },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
