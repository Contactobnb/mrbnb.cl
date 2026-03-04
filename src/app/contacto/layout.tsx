import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contacta a Mr.BnB para evaluar tu propiedad, consultar por servicios de administración o corretaje inmobiliario en Santiago. Respuesta en menos de 24 horas.',
}

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
