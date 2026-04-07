import { CollisionPriority } from "@dnd-kit/abstract";
import type { ReactNode } from "react";
import { useSortable } from "@dnd-kit/react/sortable";

interface columnProps {
  children: ReactNode;
  id: string;
  index: number;
}

export function Column({ children, id, index }: columnProps) {
  const { ref } = useSortable({
    id,
    index,
    type: "column",
    collisionPriority: CollisionPriority.Low,
    accept: ["item", "column"],
  });

  return (
    <div className="Column" ref={ref}>
      {children}
    </div>
  );
}
