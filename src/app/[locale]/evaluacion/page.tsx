import { Metadata } from 'next'
import SimuladorROI from '@/components/evaluacion/SimuladorROI'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('EvaluacionPage')
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

export default function EvaluacionPage() {
  return <SimuladorROI />
}
