import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export const AnimeCardSkeleton = () => {
  return (
    <Card className="group relative overflow-hidden border-none shadow-sm flex flex-row md:flex-col h-32 md:h-full bg-card/50 w-xs md:w-60 rounded-xl ring-1 ring-border/50 p-0 gap-0 md:gap-2">
      {/* SECCIÓN IMAGEN + BOTONES (Skeleton) */}
      <div className="relative h-full w-24 min-w-24 md:w-full md:min-w-0 md:h-64 shrink-0 overflow-hidden">
        {/* Skeleton principal que simula la imagen */}
        <Skeleton className="h-full w-full rounded-none" />

        {/* Simulamos los botones de acción para mantener el peso visual en Desktop */}
        <div className="absolute hidden md:inline-block top-1 left-1 z-20">
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
        <div className="absolute hidden md:inline-block md:top-1 md:right-1 z-20">
          <Skeleton className="w-10 h-10 rounded-full md:rounded-full rounded-tr-xl rounded-bl-none rounded-tl-none rounded-br-none" />
        </div>
      </div>

      {/* SECCIÓN CONTENIDO (Skeleton) */}
      <CardContent className="p-3 flex flex-col justify-between flex-1 min-w-0">
        <div className="space-y-2">
          {/* Título principal (Simulamos 2 líneas para que ocupe buen espacio) */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />

          {/* Título en inglés (Oculto en móvil, igual que la card original) */}
          <Skeleton className="h-3 w-3/5 mt-2 hidden md:block" />
        </div>

        {/* Metadata Footer (Badge y Score) */}
        <div className="mt-2 flex items-center justify-between gap-2">
          {/* Badge de tipo y año */}
          <Skeleton className="h-5 w-20 rounded-md" />

          {/* Score (Estrella y número) */}
          <Skeleton className="h-3 w-8" />
        </div>
      </CardContent>
    </Card>
  );
};
