// src/features/home/components/BentoGrid.tsx
import type { ReactNode } from "react";

interface BentoGridProps {
  id?: string;
  children: ReactNode;
}

export const BentoGrid = ({ id, children }: BentoGridProps) => {
  return (
    <section id={id} className="container mx-auto px-6 py-24 scroll-mt-20">
      <div className="flex flex-col items-center text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Everything you need
        </h2>
        <p className="text-muted-foreground max-w-2xl">
          Manage your anime lifecycle. From discovery to tracking and ranking.
        </p>
      </div>

      {/* El Grid CSS. 4 columnas en Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 auto-rows-[300px]">
        {children}
      </div>
    </section>
  );
};
