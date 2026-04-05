import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useWatchedStore } from "@/stores";
import { columns } from "./WatchedDataTable/columns";
import { DataTable } from "@/features/anime/components/WatchedDataTable/data-table";

export const AnimeWatched = () => {
  const watchedList = useWatchedStore((state) => state.watchedList);
  return (
    <SheetContent
      className="min-w-full md:min-w-[75vw]"
      onPointerDownOutside={(event) => {
        // Buscamos si el objetivo del click es parte del toaster de Sonner
        const isToast =
          event.target instanceof Element &&
          event.target.closest("[data-sonner-toaster]");

        // Si es un toast, prevenimos que el Sheet se cierre
        if (isToast) {
          event.preventDefault();
        }
      }}
    >
      <SheetHeader>
        <SheetTitle>Watched Animes</SheetTitle>
        <SheetDescription>
          See or remove your watched animes easily
        </SheetDescription>
      </SheetHeader>
      <div className="scrollbar overflow-y-auto px-4">
        <DataTable columns={columns} data={watchedList} maxSheetSize />
      </div>
    </SheetContent>
  );
};
