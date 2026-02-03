import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useWatchedStore } from "@/stores";

export const AnimeWatched = () => {
  const watchedList = useWatchedStore((state) => state.watchedList);
  //const removeAnime = useWatchedListStore((state) => state.removeAnime);
  return (
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>{JSON.stringify(watchedList)}</SheetDescription>
    </SheetHeader>
  );
};
