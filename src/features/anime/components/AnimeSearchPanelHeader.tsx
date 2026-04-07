import { DialogDescription, DialogTitle } from "@/components/ui/dialog";

export const PanelHeader = () => (
  <>
    <DialogTitle className="text-xl font-black uppercase italic">
      Search <span className="text-primary">Filters</span>
    </DialogTitle>
    <DialogDescription>
      Ajusta los parámetros para encontrar tu próximo anime favorito.
    </DialogDescription>
  </>
);
