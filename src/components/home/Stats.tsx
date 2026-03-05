import { getTranslations } from 'next-intl/server'

export default async function Stats() {
  const t = await getTranslations('Stats')

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label'), suffix: '', icon: null },
    { value: t('stat2Value'), label: t('stat2Label'), suffix: t('stat2Suffix'), icon: null },
    { value: t('stat7Value'), label: t('stat7Label'), suffix: '', icon: 'airbnb' as const },
    { value: t('stat3Value'), label: t('stat3Label'), suffix: '', icon: null },
    { value: t('stat4Value'), label: t('stat4Label'), suffix: '', icon: null },
    { value: t('stat5Value'), label: t('stat5Label'), suffix: '', icon: null },
    { value: t('stat6Value'), label: t('stat6Label'), suffix: '', icon: null },
  ]

  return (
    <section className="bg-[#faf8f5] section-padding">
      <div className="container-custom mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">{t('title')}</h2>
          <p className="text-gray-600 text-lg" dangerouslySetInnerHTML={{ __html: t('subtitle') }} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#c53030] stat-number">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-gray-600 mt-2 leading-snug flex items-center justify-center gap-1.5">
                {stat.icon === 'airbnb' && (
                  <svg className="w-4 h-4 text-[#FF5A5F] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.001 18.275c-.786-1.081-1.248-2.019-1.488-2.782-.275-.9-.31-1.627-.104-2.192.24-.649.72-1.06 1.309-1.166a1.63 1.63 0 0 1 .566 0c.59.107 1.07.517 1.31 1.166.205.565.17 1.293-.105 2.192-.24.763-.702 1.7-1.488 2.782zm5.24-1.537c-.163.517-.72 1.37-1.555 2.107-.926.817-1.92 1.28-2.816 1.28-.415 0-.8-.103-1.13-.313a1.84 1.84 0 0 1-.74-.823 1.84 1.84 0 0 1-.74.823c-.33.21-.715.313-1.13.313-.896 0-1.89-.463-2.816-1.28-.835-.738-1.392-1.59-1.555-2.107-.18-.57-.166-1.13.04-1.597.17-.387.457-.686.826-.873a.6.6 0 0 1-.035-.085c-.346-.92-.09-1.891.659-2.54a.601.601 0 0 1 .02-.016c-.322-.765-.163-1.665.422-2.344.67-.78 1.72-1.166 2.742-.87.158-.94.72-1.79 1.567-2.286.967-.566 2.047-.566 3.014 0 .847.496 1.409 1.346 1.567 2.286 1.022-.296 2.072.09 2.742.87.585.68.744 1.58.422 2.344l.02.016c.75.65 1.005 1.62.66 2.54a.601.601 0 0 1-.036.085c.37.187.656.486.827.873.206.468.22 1.027.04 1.597z" />
                  </svg>
                )}
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
