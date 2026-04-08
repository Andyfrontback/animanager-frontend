// src/features/home/components/BentoGrid.tsx
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BentoGridProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export const BentoGrid = ({ id, children, className }: BentoGridProps) => {
  return (
    // Añadimos px-10 para dar espacio al giro 3D de las cards en los bordes
    <section
      id={id}
      className="container mx-auto px-10 py-24 scroll-mt-20 overflow-x-clip"
    >
      <header className="flex flex-col items-center text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
          Todo lo que <span className="text-primary">necesitas</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Gestiona tu trayectoria anime desde el descubrimiento hasta el
          seguimiento y ranking de tus favoritos.
        </p>
      </header>

      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-3 gap-8 md:auto-rows-[300px]",
          className,
        )}
      >
        {children}
      </div>
    </section>
  );
};
