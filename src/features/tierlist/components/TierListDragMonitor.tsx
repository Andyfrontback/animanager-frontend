import { useDragDropMonitor } from "@dnd-kit/react";
import { useTierListStore } from "@/stores/tierlist.store";

interface TierListDragMonitorProps {
  setActiveId: (id: number | null) => void;
}

export const TierListDragMonitor = ({
  setActiveId,
}: TierListDragMonitorProps) => {
  const { categories, moveAnime } = useTierListStore();

  useDragDropMonitor({
    onDragStart(event) {
      setActiveId(event.operation.source?.id as number);
    },
    onDragOver(event) {
      const { source, target } = event.operation;
      if (!target) return;

      const activeContainer = source?.data?.containerId;
      const overContainer = target?.data?.containerId || target?.id;

      if (
        !activeContainer ||
        !overContainer ||
        activeContainer === overContainer
      ) {
        return;
      }

      // Verificamos si el target es una categoría vacía o un elemento específico
      const isOverCategory = categories.some((c) => c.id === target.id);
      const overIndex = isOverCategory
        ? categories.find((c) => c.id === target.id)?.animeIds.length
        : target?.data?.index;

      moveAnime(
        source?.id as number,
        activeContainer,
        overContainer,
        overIndex,
      );
    },
    onDragEnd(event) {
      const { operation, canceled } = event;
      setActiveId(null);

      // Si se cancela (ej. con la tecla ESC) o no hay target, abortamos
      if (canceled || !operation.target) return;

      const { source, target } = operation;
      const activeContainer = source?.data?.containerId;
      const overContainer = target?.data?.containerId || target?.id;

      if (
        activeContainer &&
        overContainer &&
        activeContainer === overContainer
      ) {
        // Reordenamiento final dentro de la misma fila/banca
        const oldIndex = source?.data?.index;
        const newIndex = target?.data?.index;

        if (oldIndex !== newIndex && newIndex !== undefined) {
          moveAnime(
            source?.id as number,
            activeContainer,
            overContainer,
            newIndex,
          );
        }
      }
    },
  });

  return null;
};
