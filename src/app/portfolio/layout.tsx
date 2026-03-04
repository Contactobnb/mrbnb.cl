import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Explora las +60 propiedades administradas por Mr.BnB en Santiago. Filtra por comuna y tipo. Rating promedio 4.81 en Airbnb.',
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
