import { DialogDescription, DialogTitle } from "@/components/ui/dialog";

export const PanelHeader = () => (
  <>
    <DialogTitle className="text-xl font-black uppercase italic">
      Search <span className="text-primary">Filters</span>
    </DialogTitle>
    <DialogDescription>
      Adjust the parameters to find your next favorite anime.
    </DialogDescription>
  </>
);
