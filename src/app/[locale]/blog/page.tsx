import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import Button from '@/components/ui/Button'
import BlogGrid from '@/components/blog/BlogGrid'
import FadeIn from '@/components/ui/FadeIn'
import { getLocale, getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('BlogPage')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function BlogPage() {
  const locale = await getLocale()
  const t = await getTranslations('BlogPage')
  const blogPosts = await getAllPosts(locale)
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

      {/* Blog Grid with Tag Filtering */}
      <FadeIn>
        <section className="section-padding bg-[#faf8f5]">
          <div className="container-custom">
            <BlogGrid posts={blogPosts} />
          </div>
        </section>
      </FadeIn>

      {/* CTA */}
      <FadeIn>
        <section className="section-padding bg-white">
          <div className="container-custom text-center">
            <h2 className="heading-2 mb-4">{t('ctaTitle')}</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              {t('ctaDesc')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/evaluacion" variant="primary" size="lg">
                {t('ctaPrimary')}
              </Button>
              <Button href="/contacto" variant="secondary" size="lg">
                {t('ctaSecondary')}
              </Button>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  )
}
