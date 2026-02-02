import type { Anime } from "@/models";
import { useState } from "react";
import { AudioLines, BookmarkCheck, Eye, ScanEye, Star } from "lucide-react";
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
import { toast } from "sonner";

interface AnimeProps {
  anime: Anime;
}

export const AnimeCard = ({ anime }: AnimeProps) => {
  const [isWatched, setWatched] = useState<boolean>(false);

  const toggleWatched = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setWatched((prev) => !prev);
    toast(!isWatched ? "Added to Watched" : "Removed from Watched", {
      description: anime.title_english || anime.title,
    });
  };

  const isAiring = anime.airing;

  return (
    <Card className="group relative overflow-hidden border-none shadow-sm hover:shadow-lg transition-all duration-300 flex flex-row md:flex-col h-32 md:h-full bg-card/50 hover:bg-card w-full md:max-w-60 rounded-xl ring-1 ring-border/50 py-0 px-0 gap-0 md:gap-4">
      {/* --- SECCIÓN IMAGEN --- */}
      {/* Móvil: Ancho fijo (w-24). Desktop: Alto fijo y ancho completo */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleWatched}
        className={cn(
          "md:hidden h-full rounded-l-xl rounded-r-none top-1 right-1 z-20 w-7 md:h-8 md:w-8 transition-all duration-300 shadow-sm backdrop-blur-md",
          !isWatched
            ? "bg-black/40 text-white/80 hover:bg-black/60 hover:text-white"
            : "bg-emerald-500 text-white hover:bg-emerald-600",
        )}
      >
        {isWatched ? (
          <ScanEye className="h-3 w-3 md:h-4 md:w-4" />
        ) : (
          <Eye className="h-3 w-3 md:h-4 md:w-4" />
        )}
      </Button>
      <div className="relative h-full w-24 min-w-24 md:w-full md:min-w-0 md:h-64 overflow-hidden shrink-0">
        <img
          src={anime.images.webp.large_image_url}
          alt={`Póster de ${anime.title}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay solo visible en Desktop para no tapar la imagen pequeña en móvil */}
        <div className="hidden md:block absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* --- ACCIONES (Flotantes) --- */}
        {/* En móvil las ocultamos de la imagen y las pasamos al contenido */}

        {/* Botón de Estado (Emisión/Fin) */}
        <div className="absolute hidden md:inline-block top-1 left-1 z-20">
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full backdrop-blur-md text-white shadow-sm cursor-help transition-colors",
                    isAiring ? "bg-blue-500/80" : "bg-amber-500/80",
                  )}
                >
                  {isAiring ? (
                    <AudioLines className="w-3 h-3 md:w-4 md:h-4" />
                  ) : (
                    <BookmarkCheck className="w-3 h-3 md:w-4 md:h-4" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{isAiring ? "En emisión" : "Finalizado"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Botón Toggle Visto (Posicionado absoluto en desktop) */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleWatched}
          className={cn(
            "absolute hidden md:inline-block top-1 right-1 z-20 h-7 w-7 md:h-8 md:w-8 rounded-full transition-all duration-300 shadow-sm backdrop-blur-md",
            !isWatched
              ? "bg-black/40 text-white/80 hover:bg-black/60 hover:text-white"
              : "bg-emerald-500 text-white hover:bg-emerald-600",
          )}
        >
          <div className="flex items-center justify-center">
            {isWatched ? (
              <ScanEye className="h-3 w-3 md:h-4 md:w-4" />
            ) : (
              <Eye className="h-3 w-3 md:h-4 md:w-4" />
            )}
          </div>
        </Button>
      </div>

      {/* --- SECCIÓN CONTENIDO --- */}
      <CardContent className="p-3 flex flex-col justify-between flex-1 min-w-0">
        <div className="space-y-1">
          <h3
            className="font-semibold text-sm md:text-base leading-tight line-clamp-2 md:line-clamp-2 group-hover:text-primary transition-colors"
            title={anime.title}
          >
            {anime.title}
          </h3>

          {anime.title_english && (
            <p className="text-xs text-muted-foreground line-clamp-1 hidden md:block">
              {anime.title_english}
            </p>
          )}
        </div>

        {/* Metadata Footer */}
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex gap-1 items-center">
            {anime.type && (
              <Badge
                variant="secondary"
                className="text-[10px] h-5 px-1 rounded-md font-normal bg-secondary/50"
              >
                {anime.type}
                {anime.aired.prop.from.year && (
                  <span className="text-[10px] text-muted-foreground">
                    • {anime.aired.prop.from.year}
                  </span>
                )}
              </Badge>
            )}
          </div>

          {anime.score && (
            <div className="flex items-center gap-1 text-[11px] font-medium text-amber-500">
              <Star className="h-3 w-3 fill-current" />
              <span>{anime.score}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
