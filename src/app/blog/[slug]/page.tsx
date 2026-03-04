import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts } from '@/data/blog-posts'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return { title: 'Artículo no encontrado' }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

function renderContent(content: string) {
  // Simple markdown-like rendering
  const lines = content.trim().split('\n')
  const elements: React.ReactNode[] = []
  let inTable = false
  let tableRows: string[][] = []

  const processInlineMarkdown = (text: string): React.ReactNode => {
    // Process bold, italic, links
    const parts: React.ReactNode[] = []
    let remaining = text
    let key = 0

    while (remaining.length > 0) {
      // Links: [text](url)
      const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/)
      // Bold: **text**
      const boldMatch = remaining.match(/\*\*([^*]+)\*\*/)

      let firstMatch: { index: number; length: number; node: React.ReactNode } | null = null

      if (linkMatch && linkMatch.index !== undefined) {
        firstMatch = {
          index: linkMatch.index,
          length: linkMatch[0].length,
          node: (
            <Link key={`link-${key++}`} href={linkMatch[2]} className="text-[#c53030] hover:underline font-medium">
              {linkMatch[1]}
            </Link>
          ),
        }
      }

      if (boldMatch && boldMatch.index !== undefined) {
        if (!firstMatch || boldMatch.index < firstMatch.index) {
          firstMatch = {
            index: boldMatch.index,
            length: boldMatch[0].length,
            node: <strong key={`bold-${key++}`} className="font-semibold text-[#1e3a5f]">{boldMatch[1]}</strong>,
          }
        }
      }

      if (firstMatch) {
        if (firstMatch.index > 0) {
          parts.push(remaining.slice(0, firstMatch.index))
        }
        parts.push(firstMatch.node)
        remaining = remaining.slice(firstMatch.index + firstMatch.length)
      } else {
        parts.push(remaining)
        break
      }
    }

    return parts.length === 1 ? parts[0] : <>{parts}</>
  }

  const flushTable = () => {
    if (tableRows.length === 0) return
    elements.push(
      <div key={`table-${elements.length}`} className="overflow-x-auto my-6">
        <table className="w-full border-collapse bg-white rounded-lg shadow-sm overflow-hidden">
          <thead>
            <tr className="bg-[#1e3a5f] text-white">
              {tableRows[0].map((cell, i) => (
                <th key={i} className="px-4 py-3 text-left text-sm font-semibold">
                  {cell.trim()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.slice(2).map((row, rowIdx) => (
              <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="px-4 py-3 text-sm text-gray-600 border-t border-gray-100">
                    {processInlineMarkdown(cell.trim())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
    tableRows = []
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Table rows
    if (line.trim().startsWith('|')) {
      inTable = true
      const cells = line.split('|').filter((c) => c.trim() !== '')
      // Skip separator rows (|---|---|)
      if (!cells.every((c) => /^[\s-:]+$/.test(c))) {
        tableRows.push(cells)
      } else {
        tableRows.push(cells) // Keep separator for index tracking
      }
      continue
    } else if (inTable) {
      inTable = false
      flushTable()
    }

    // Empty lines
    if (line.trim() === '') continue

    // H2
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={`h2-${i}`} className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mt-10 mb-4">
          {line.slice(3)}
        </h2>
      )
      continue
    }

    // H3
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${i}`} className="text-xl font-bold text-[#1e3a5f] mt-8 mb-3">
          {line.slice(4)}
        </h3>
      )
      continue
    }

    // List items
    if (line.trimStart().startsWith('- ')) {
      elements.push(
        <li key={`li-${i}`} className="flex items-start gap-2 text-gray-600 ml-4 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c53030] flex-shrink-0 mt-2" />
          <span>{processInlineMarkdown(line.trimStart().slice(2))}</span>
        </li>
      )
      continue
    }

    // Italic line (small text)
    if (line.trimStart().startsWith('*') && line.trimEnd().endsWith('*') && !line.trimStart().startsWith('**')) {
      elements.push(
        <p key={`em-${i}`} className="text-gray-500 text-sm italic my-2">
          {line.trim().slice(1, -1)}
        </p>
      )
      continue
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${i}`} className="text-gray-600 leading-relaxed mb-4">
        {processInlineMarkdown(line)}
      </p>
    )
  }

  // Flush any remaining table
  if (tableRows.length > 0) {
    flushTable()
  }

  return elements
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts.filter(
    (p) => p.slug !== post.slug && p.tags.some((tag) => post.tags.includes(tag))
  ).slice(0, 2)

  return (
    <>
      {/* Article Header */}
      <section className="bg-[#1e3a5f] text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Volver al blog
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center text-sm font-bold">
                  {post.author
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div>
                  <p className="font-semibold text-sm">{post.author}</p>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('es-CL', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <span className="w-1 h-1 bg-gray-500 rounded-full" />
                    <span>{post.readTime} min lectura</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <article className="max-w-3xl mx-auto">
            <div className="prose-custom">{renderContent(post.content)}</div>
          </article>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-[#faf8f5]">
          <div className="container-custom">
            <h2 className="heading-2 text-center mb-8">Artículos relacionados</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedPosts.map((related) => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="group">
                  <Card className="!p-0 overflow-hidden h-full flex flex-col">
                    <div className="h-40 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] flex items-center justify-center">
                      <svg className="w-8 h-8 text-white opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <time dateTime={related.date}>
                          {new Date(related.date).toLocaleDateString('es-CL', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <span>{related.readTime} min</span>
                      </div>
                      <h3 className="font-bold text-[#1e3a5f] group-hover:text-[#c53030] transition-colors mb-2">
                        {related.title}
                      </h3>
                      <p className="text-gray-600 text-sm flex-grow">{related.excerpt}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button href="/blog" variant="secondary">
                Ver todos los artículos
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-[#1e3a5f] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Quieres saber cuánto puede rentar tu propiedad?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Usa nuestro simulador gratuito y obtén una estimación basada en datos reales.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/evaluacion" variant="white" size="lg">
              Evaluar mi propiedad gratis
            </Button>
            <Button href="/contacto" variant="secondary" size="lg" className="!border-white !text-white hover:!bg-white hover:!text-[#1e3a5f]">
              Hablar con un asesor
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
