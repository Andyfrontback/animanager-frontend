import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router";

interface AnimesPaginationProps {
  last_visible_page: number;
  current_page: number;
}

export const AnimesPagination = ({
  last_visible_page,
  current_page,
}: AnimesPaginationProps) => {
  const [, setSearchParams] = useSearchParams();

  const handlePageChange = (page: number) => {
    // Evitamos navegar si intentan ir a una página inválida
    if (page < 1 || page > last_visible_page) return;

    // Opcional: Scroll al top al cambiar página
    window.scrollTo({ top: 0, behavior: "smooth" });

    setSearchParams((prev) => {
      prev.set("page", page.toString());
      return prev;
    });
  };

  // --- Lógica para generar los números de página ---
  const generatePageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    // Siempre mostramos la página 1
    pages.push(1);

    // Si estamos lejos del principio, agregamos ellipsis
    if (current_page > 3) {
      pages.push("ellipsis");
    }

    // Rango alrededor de la página actual
    // Ejemplo: si current es 5, mostramos 4, 5, 6
    const start = Math.max(2, current_page - 1);
    const end = Math.min(last_visible_page - 1, current_page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Si estamos lejos del final, agregamos ellipsis
    if (current_page < last_visible_page - 2) {
      pages.push("ellipsis");
    }

    // Siempre mostramos la última página (si es mayor que 1)
    if (last_visible_page > 1) {
      pages.push(last_visible_page);
    }

    return pages;
  };

  const allPages = generatePageNumbers();

  return (
    <Pagination className="my-8">
      <PaginationContent>
        {/* Botón Anterior */}
        <PaginationItem>
          <PaginationPrevious
            className={`cursor-pointer ${current_page <= 1 ? "pointer-events-none opacity-50" : ""}`}
            onClick={() => handlePageChange(current_page - 1)}
          />
        </PaginationItem>

        {/* Mapeamos el array generado */}
        {allPages.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === current_page}
                onClick={() => handlePageChange(page)}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Botón Siguiente */}
        <PaginationItem>
          <PaginationNext
            className={`cursor-pointer ${current_page >= last_visible_page ? "pointer-events-none opacity-50" : ""}`}
            onClick={() => handlePageChange(current_page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
