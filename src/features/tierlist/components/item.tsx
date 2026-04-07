import { useSortable } from "@dnd-kit/react/sortable";

interface itemProps {
  id: string;
  index: number;
  column: string;
}

export function Item({ id, index, column }: itemProps) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "item",
    accept: "item",
    group: column,
  });

  return (
    <button className="Item" ref={ref} data-dragging={isDragging}>
      {id}
    </button>
  );
}
