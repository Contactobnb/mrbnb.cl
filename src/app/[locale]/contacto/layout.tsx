import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('ContactoLayout')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      title: t('metaOgTitle'),
      description: t('metaOgDescription'),
      type: 'website',
    },
  }
}

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
