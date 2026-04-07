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
      {/* Forzamos que el Toaster se superponga al sheet */}
      <Toaster className="pointer-events-auto" />
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
        </div>
        <footer className="mt-auto border-t border-border/50 bg-card/20 py-16">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-2 text-center md:text-left">
              <p className="text-2xl font-black italic uppercase tracking-tighter">
                Ani<span className="text-primary">Manager</span>
              </p>
              <p className="text-muted-foreground text-sm font-medium">
                © {new Date().getFullYear()}
              </p>
            </div>

            <nav className="flex gap-10" aria-label="Social links">
              <a
                href="https://github.com/andyfrontback"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
              >
                GitHub
              </a>
              <span className="text-muted-foreground/30">|</span>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                Andrés
              </p>
            </nav>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
