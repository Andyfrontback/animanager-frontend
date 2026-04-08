import { useTopAnimesQuery } from "@/features/home/hooks/useTopAnimesQuery";
import type { Anime } from "@/models";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const ANIMES_LIMIT = 24;
const COLUMNS_COUNT = 8;

interface HeroInput {
  children: ReactNode;
}

export const Hero = ({ children }: HeroInput) => {
  const { data: animes, isLoading } = useTopAnimesQuery({
    limit: ANIMES_LIMIT,
  });

  // Lógica para distribuir el array de 1D en múltiples columnas (2D Array)
  const columns = Array.from({ length: COLUMNS_COUNT }, (): Anime[] => []);

  if (animes?.data) {
    animes.data.forEach((anime, index) => {
      // Reparte los animes equitativamente en las 8 columnas
      columns[index % COLUMNS_COUNT].push(anime);
    });
  }

  return (
    <section className="relative w-full h-[70vh] lg:h-[85vh] overflow-hidden bg-background">
      {/* 1. Fondo Inclinado con Imágenes */}
      <div className="absolute inset-0 z-0 h-full">
        <div className="absolute top-[10%] sm:-top-[20%] -left-[20%] w-[200%] sm:w-[120%] h-[140%] rotate-8 scale-110 opacity-30 md:opacity-40">
          {/* Cambiamos el Grid por un Flex contenedor de columnas */}
          <div className="flex justify-center gap-2 md:gap-4 p-4 w-full h-full">
            {isLoading
              ? // Skeleton en columnas
                Array.from({ length: COLUMNS_COUNT }).map((_, colIndex) => (
                  <div
                    key={`skeleton-col-${colIndex}`}
                    className={`flex flex-col gap-2 md:gap-4 w-full ${colIndex % 2 !== 0 ? "mt-6" : ""}`}
                  >
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={`skeleton-${colIndex}-${i}`}
                        className="aspect-2/3 w-full bg-muted animate-pulse rounded-md"
                      />
                    ))}
                  </div>
                ))
              : // Animes renderizados en columnas desfasadas
                columns.map((col, colIndex) => (
                  <div
                    key={`col-${colIndex}`}
                    // A las columnas impares (1, 3, 5...) les damos un margin-top
                    className={`flex flex-col gap-2 md:gap-4 w-full ${colIndex % 2 !== 0 ? "mt-6 md:mt-10" : ""}`}
                  >
                    {col.map((anime, index) => (
                      <motion.div
                        key={anime.mal_id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        // Retraso escalonado basado en la columna y la fila
                        transition={{ delay: colIndex * 0.1 + index * 0.1 }}
                        className="aspect-2/3 relative group"
                      >
                        <img
                          src={anime.images.webp.large_image_url}
                          alt={`Poster de ${anime.title}`}
                          className="w-full h-full object-cover rounded-md border border-border/50 shadow-2xl"
                          // Si es una de las primeras columnas, le damos prioridad
                          fetchPriority={colIndex < 3 ? "high" : "auto"}
                        />
                      </motion.div>
                    ))}
                  </div>
                ))}
          </div>
        </div>
      </div>

      {/* 2. Overlays de Degradado (Cruciales para el diseño) */}
      {/* Degradado de abajo hacia arriba para mezclar con el resto de la página */}
      <div className="absolute inset-0 z-1 bg-linear-to-t from-background via-background/60 to-transparent" />
      {/* Degradado lateral para que el texto sea legible */}
      <div className="absolute inset-0 z-1 bg-linear-to-r from-background via-background/40 to-transparent" />

      {/* 3. Contenido Principal */}
      <div className="container relative z-10 flex h-full flex-col justify-center px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl space-y-6"
        >
          {children}
        </motion.div>
      </div>

      {/* Decoración: Un "Glow" morado sutil en la esquina */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] z-0" />
    </section>
  );
};
