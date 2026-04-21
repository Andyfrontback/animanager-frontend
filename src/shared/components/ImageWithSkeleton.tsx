import { useState } from "react";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImageWithSkeleton = ({
  src,
  alt,
  className,
}: ImageWithSkeletonProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden h-full", className)}>
      {/* El Skeleton se muestra mientras isLoaded sea false */}
      {!isLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
      )}

      {/* La imagen real */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-all duration-500",
          // Mantenemos la imagen invisible hasta que cargue
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95",
          // Le pasamos las clases extra que vengan del padre (como el group-hover)
          className,
        )}
      />
    </div>
  );
};
