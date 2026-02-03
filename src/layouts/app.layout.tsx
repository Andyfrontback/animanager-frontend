import { AppSidebar } from "@/components/app-sidebar";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { BreadcrumbLayout } from "./components/BreadcrumbLayout";
import { Button } from "@/components/ui/button";
import { ScanEye } from "lucide-react";
import { AnimeWatched } from "@/features/anime/components/AnimeWatched";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background/80 sticky top-0 flex h-16 shrink-0 items-center gap-4 border-b px-4 z-40 backdrop-blur-sm justify-between rounded-t-lg">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1" />
            <BreadcrumbLayout />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <ScanEye size={16} data-icon="inline-start" /> Watched
              </Button>
            </SheetTrigger>
            <AnimeWatched />
          </Sheet>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
          <Toaster />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
