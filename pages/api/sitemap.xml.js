// pages/api/sitemap.xml.js
import { format } from 'date-fns';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nextjsnew-plum.vercel.app';

async function getDynamicUrls() {
  // Replace with your DB/API fetch for dynamic routes
  // Example: fetch posts with slug and updatedAt
  // return [{ loc: '/posts/hello-world', lastmod: '2025-10-01' }, ...]
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
    { loc: '/', lastmod: format(new Date(), 'yyyy-MM-dd') },
    { loc: '/users', lastmod: '2025-09-01' },
    { loc: '/contact', lastmod: '2025-08-20' },
  ];

  const dynamic = await getDynamicUrls();

  const urls = [...staticPages, ...dynamic];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        u => `<url>
      <loc>${SITE_URL}${u.loc}</loc>
      ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
      ${u.changefreq ? `<changefreq>${u.changefreq}</changefreq>` : ''}
      ${u.priority ? `<priority>${u.priority}</priority>` : ''}
    </url>`
      )
      .join('')}
  </urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  // optional caching
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=59');
  res.status(200).send(xml);
}
