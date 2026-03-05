import Button from '@/components/ui/Button'
import { WHATSAPP_URL } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'

export default async function CTA() {
  const t = await getTranslations('CTA')

  return (
    <section className="section-padding bg-[#1e3a5f] text-white">
      <div className="container-custom mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          {t('title')}
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-4">
          {t('subtitle')}
        </p>
        <p className="text-gray-400 max-w-3xl mx-auto mb-8">
          {t('description')}
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
          {[
            t('item1'),
            t('item2'),
            t('item3'),
            t('item4'),
            t('item5'),
            t('item6'),
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-left">
              <svg className="w-5 h-5 text-[#e53e3e] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-300">{item}</span>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-xl mx-auto mb-10">
          <h3 className="text-lg font-bold mb-3">{t('promiseTitle')}</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm">
              <span className="text-[#e53e3e]">●</span> {t('promise1')}
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="text-[#e53e3e]">●</span> {t('promise2')}
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="text-[#e53e3e]">●</span> {t('promise3')}
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/evaluacion" variant="red" size="lg">
            {t('ctaPrimary')}
          </Button>
          <Button href={WHATSAPP_URL} variant="white" size="lg" external>
            {t('ctaSecondary')}
          </Button>
        </div>

        <p className="text-sm text-gray-400 mt-6">
          {t('footerText')}
        </p>
      </div>
    </section>
  )
}
