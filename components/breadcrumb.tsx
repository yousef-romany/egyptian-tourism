"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { Fragment } from "react"

export function Breadcrumb({ items }: { items?: Array<{ label: string; href?: string }> }) {
  // If items are provided, use them; otherwise, use the automatic breadcrumb logic
  if (items) {
    return (
      <nav aria-label="Breadcrumb" className="py-3 border-b bg-muted/30">
        <div className="container">
          <ol className="flex items-center gap-2 text-sm flex-wrap">
            {items.map((item, index) => {
              const isLast = index === items.length - 1

              return (
                <Fragment key={item.href || index}>
                  {index > 0 && (
                    <li>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </li>
                  )}
                  <li>
                    {isLast || !item.href ? (
                      <span className="font-medium text-foreground" aria-current="page">
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-egyptian-gold transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                </Fragment>
              )
            })}
          </ol>
        </div>
      </nav>
    )
  }

  // Original automatic breadcrumb logic
  const pathname = usePathname()

  // Don't show breadcrumb on home page
  if (pathname === "/") return null

  const pathSegments = pathname.split("/").filter((segment) => segment)

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`
    const label = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    return { href, label }
  })

  return (
    <nav aria-label="Breadcrumb" className="py-3 border-b bg-muted/30">
      <div className="container">
        <ol className="flex items-center gap-2 text-sm flex-wrap">
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 text-muted-foreground hover:text-egyptian-gold transition-colors duration-200"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only">Home</span>
            </Link>
          </li>

          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1

            return (
              <Fragment key={item.href}>
                <li>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </li>
                <li>
                  {isLast ? (
                    <span className="font-medium text-foreground" aria-current="page">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-egyptian-gold transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              </Fragment>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}

// Keep the default export for backward compatibility
export default Breadcrumb
