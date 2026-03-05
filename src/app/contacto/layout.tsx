import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto — Hablemos de tu Propiedad',
  description:
    'Contacta a Mr.BnB para evaluar tu propiedad, consultar por servicios de administración o corretaje inmobiliario en Santiago. Respuesta en menos de 24 horas.',
  openGraph: {
    title: 'Contacto — Hablemos de tu Propiedad | Mr.BnB',
    description:
      'Contacta a Mr.BnB para evaluar tu propiedad o consultar por servicios de administración en Santiago. Respuesta en menos de 24 horas.',
    type: 'website',
  },
}

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
