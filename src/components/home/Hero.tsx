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
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-lg">
              <div>
                <div className="text-3xl font-bold text-[#e53e3e]">4.81★</div>
                <div className="text-xs text-gray-400 mt-1">{t('ratingAirbnb')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#e53e3e]">8.9</div>
                <div className="text-xs text-gray-400 mt-1">{t('ratingBooking')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#e53e3e]">+1400</div>
                <div className="text-xs text-gray-400 mt-1">{t('reviews')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#e53e3e]">+60</div>
                <div className="text-xs text-gray-400 mt-1">{t('properties')}</div>
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
              <a href="https://www.airbnb.cl/users/profile/1465458880465231993" target="_blank" rel="noopener noreferrer" className="absolute -bottom-4 -right-4 bg-[#c53030] text-white rounded-xl px-5 py-3 shadow-xl hover:bg-[#b52828] transition-colors text-center">
                <div className="text-sm font-bold mb-1.5">{t('superhostBadge')}</div>
                <svg className="w-16 h-5 mx-auto" viewBox="329.775 439.999 320.426 100.002" fill="white">
                  <path d="M498.65 465.125c0 3.604-2.904 6.506-6.508 6.506s-6.506-2.902-6.506-6.506 2.803-6.506 6.506-6.506c3.706.1 6.508 3.003 6.508 6.506zm-26.828 13.114v1.602s-3.102-4.006-9.709-4.006c-10.91 0-19.42 8.309-19.42 19.82 0 11.412 8.41 19.82 19.42 19.82 6.707 0 9.709-4.104 9.709-4.104v1.701c0 .801.602 1.4 1.402 1.4h8.107v-37.639h-8.107c-.8.003-1.402.705-1.402 1.406zm0 24.123c-1.5 2.203-4.504 4.105-8.107 4.105-6.406 0-11.312-4.004-11.312-10.812 0-6.807 4.906-10.811 11.312-10.811 3.504 0 6.707 2.002 8.107 4.104v13.414zm15.516-25.526h9.609v37.639h-9.609v-37.639zm143.545-1.002c-6.607 0-9.711 4.006-9.711 4.006v-21.121h-9.609v55.756h8.109c.801 0 1.4-.701 1.4-1.402v-1.701s3.104 4.104 9.709 4.104c10.912 0 19.42-8.406 19.42-19.818s-8.508-19.824-19.318-19.824zm-1.602 30.532c-3.705 0-6.607-1.9-8.109-4.104v-13.414c1.502-2.002 4.705-4.104 8.109-4.104 6.406 0 11.311 4.004 11.311 10.811s-4.904 10.811-11.311 10.811zm-22.722-14.213v22.422h-9.611v-21.322c0-6.205-2.002-8.709-7.404-8.709-2.902 0-5.906 1.502-7.811 3.705v26.227h-9.607v-37.639h7.605c.801 0 1.402.701 1.402 1.402v1.602c2.803-2.904 6.506-4.006 10.209-4.006 4.205 0 7.709 1.203 10.512 3.605 3.402 2.803 4.705 6.406 4.705 12.713zm-57.76-16.319c-6.605 0-9.709 4.006-9.709 4.006v-21.121h-9.609v55.756h8.107c.801 0 1.402-.701 1.402-1.402v-1.701s3.104 4.104 9.709 4.104c10.912 0 19.42-8.406 19.42-19.818.1-11.413-8.408-19.824-19.32-19.824zm-1.602 30.532c-3.703 0-6.605-1.9-8.107-4.104v-13.414c1.502-2.002 4.705-4.104 8.107-4.104 6.408 0 11.312 4.004 11.312 10.811s-4.904 10.811-11.312 10.811zm-26.025-30.532c2.902 0 4.404.502 4.404.502v8.908s-8.008-2.703-13.012 3.004v26.326h-9.611v-37.738h8.109c.801 0 1.4.701 1.4 1.402v1.602c1.804-2.103 5.708-4.006 8.71-4.006zm-99.799 35.237c-.5-1.201-1.001-2.502-1.501-3.604-.802-1.801-1.603-3.504-2.302-5.105l-.1-.1c-6.908-15.016-14.314-30.23-22.123-45.244l-.3-.602a196.953 196.953 0 0 1-2.401-4.705c-1.002-1.803-2.002-3.703-3.604-5.506-3.203-4.004-7.808-6.207-12.712-6.207-5.006 0-9.51 2.203-12.812 6.006-1.502 1.801-2.604 3.703-3.604 5.506a217.271 217.271 0 0 1-2.401 4.705l-.301.602c-7.708 15.014-15.215 30.229-22.122 45.244l-.101.199c-.7 1.604-1.502 3.305-2.303 5.105-.5 1.102-1 2.303-1.5 3.604-1.302 3.703-1.703 7.207-1.201 10.812 1.101 7.508 6.105 13.812 13.013 16.617 2.603 1.102 5.306 1.602 8.108 1.602.801 0 1.801-.1 2.603-.201 3.304-.4 6.707-1.5 10.011-3.402 4.104-2.303 8.008-5.605 12.412-10.41 4.404 4.805 8.408 8.107 12.412 10.41 3.305 1.902 6.707 3.002 10.01 3.402.801.102 1.803.201 2.604.201 2.803 0 5.605-.5 8.107-1.602 7.008-2.805 11.912-9.209 13.014-16.617.795-3.503.395-7.005-.906-10.71zm-45.144 5.205c-5.406-6.807-8.91-13.213-10.11-18.617-.5-2.303-.601-4.305-.3-6.107.199-1.602.801-3.004 1.602-4.205 1.902-2.701 5.105-4.404 8.809-4.404 3.705 0 7.008 1.602 8.81 4.404.801 1.201 1.401 2.604 1.603 4.205.299 1.803.199 3.904-.301 6.107-1.205 5.304-4.709 11.711-10.113 18.617zm39.938 4.705c-.7 5.205-4.204 9.711-9.108 11.713-2.402 1-5.006 1.301-7.607 1-2.502-.301-5.006-1.102-7.607-2.602-3.604-2.004-7.207-5.105-11.412-9.711 6.606-8.107 10.61-15.516 12.112-22.121.701-3.104.802-5.906.5-8.51-.399-2.502-1.301-4.805-2.702-6.807-3.105-4.506-8.311-7.107-14.115-7.107s-11.01 2.703-14.113 7.107c-1.401 2.002-2.303 4.305-2.703 6.807-.4 2.604-.301 5.506.5 8.51 1.501 6.605 5.605 14.113 12.111 22.221-4.104 4.605-7.808 7.709-11.412 9.711-2.603 1.502-5.104 2.303-7.606 2.602-2.702.301-5.306-.1-7.608-1-4.904-2.002-8.408-6.508-9.108-11.713-.3-2.502-.101-5.004.901-7.807.299-1.002.801-2.002 1.301-3.203.701-1.602 1.5-3.305 2.302-5.006l.101-.199c6.906-14.916 14.313-30.131 22.021-44.945l.3-.602c.802-1.5 1.603-3.102 2.403-4.604.801-1.602 1.701-3.104 2.803-4.406 2.102-2.4 4.904-3.703 8.008-3.703s5.906 1.303 8.008 3.703c1.102 1.305 2.002 2.807 2.803 4.406.802 1.502 1.603 3.104 2.402 4.604l.301.602a1325.424 1325.424 0 0 1 21.922 45.045v.1c.802 1.604 1.502 3.404 2.303 5.008.5 1.199 1.001 2.199 1.301 3.201.799 2.6 1.099 5.104.698 7.706z" />
                </svg>
              </a>
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
