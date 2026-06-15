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

  // Validar página actual
  const currentPage = Math.min(Math.max(1, page), totalPages)

  // Calcular rango de páginas a mostrar
  const getPageRange = () => {
    // Si totalPages es menor o igual que paginationSize, mostrar todas
    if (totalPages <= paginationSize) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Calcular páginas alrededor de la actual
    const halfSize = Math.floor(paginationSize / 2)
    let start = Math.max(1, currentPage - halfSize)
    const end = Math.min(totalPages, start + paginationSize - 1)

    // Ajustar si no alcanzamos el tamaño deseado
    if (end - start + 1 < paginationSize) {
      start = Math.max(1, end - paginationSize + 1)
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const visiblePages = getPageRange()
  const showEllipsisStart = visiblePages[0] > 1
  const showEllipsisEnd = visiblePages[visiblePages.length - 1] < totalPages

  // Manejadores de navegación
  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      onPageChange(newPage)
    }
  }

  const goToPrevious = () => goToPage(currentPage - 1)
  const goToNext = () => goToPage(currentPage + 1)

  // Si no hay páginas, no renderizar
  if (totalPages <= 1) return null

  return (
    <ShadcnPagination>
      <PaginationContent>
        {/* Botón Anterior */}
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

        {/* Primera página y elipsis inicial */}
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

        {/* Páginas visibles */}
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

        {/* Elipsis final y última página */}
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

        {/* Botón Siguiente */}
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
