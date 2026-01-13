export async function GET() {
  const robotsTxt = `# Allow all crawlers
User-agent: *
Allow: /

# Disallow admin or private pages (if any in the future)
Disallow: /api/
Disallow: /admin/

# Sitemap location
Sitemap: https://wonderlandegypt.com/sitemap.xml
`

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
