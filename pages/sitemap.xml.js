export async function getServerSideProps({ res }) {
    const BASE_URL = "https://nextjsnew-plum.vercel.app";
  
    // Example: Fetch your dynamic slugs from DB / API
    const posts = [{ slug: "first-post" }, { slug: "second-post" }];
  
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${BASE_URL}</loc>
        </url>
        ${posts
          .map(
            (post) => `
          <url>
            <loc>${BASE_URL}/blog/${post.slug}</loc>
          </url>`
          )
          .join("")}
      </urlset>`;
  
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
  
    return { props: {} };
  }
  
  export default function SiteMap() {
    return null;
  }
  