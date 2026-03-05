import type { Metadata } from 'next'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import FadeIn from '@/components/ui/FadeIn'
import { BACK_OFFICE_ITEMS } from '@/lib/constants'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('NosotrosPage')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function NosotrosPage() {
  const t = await getTranslations('NosotrosPage')

  const team = [
    {
      name: t('member1Name'),
      role: t('member1Role'),
      education: t('member1Education'),
      focus: t('member1Focus'),
      quote: t('member1Quote'),
      image: '/images/team/felipe-ruiz.jpg',
    },
    {
      name: t('member2Name'),
      role: t('member2Role'),
      education: t('member2Education'),
      focus: t('member2Focus'),
      quote: t('member2Quote'),
      image: '/images/team/pedro-tort.jpg',
    },
  ]

  const values = [
    {
      title: t('value1Title'),
      description: t('value1Desc'),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
    {
      title: t('value2Title'),
      description: t('value2Desc'),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: t('value3Title'),
      description: t('value3Desc'),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      title: t('value4Title'),
      description: t('value4Desc'),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ]

  const backOfficeKeys = [
    'backOffice1', 'backOffice2', 'backOffice3',
    'backOffice4', 'backOffice5', 'backOffice6',
  ] as const

  // Use ServiciosPage namespace for back office titles (shared)
  const tServicios = await getTranslations('ServiciosPage')

  return (
    <>
      {/* Hero Section */}
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

      {/* Purpose / Quote */}
      <FadeIn>
      <section className="section-padding bg-[#faf8f5]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-2xl md:text-3xl font-bold text-[#1e3a5f] leading-relaxed mb-6">
              &ldquo;{t('quote')}&rdquo;
            </blockquote>
            <div className="w-16 h-1 bg-[#c53030] mx-auto" />
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Mission & Vision */}
      <FadeIn>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <Card hover={false} className="!p-8">
              <div className="w-12 h-12 rounded-lg bg-[#1e3a5f]/10 text-[#1e3a5f] flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="heading-3 mb-4">{t('missionTitle')}</h2>
              <p className="text-gray-600 leading-relaxed">
                {t('missionDesc')}
              </p>
            </Card>

            <Card hover={false} className="!p-8">
              <div className="w-12 h-12 rounded-lg bg-[#c53030]/10 text-[#c53030] flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="heading-3 mb-4">{t('visionTitle')}</h2>
              <p className="text-gray-600 leading-relaxed">
                {t('visionDesc')}
              </p>
            </Card>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Team Photo Banner */}
      <FadeIn>
      <section className="bg-[#faf8f5] pt-16 md:pt-20 pb-0">
        <div className="container-custom">
          <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/team/equipo.jpg"
              alt={t('teamPhotoAlt')}
              width={1600}
              height={1066}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 960px"
              quality={95}
              className="w-full h-[280px] md:h-[400px] lg:h-[480px] object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                {t('teamTitle')}
              </h2>
              <p className="text-white/80 text-sm md:text-base mt-2 max-w-xl">
                {t('teamSubtitle')}
              </p>
            </div>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Team Members */}
      <FadeIn>
      <section className="section-padding bg-[#faf8f5]">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, idx) => (
              <Card key={idx} hover={false} className="!p-8 text-center">
                <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-6 ring-4 ring-[#1e3a5f]/10 shadow-lg">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role} de Mr.BnB`}
                    width={500}
                    height={500}
                    sizes="288px"
                    quality={95}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold text-[#1e3a5f] mb-1">{member.name}</h3>
                <p className="text-[#c53030] font-semibold text-sm mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm mb-4">{member.education}</p>

                <div className="bg-[#faf8f5] rounded-lg px-4 py-3 mb-4">
                  <p className="text-gray-600 text-sm font-medium">{member.focus}</p>
                </div>

                <blockquote className="text-gray-500 italic text-sm">
                  &ldquo;{member.quote}&rdquo;
                </blockquote>
              </Card>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Values / Culture */}
      <FadeIn>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">{t('cultureTitle')}</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('cultureSubtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <Card key={idx} className="text-center !p-6">
                <div className="w-14 h-14 rounded-xl bg-[#1e3a5f]/10 text-[#1e3a5f] flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="font-bold text-[#1e3a5f] text-lg mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Back Office */}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BACK_OFFICE_ITEMS.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {item.paths.map((d, i) => (
                      <path key={i} strokeLinecap="round" strokeLinejoin="round" d={d} />
                    ))}
                  </svg>
                </div>
                <h3 className="font-semibold">{tServicios(`${backOfficeKeys[idx]}Title`)}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Numbers */}
      <FadeIn>
      <section className="section-padding bg-[#faf8f5]">
        <div className="container-custom">
          <h2 className="heading-2 text-center mb-12">{t('numbersTitle')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '+60', label: t('numbersStat1') },
              { value: '4.81', label: t('numbersStat2') },
              { value: '8.9', label: t('numbersStat3') },
              { value: '+30%', label: t('numbersStat4') },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-2">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
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
          <h2 className="heading-2 mb-4">{t('ctaTitle')}</h2>
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
