import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatCLP(amount: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`
}

export const WHATSAPP_URL = `https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP || '+56958034957').replace(/\+/g, '')}?text=${encodeURIComponent('Hola, quiero solicitar una evaluación de mi propiedad en renta corta con Mr.BnB')}`

export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'clientes@mrbnb.cl'
export const CONTACT_PHONE = '+56 9 5803 4957'
