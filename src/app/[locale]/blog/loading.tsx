export default function BlogLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="bg-[#1e3a5f] text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-white/10 rounded w-32 mx-auto mb-6"></div>
              <div className="h-5 bg-white/10 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="section-padding bg-[#faf8f5]">
        <div className="container-custom">
          {/* Tag filters skeleton */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded-full w-20"></div>
            ))}
          </div>

          {/* Cards grid skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="aspect-[16/9] bg-gray-200"></div>
                <div className="p-6">
                  <div className="flex gap-3 mb-3">
                    <div className="h-3 bg-gray-200 rounded w-28"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
