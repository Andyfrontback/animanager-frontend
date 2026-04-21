import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";
import type { Anime } from "@/models";
import { useWatchedStore } from "@/stores";
import type { ReactNode } from "react";
import { toast } from "sonner";

interface ToggleWatchedButtonProps {
  children: {
    isWatched?: ReactNode;
    isNotWatched?: ReactNode;
  };
  anime: Anime;
  className?: {
    base: string;
    isWatched?: string;
    isNotWatched?: string;
  };
  variant?:
    | "default"
    | "destructive"
    | "ghost"
    | "outline"
    | "secondary"
    | "link";
}

export const ToggleWatchedButton = ({
  children,
  anime,
  className,
  variant,
}: ToggleWatchedButtonProps) => {
  const isWatched = useWatchedStore((state) =>
    state.watchedList.some((a) => a.mal_id === anime.mal_id),
  );

  const toggleAnime = useWatchedStore((state) => state.toggleAnime);

  const toggleWatched = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    toggleAnime(anime);

    toast(!isWatched ? "Added to Watched" : "Removed from Watched", {
      description: anime.title_english || anime.title,
      action: {
        label: "Undo",
        onClick: () => toggleAnime(anime),
      },
    });
  };

  return (
    <Button
      variant={variant ? variant : "ghost"}
      size="icon"
      onClick={toggleWatched}
      className={cn(
        className?.base,
        isWatched ? className?.isWatched : className?.isNotWatched,
      )}
    >
      {isWatched ? children.isWatched : children.isNotWatched}
    </Button>
  );
};
