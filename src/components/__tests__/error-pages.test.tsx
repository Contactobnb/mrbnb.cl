import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import Error from '@/app/error'
import AdminError from '@/app/admin/error'

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

afterEach(() => {
  cleanup()
})

describe('Error page', () => {
  it('renders error message', () => {
    const reset = vi.fn()
    render(<Error error={new Error('test')} reset={reset} />)

    expect(screen.getByText('Algo salió mal')).toBeInTheDocument()
  })

  it('renders retry button that calls reset', () => {
    const reset = vi.fn()
    render(<Error error={new Error('test')} reset={reset} />)

    const retryButton = screen.getByText('Intentar de nuevo')
    fireEvent.click(retryButton)

    expect(reset).toHaveBeenCalledOnce()
  })

  it('renders link to home', () => {
    const reset = vi.fn()
    render(<Error error={new Error('test')} reset={reset} />)

    const homeLink = screen.getByText('Volver al inicio')
    expect(homeLink.closest('a')).toHaveAttribute('href', '/')
  })
})

describe('AdminError page', () => {
  it('renders admin-specific error message', () => {
    const reset = vi.fn()
    render(<AdminError error={new Error('test')} reset={reset} />)

    expect(screen.getByText('Error en el panel de administración')).toBeInTheDocument()
  })

  it('renders retry button that calls reset', () => {
    const reset = vi.fn()
    render(<AdminError error={new Error('test')} reset={reset} />)

    const retryButton = screen.getByText('Intentar de nuevo')
    fireEvent.click(retryButton)

    expect(reset).toHaveBeenCalledOnce()
  })

  it('renders link back to admin dashboard', () => {
    const reset = vi.fn()
    render(<AdminError error={new Error('test')} reset={reset} />)

    const dashboardLink = screen.getByText('Volver al dashboard')
    expect(dashboardLink.closest('a')).toHaveAttribute('href', '/admin')
  })
})
