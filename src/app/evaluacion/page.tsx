import { Metadata } from 'next'
import SimuladorROI from '@/components/evaluacion/SimuladorROI'

export const metadata: Metadata = {
  title: 'Evalua tu Propiedad — Simulador de Rentabilidad',
  description:
    'Calcula gratis cuanto podria rentar tu propiedad en Airbnb con MR BnB. Simulador basado en datos reales de +60 propiedades en Santiago.',
  openGraph: {
    title: 'Simulador de Rentabilidad — MR BnB',
    description:
      'Descubre cuanto mas podrias ganar con renta corta vs arriendo tradicional. Simulador gratuito basado en datos reales.',
    type: 'website',
  },
}

export default function EvaluacionPage() {
  return <SimuladorROI />
}
