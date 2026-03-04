/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://mrbnb.cl',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin', '/admin/*', '/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
  },
  transform: async (config, path) => {
    // Custom priority for specific pages
    const priorities = {
      '/': 1.0,
      '/servicios': 0.9,
      '/evaluacion': 0.9,
      '/proceso': 0.8,
      '/portfolio': 0.8,
      '/nosotros': 0.7,
      '/contacto': 0.8,
      '/blog': 0.7,
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
