import { getAllTourSlugs } from "@/lib/data/tours"
import { getAllPostSlugs } from "@/lib/data/blog"

export async function GET() {
  const baseUrl = "https://wonderlandegypt.com"
  const tourSlugs = await getAllTourSlugs()
  const blogSlugs = await getAllPostSlugs()

  const staticPages = [
    "",
    "/tours",
    "/reviews",
    "/blog",
    "/history",
    "/history/ancient-egypt",
    "/history/pharaohs",
    "/history/temples",
    "/history/egyptian-gods",
    "/about",
    "/contact",
    "/faq",
    "/gallery",
    "/transportation",
    "/book-now",
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`
    )
    .join("")}
  ${(await tourSlugs)
    .map(
      (slug) => `
  <url>
    <loc>${baseUrl}/tours/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("")}
  ${(await blogSlugs)
    .map(
      (slug) => `
  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join("")}
  </urlset>`

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
