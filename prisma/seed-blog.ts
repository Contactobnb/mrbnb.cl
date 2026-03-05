import { PrismaClient } from '@prisma/client'
import { blogPosts } from '../src/data/blog-posts'

const prisma = new PrismaClient()

async function main() {
  console.log(`Seeding ${blogPosts.length} blog posts...`)

  for (const post of blogPosts) {
    const locale = post.locale || 'es'
    await prisma.blogPost.upsert({
      where: { slug_locale: { slug: post.slug, locale } },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        author: post.author,
        tags: post.tags,
        published: true,
        publishedAt: new Date(post.date),
      },
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        author: post.author,
        tags: post.tags,
        locale,
        published: true,
        publishedAt: new Date(post.date),
      },
    })
    console.log(`  ✓ [${locale}] ${post.slug}`)
  }

  console.log('Blog seed completed!')
}

main()
  .catch((e) => {
    console.error('Error seeding blog posts:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
