'use client'

import Link from 'next/link'
import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
  searchParams?: Record<string, string | string[] | undefined>
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  searchParams = {},
}: PaginationProps) {
  // Build URL with search params
  const buildUrl = (page: number) => {
    const params = new URLSearchParams()
    
    // Add existing search params
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && !Array.isArray(value)) {
        params.set(key, value)
      }
    })
    
    // Override page parameter
    params.set('page', page.toString())
    
    const queryString = params.toString()
    return queryString ? `${baseUrl}?${queryString}` : baseUrl
  }

  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null
  }

  // Calculate page numbers to show
  const showPages = 5
  const halfShow = Math.floor(showPages / 2)
  
  let startPage = Math.max(1, currentPage - halfShow)
  let endPage = Math.min(totalPages, startPage + showPages - 1)
  
  // Adjust start page if we're near the end
  if (endPage - startPage + 1 < showPages) {
    startPage = Math.max(1, endPage - showPages + 1)
  }

  return (
    <UIPagination>
      <PaginationContent>
        {/* Previous button */}
        <PaginationItem>
          {currentPage > 1 ? (
            <Link href={buildUrl(currentPage - 1)} passHref legacyBehavior>
              <PaginationPrevious />
            </Link>
          ) : (
            <PaginationPrevious className="pointer-events-none opacity-50" />
          )}
        </PaginationItem>

        {/* First page and ellipsis */}
        {startPage > 1 && (
          <>
            <PaginationItem>
              <Link href={buildUrl(1)} passHref legacyBehavior>
                <PaginationLink isActive={currentPage === 1}>1</PaginationLink>
              </Link>
            </PaginationItem>
            {startPage > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {/* Page numbers */}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
          <PaginationItem key={page}>
            <Link href={buildUrl(page)} passHref legacyBehavior>
              <PaginationLink isActive={page === currentPage}>{page}</PaginationLink>
            </Link>
          </PaginationItem>
        ))}

        {/* Last page and ellipsis */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <Link href={buildUrl(totalPages)} passHref legacyBehavior>
                <PaginationLink isActive={totalPages === currentPage}>{totalPages}</PaginationLink>
              </Link>
            </PaginationItem>
          </>
        )}

        {/* Next button */}
        <PaginationItem>
          {currentPage < totalPages ? (
            <Link href={buildUrl(currentPage + 1)} passHref legacyBehavior>
              <PaginationNext />
            </Link>
          ) : (
            <PaginationNext className="pointer-events-none opacity-50" />
          )}
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  )
}