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
    <section id={id} className="container mx-auto px-6 py-24 scroll-mt-20">
      <header className="flex flex-col items-center text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
          Everything you <span className="text-primary">need</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Manage your anime journey from discovery to tracking and ranking your
          favorites.
        </p>
      </header>

      {/* Cambiamos rows fijas por auto-rows. 
        300px es el 'sweet spot' para que las verticales (row-span-2 o 3) se vean increíbles.
      */}
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[300px]",
          className,
        )}
      >
        {children}
      </div>
    </section>
  );
};
