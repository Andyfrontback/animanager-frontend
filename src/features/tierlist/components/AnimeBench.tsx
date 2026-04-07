import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";
import type { ReactNode } from "react";

interface AnimeBenchProps {
  benchId: string;
  children: ReactNode;
}

export const AnimeBench = ({ benchId, children }: AnimeBenchProps) => {
  // 1. Configuramos la banca como un contenedor Droppable.
  // Es vital pasar el benchId en la propiedad data para que el DragMonitor
  // sepa interpretar cuándo un anime vuelve a la banca.
  const { ref, isDropTarget } = useDroppable({
    id: benchId,
    type: "column",
    accept: "item",
    collisionPriority: CollisionPriority.Low,
    data: {
      containerId: benchId,
    },
  });

  return (
    <div
      ref={ref}
      className={`flex flex-wrap gap-3 min-h-37.5 p-4 rounded-lg transition-colors duration-200 border-2 ${
        isDropTarget
          ? "bg-white/5 border-neutral-500 border-solid"
          : "bg-transparent border-neutral-800 border-dashed"
      }`}
    >
      {children}
    </div>
  );
};
