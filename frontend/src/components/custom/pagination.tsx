import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination"

type PaginationProps = {
  totalItems: number
  totalPages: number
  page: number
  paginationSize: number
  onPageChange: (page: number) => void
}

export default function Pagination(props: PaginationProps) {
  const { totalPages, page, paginationSize, onPageChange } = props

  const currentPage = Math.min(Math.max(1, page), totalPages)

  const getPageRange = () => {
    if (totalPages <= paginationSize) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const halfSize = Math.floor(paginationSize / 2)
    let start = Math.max(1, currentPage - halfSize)
    const end = Math.min(totalPages, start + paginationSize - 1)

    if (end - start + 1 < paginationSize) {
      start = Math.max(1, end - paginationSize + 1)
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const visiblePages = getPageRange()
  const showEllipsisStart = visiblePages[0] > 1
  const showEllipsisEnd = visiblePages[visiblePages.length - 1] < totalPages

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      onPageChange(newPage)
    }
  }

  const goToPrevious = () => goToPage(currentPage - 1)
  const goToNext = () => goToPage(currentPage + 1)

  if (totalPages <= 1) return null

  return (
    <ShadcnPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={goToPrevious}
            aria-disabled={currentPage === 1}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {showEllipsisStart && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => goToPage(1)}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {visiblePages.map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              onClick={() => goToPage(pageNum)}
              isActive={pageNum === currentPage}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        {showEllipsisEnd && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => goToPage(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={goToNext}
            aria-disabled={currentPage === totalPages}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  )
}
