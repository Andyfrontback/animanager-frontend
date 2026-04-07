import type { TierDistribution } from "@/stores/tierlist.store";
import { move } from "@dnd-kit/helpers";
import { useDragDropMonitor } from "@dnd-kit/react";
import type { Dispatch, SetStateAction } from "react";

interface TierListDragMonitorProps {
  distribution: TierDistribution;
  setDistribution: (tierlist: TierDistribution) => void;
  localDistribution: TierDistribution;
  setLocalDistribution: Dispatch<SetStateAction<TierDistribution>>;
}

export const TierListDragMonitor = ({
  distribution,
  setDistribution,
  localDistribution,
  setLocalDistribution,
}: TierListDragMonitorProps) => {
  useDragDropMonitor({
    onDragOver: (event) => {
      const { source } = event.operation;
      if (source?.type !== "item") return;

      // 'move' se encarga de la lógica de reordenamiento e intercambio entre contenedores
      setLocalDistribution((prev) => move(prev, event));
    },

    onDragEnd: (event) => {
      if (event.canceled) {
        setLocalDistribution(distribution); // Revertir si se cancela
        return;
      }
      // Persistimos el movimiento optimista en el store global (Zustand -> LocalStorage)
      setDistribution(localDistribution);
    },
  });

  return null;
};