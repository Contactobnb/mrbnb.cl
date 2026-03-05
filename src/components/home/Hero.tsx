import Image from 'next/image'
import Button from '@/components/ui/Button'
import { WHATSAPP_URL } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'

export default async function Hero() {
  const t = await getTranslations('Hero')

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/properties/providencia-emilio-vaisse.jpg"
        alt={t('heroImageAlt')}
        fill
        priority
        className="object-cover"
        sizes="100vw"
        quality={85}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/90 via-[#1e3a5f]/80 to-[#1e3a5f]/60" />
      {/* Accent glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#c53030] rounded-full blur-3xl" />
      </div>

      <div className="container-custom mx-auto px-4 md:px-8 pt-20 md:pt-0 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium">{t('badge')}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('titleLine1')}{' '}
              <span className="text-[#e53e3e] italic">{t('titleHighlight')}</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-4 leading-relaxed max-w-xl">
              {t('subtitle')}
            </p>
            <p className="text-xl md:text-2xl font-semibold mb-8">
              {t('taglineMore')} <span className="text-[#e53e3e]">{t('taglineZero')}</span> {t('taglineStress')} <span className="text-[#e53e3e]">{t('taglinePremium')}</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/evaluacion" variant="red" size="lg">
                {t('ctaPrimary')}
              </Button>
              <Button href={WHATSAPP_URL} variant="white" size="lg" external>
                {t('ctaSecondary')}
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-md">
              <div>
                <div className="text-3xl font-bold text-[#e53e3e]">4.81</div>
                <div className="text-xs text-gray-400 mt-1">{t('ratingAirbnb')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#e53e3e]">8.9</div>
                <div className="text-xs text-gray-400 mt-1">{t('ratingBooking')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#e53e3e]">+30%</div>
                <div className="text-xs text-gray-400 mt-1">{t('vsTraditional')}</div>
              </div>
            </div>
          </div>

          {/* Right side - Feature cards */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-white text-xl font-bold mb-6">{t('featureTitle')}</h3>
                <div className="space-y-4">
                  {[
                    { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>, text: t('feature1') },
                    { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" /></svg>, text: t('feature2') },
                    { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>, text: t('feature3') },
                    { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" /></svg>, text: t('feature4') },
                    { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>, text: t('feature5') },
                    { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>, text: t('feature6') },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/90">
                      <span className="text-[#e53e3e] flex-shrink-0">{item.icon}</span>
                      <span className="text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#c53030] text-white rounded-xl px-5 py-3 shadow-xl">
                <div className="text-sm font-bold">{t('superhostBadge')}</div>
                <div className="text-xs opacity-80">{t('superhostVerified')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
