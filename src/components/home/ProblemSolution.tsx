import { getTranslations } from 'next-intl/server'

export default async function ProblemSolution() {
  const t = await getTranslations('ProblemSolution')

  return (
    <section className="section-padding bg-[#faf8f5]">
      <div className="container-custom mx-auto">
        <div className="grid md:grid-cols-2 gap-4 md:gap-0 rounded-2xl overflow-hidden shadow-lg">
          {/* Problem */}
          <div className="bg-white p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-8">
              {t('problemTitle')}
            </h2>
            <ul className="space-y-4">
              {([
                t('problem1'),
                t('problem2'),
                t('problem3'),
                t('problem4'),
                t('problem5'),
                t('problem6'),
              ]).map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#c53030] flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="bg-[#1e3a5f] text-white p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              {t('solutionTitle')}
            </h2>
            <ul className="space-y-4">
              {([
                t('solution1'),
                t('solution2'),
                t('solution3'),
                t('solution4'),
                t('solution5'),
                t('solution6'),
              ]).map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#e53e3e] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-2xl md:text-3xl font-bold text-[#c53030]">
            {t('tagline')}
          </p>
        </div>
      </div>
    </section>
  )
}
