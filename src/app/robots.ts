import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/profile/'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL || 'https://academic-social-sim.vercel.app'}/sitemap.xml`,
  }
}
