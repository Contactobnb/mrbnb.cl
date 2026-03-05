import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import TermsContentES from '@/content/legal/es/terms'
import TermsContentEN from '@/content/legal/en/terms'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  if (locale === 'en') {
    return {
      title: 'Terms of Service',
      description:
        'Terms and conditions of use for the Mr.BnB website. Learn the conditions governing the use of our property management services.',
    }
  }
  return {
    title: 'Terminos de Servicio',
    description:
      'Terminos y condiciones de uso del sitio web de Mr.BnB. Conoce las condiciones que rigen el uso de nuestros servicios de administracion de propiedades.',
  }
}

export default async function TerminosPage() {
  const locale = await getLocale()
  return locale === 'en' ? <TermsContentEN /> : <TermsContentES />
}
