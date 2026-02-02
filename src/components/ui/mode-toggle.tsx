import { Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/context/";
import { SidebarMenuButton, SidebarMenuItem } from "./sidebar";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/*  Se modifica para adaptarlo al formato de un nav-secondary del sidebar */}
        <SidebarMenuItem>
          <SidebarMenuButton size="sm">
            {theme === "dark" ? (
              <Moon data-icon="inline-end" size={16} />
            ) : (
              <Sun data-icon="inline-end" size={16} />
            )}
            <span className="text-xs">Appearance</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
