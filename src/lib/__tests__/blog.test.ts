import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getAllPosts, getPostBySlug, getAllSlugs, getRelatedPosts } from '@/lib/blog'

// Mock Prisma
const mockFindMany = vi.fn()
const mockFindUnique = vi.fn()

vi.mock('@/lib/prisma', () => ({
  prisma: {
    blogPost: {
      findMany: (...args: unknown[]) => mockFindMany(...args),
      findUnique: (...args: unknown[]) => mockFindUnique(...args),
    },
  },
}))

const mockPost = {
  id: '1',
  slug: 'test-post',
  title: 'Test Post',
  excerpt: 'Test excerpt',
  content: 'This is a test post with some words to count for read time calculation',
  coverImage: '/images/test.jpg',
  author: 'Test Author',
  tags: ['test', 'blog'],
  published: true,
  publishedAt: new Date('2026-01-15'),
  createdAt: new Date('2026-01-15'),
  updatedAt: new Date('2026-01-15'),
}

const mockPost2 = {
  ...mockPost,
  id: '2',
  slug: 'another-post',
  title: 'Another Post',
  tags: ['test', 'other'],
  publishedAt: new Date('2026-01-10'),
  createdAt: new Date('2026-01-10'),
  updatedAt: new Date('2026-01-10'),
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('getAllPosts', () => {
  it('returns published posts with date and readTime', async () => {
    mockFindMany.mockResolvedValue([mockPost, mockPost2])

    const posts = await getAllPosts()

    expect(posts).toHaveLength(2)
    expect(posts[0].date).toBe('2026-01-15')
    expect(posts[0].readTime).toBeGreaterThan(0)
    expect(mockFindMany).toHaveBeenCalledWith({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
    })
  })
})

describe('getPostBySlug', () => {
  it('returns a post by slug', async () => {
    mockFindUnique.mockResolvedValue(mockPost)

    const post = await getPostBySlug('test-post')

    expect(post).not.toBeNull()
    expect(post?.title).toBe('Test Post')
    expect(post?.date).toBe('2026-01-15')
    expect(post?.readTime).toBeGreaterThan(0)
  })

  it('returns null for non-existent slug', async () => {
    mockFindUnique.mockResolvedValue(null)

    const post = await getPostBySlug('nonexistent')
    expect(post).toBeNull()
  })

  it('returns null for unpublished post', async () => {
    mockFindUnique.mockResolvedValue({ ...mockPost, published: false })

    const post = await getPostBySlug('test-post')
    expect(post).toBeNull()
  })
})

describe('getAllSlugs', () => {
  it('returns array of slug objects', async () => {
    mockFindMany.mockResolvedValue([{ slug: 'post-1' }, { slug: 'post-2' }])

    const slugs = await getAllSlugs()

    expect(slugs).toEqual([{ slug: 'post-1' }, { slug: 'post-2' }])
    expect(mockFindMany).toHaveBeenCalledWith({
      where: { published: true },
      select: { slug: true },
    })
  })
})

describe('getRelatedPosts', () => {
  it('returns related posts by tags excluding current', async () => {
    mockFindMany.mockResolvedValue([mockPost2])

    const related = await getRelatedPosts('test-post', ['test', 'blog'], 2)

    expect(related).toHaveLength(1)
    expect(related[0].slug).toBe('another-post')
    expect(mockFindMany).toHaveBeenCalledWith({
      where: {
        published: true,
        slug: { not: 'test-post' },
        tags: { hasSome: ['test', 'blog'] },
      },
      orderBy: { publishedAt: 'desc' },
      take: 2,
    })
  })
})
