'use client'

import { useState, useCallback } from 'react'
import {
  calculateROI,
  COMUNAS,
  PROPERTY_TYPES,
  AMENITIES,
  AMENITY_LABELS,
  type PropertyData,
  type ROIResult,
} from '@/lib/pricing'
import { formatCLP } from '@/lib/utils'

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  '1BR': 'Studio/1 Dormitorio',
  '2BR': '2 Dormitorios',
  '3BR': '3 Dormitorios',
  Casa: 'Casa',
}

const STEPS = [
  { number: 1, label: 'Ubicacion y tipo' },
  { number: 2, label: 'Caracteristicas' },
  { number: 3, label: 'Resultados' },
]

interface ContactForm {
  name: string
  email: string
  phone: string
}

export default function SimuladorROI() {
  // Step management
  const [currentStep, setCurrentStep] = useState(1)

  // Property data
  const [propertyData, setPropertyData] = useState<PropertyData>({
    comuna: '',
    propertyType: '',
    furnished: false,
    parking: false,
    amenities: [],
  })

  // Results
  const [results, setResults] = useState<ROIResult | null>(null)

  // Contact form
  const [contact, setContact] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep1 = useCallback((): boolean => {
    const newErrors: Record<string, string> = {}
    if (!propertyData.comuna) {
      newErrors.comuna = 'Selecciona una comuna'
    }
    if (!propertyData.propertyType) {
      newErrors.propertyType = 'Selecciona el tipo de propiedad'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [propertyData.comuna, propertyData.propertyType])

  const validateContact = useCallback((): boolean => {
    const newErrors: Record<string, string> = {}
    if (!contact.name.trim()) {
      newErrors.name = 'Ingresa tu nombre'
    }
    if (!contact.email.trim()) {
      newErrors.email = 'Ingresa tu email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      newErrors.email = 'Ingresa un email valido'
    }
    if (!contact.phone.trim()) {
      newErrors.phone = 'Ingresa tu telefono'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [contact])

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return
      setCurrentStep(2)
    } else if (currentStep === 2) {
      const roi = calculateROI(propertyData)
      setResults(roi)
      setCurrentStep(3)
    }
  }

  const handleBack = () => {
    setErrors({})
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleAmenity = (amenity: string) => {
    setPropertyData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }))
  }

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateContact()) return

    setSubmitting(true)
    setSubmitError('')

    try {
      const res = await fetch('/api/evaluacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property: propertyData,
          contact,
          results,
        }),
      })

      if (!res.ok) {
        throw new Error('Error al enviar')
      }

      setSubmitted(true)
    } catch {
      setSubmitError('Hubo un error al enviar tu informacion. Intenta nuevamente.')
    } finally {
      setSubmitting(false)
    }
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
              <span className="text-sm font-medium">Simulador gratuito basado en datos reales</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Descubre cuanto puede <span className="text-[#e53e3e] italic">rentar</span> tu propiedad
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Calcula en minutos tu potencial de ingresos con renta corta y comparalo con el arriendo
              tradicional. Sin compromiso.
            </p>
          </div>
        </div>
      </section>

      {/* Simulator Body */}
      <section className="section-padding bg-[#faf8f5]">
        <div className="container-custom mx-auto">
          {/* Progress Steps */}
          <div className="max-w-2xl mx-auto mb-12">
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
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        step.number
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium hidden sm:block ${
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

          {/* Step Content */}
          <div className="max-w-3xl mx-auto">
            {/* Step 1: Location & Type */}
            {currentStep === 1 && (
              <div className="animate-fade-in-up">
                <div className="card">
                  <h2 className="heading-2 mb-2">Ubicacion y tipo de propiedad</h2>
                  <p className="text-gray-500 mb-8">
                    Selecciona la comuna y el tipo de propiedad para comenzar la evaluacion.
                  </p>

                  {/* Comuna selector */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-[#1e3a5f] mb-2">
                      Comuna
                    </label>
                    <select
                      value={propertyData.comuna}
                      onChange={(e) => {
                        setPropertyData((prev) => ({ ...prev, comuna: e.target.value }))
                        if (errors.comuna) setErrors((prev) => ({ ...prev, comuna: '' }))
                      }}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 bg-white text-gray-900 focus:outline-none focus:border-[#1e3a5f] ${
                        errors.comuna ? 'border-[#c53030]' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Selecciona una comuna</option>
                      {COMUNAS.map((comuna) => (
                        <option key={comuna} value={comuna}>
                          {comuna}
                        </option>
                      ))}
                    </select>
                    {errors.comuna && (
                      <p className="text-[#c53030] text-sm mt-1">{errors.comuna}</p>
                    )}
                  </div>

                  {/* Property type selector */}
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-[#1e3a5f] mb-3">
                      Tipo de propiedad
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {PROPERTY_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            setPropertyData((prev) => ({ ...prev, propertyType: type }))
                            if (errors.propertyType)
                              setErrors((prev) => ({ ...prev, propertyType: '' }))
                          }}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                            propertyData.propertyType === type
                              ? 'border-[#1e3a5f] bg-[#1e3a5f] text-white shadow-md'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-sm'
                          }`}
                        >
                          <div className="text-2xl mb-1">
                            {type === 'Casa' ? (
                              <svg className="w-7 h-7 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                            ) : (
                              <svg className="w-7 h-7 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm font-medium">{PROPERTY_TYPE_LABELS[type]}</span>
                        </button>
                      ))}
                    </div>
                    {errors.propertyType && (
                      <p className="text-[#c53030] text-sm mt-2">{errors.propertyType}</p>
                    )}
                  </div>

                  {/* Next button */}
                  <div className="flex justify-end">
                    <button type="button" onClick={handleNext} className="btn-primary text-lg px-10">
                      Siguiente
                      <svg
                        className="inline-block w-5 h-5 ml-2 -mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Features */}
            {currentStep === 2 && (
              <div className="animate-fade-in-up">
                <div className="card">
                  <h2 className="heading-2 mb-2">Caracteristicas de la propiedad</h2>
                  <p className="text-gray-500 mb-8">
                    Agrega los extras de tu propiedad para una estimacion mas precisa.
                  </p>

                  {/* Furnished & Parking toggles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <button
                      type="button"
                      onClick={() =>
                        setPropertyData((prev) => ({ ...prev, furnished: !prev.furnished }))
                      }
                      className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-200 ${
                        propertyData.furnished
                          ? 'border-[#1e3a5f] bg-[#1e3a5f]/5'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          propertyData.furnished
                            ? 'bg-[#1e3a5f] text-white'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">Amoblado</div>
                        <div className="text-sm text-gray-500">Muebles y equipamiento</div>
                      </div>
                      <div className="ml-auto">
                        <div
                          className={`w-12 h-7 rounded-full transition-colors duration-200 relative ${
                            propertyData.furnished ? 'bg-[#1e3a5f]' : 'bg-gray-300'
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${
                              propertyData.furnished ? 'translate-x-5' : 'translate-x-0.5'
                            }`}
                          />
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setPropertyData((prev) => ({ ...prev, parking: !prev.parking }))
                      }
                      className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-200 ${
                        propertyData.parking
                          ? 'border-[#1e3a5f] bg-[#1e3a5f]/5'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          propertyData.parking
                            ? 'bg-[#1e3a5f] text-white'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">Estacionamiento</div>
                        <div className="text-sm text-gray-500">Parking incluido</div>
                      </div>
                      <div className="ml-auto">
                        <div
                          className={`w-12 h-7 rounded-full transition-colors duration-200 relative ${
                            propertyData.parking ? 'bg-[#1e3a5f]' : 'bg-gray-300'
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${
                              propertyData.parking ? 'translate-x-5' : 'translate-x-0.5'
                            }`}
                          />
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Amenities checkboxes */}
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-[#1e3a5f] mb-3">
                      Amenidades
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {AMENITIES.map((amenity) => (
                        <button
                          key={amenity}
                          type="button"
                          onClick={() => toggleAmenity(amenity)}
                          className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                            propertyData.amenities.includes(amenity)
                              ? 'border-[#1e3a5f] bg-[#1e3a5f]/5'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-colors duration-200 ${
                              propertyData.amenities.includes(amenity)
                                ? 'bg-[#1e3a5f] border-[#1e3a5f]'
                                : 'border-gray-300 bg-white'
                            }`}
                          >
                            {propertyData.amenities.includes(amenity) && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {AMENITY_LABELS[amenity]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <button type="button" onClick={handleBack} className="btn-secondary">
                      <svg
                        className="inline-block w-5 h-5 mr-2 -ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 17l-5-5m0 0l5-5m-5 5h12"
                        />
                      </svg>
                      Atras
                    </button>
                    <button type="button" onClick={handleNext} className="btn-red text-lg px-10">
                      Ver resultados
                      <svg
                        className="inline-block w-5 h-5 ml-2 -mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Results */}
            {currentStep === 3 && results && (
              <div className="animate-fade-in-up space-y-8">
                {/* Results Summary */}
                <div className="card border-2 border-[#1e3a5f]/10">
                  <div className="text-center mb-8">
                    <h2 className="heading-2 mb-2">Tu estimacion de rentabilidad</h2>
                    <p className="text-gray-500">
                      {PROPERTY_TYPE_LABELS[propertyData.propertyType]} en{' '}
                      <span className="font-semibold text-[#1e3a5f]">{propertyData.comuna}</span>
                    </p>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-6 bg-gradient-to-br from-[#1e3a5f] to-[#152a45] rounded-xl text-white">
                      <div className="text-sm font-medium text-gray-300 mb-1">Tarifa diaria estimada</div>
                      <div className="text-3xl font-bold">{formatCLP(results.dailyRate)}</div>
                      <div className="text-xs text-gray-400 mt-1">por noche</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-[#c53030] to-[#e53e3e] rounded-xl text-white">
                      <div className="text-sm font-medium text-red-200 mb-1">Ingreso neto mensual</div>
                      <div className="text-3xl font-bold">{formatCLP(results.netOwnerMonthly)}</div>
                      <div className="text-xs text-red-200 mt-1">despues de comision</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-green-600 to-green-700 rounded-xl text-white">
                      <div className="text-sm font-medium text-green-200 mb-1">Ingreso neto anual</div>
                      <div className="text-3xl font-bold">{formatCLP(results.netOwnerAnnual)}</div>
                      <div className="text-xs text-green-200 mt-1">proyeccion 12 meses</div>
                    </div>
                  </div>

                  {/* Comparison Chart */}
                  <div className="bg-[#faf8f5] rounded-xl p-6 mb-8">
                    <h3 className="heading-3 mb-6 text-center">
                      Arriendo tradicional vs MR BnB
                    </h3>
                    <div className="space-y-6">
                      {/* Traditional Rent Bar */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-600">Arriendo tradicional</span>
                          <span className="text-sm font-bold text-gray-700">
                            {formatCLP(results.traditionalRent)}
                          </span>
                        </div>
                        <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gray-400 rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${Math.min(
                                (results.traditionalRent / Math.max(results.netOwnerMonthly, results.traditionalRent)) * 100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                      {/* MR BnB Net Income Bar */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-[#1e3a5f]">
                            Con MR BnB (neto)
                          </span>
                          <span className="text-sm font-bold text-[#1e3a5f]">
                            {formatCLP(results.netOwnerMonthly)}
                          </span>
                        </div>
                        <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#1e3a5f] to-[#c53030] rounded-full transition-all duration-1000 ease-out delay-300"
                            style={{
                              width: '100%',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Uplift badge */}
                    <div className="mt-6 text-center">
                      <span
                        className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                          results.uplift > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {results.uplift > 0 ? '+' : ''}
                        {Math.round(results.uplift * 100)}% vs arriendo tradicional
                      </span>
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  <div className="border-t border-gray-100 pt-6">
                    <h3 className="heading-3 mb-4">Desglose detallado</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Tarifa diaria estimada</span>
                        <span className="font-semibold text-[#1e3a5f]">
                          {formatCLP(results.dailyRate)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Tasa de ocupacion</span>
                        <span className="font-semibold text-[#1e3a5f]">
                          {Math.round(results.occupancyRate * 100)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Ingreso bruto mensual</span>
                        <span className="font-semibold text-[#1e3a5f]">
                          {formatCLP(results.monthlyRevenue)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Ingreso bruto anual</span>
                        <span className="font-semibold text-[#1e3a5f]">
                          {formatCLP(results.annualRevenue)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Comision MR BnB (17% + IVA)</span>
                        <span className="font-semibold text-[#c53030]">
                          -{formatCLP(results.commission)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Arriendo tradicional</span>
                        <span className="font-semibold text-gray-500">
                          {formatCLP(results.traditionalRent)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 bg-[#1e3a5f]/5 rounded-lg px-4 md:col-span-2">
                        <span className="font-bold text-[#1e3a5f]">Ingreso neto mensual para ti</span>
                        <span className="font-bold text-xl text-[#1e3a5f]">
                          {formatCLP(results.netOwnerMonthly)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Back button */}
                  <div className="mt-6">
                    <button type="button" onClick={handleBack} className="btn-secondary">
                      <svg
                        className="inline-block w-5 h-5 mr-2 -ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 17l-5-5m0 0l5-5m-5 5h12"
                        />
                      </svg>
                      Modificar datos
                    </button>
                  </div>
                </div>

                {/* Lead Capture Form */}
                <div className="card border-2 border-[#c53030]/20">
                  {!submitted ? (
                    <>
                      <div className="text-center mb-8">
                        <div className="inline-block bg-[#c53030]/10 rounded-full p-3 mb-4">
                          <svg
                            className="w-8 h-8 text-[#c53030]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <h3 className="heading-2 mb-2">Recibe tu informe completo</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                          Dejanos tus datos y te enviaremos un informe detallado con recomendaciones
                          personalizadas para maximizar la rentabilidad de tu propiedad.
                        </p>
                      </div>

                      <form onSubmit={handleSubmitLead} className="max-w-md mx-auto space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-[#1e3a5f] mb-1">
                            Nombre
                          </label>
                          <input
                            type="text"
                            value={contact.name}
                            onChange={(e) => {
                              setContact((prev) => ({ ...prev, name: e.target.value }))
                              if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
                            }}
                            placeholder="Tu nombre completo"
                            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 bg-white text-gray-900 focus:outline-none focus:border-[#1e3a5f] ${
                              errors.name ? 'border-[#c53030]' : 'border-gray-200'
                            }`}
                          />
                          {errors.name && (
                            <p className="text-[#c53030] text-sm mt-1">{errors.name}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-[#1e3a5f] mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={contact.email}
                            onChange={(e) => {
                              setContact((prev) => ({ ...prev, email: e.target.value }))
                              if (errors.email) setErrors((prev) => ({ ...prev, email: '' }))
                            }}
                            placeholder="tu@email.com"
                            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 bg-white text-gray-900 focus:outline-none focus:border-[#1e3a5f] ${
                              errors.email ? 'border-[#c53030]' : 'border-gray-200'
                            }`}
                          />
                          {errors.email && (
                            <p className="text-[#c53030] text-sm mt-1">{errors.email}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-[#1e3a5f] mb-1">
                            Telefono
                          </label>
                          <input
                            type="tel"
                            value={contact.phone}
                            onChange={(e) => {
                              setContact((prev) => ({ ...prev, phone: e.target.value }))
                              if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }))
                            }}
                            placeholder="+56 9 1234 5678"
                            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 bg-white text-gray-900 focus:outline-none focus:border-[#1e3a5f] ${
                              errors.phone ? 'border-[#c53030]' : 'border-gray-200'
                            }`}
                          />
                          {errors.phone && (
                            <p className="text-[#c53030] text-sm mt-1">{errors.phone}</p>
                          )}
                        </div>

                        {submitError && (
                          <div className="bg-red-50 border border-[#c53030]/20 text-[#c53030] text-sm p-3 rounded-lg">
                            {submitError}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={submitting}
                          className={`btn-red w-full text-lg py-4 ${
                            submitting ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {submitting ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg
                                className="animate-spin h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                              Enviando...
                            </span>
                          ) : (
                            'Quiero mi informe gratuito'
                          )}
                        </button>

                        <p className="text-center text-xs text-gray-400">
                          Sin compromiso. No compartimos tu informacion con terceros.
                        </p>
                      </form>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="inline-block bg-green-100 rounded-full p-4 mb-4">
                        <svg
                          className="w-10 h-10 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="heading-2 mb-2">Informacion enviada con exito</h3>
                      <p className="text-gray-500 max-w-md mx-auto mb-6">
                        Nuestro equipo revisara los datos de tu propiedad y te contactara a la
                        brevedad con un informe personalizado y recomendaciones para maximizar tu
                        rentabilidad.
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
                          Hablar por WhatsApp
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            setCurrentStep(1)
                            setPropertyData({
                              comuna: '',
                              propertyType: '',
                              furnished: false,
                              parking: false,
                              amenities: [],
                            })
                            setResults(null)
                            setContact({ name: '', email: '', phone: '' })
                            setSubmitted(false)
                          }}
                          className="btn-secondary"
                        >
                          Evaluar otra propiedad
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
