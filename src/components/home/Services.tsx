import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { getTranslations } from 'next-intl/server'

export default async function Services() {
  const t = await getTranslations('Services')

  const services = [
    {
      icon: (
        <svg className="w-10 h-10 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: t('service1Title'),
      description: t('service1Desc'),
      plan: t('service1Plan'),
      href: '/servicios',
    },
    {
      icon: (
        <svg className="w-10 h-10 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: t('service2Title'),
      description: t('service2Desc'),
      plan: t('service2Plan'),
      href: '/servicios#inversion',
    },
    {
      icon: (
        <svg className="w-10 h-10 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: t('service3Title'),
      description: t('service3Desc'),
      plan: t('service3Plan'),
      href: '/servicios#corretaje',
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">{t('title')}</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <Card key={i} className="flex flex-col">
              <div className="mb-4">{service.icon}</div>
              <h3 className="heading-3 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4 flex-1">{service.description}</p>
              <div className="bg-[#faf8f5] rounded-lg p-3 mb-4">
                <p className="text-sm font-semibold text-[#1e3a5f]">{service.plan}</p>
              </div>
              <Button href={service.href} variant="secondary" size="sm">
                {t('moreInfo')}
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-xl font-semibold text-[#1e3a5f]">
            {t('footerText')}
          </p>
        </div>
      </div>
    </section>
  )
}
