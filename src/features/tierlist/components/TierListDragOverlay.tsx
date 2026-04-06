import { DragOverlay } from "@dnd-kit/react";
import { motion } from "framer-motion";
import type { Anime } from "@/models";

export const TierListDragOverlay = () => {
  return (
    <DragOverlay dropAnimation={{ duration: 250, easing: "ease-out" }}>
      {(source) => {
        // Recuperamos el anime inyectado desde AnimeCard
        const anime = source?.data?.anime as Anime | undefined;

        if (!anime) return null;

        return (
          <motion.div
            initial={{ scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
            animate={{
              scale: 1.15, // Aumenta de tamaño para dar la sensación de "levantarlo"
              boxShadow:
                "0px 20px 25px -5px rgba(0, 0, 0, 0.5), 0px 10px 10px -5px rgba(0, 0, 0, 0.3)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="relative aspect-3/4 w-20 md:w-24 rounded-md overflow-hidden bg-neutral-800 border-2 border-primary cursor-grabbing z-50 origin-center"
          >
            <img
              src={anime.images.webp.image_url}
              alt={anime.title}
              className="w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-primary/80 to-transparent pt-4 pb-1 px-1">
              <p className="text-[11px] text-white font-bold text-center truncate">
                {anime.title}
              </p>
            </div>
          </motion.div>
        );
      }}
    </DragOverlay>
  );
};
