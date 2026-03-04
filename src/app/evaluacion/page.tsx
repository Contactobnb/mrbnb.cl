import { Metadata } from 'next'
import SimuladorROI from '@/components/evaluacion/SimuladorROI'

export const metadata: Metadata = {
  title: 'Evalúa tu Propiedad — Mr.BnB',
  description:
    'Solicita una evaluación gratuita del potencial de tu propiedad en renta corta. Nuestro equipo te contactará con un informe personalizado.',
  openGraph: {
    title: 'Evalúa tu Propiedad — Mr.BnB',
    description:
      'Solicita una evaluación gratuita y descubre el potencial de ingresos de tu propiedad con administración profesional.',
    type: 'website',
  },
}

export default function EvaluacionPage() {
  return <SimuladorROI />
}
