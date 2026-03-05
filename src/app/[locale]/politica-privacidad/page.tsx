import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import PrivacyContentES from '@/content/legal/es/privacy'
import PrivacyContentEN from '@/content/legal/en/privacy'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  if (locale === 'en') {
    return {
      title: 'Privacy Policy',
      description:
        'Mr.BnB Privacy Policy. Learn how we protect your personal data in compliance with Chilean Law 19,628 on the Protection of Personal Data.',
    }
  }
  return {
    title: 'Politica de Privacidad',
    description:
      'Politica de privacidad de Mr.BnB. Conoce como protegemos tus datos personales conforme a la Ley 19.628 de Proteccion de Datos Personales de Chile.',
  }
}

export default async function PoliticaPrivacidadPage() {
  const locale = await getLocale()
  return locale === 'en' ? <PrivacyContentEN /> : <PrivacyContentES />
}
