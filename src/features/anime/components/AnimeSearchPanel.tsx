"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useIsMobile } from "@/hooks/use-mobile";
import { AnimeSearchForm } from "./AnimeSearchForm";
import { SlidersHorizontal } from "lucide-react";
import { PanelHeader } from "./AnimeSearchPanelHeader";

export function AnimeSearchPanel() {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const TriggerButton = (
    <Button
      variant="outline"
      className="gap-2"
      aria-label="Open search filters" // A11y: Descripción clara del propósito
    >
      <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">Filters</span>
    </Button>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{TriggerButton}</DrawerTrigger>
        <DrawerContent
          className="max-h-[90vh]"
          onOpenAutoFocus={(e) => e.preventDefault()} // 👈 Esto evita que entre al primer elemento interactivo osea el primer input, el de anime title
        >
          <DrawerHeader className="text-left">
            <PanelHeader />
          </DrawerHeader>
          {/* Eliminamos el div con pt-40 y usamos un scroll area más natural */}
          <div className="px-4 pb-8 overflow-y-auto no-scrollbar">
            <AnimeSearchForm>
              <DrawerClose asChild>
                <Button variant="ghost" className="w-full">
                  Cancel
                </Button>
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
      <DialogContent
        className="sm:max-w-md md:max-w-lg lg:max-w-xl p-0 overflow-hidden"
        onOpenAutoFocus={(e) => e.preventDefault()} // 👈 Esto evita que entre al input
      >
        {/* Usamos p-0 y overflow-hidden para que el Card interno encaje perfecto */}
        <div className="p-6">
          <DialogHeader className="mb-4">
            <PanelHeader />
          </DialogHeader>
          <AnimeSearchForm>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
          </AnimeSearchForm>
        </div>
      </DialogContent>
    </Dialog>
  );
}
