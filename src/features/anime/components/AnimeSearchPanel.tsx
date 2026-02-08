"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useIsMobile } from "@/hooks/use-mobile";
import { AnimeSearchForm } from "./AnimeSearchForm";
import { SlidersHorizontal } from "lucide-react";

export function AnimeSearchPanel() {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  // Botón Trigger común para ambos casos
  const TriggerButton = (
    <Button variant="outline" className="gap-2">
      <SlidersHorizontal className="h-4 w-4" />
      <span className="hidden sm:inline">Filters</span>{" "}
      {/* Texto solo en desktop */}
    </Button>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{TriggerButton}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Search Filters</DrawerTitle>
            <DrawerDescription>
              Refine your search to find the anime you are looking for
            </DrawerDescription>
          </DrawerHeader>
          <div
            className="flex flex-col justify-center items-center px-4 no-scrollbar space-y-4
          pt-40 overflow-y-auto"
          >
            <AnimeSearchForm>
              <DrawerClose asChild>
                <Button variant="outline">Close Panel</Button>
              </DrawerClose>
            </AnimeSearchForm>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
      <DialogContent className="md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Search Filters</DialogTitle>
          <DialogDescription>
            Refine your search to find the anime you are looking for
          </DialogDescription>
        </DialogHeader>

        <AnimeSearchForm>
          <DialogClose>
            <Button variant="outline">Close Panel</Button>
          </DialogClose>
        </AnimeSearchForm>
      </DialogContent>
    </Dialog>
  );
}
