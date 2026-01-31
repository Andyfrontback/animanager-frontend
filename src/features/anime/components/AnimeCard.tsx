import type { Anime } from "@/models";
import { useState } from "react";
import { AudioLines, BookmarkCheck, Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface AnimeProps {
  anime: Anime;
}

export const AnimeCard = ({ anime }: AnimeProps) => {
  const [isWatched, setWatched] = useState<boolean>(false);

  const toggleWatched = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault(); // Buena práctica en cartas linkeadas
    setWatched((prev) => !prev);
  };

  const isAiring = anime.airing;

  return (
    <Card className="group relative overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col bg-card rounded-lg">
      <div className="relative aspect-2/3 overflow-hidden">
        <img
          src={anime.images.webp.large_image_url}
          alt={`Póster de ${anime.title}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay Gradiente */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Botón Visto */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleWatched}
          // Usamos 'group' para animar el icono interno al hacer hover en el botón
          className={cn(
            "absolute top-2 right-2 z-20 transition-all duration-300 active:scale-90 shadow-sm backdrop-blur-md",
            !isWatched &&
              "bg-black/30 text-white/70 hover:bg-black/50 hover:text-white",
            isWatched &&
              "bg-emerald-500/80 text-emerald-900 ring-1 ring-emerald-500/50 hover:bg-emerald-500/90",
          )}
          aria-label={isWatched ? "Marcar como no visto" : "Marcar como visto"}
        >
          <div className="relative flex items-center justify-center">
            <Eye
              className={cn(
                "h-5 w-5 transition-all duration-300",
                isWatched
                  ? "fill-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                  : "fill-transparent",
              )}
            />
          </div>
        </Button>

        {/* Indicador de Estado (Tooltip en lugar de HoverCard) */}
        <div className="absolute top-2 left-2 z-20">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {/* Usamos div, no Button. cursor-help indica que hay info extra */}
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-colors cursor-help"
                  role="status"
                  aria-label={isAiring ? "En emisión" : "Finalizado"}
                >
                  {isAiring ? (
                    <AudioLines className="h-4 w-4" />
                  ) : (
                    <BookmarkCheck className="h-4 w-4" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{isAiring ? "En emisión" : "Finalizado"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <CardContent className="p-4 flex-1 flex flex-col gap-2">
        <h3
          className="font-bold text-base md:text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors"
          title={anime.title}
        >
          {anime.title}
        </h3>

        {anime.title_english && (
          <p className="text-xs text-muted-foreground line-clamp-1">
            {anime.title_english}
          </p>
        )}

        <div className="mt-auto flex items-center gap-2 pt-2 flex-wrap">
          {anime.type && (
            <Badge variant="secondary" className="text-[10px] h-5 px-1.5">
              {anime.type}{" "}
              {anime.aired.prop.from.year && (
                <span className="text-[10px] text-muted-foreground font-medium">
                  • {anime.aired.prop.from.year}
                </span>
              )}
            </Badge>
          )}
          {anime.score && (
            <Badge
              variant="outline"
              className="ml-auto text-[10px] border-yellow-500/50 text-yellow-600 dark:text-yellow-400 h-5 px-1.5 gap-1"
            >
              <Star className="h-3 w-3 fill-current" /> {anime.score}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
