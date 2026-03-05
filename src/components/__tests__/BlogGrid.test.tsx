import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import BlogGrid from '@/components/blog/BlogGrid'

import { vi } from 'vitest'

afterEach(() => {
  cleanup()
})

// Mock next/image
// eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
vi.mock('next/image', () => ({
  default: ({ fill, ...props }: Record<string, unknown>) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img data-fill={fill ? 'true' : undefined} {...props} />
  },
}))

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

const mockPosts = [
  {
    slug: 'test-post-1',
    title: 'First Test Post',
    excerpt: 'First test excerpt',
    coverImage: '/images/test1.jpg',
    author: 'Author One',
    date: '2026-01-15',
    tags: ['testing', 'blog'],
    readTime: 5,
  },
  {
    slug: 'test-post-2',
    title: 'Second Test Post',
    excerpt: 'Second test excerpt',
    coverImage: '/images/test2.jpg',
    author: 'Author Two',
    date: '2026-01-10',
    tags: ['testing', 'other'],
    readTime: 3,
  },
]

describe('BlogGrid', () => {
  it('renders blog post titles and excerpts', () => {
    render(<BlogGrid posts={mockPosts} />)

    expect(screen.getByText('First Test Post')).toBeInTheDocument()
    expect(screen.getByText('Second Test Post')).toBeInTheDocument()
    expect(screen.getByText('First test excerpt')).toBeInTheDocument()
    expect(screen.getByText('Second test excerpt')).toBeInTheDocument()
  })

  it('renders author names', () => {
    render(<BlogGrid posts={mockPosts} />)

    expect(screen.getByText('Author One')).toBeInTheDocument()
    expect(screen.getByText('Author Two')).toBeInTheDocument()
  })

  it('renders the Todos filter button', () => {
    render(<BlogGrid posts={mockPosts} />)

    const buttons = screen.getAllByRole('button')
    const todosButton = buttons.find((b) => b.textContent === 'Todos')
    expect(todosButton).toBeDefined()
  })

  it('renders correct number of post links', () => {
    const { container } = render(<BlogGrid posts={mockPosts} />)

    const postLinks = container.querySelectorAll('a[href^="/blog/"]')
    expect(postLinks).toHaveLength(2)
  })
})
