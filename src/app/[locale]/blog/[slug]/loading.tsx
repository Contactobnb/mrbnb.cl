export default function BlogPostLoading() {
  return (
    <>
      {/* Header skeleton */}
      <section className="bg-[#1e3a5f] text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto animate-pulse">
            {/* Breadcrumbs */}
            <div className="flex gap-2 mb-6">
              <div className="h-3 bg-white/10 rounded w-12"></div>
              <div className="h-3 bg-white/10 rounded w-12"></div>
              <div className="h-3 bg-white/10 rounded w-32"></div>
            </div>

            {/* Tags */}
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-white/10 rounded-full w-20"></div>
              <div className="h-6 bg-white/10 rounded-full w-16"></div>
              <div className="h-6 bg-white/10 rounded-full w-24"></div>
            </div>

            {/* Title */}
            <div className="h-10 bg-white/10 rounded w-full mb-3"></div>
            <div className="h-10 bg-white/10 rounded w-3/4 mb-6"></div>

            {/* Author info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-full"></div>
              <div>
                <div className="h-4 bg-white/10 rounded w-32 mb-1"></div>
                <div className="h-3 bg-white/10 rounded w-48"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content skeleton */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <article className="max-w-3xl mx-auto animate-pulse">
            {/* Cover image placeholder */}
            <div className="aspect-[16/9] bg-gray-200 rounded-xl mb-10"></div>

            {/* Paragraphs */}
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-2/3 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>

              <div className="h-6 bg-gray-200 rounded w-1/2 mt-8 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>

              <div className="h-6 bg-gray-200 rounded w-2/5 mt-8 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
