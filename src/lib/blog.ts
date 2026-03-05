import { prisma } from '@/lib/prisma'

export async function getAllPosts(locale: string = 'es') {
  const posts = await prisma.blogPost.findMany({
    where: { published: true, locale },
    orderBy: { publishedAt: 'desc' },
  })

  return posts.map((post) => ({
    ...post,
    date: post.publishedAt?.toISOString().split('T')[0] ?? post.createdAt.toISOString().split('T')[0],
    readTime: Math.ceil(post.content.split(/\s+/).length / 200),
  }))
}

export async function getPostBySlug(slug: string, locale: string = 'es') {
  const post = await prisma.blogPost.findUnique({
    where: { slug_locale: { slug, locale } },
  })

  if (!post || !post.published) return null

  return {
    ...post,
    date: post.publishedAt?.toISOString().split('T')[0] ?? post.createdAt.toISOString().split('T')[0],
    readTime: Math.ceil(post.content.split(/\s+/).length / 200),
  }
}

export async function getAllSlugs(locale: string = 'es') {
  const posts = await prisma.blogPost.findMany({
    where: { published: true, locale },
    select: { slug: true },
  })

  return posts.map((post) => ({ slug: post.slug }))
}

export async function getRelatedPosts(slug: string, tags: string[], limit = 2, locale: string = 'es') {
  const posts = await prisma.blogPost.findMany({
    where: {
      published: true,
      locale,
      slug: { not: slug },
      tags: { hasSome: tags },
    },
    orderBy: { publishedAt: 'desc' },
    take: limit,
  })

  return posts.map((post) => ({
    ...post,
    date: post.publishedAt?.toISOString().split('T')[0] ?? post.createdAt.toISOString().split('T')[0],
    readTime: Math.ceil(post.content.split(/\s+/).length / 200),
  }))
}
