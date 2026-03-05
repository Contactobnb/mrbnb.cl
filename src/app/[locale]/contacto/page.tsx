'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { useTranslations } from 'next-intl'

type ContactType = 'general' | 'evaluacion' | 'corretaje'

export default function ContactoPage() {
  const t = useTranslations('ContactoPage')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'general' as ContactType,
    propertyDetails: '',
    message: '',
    website: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    // Honeypot: if filled, silently fake success
    if (formData.website) {
      setSubmitted(true)
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Error')
      }

      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        type: 'general',
        propertyDetails: '',
        message: '',
        website: '',
      })
    } catch {
      setError(t('submitError'))
    } finally {
      setIsSubmitting(false)
    }
  }

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

      {/* Contact Content */}
      <section className="section-padding bg-[#faf8f5]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <Card hover={false} className="!p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="heading-3 mb-4">{t('successTitle')}</h2>
                    <p className="text-gray-600 mb-6">
                      {t('successDesc')}
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => setSubmitted(false)}
                    >
                      {t('successButton')}
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="heading-3 mb-6">{t('formTitle')}</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('labelName')}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 outline-none transition-all"
                          placeholder={t('placeholderName')}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('labelEmail')}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 outline-none transition-all"
                          placeholder={t('placeholderEmail')}
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('labelPhone')}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 outline-none transition-all"
                          placeholder={t('placeholderPhone')}
                        />
                      </div>

                      {/* Type */}
                      <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('labelType')}
                        </label>
                        <select
                          id="type"
                          name="type"
                          required
                          value={formData.type}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 outline-none transition-all bg-white"
                        >
                          <option value="general">{t('optionGeneral')}</option>
                          <option value="evaluacion">{t('optionEvaluacion')}</option>
                          <option value="corretaje">{t('optionCorretaje')}</option>
                        </select>
                      </div>

                      {/* Property Details (optional) */}
                      <div>
                        <label htmlFor="propertyDetails" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('labelProperty')}
                        </label>
                        <input
                          type="text"
                          id="propertyDetails"
                          name="propertyDetails"
                          value={formData.propertyDetails}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 outline-none transition-all"
                          placeholder={t('placeholderProperty')}
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('labelMessage')}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 outline-none transition-all resize-vertical"
                          placeholder={t('placeholderMessage')}
                        />
                      </div>

                      {/* Honeypot field - hidden from humans */}
                      <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                        <label htmlFor="website">Leave empty</label>
                        <input
                          type="text"
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                          <p className="text-red-700 text-sm">{error}</p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? t('submitting') : t('submitButton')}
                      </Button>
                    </form>
                  </>
                )}
              </Card>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* WhatsApp CTA */}
              <Card hover={false} className="!p-6 bg-green-50 !shadow-none border border-green-200">
                <h3 className="font-bold text-green-800 text-lg mb-2">
                  {t('whatsappTitle')}
                </h3>
                <p className="text-green-700 text-sm mb-4">
                  {t('whatsappDesc')}
                </p>
                <Button
                  href="https://wa.me/56942237814"
                  variant="primary"
                  external
                  className="!bg-green-600 hover:!bg-green-700 w-full justify-center flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t('whatsappButton')}
                </Button>
              </Card>

              {/* Contact Details */}
              <Card hover={false} className="!p-6">
                <h3 className="font-bold text-[#1e3a5f] text-lg mb-4">{t('contactInfoTitle')}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#1e3a5f]/10 text-[#1e3a5f] flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t('contactEmail')}</p>
                      <a href="mailto:felipe@mrbnb.cl" className="text-[#1e3a5f] font-semibold hover:underline">
                        felipe@mrbnb.cl
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#1e3a5f]/10 text-[#1e3a5f] flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t('contactPhone')}</p>
                      <a href="tel:+56942237814" className="text-[#1e3a5f] font-semibold hover:underline">
                        +56 9 4223 7814
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#1e3a5f]/10 text-[#1e3a5f] flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t('contactLocation')}</p>
                      <p className="text-[#1e3a5f] font-semibold">{t('contactCity')}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card hover={false} className="!p-6">
                <h3 className="font-bold text-[#1e3a5f] text-lg mb-4">{t('quickActionsTitle')}</h3>
                <div className="space-y-3">
                  <Button href="/evaluacion" variant="secondary" className="w-full text-center">
                    {t('quickEvaluate')}
                  </Button>
                  <Button href="/servicios" variant="secondary" className="w-full text-center">
                    {t('quickServices')}
                  </Button>
                  <Button href="/portfolio" variant="secondary" className="w-full text-center">
                    {t('quickPortfolio')}
                  </Button>
                </div>
              </Card>

              {/* Response time */}
              <div className="bg-[#1e3a5f]/5 border border-[#1e3a5f]/10 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#1e3a5f] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-[#1e3a5f] font-semibold text-sm">{t('responseTimeTitle')}</p>
                    <p className="text-gray-500 text-sm">
                      {t('responseTimeDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
