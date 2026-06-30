import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Pagination as ShadcnPagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink, PaginationEllipsis, } from "@/components/ui/pagination";
export default function Pagination(props) {
    const { totalPages, page, paginationSize, onPageChange } = props;
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const getPageRange = () => {
        if (totalPages <= paginationSize) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        const halfSize = Math.floor(paginationSize / 2);
        let start = Math.max(1, currentPage - halfSize);
        const end = Math.min(totalPages, start + paginationSize - 1);
        if (end - start + 1 < paginationSize) {
            start = Math.max(1, end - paginationSize + 1);
        }
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };
    const visiblePages = getPageRange();
    const showEllipsisStart = visiblePages[0] > 1;
    const showEllipsisEnd = visiblePages[visiblePages.length - 1] < totalPages;
    const goToPage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
            onPageChange(newPage);
        }
    };
    const goToPrevious = () => goToPage(currentPage - 1);
    const goToNext = () => goToPage(currentPage + 1);
    if (totalPages <= 1)
        return null;
    return (_jsx(ShadcnPagination, { children: _jsxs(PaginationContent, { children: [_jsx(PaginationItem, { children: _jsx(PaginationPrevious, { onClick: goToPrevious, "aria-disabled": currentPage === 1, className: currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer" }) }), showEllipsisStart && (_jsxs(_Fragment, { children: [_jsx(PaginationItem, { children: _jsx(PaginationLink, { onClick: () => goToPage(1), children: "1" }) }), _jsx(PaginationItem, { children: _jsx(PaginationEllipsis, {}) })] })), visiblePages.map((pageNum) => (_jsx(PaginationItem, { children: _jsx(PaginationLink, { onClick: () => goToPage(pageNum), isActive: pageNum === currentPage, children: pageNum }) }, pageNum))), showEllipsisEnd && (_jsxs(_Fragment, { children: [_jsx(PaginationItem, { children: _jsx(PaginationEllipsis, {}) }), _jsx(PaginationItem, { children: _jsx(PaginationLink, { onClick: () => goToPage(totalPages), children: totalPages }) })] })), _jsx(PaginationItem, { children: _jsx(PaginationNext, { onClick: goToNext, "aria-disabled": currentPage === totalPages, className: currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer" }) })] }) }));
}
