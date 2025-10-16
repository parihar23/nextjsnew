// pages/api/sitemap.xml.js

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nextjsnew-plum.vercel.app';

// Helper to format dates as YYYY-MM-DD
const formatDate = (date) => new Date(date).toISOString().split('T')[0];

// Example dynamic routes
async function getDynamicUrls() {
  const posts = [
    { slug: 'hello-world', updatedAt: '2025-10-01' },
    { slug: 'another-post', updatedAt: '2025-09-15' },
  ];
  return posts.map(p => ({
    loc: `/posts/${p.slug}`,
    lastmod: p.updatedAt,
  }));
}

export default async function handler(req, res) {
  const staticPages = [
    { loc: '/', lastmod: formatDate(new Date()) },
    { loc: '/users', lastmod: '2025-10-16' },
    { loc: '/contact', lastmod: '2025-08-20' },
  ];

  const dynamic = await getDynamicUrls();
  const urls = [...staticPages, ...dynamic];

  // Build the XML string
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        u => `<url>
      <loc>${SITE_URL}${u.loc}</loc>
      ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
    </url>`
      )
      .join('')}
  </urlset>`;

  // ✅ Correct HTTP header
  res.setHeader('Content-Type', 'application/xml');

  // Optional cache headers (recommended for SEO)
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

  // Send XML response
  res.status(200).send(xml);
}