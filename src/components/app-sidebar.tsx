"use client";

import * as React from "react";
import { Frame, Home, PieChart, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
/* import { NavUser } from "@/components/nav-user"; */
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  /* SidebarFooter, */
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import { ModeToggle } from "./ui/mode-toggle";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Anime",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/private/anime/list",
        },
        {
          title: "Tierlist",
          url: "/private/anime/tierlist",
        },
      ],
    },
  ],
  navSecondary: [
    /* {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    }, */
  ],
  projects: [
    {
      name: "Home",
      url: "/public/home",
      icon: Home,
    },
    {
      name: "Dashboard",
      url: "/private/dashboard",
      icon: PieChart,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <aside>
      <Sidebar variant="inset" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to="/">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Frame className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">AniManager</span>
                    <span className="truncate text-xs">Manage & Track</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <nav aria-label="Main Navigation">
            <NavProjects projects={data.projects} />
            <NavMain items={data.navMain} />
            <NavSecondary items={data.navSecondary} className="mt-auto" />
          </nav>
        </SidebarContent>
        <ModeToggle />
        <SidebarFooter>
          {/* Si esto escala bien toca hacerle un backend o llamar un BaaS dedicado
          <NavUser user={data.user} /> */}
        </SidebarFooter>
      </Sidebar>
    </aside>
  );
}
