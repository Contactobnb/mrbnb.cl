import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import FadeIn from '@/components/ui/FadeIn'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('ProcesoPage')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function ProcesoPage() {
  const t = await getTranslations('ProcesoPage')

  const steps = [
    {
      number: '01',
      title: t('step1Title'),
      subtitle: t('step1Subtitle'),
      description: t('step1Desc'),
      details: [t('step1Detail1'), t('step1Detail2'), t('step1Detail3'), t('step1Detail4'), t('step1Detail5'), t('step1Detail6')],
      duration: t('step1Duration'),
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      iconColor: 'bg-blue-100 text-blue-600',
    },
    {
      number: '02',
      title: t('step2Title'),
      subtitle: t('step2Subtitle'),
      description: t('step2Desc'),
      details: [t('step2Detail1'), t('step2Detail2'), t('step2Detail3'), t('step2Detail4'), t('step2Detail5'), t('step2Detail6')],
      duration: t('step2Duration'),
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      iconColor: 'bg-purple-100 text-purple-600',
    },
    {
      number: '03',
      title: t('step3Title'),
      subtitle: t('step3Subtitle'),
      description: t('step3Desc'),
      details: [t('step3Detail1'), t('step3Detail2'), t('step3Detail3'), t('step3Detail4'), t('step3Detail5'), t('step3Detail6')],
      duration: t('step3Duration'),
      color: 'bg-green-50 text-green-700 border-green-200',
      iconColor: 'bg-green-100 text-green-600',
    },
    {
      number: '04',
      title: t('step4Title'),
      subtitle: t('step4Subtitle'),
      description: t('step4Desc'),
      details: [t('step4Detail1'), t('step4Detail2'), t('step4Detail3'), t('step4Detail4'), t('step4Detail5'), t('step4Detail6')],
      duration: t('step4Duration'),
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      iconColor: 'bg-amber-100 text-amber-600',
    },
    {
      number: '05',
      title: t('step5Title'),
      subtitle: t('step5Subtitle'),
      description: t('step5Desc'),
      details: [t('step5Detail1'), t('step5Detail2'), t('step5Detail3'), t('step5Detail4'), t('step5Detail5'), t('step5Detail6')],
      duration: t('step5Duration'),
      color: 'bg-red-50 text-red-700 border-red-200',
      iconColor: 'bg-red-100 text-red-600',
    },
  ]

  const faqItems = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
    { q: t('faq5Q'), a: t('faq5A') },
    { q: t('faq6Q'), a: t('faq6A') },
    { q: t('faq7Q'), a: t('faq7A') },
    { q: t('faq8Q'), a: t('faq8A') },
    { q: t('faq9Q'), a: t('faq9A') },
  ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-[#1e3a5f] text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              {t('heroSubtitle')}
            </p>

            {/* Timeline highlight */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white font-semibold">
                {t('timelineBadge')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Overview */}
      <FadeIn>
      <section className="section-padding bg-[#faf8f5]">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-2 md:gap-0 md:flex-nowrap items-center mb-16">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>
                  <p className="text-xs font-semibold text-[#1e3a5f] mt-2 text-center whitespace-nowrap">
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-400">{step.duration}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block w-16 lg:w-24 h-0.5 bg-[#1e3a5f]/20 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Detailed Steps */}
      <FadeIn>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-start ${
                  idx % 2 === 1 ? 'lg:direction-rtl' : ''
                }`}
              >
                <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-[#1e3a5f] text-white flex items-center justify-center font-bold text-xl">
                      {step.number}
                    </div>
                    <div>
                      <h2 className="heading-2 !text-2xl md:!text-3xl">{step.title}</h2>
                      <p className="text-gray-500">{step.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${step.color}`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t('durationLabel')} {step.duration}
                  </div>
                </div>

                <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                  <Card hover={false} className="!p-0 overflow-hidden">
                    <div className={`px-6 py-4 ${step.iconColor} bg-opacity-50`}>
                      <h3 className="font-semibold text-[#1e3a5f]">{t('stepIncludesLabel')}</h3>
                    </div>
                    <div className="p-6 space-y-3">
                      {step.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600 text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Timeline CTA */}
      <FadeIn>
      <section className="section-padding bg-[#1e3a5f] text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm mb-6">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {t('ctaBadge')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('ctaTitle')}
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              {t('ctaDesc')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/evaluacion" variant="white" size="lg">
                {t('ctaPrimary')}
              </Button>
              <Button href="/contacto" variant="secondary" size="lg" className="!border-white !text-white hover:!bg-white hover:!text-[#1e3a5f]">
                {t('ctaSecondary')}
              </Button>
            </div>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* FAQ */}
      <FadeIn>
      <section className="section-padding bg-[#faf8f5]">
        <div className="container-custom">
          <h2 className="heading-2 text-center mb-12">{t('faqTitle')}</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqItems.map((faq, idx) => (
              <Card key={idx} hover={false}>
                <h3 className="font-semibold text-[#1e3a5f] text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>
    </>
  )
}
