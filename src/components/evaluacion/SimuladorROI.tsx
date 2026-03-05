'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'

const COMUNAS_OPERACION = ['Providencia', 'Las Condes', 'Vitacura', 'Ñuñoa', 'Santiago']

interface PropertyForm {
  tipoPropiedad: string
  tipologia: string
  comuna: string
  otraComuna: string
  direccion: string
  amenidades: string[]
  otraInfo: string
}

interface ContactForm {
  name: string
  email: string
  phone: string
  website: string
}

type SubmitResult = 'success' | 'no_cobertura' | 'no_tipologia_santiago'

export default function SimuladorROI() {
  const t = useTranslations('SimuladorROI')
  const [currentStep, setCurrentStep] = useState(1)

  const TIPOLOGIAS = [
    { value: 'studio_1d', label: t('typologyStudio') },
    { value: '2d', label: t('typology2d') },
    { value: '3d', label: t('typology3d') },
    { value: '4d_plus', label: t('typology4d') },
  ]

  const TIPOS_PROPIEDAD = [
    { value: 'departamento', label: t('typeDepartamento') },
    { value: 'casa', label: t('typeCasa') },
  ]

  const AMENIDADES = [
    { value: 'amoblado', label: t('amenityFurnished') },
    { value: 'piscina', label: t('amenityPool') },
    { value: 'estacionamiento', label: t('amenityParking') },
    { value: 'vista', label: t('amenityView') },
    { value: 'ac', label: t('amenityAC') },
  ]

  const STEPS = [
    { number: 1, label: t('step1Label') },
    { number: 2, label: t('step2Label') },
  ]

  const [propertyForm, setPropertyForm] = useState<PropertyForm>({
    tipoPropiedad: '',
    tipologia: '',
    comuna: '',
    otraComuna: '',
    direccion: '',
    amenidades: [],
    otraInfo: '',
  })

  const [contact, setContact] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    website: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitResult, setSubmitResult] = useState<SubmitResult>('success')
  const [submitError, setSubmitError] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep1 = useCallback((): boolean => {
    const newErrors: Record<string, string> = {}
    if (!propertyForm.tipoPropiedad) newErrors.tipoPropiedad = t('errorPropertyType')
    if (!propertyForm.tipologia) newErrors.tipologia = t('errorTypology')
    if (!propertyForm.comuna) newErrors.comuna = t('errorComuna')
    if (propertyForm.comuna === 'Otra' && !propertyForm.otraComuna.trim()) {
      newErrors.otraComuna = t('errorOtraComuna')
    }
    if (!propertyForm.direccion.trim()) newErrors.direccion = t('errorAddress')
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [propertyForm, t])

  const validateStep2 = useCallback((): boolean => {
    const newErrors: Record<string, string> = {}
    if (!contact.name.trim()) newErrors.name = t('errorName')
    if (!contact.email.trim()) {
      newErrors.email = t('errorEmail')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      newErrors.email = t('errorEmailInvalid')
    }
    if (!contact.phone.trim()) newErrors.phone = t('errorPhone')
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [contact, t])

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return
      setErrors({})
      setCurrentStep(2)
    }
  }

  const handleBack = () => {
    setErrors({})
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const getSubmitResultType = (): SubmitResult => {
    const comuna = propertyForm.comuna === 'Otra' ? propertyForm.otraComuna : propertyForm.comuna

    // Otra comuna (no está en nuestras comunas de operación)
    if (!COMUNAS_OPERACION.includes(comuna)) return 'no_cobertura'

    // Santiago + Studio/1D
    if (comuna === 'Santiago' && propertyForm.tipologia === 'studio_1d') return 'no_tipologia_santiago'

    return 'success'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep2()) return

    // Honeypot: if filled, silently fake success
    if (contact.website) {
      setSubmitResult('success')
      setSubmitted(true)
      return
    }

    setSubmitting(true)
    setSubmitError('')

    const resultType = getSubmitResultType()
    const comunaFinal = propertyForm.comuna === 'Otra' ? propertyForm.otraComuna : propertyForm.comuna
    const tipologiaLabel = TIPOLOGIAS.find(t => t.value === propertyForm.tipologia)?.label || propertyForm.tipologia
    const tipoLabel = TIPOS_PROPIEDAD.find(t => t.value === propertyForm.tipoPropiedad)?.label || propertyForm.tipoPropiedad

    try {
      const res = await fetch('/api/evaluacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          comuna: comunaFinal,
          propertyType: tipoLabel,
          tipologia: tipologiaLabel,
          direccion: propertyForm.direccion,
          amenidades: propertyForm.amenidades.map(a => AMENIDADES.find(am => am.value === a)?.label || a),
          otraInfo: propertyForm.otraInfo,
          cobertura: resultType === 'success',
          notas: resultType === 'no_cobertura'
            ? `Sin cobertura - Comuna: ${comunaFinal}`
            : resultType === 'no_tipologia_santiago'
            ? `Santiago - Tipología no aceptada: ${tipologiaLabel}`
            : '',
        }),
      })

      if (!res.ok) throw new Error('Error al enviar')

      setSubmitResult(resultType)
      setSubmitted(true)
    } catch {
      setSubmitError(t('submitError'))
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setCurrentStep(1)
    setPropertyForm({ tipoPropiedad: '', tipologia: '', comuna: '', otraComuna: '', direccion: '', amenidades: [], otraInfo: '' })
    setContact({ name: '', email: '', phone: '', website: '' })
    setSubmitted(false)
    setSubmitError('')
    setErrors({})
  }

  return (
    <>
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#1e3a5f] via-[#1e3a5f] to-[#152a45] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-64 h-64 bg-[#c53030] rounded-full blur-3xl" />
        </div>

        <div className="container-custom mx-auto px-4 md:px-8 pt-32 pb-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium">{t('heroBadge')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('heroTitle')} <span className="text-[#e53e3e] italic">{t('heroTitleHighlight')}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              {t('heroSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Form Body */}
      <section className="section-padding bg-[#faf8f5]">
        <div className="container-custom mx-auto">
          {/* Progress Steps */}
          {!submitted && (
            <div className="max-w-md mx-auto mb-12">
              <div className="flex items-center justify-between">
                {STEPS.map((step, idx) => (
                  <div key={step.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                          currentStep >= step.number
                            ? 'bg-[#1e3a5f] text-white shadow-lg'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {currentStep > step.number ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          step.number
                        )}
                      </div>
                      <span
                        className={`mt-2 text-xs font-medium ${
                          currentStep >= step.number ? 'text-[#1e3a5f]' : 'text-gray-400'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {idx < STEPS.length - 1 && (
                      <div className="flex-1 mx-3">
                        <div className="h-1 rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className={`h-full bg-[#1e3a5f] transition-all duration-500 ease-out ${
                              currentStep > step.number ? 'w-full' : 'w-0'
                            }`}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="max-w-2xl mx-auto">
            {/* Step 1: Property Info */}
            {currentStep === 1 && !submitted && (
              <div className="animate-fade-in-up">
                <div className="card">
                  <h2 className="heading-2 mb-2">{t('step1Title')}</h2>
                  <p className="text-gray-500 mb-8">
                    {t('step1Subtitle')}
                  </p>

                  {/* Tipo de propiedad */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-[#1e3a5f] mb-3">
                      {t('labelPropertyType')}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {TIPOS_PROPIEDAD.map((tipo) => (
                        <button
                          key={tipo.value}
                          type="button"
                          onClick={() => {
                            setPropertyForm((prev) => ({ ...prev, tipoPropiedad: tipo.value }))
                            if (errors.tipoPropiedad) setErrors((prev) => ({ ...prev, tipoPropiedad: '' }))
                          }}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                            propertyForm.tipoPropiedad === tipo.value
                              ? 'border-[#1e3a5f] bg-[#1e3a5f] text-white shadow-md'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-sm'
                          }`}
                        >
                          <div className="mb-1">
                            {tipo.value === 'casa' ? (
                              <svg className="w-7 h-7 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                            ) : (
                              <svg className="w-7 h-7 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm font-medium">{tipo.label}</span>
                        </button>
                      ))}
                    </div>
                    {errors.tipoPropiedad && (
                      <p className="text-[#c53030] text-sm mt-2">{errors.tipoPropiedad}</p>
                    )}
                  </div>

                  {/* Tipología */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-[#1e3a5f] mb-3">
                      {t('labelTypology')}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {TIPOLOGIAS.map((tip) => (
                        <button
                          key={tip.value}
                          type="button"
                          onClick={() => {
                            setPropertyForm((prev) => ({ ...prev, tipologia: tip.value }))
                            if (errors.tipologia) setErrors((prev) => ({ ...prev, tipologia: '' }))
                          }}
                          className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                            propertyForm.tipologia === tip.value
                              ? 'border-[#1e3a5f] bg-[#1e3a5f] text-white shadow-md'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-sm'
                          }`}
                        >
                          <span className="text-sm font-medium">{tip.label}</span>
                        </button>
                      ))}
                    </div>
                    {errors.tipologia && (
                      <p className="text-[#c53030] text-sm mt-2">{errors.tipologia}</p>
                    )}
                  </div>

                  {/* Comuna */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-[#1e3a5f] mb-2">
                      {t('labelComuna')}
                    </label>
                    <select
                      value={propertyForm.comuna}
                      onChange={(e) => {
                        setPropertyForm((prev) => ({ ...prev, comuna: e.target.value, otraComuna: '' }))
                        if (errors.comuna) setErrors((prev) => ({ ...prev, comuna: '' }))
                      }}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 bg-white text-gray-900 focus:outline-none focus:border-[#1e3a5f] ${
                        errors.comuna ? 'border-[#c53030]' : 'border-gray-200'
                      }`}
                    >
                      <option value="">{t('comunaPlaceholder')}</option>
                      {COMUNAS_OPERACION.map((comuna) => (
                        <option key={comuna} value={comuna}>{comuna}</option>
                      ))}
                      <option value="Otra">{t('comunaOtra')}</option>
                    </select>
                    {errors.comuna && (
                      <p className="text-[#c53030] text-sm mt-1">{errors.comuna}</p>
                    )}
                  </div>

                  {/* Otra comuna - input */}
                  {propertyForm.comuna === 'Otra' && (
                    <div className="mb-6 animate-fade-in-up">
                      <label className="block text-sm font-semibold text-[#1e3a5f] mb-2">
                        {t('labelOtraComuna')}
                      </label>
                      <input
                        type="text"
                        value={propertyForm.otraComuna}
                        onChange={(e) => {
                          setPropertyForm((prev) => ({ ...prev, otraComuna: e.target.value }))
                          if (errors.otraComuna) setErrors((prev) => ({ ...prev, otraComuna: '' }))
                        }}
                        placeholder={t('placeholderOtraComuna')}
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 bg-white text-gray-900 focus:outline-none focus:border-[#1e3a5f] ${
                          errors.otraComuna ? 'border-[#c53030]' : 'border-gray-200'
                        }`}
                      />
                      {errors.otraComuna && (
                        <p className="text-[#c53030] text-sm mt-1">{errors.otraComuna}</p>
                      )}
                    </div>
                  )}

                  {/* Dirección exacta */}
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-[#1e3a5f] mb-2">
                      {t('labelAddress')}
                    </label>
                    <input
                      type="text"
                      value={propertyForm.direccion}
                      onChange={(e) => {
                        setPropertyForm((prev) => ({ ...prev, direccion: e.target.value }))
                        if (errors.direccion) setErrors((prev) => ({ ...prev, direccion: '' }))
                      }}
                      placeholder={t('placeholderAddress')}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 bg-white text-gray-900 focus:outline-none focus:border-[#1e3a5f] ${
                        errors.direccion ? 'border-[#c53030]' : 'border-gray-200'
                      }`}
                    />
                    {errors.direccion && (
                      <p className="text-[#c53030] text-sm mt-1">{errors.direccion}</p>
                    )}
                  </div>

                  {/* Amenidades */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-[#1e3a5f] mb-3">
                      {t('labelAmenities')}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {AMENIDADES.map((amenidad) => (
                        <button
                          key={amenidad.value}
                          type="button"
                          onClick={() => {
                            setPropertyForm((prev) => ({
                              ...prev,
                              amenidades: prev.amenidades.includes(amenidad.value)
                                ? prev.amenidades.filter((a) => a !== amenidad.value)
                                : [...prev.amenidades, amenidad.value],
                            }))
                          }}
                          className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                            propertyForm.amenidades.includes(amenidad.value)
                              ? 'border-[#1e3a5f] bg-[#1e3a5f]/5'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-colors duration-200 ${
                              propertyForm.amenidades.includes(amenidad.value)
                                ? 'bg-[#1e3a5f] border-[#1e3a5f]'
                                : 'border-gray-300 bg-white'
                            }`}
                          >
                            {propertyForm.amenidades.includes(amenidad.value) && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm font-medium text-gray-700">{amenidad.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Otra información */}
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-[#1e3a5f] mb-2">
                      {t('labelOtherInfo')}
                    </label>
                    <textarea
                      value={propertyForm.otraInfo}
                      onChange={(e) => setPropertyForm((prev) => ({ ...prev, otraInfo: e.target.value }))}
                      placeholder={t('placeholderOtherInfo')}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 transition-colors duration-200 bg-white text-gray-900 focus:outline-none focus:border-[#1e3a5f] resize-none"
                    />
                  </div>

                  {/* Next button */}
                  <div className="flex justify-end">
                    <button type="button" onClick={handleNext} className="btn-primary text-lg px-10">
                      {t('nextButton')}
                      <svg className="inline-block w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact */}
            {currentStep === 2 && !submitted && (
              <div className="animate-fade-in-up">
                <div className="card">
                  <div className="text-center mb-8">
                    <div className="inline-block bg-[#1e3a5f]/10 rounded-full p-3 mb-4">
                      <svg className="w-8 h-8 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h2 className="heading-2 mb-2">{t('step2Title')}</h2>
                    <p className="text-gray-500 max-w-md mx-auto">
                      {t('step2Subtitle')}
                    </p>
                  </div>

                  {/* Summary of property */}
                  <div className="bg-[#faf8f5] rounded-xl p-4 mb-8">
                    <p className="text-sm font-semibold text-[#1e3a5f] mb-2">{t('propertySummary')}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-[#1e3a5f]/10 text-[#1e3a5f] px-2.5 py-1 rounded-full font-medium">
                        {TIPOS_PROPIEDAD.find(tp => tp.value === propertyForm.tipoPropiedad)?.label}
                      </span>
                      <span className="text-xs bg-[#1e3a5f]/10 text-[#1e3a5f] px-2.5 py-1 rounded-full font-medium">
                        {TIPOLOGIAS.find(tp => tp.value === propertyForm.tipologia)?.label}
                      </span>
                      <span className="text-xs bg-[#1e3a5f]/10 text-[#1e3a5f] px-2.5 py-1 rounded-full font-medium">
                        {propertyForm.comuna === 'Otra' ? propertyForm.otraComuna : propertyForm.comuna}
                      </span>
                    </div>
                    {propertyForm.amenidades.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {propertyForm.amenidades.map((a) => (
                          <span key={a} className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                            {AMENIDADES.find(am => am.value === a)?.label}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-2">{propertyForm.direccion}</p>
                    {propertyForm.otraInfo && (
                      <p className="text-xs text-gray-400 mt-1 italic">{propertyForm.otraInfo}</p>
                    )}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#1e3a5f] mb-1">{t('labelContactName')}</label>
                      <input
                        type="text"
                        value={contact.name}
                        onChange={(e) => {
                          setContact((prev) => ({ ...prev, name: e.target.value }))
                          if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
                        }}
                        placeholder={t('placeholderContactName')}
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 bg-white text-gray-900 focus:outline-none focus:border-[#1e3a5f] ${
                          errors.name ? 'border-[#c53030]' : 'border-gray-200'
                        }`}
                      />
                      {errors.name && <p className="text-[#c53030] text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1e3a5f] mb-1">{t('labelContactEmail')}</label>
                      <input
                        type="email"
                        value={contact.email}
                        onChange={(e) => {
                          setContact((prev) => ({ ...prev, email: e.target.value }))
                          if (errors.email) setErrors((prev) => ({ ...prev, email: '' }))
                        }}
                        placeholder={t('placeholderContactEmail')}
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 bg-white text-gray-900 focus:outline-none focus:border-[#1e3a5f] ${
                          errors.email ? 'border-[#c53030]' : 'border-gray-200'
                        }`}
                      />
                      {errors.email && <p className="text-[#c53030] text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1e3a5f] mb-1">{t('labelContactPhone')}</label>
                      <input
                        type="tel"
                        value={contact.phone}
                        onChange={(e) => {
                          setContact((prev) => ({ ...prev, phone: e.target.value }))
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }))
                        }}
                        placeholder={t('placeholderContactPhone')}
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 bg-white text-gray-900 focus:outline-none focus:border-[#1e3a5f] ${
                          errors.phone ? 'border-[#c53030]' : 'border-gray-200'
                        }`}
                      />
                      {errors.phone && <p className="text-[#c53030] text-sm mt-1">{errors.phone}</p>}
                    </div>

                    {/* Honeypot field - hidden from humans */}
                    <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                      <label htmlFor="website">Leave this field empty</label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        value={contact.website}
                        onChange={(e) => setContact((prev) => ({ ...prev, website: e.target.value }))}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {submitError && (
                      <div className="bg-red-50 border border-[#c53030]/20 text-[#c53030] text-sm p-3 rounded-lg">
                        {submitError}
                      </div>
                    )}

                    <div className="flex justify-between pt-4">
                      <button type="button" onClick={handleBack} className="btn-secondary">
                        <svg className="inline-block w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                        {t('backButton')}
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className={`btn-red text-lg px-8 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {submitting ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            {t('submitting')}
                          </span>
                        ) : (
                          t('submitButton')
                        )}
                      </button>
                    </div>

                    <p className="text-center text-xs text-gray-400 pt-2">
                      {t('privacyNote')}
                    </p>
                  </form>
                </div>
              </div>
            )}

            {/* Submitted States */}
            {submitted && (
              <div className="animate-fade-in-up">
                <div className="card">
                  {/* Success - dentro de cobertura */}
                  {submitResult === 'success' && (
                    <div className="text-center py-8">
                      <div className="inline-block bg-green-100 rounded-full p-4 mb-4">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="heading-2 mb-2">{t('successTitle')}</h3>
                      <p className="text-gray-500 max-w-md mx-auto mb-6">
                        {t('successDesc')}
                      </p>
                      <div className="bg-[#faf8f5] rounded-xl p-4 max-w-sm mx-auto mb-6">
                        <p className="text-sm text-gray-500 mb-1">{t('successResponseLabel')}</p>
                        <p className="text-lg font-bold text-[#1e3a5f]">{t('successResponseTime')}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                          href="https://wa.me/56942237814"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary inline-flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          {t('successWhatsapp')}
                        </a>
                        <button type="button" onClick={resetForm} className="btn-secondary">
                          {t('successNewEval')}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Sin cobertura en la comuna */}
                  {submitResult === 'no_cobertura' && (
                    <div className="text-center py-8">
                      <div className="inline-block bg-amber-100 rounded-full p-4 mb-4">
                        <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <h3 className="heading-2 mb-2">{t('noCoverageTitle')}</h3>
                      <p className="text-gray-500 max-w-md mx-auto mb-6">
                        {t('noCoverageDesc')}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                          href="https://wa.me/56942237814"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary inline-flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          {t('noCoverageWhatsapp')}
                        </a>
                        <button type="button" onClick={resetForm} className="btn-secondary">
                          {t('successNewEval')}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Santiago + Studio/1D */}
                  {submitResult === 'no_tipologia_santiago' && (
                    <div className="text-center py-8">
                      <div className="inline-block bg-amber-100 rounded-full p-4 mb-4">
                        <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="heading-2 mb-2">{t('noTypologyTitle')}</h3>
                      <p className="text-gray-500 max-w-md mx-auto mb-6">
                        {t('noTypologyDesc')}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                          href="https://wa.me/56942237814"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary inline-flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          {t('noTypologyWhatsapp')}
                        </a>
                        <button type="button" onClick={resetForm} className="btn-secondary">
                          {t('successNewEval')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
