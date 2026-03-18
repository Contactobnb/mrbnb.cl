export default function LeadDetailLoading() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header skeleton */}
      <div className="animate-pulse mb-6">
        <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="flex items-center gap-4">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column - Info cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact info skeleton */}
          <div className="animate-pulse bg-white rounded-xl p-6 shadow-sm">
            <div className="h-5 bg-gray-200 rounded w-40 mb-4"></div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-40"></div>
              </div>
              <div>
                <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-48"></div>
              </div>
              <div>
                <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-32"></div>
              </div>
              <div>
                <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-36"></div>
              </div>
            </div>
          </div>

          {/* Property info skeleton */}
          <div className="animate-pulse bg-white rounded-xl p-6 shadow-sm">
            <div className="h-5 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i}>
                  <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-32"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Edit form skeleton */}
          <div className="animate-pulse bg-white rounded-xl p-6 shadow-sm">
            <div className="h-5 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-100 rounded"></div>
              <div className="h-10 bg-gray-100 rounded"></div>
              <div className="h-24 bg-gray-100 rounded"></div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </div>

        {/* Right column - Activity timeline skeleton */}
        <div className="animate-pulse bg-white rounded-xl p-6 shadow-sm">
          <div className="h-5 bg-gray-200 rounded w-28 mb-6"></div>
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
