import { AppSidebar } from "@/shared/components/app-sidebar";
import { Sheet, SheetTrigger } from "@/shared/components/ui/sheet";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";
import { Outlet, Link } from "react-router";
import { BreadcrumbLayout } from "./components/BreadcrumbLayout";
import { Button } from "@/shared/components/ui/button";
import { ScanEye } from "lucide-react";
import { AnimeWatched } from "@/features/anime/components/AnimeWatched";
import { Toaster } from "sonner";
import GithubIcon from "@/shared/components/ui/GitHub";

export default function Layout() {
  return (
    <SidebarProvider>
      {/* 1. Skip Link: Mejora la accesibilidad y el SEO técnico */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 bg-primary text-primary-foreground px-4 py-2 rounded-md font-bold"
      >
        Skip to main content
      </a>

      <Toaster className="pointer-events-auto" />
      <AppSidebar />

      <SidebarInset className="w-full min-w-0 flex flex-col">
        <header
          className="bg-background/80 sticky top-0 flex h-16 shrink-0 items-center gap-4 border-b px-4 z-50 backdrop-blur-sm justify-between rounded-t-lg"
          role="banner"
        >
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1" aria-label="Open sidebar menu" />
            <div className="h-4 w-px bg-border md:hidden" aria-hidden="true" />

            {/* Nav interno para breadcrumbs si no lo tiene ya */}
            <nav aria-label="Breadcrumb">
              <BreadcrumbLayout />
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <ScanEye size={16} aria-hidden="true" />
                  <span className="hidden sm:inline">Watched List</span>
                  <span className="sm:hidden">List</span>
                </Button>
              </SheetTrigger>
              <AnimeWatched />
            </Sheet>
          </div>
        </header>

        {/* 2. MAIN: Crucial para SEO On-Page */}
        <main id="main-content" className="flex-1 flex flex-col outline-none">
          <Outlet />
        </main>

        <footer
          className="mt-auto border-t border-border/40 bg-card/10 py-12 w-full"
          role="contentinfo"
        >
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-col items-center md:items-start gap-2">
              <Link
                to="/"
                className="text-2xl font-black italic uppercase tracking-tighter hover:text-primary transition-colors focus:ring-2 focus:ring-primary outline-none rounded"
                aria-label="AniManager - Home"
              >
                Ani<span className="text-primary">Manager</span>
              </Link>
              <p className="text-muted-foreground text-[10px] font-medium tracking-widest">
                © {new Date().getFullYear()}
              </p>
            </div>

            <nav
              className="flex flex-col sm:flex-row items-center gap-6 md:gap-10"
              aria-label="Footer navigation"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em]">
                  Developer
                </span>
                <span className="text-sm font-black text-foreground uppercase tracking-wider">
                  Andrés
                </span>
              </div>

              <div
                className="h-4 w-px bg-border hidden sm:block"
                aria-hidden="true"
              />

              <a
                href="https://github.com/andyfrontback"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-all uppercase tracking-widest"
              >
                <GithubIcon
                  size={18}
                  className="transition-transform group-hover:rotate-12"
                />
                GitHub
              </a>
            </nav>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
