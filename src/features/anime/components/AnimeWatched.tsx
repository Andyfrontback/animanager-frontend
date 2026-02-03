import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useWatchedStore } from "@/stores";
import { columns } from "./WatchedDataTable/columns";
import { DataTable } from "@/components/ui/data-table";

export const AnimeWatched = () => {
  const watchedList = useWatchedStore((state) => state.watchedList);
  //const removeAnime = useWatchedListStore((state) => state.removeAnime);
  return (
    <SheetContent className="min-w-full md:min-w-[75vw]">
      <SheetHeader>
        <SheetTitle>Watched Animes</SheetTitle>
        <SheetDescription>
          See or remove your watched animes easily
        </SheetDescription>
      </SheetHeader>
      <div className="scrollbar overflow-y-auto px-4">
        <DataTable columns={columns} data={watchedList} />
      </div>
    </SheetContent>
  );
};
