'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function CookieConsent() {
  const t = useTranslations('CookieConsent')
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShow(false)
  }

  const dismiss = () => {
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-20 left-0 right-0 z-40 p-4 md:p-6">
      <div className="container-custom mx-auto max-w-2xl">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="text-sm text-gray-600 flex-1">
            {t('message')}{' '}
            <Link href="/politica-privacidad" className="text-[#1e3a5f] underline hover:text-[#c53030]">
              {t('privacyLink')}
            </Link>.
          </p>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={accept}
              className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#152a45] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2"
            >
              {t('accept')}
            </button>
            <button
              onClick={dismiss}
              className="text-gray-500 px-3 py-2 rounded-lg text-sm hover:text-gray-700 transition-colors"
            >
              {t('dismiss')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
