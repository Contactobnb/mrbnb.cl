import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import FadeIn from '@/components/ui/FadeIn'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('FAQPage')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function FAQPage() {
  const t = await getTranslations('FAQPage')

  const faqs = [
    {
      category: t('cat1'),
      questions: [
        { q: t('cat1q1Q'), a: t('cat1q1A') },
        { q: t('cat1q2Q'), a: t('cat1q2A') },
        { q: t('cat1q3Q'), a: t('cat1q3A') },
        { q: t('cat1q4Q'), a: t('cat1q4A') },
      ],
    },
    {
      category: t('cat2'),
      questions: [
        { q: t('cat2q1Q'), a: t('cat2q1A') },
        { q: t('cat2q2Q'), a: t('cat2q2A') },
        { q: t('cat2q3Q'), a: t('cat2q3A') },
        { q: t('cat2q4Q'), a: t('cat2q4A') },
      ],
    },
    {
      category: t('cat3'),
      questions: [
        { q: t('cat3q1Q'), a: t('cat3q1A') },
        { q: t('cat3q2Q'), a: t('cat3q2A') },
        { q: t('cat3q3Q'), a: t('cat3q3A') },
      ],
    },
    {
      category: t('cat4'),
      questions: [
        { q: t('cat4q1Q'), a: t('cat4q1A') },
        { q: t('cat4q2Q'), a: t('cat4q2A') },
        { q: t('cat4q3Q'), a: t('cat4q3A') },
        { q: t('cat4q4Q'), a: t('cat4q4A') },
      ],
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-[#1e3a5f] text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              {t('heroSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <FadeIn>
      <section className="section-padding bg-[#faf8f5]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-12">
            {faqs.map((section) => (
              <div key={section.category}>
                <h2 className="heading-3 mb-6 pb-2 border-b border-gray-200">
                  {section.category}
                </h2>
                <div className="space-y-6">
                  {section.questions.map((faq) => (
                    <div key={faq.q} className="bg-white rounded-xl p-6 shadow-sm">
                      <h3 className="font-semibold text-[#1e3a5f] text-lg mb-2">
                        {faq.q}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      {/* CTA */}
      <FadeIn>
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-2 mb-4">
            {t('ctaTitle')}
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            {t('ctaDesc')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contacto" variant="primary" size="lg">
              {t('ctaPrimary')}
            </Button>
            <Button href="/evaluacion" variant="secondary" size="lg">
              {t('ctaSecondary')}
            </Button>
          </div>
        </div>
      </section>
      </FadeIn>
    </>
  )
}
