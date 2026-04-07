import { Column } from "./column";
import { Item } from "./item";
import { DragDropProvider } from "@dnd-kit/react";
import { useEffect, useMemo, useState } from "react";
import { PointerSensor, KeyboardSensor } from "@dnd-kit/dom";
import { useWatchedStore } from "@/stores/watched.store";
import { useTierListStore } from "@/stores/tierlist.store";

// Placeholders
import { TierRow } from "./TierRow";
import { AnimeBench } from "./AnimeBench";
import { TierListDragOverlay } from "./TierListDragOverlay";
import { AnimeDraggableCard } from "./AnimeDraggableCard";
import type { Anime } from "@/models";
import { move } from "@dnd-kit/helpers";

export const TierListContainer = () => {
  const tierlist = useTierListStore((s) => s.categories);
  const updateTierlist = useTierListStore((s) => s.updateAllCategories);
  const [items, setItems] = useState<Record<string, string[]>>(tierlist);
  const [columnOrder, setColumnOrder] = useState(() => Object.keys(items));

  useEffect(() => {
    console.log(items);
    updateTierlist(items);
  }, [items, updateTierlist]);

  return (
    <DragDropProvider
      onDragOver={(event) => {
        const { source } = event.operation;

        if (source?.type === "column") return;

        setItems((items) => move(items, event));
      }}
      onDragEnd={(event) => {
        const { source } = event.operation;

        if (event.canceled || source?.type !== "column") return;

        setColumnOrder((columns) => move(columns, event));
      }}
    >
      <div className="Root">
        {columnOrder.map((column, columnIndex) => (
          <Column key={column} id={column} index={columnIndex}>
            {items[column].map((id, index) => (
              <Item key={id} id={id} index={index} column={column} />
            ))}
          </Column>
        ))}
      </div>
    </DragDropProvider>
  );
};
