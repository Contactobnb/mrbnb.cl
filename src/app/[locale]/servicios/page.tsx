import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import { BACK_OFFICE_ITEMS } from '@/lib/constants'
import FadeIn from '@/components/ui/FadeIn'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('ServiciosPage')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function ServiciosPage() {
  const t = await getTranslations('ServiciosPage')

  const backOfficeKeys = [
    'backOffice1', 'backOffice2', 'backOffice3',
    'backOffice4', 'backOffice5', 'backOffice6',
  ] as const

  return (
    <>
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
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="#administracion" variant="white">
                {t('btnAdministracion')}
              </Button>
              <Button href="#corretaje" variant="secondary" className="!border-white !text-white hover:!bg-white hover:!text-[#1e3a5f]">
                {t('btnCorretaje')}
              </Button>
              <Button href="#inversion" variant="secondary" className="!border-white !text-white hover:!bg-white hover:!text-[#1e3a5f]">
                {t('btnDesarrollo')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Plan 1: Administración */}
      <FadeIn>
      <section id="administracion" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-block bg-[#1e3a5f]/10 text-[#1e3a5f] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                {t('plan1Label')}
              </div>
              <h2 className="heading-2 mb-4">{t('plan1Title')}</h2>
              <p className="text-gray-600 text-lg mb-6">
                {t('plan1Desc')}
              </p>

              <div className="bg-[#faf8f5] rounded-xl p-6 mb-8">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-[#1e3a5f]">{t('plan1Price')}</span>
                  <span className="text-lg text-gray-600">{t('plan1PriceSuffix')}</span>
                </div>
                <p className="text-gray-500 text-sm">
                  {t('plan1PriceNote')}
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <p className="text-sm text-gray-500">
                  <strong className="text-gray-700">{t('plan1FeeLabel')}</strong> {t('plan1FeeDesc')}
                </p>
                <p className="text-sm text-gray-500">
                  <strong className="text-gray-700">{t('plan1ExpensesLabel')}</strong> {t('plan1ExpensesDesc')}
                </p>
              </div>

              <Button href="/evaluacion" variant="primary" size="lg">
                {t('plan1Cta')}
              </Button>
            </div>

            <div>
              <h3 className="heading-3 mb-6">{t('plan1IncludesTitle')}</h3>
              <div className="grid gap-4">
                {([
                  { title: t('plan1Item1Title'), desc: t('plan1Item1Desc') },
                  { title: t('plan1Item2Title'), desc: t('plan1Item2Desc') },
                  { title: t('plan1Item3Title'), desc: t('plan1Item3Desc') },
                  { title: t('plan1Item4Title'), desc: t('plan1Item4Desc') },
                  { title: t('plan1Item5Title'), desc: t('plan1Item5Desc') },
                  { title: t('plan1Item6Title'), desc: t('plan1Item6Desc') },
                  { title: t('plan1Item7Title'), desc: t('plan1Item7Desc') },
                  { title: t('plan1Item8Title'), desc: t('plan1Item8Desc') },
                ]).map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1e3a5f]">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Plan 2: Corretaje */}
      <FadeIn>
      <section id="corretaje" className="section-padding bg-[#faf8f5]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 lg:order-1">
              <h3 className="heading-3 mb-6">{t('plan2IncludesTitle')}</h3>
              <div className="grid gap-4">
                {([
                  { title: t('plan2Item1Title'), desc: t('plan2Item1Desc') },
                  { title: t('plan2Item2Title'), desc: t('plan2Item2Desc') },
                  { title: t('plan2Item3Title'), desc: t('plan2Item3Desc') },
                  { title: t('plan2Item4Title'), desc: t('plan2Item4Desc') },
                  { title: t('plan2Item5Title'), desc: t('plan2Item5Desc') },
                ]).map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1e3a5f]">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-block bg-[#1e3a5f]/10 text-[#1e3a5f] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                {t('plan2Label')}
              </div>
              <h2 className="heading-2 mb-4">{t('plan2Title')}</h2>
              <p className="text-gray-600 text-lg mb-6">
                {t('plan2Desc')}
              </p>

              <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-[#1e3a5f]">{t('plan2Price')}</span>
                  <span className="text-lg text-gray-600">{t('plan2PriceSuffix')}</span>
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  {t('plan2PriceNote')}
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                  <p className="text-green-800 font-semibold text-sm">
                    {t('plan2Bonus')}
                  </p>
                </div>
              </div>

              <Button href="/contacto" variant="primary" size="lg">
                {t('plan2Cta')}
              </Button>
            </div>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Plan 3: Desarrollo a medida */}
      <FadeIn>
      <section id="inversion" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-block bg-[#c53030]/10 text-[#c53030] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                {t('plan3Label')}
              </div>
              <h2 className="heading-2 mb-4">{t('plan3Title')}</h2>
              <p className="text-gray-600 text-lg mb-6">
                {t('plan3Desc')}
              </p>

              <div className="bg-[#faf8f5] rounded-xl p-6 mb-8">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-bold text-[#1e3a5f]">{t('plan3Price')}</span>
                </div>
                <p className="text-gray-500 text-sm">
                  {t('plan3PriceNote')}
                </p>
              </div>

              <Button href="/contacto" variant="red" size="lg">
                {t('plan3Cta')}
              </Button>
            </div>

            <div>
              <h3 className="heading-3 mb-6">{t('plan3ProcessTitle')}</h3>
              <div className="space-y-6">
                {([
                  { step: '01', title: t('plan3Step1'), desc: t('plan3Step1Desc') },
                  { step: '02', title: t('plan3Step2'), desc: t('plan3Step2Desc') },
                  { step: '03', title: t('plan3Step3'), desc: t('plan3Step3Desc') },
                  { step: '04', title: t('plan3Step4'), desc: t('plan3Step4Desc') },
                  { step: '05', title: t('plan3Step5'), desc: t('plan3Step5Desc') },
                ]).map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#c53030]/10 text-[#c53030] flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1e3a5f]">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Back office operativo */}
      <FadeIn>
      <section className="section-padding bg-[#1e3a5f] text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('backOfficeTitle')}
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {t('backOfficeSubtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BACK_OFFICE_ITEMS.map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {item.paths.map((d, i) => (
                      <path key={i} strokeLinecap="round" strokeLinejoin="round" d={d} />
                    ))}
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">{t(`${backOfficeKeys[idx]}Title`)}</h3>
                <p className="text-gray-300 text-sm">{t(`${backOfficeKeys[idx]}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Comparison Section */}
      <FadeIn>
      <section className="section-padding bg-[#faf8f5]">
        <div className="container-custom">
          <h2 className="heading-2 text-center mb-12">{t('compareTitle')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
              <thead>
                <tr className="bg-[#1e3a5f] text-white">
                  <th className="p-4 text-left font-semibold">{t('compareFeature')}</th>
                  <th className="p-4 text-center font-semibold">{t('compareAdmin')}</th>
                  <th className="p-4 text-center font-semibold">{t('compareBrokerage')}</th>
                  <th className="p-4 text-center font-semibold">{t('compareDev')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { feature: t('compareRow1'), p1: '17% + IVA', p2: '2% + IVA', p3: t('compareCaseByCaseValue') },
                  { feature: t('compareRow2'), p1: true, p2: false, p3: true },
                  { feature: t('compareRow3'), p1: true, p2: false, p3: true },
                  { feature: t('compareRow4'), p1: true, p2: false, p3: true },
                  { feature: t('compareRow5'), p1: true, p2: false, p3: true },
                  { feature: t('compareRow6'), p1: true, p2: false, p3: true },
                  { feature: t('compareRow7'), p1: false, p2: true, p3: true },
                  { feature: t('compareRow8'), p1: false, p2: true, p3: true },
                  { feature: t('compareRow9'), p1: false, p2: false, p3: true },
                  { feature: t('compareRow10'), p1: false, p2: true, p3: false },
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 text-sm font-medium text-gray-700">{row.feature}</td>
                    {[row.p1, row.p2, row.p3].map((val, i) => (
                      <td key={i} className="p-4 text-center">
                        {typeof val === 'boolean' ? (
                          val ? (
                            <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )
                        ) : (
                          <span className="text-sm font-semibold text-[#1e3a5f]">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* CTA */}
      <FadeIn>
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-2 mb-4">{t('ctaTitle')}</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            {t('ctaDesc')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/evaluacion" variant="primary" size="lg">
              {t('ctaPrimary')}
            </Button>
            <Button href="/contacto" variant="secondary" size="lg">
              {t('ctaSecondary')}
            </Button>
          </div>
        </div>
      </section>
      </FadeIn>
    </>
  )
}
