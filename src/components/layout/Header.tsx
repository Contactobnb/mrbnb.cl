'use client'

import { useState } from 'react'
import NextLink from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('Header')

  const navLinks = [
    { href: '/servicios', label: t('servicios') },
    { href: '/proceso', label: t('proceso') },
    { href: '/evaluacion', label: t('evaluacion') },
    { href: '/portfolio', label: t('portfolio') },
    { href: '/nosotros', label: t('nosotros') },
    { href: '/blog', label: t('blog') },
    { href: '/contacto', label: t('contacto') },
  ]

  // Strip locale prefix for active check
  const pathWithoutLocale = pathname.replace(/^\/(es|en)/, '') || '/'

  const isActive = (href: string) =>
    pathWithoutLocale === href || (href !== '/' && pathWithoutLocale.startsWith(href))

  const switchLocale = () => {
    const newLocale = locale === 'es' ? 'en' : 'es'
    // Replace locale in current path
    const newPath = pathname.replace(/^\/(es|en)/, `/${newLocale}`)
    router.push(newPath)
  }

  // Build locale-aware hrefs
  const localePath = (href: string) => `/${locale}${href}`

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="container-custom mx-auto flex items-center justify-between h-16 md:h-20 px-4 md:px-8">
        <NextLink href={localePath('/')} className="flex items-center gap-2 p-1">
          <Image
            src="/images/Logo_MB.png"
            alt="Mr.BnB"
            width={48}
            height={48}
            className="h-10 w-10 md:h-12 md:w-12 rounded-lg"
            priority
          />
        </NextLink>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <NextLink
              key={link.href}
              href={localePath(link.href)}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? 'text-[#c53030]'
                  : 'text-gray-700 hover:text-[#1e3a5f]'
              }`}
            >
              {link.label}
            </NextLink>
          ))}

          {/* Language Selector */}
          <button
            onClick={switchLocale}
            className="text-xs font-bold border border-gray-300 rounded px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors uppercase"
            aria-label={locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            {locale === 'es' ? 'EN' : 'ES'}
          </button>

          <NextLink href={localePath('/evaluacion')} className="btn-primary text-sm !py-2 !px-4">
            {t('cta')}
          </NextLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-gray-700"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Nav */}
      <div
        className={`lg:hidden fixed top-16 left-0 right-0 bg-white border-t shadow-lg z-50 transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <nav className="container-custom mx-auto py-4 px-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <NextLink
              key={link.href}
              href={localePath(link.href)}
              onClick={() => setIsOpen(false)}
              className={`text-base font-medium py-2 ${
                isActive(link.href)
                  ? 'text-[#c53030]'
                  : 'text-gray-700 hover:text-[#1e3a5f]'
              }`}
            >
              {link.label}
            </NextLink>
          ))}

          {/* Mobile Language Selector */}
          <button
            onClick={() => {
              switchLocale()
              setIsOpen(false)
            }}
            className="text-base font-medium py-2 text-gray-700 hover:text-[#1e3a5f] text-left"
          >
            {locale === 'es' ? '🌐 English' : '🌐 Español'}
          </button>

          <NextLink
            href={localePath('/evaluacion')}
            onClick={() => setIsOpen(false)}
            className="btn-primary text-center mt-2"
          >
            {t('cta')}
          </NextLink>
        </nav>
      </div>
    </header>
  )
}
