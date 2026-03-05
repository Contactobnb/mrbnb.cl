import { getTranslations } from 'next-intl/server'

export default async function Stats() {
  const t = await getTranslations('Stats')

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label'), suffix: '' },
    { value: t('stat2Value'), label: t('stat2Label'), suffix: t('stat2Suffix') },
    { value: t('stat3Value'), label: t('stat3Label'), suffix: '' },
    { value: t('stat4Value'), label: t('stat4Label'), suffix: '' },
    { value: t('stat5Value'), label: t('stat5Label'), suffix: '' },
    { value: t('stat6Value'), label: t('stat6Label'), suffix: '' },
  ]

  return (
    <section className="bg-[#faf8f5] section-padding">
      <div className="container-custom mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">{t('title')}</h2>
          <p className="text-gray-600 text-lg" dangerouslySetInnerHTML={{ __html: t('subtitle') }} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#c53030] stat-number">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-gray-600 mt-2 leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
