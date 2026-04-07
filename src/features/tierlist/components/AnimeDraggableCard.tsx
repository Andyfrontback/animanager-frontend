import { useSortable } from "@dnd-kit/react/sortable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Anime } from "@/models";

interface AnimeDraggableCardProps {
  anime: Anime;
  index: number;
  containerId: string;
}

export const AnimeDraggableCard = ({
  anime,
  index,
  containerId,
}: AnimeDraggableCardProps) => {
  // Configuración del hook con la inyección de datos para el Overlay
  const { ref, isDragging } = useSortable({
    id: anime.mal_id,
    index,
    type: "item",
    accept: "item",
    group: containerId,
    data: {
      containerId,
      anime, // ¡Clave! Pasamos la data al DragOverlay
    },
  });

  // Extraemos el contenido visual base para no repetir código
  const cardContent = (
    <div
      ref={ref}
      className={`relative aspect-3/4 w-20 md:w-24 rounded-md overflow-hidden bg-neutral-800 border cursor-grab active:cursor-grabbing transition-all duration-200 select-none ${
        isDragging
          ? "opacity-30 border-neutral-700/50 grayscale-50" // Estilo de "Placeholder" (elemento original)
          : "opacity-100 border-neutral-700 hover:border-neutral-400 hover:scale-[1.02]"
      }`}
    >
      <img
        src={anime.images.webp.image_url}
        alt={anime.title}
        className="w-full h-full object-cover pointer-events-none"
        loading="lazy"
        draggable={false} // Previene el drag nativo de imágenes del navegador
      />

      {/* Badge de Score (Opcional, pero da buen contexto en la card) */}
      <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/90 via-black/40 to-transparent pt-4 pb-1 px-1">
        <p className="text-[11px] text-white font-bold text-center drop-shadow-md truncate">
          ⭐ {anime.score || "N/A"}
        </p>
      </div>
    </div>
  );

  // La implementaré en un futuro si veo que todo está bien, Restricción UX: Si estamos arrastrando, destruimos el TooltipProvider devolviendo solo la card.
  // Esto elimina de raíz cualquier artefacto visual en la pantalla.
  /* if (isDragging) {
    return cardContent;
  } */

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>{cardContent}</TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-50 bg-neutral-900 border-neutral-800 text-neutral-100"
        >
          <p className="font-bold text-sm leading-tight mb-1">{anime.title}</p>
          <p className="text-xs text-neutral-400">
            {anime.genres?.map((g) => g.name).join(", ") || "No genres"}
          </p>
          <p className="text-xs text-neutral-500 mt-1">
            Episodes: {anime.episodes || "?"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
