// columns.tsx
"use client";

import type { Anime } from "@/models";
import { type ColumnDef } from "@tanstack/react-table";
import { Trash2, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleWatchedButton } from "../ToggleWatchedButton";

export const columns: ColumnDef<Anime>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: { className: "w-10" },
  },
  {
    accessorKey: "Image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <img
          src={row.original.images.webp.small_image_url}
          alt={row.original.title}
          className="h-12 w-12 object-cover rounded-md"
        />
      );
    },
    meta: { className: "hidden md:table-cell w-16" },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-col max-w-37.5 sm:max-w-50 md:max-w-75">
          <span className="truncate font-medium">{row.getValue("title")}</span>
          <span className="truncate text-xs text-muted-foreground md:hidden">
            {row.original.title_english || ""}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "title_english",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          English Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="truncate max-w-50 block">
          {row.getValue("title_english") || "N/A"}
        </span>
      );
    },
    meta: { className: "hidden lg:table-cell" },
  },

  // --- Columnas Dinámicas ---
  {
    id: "dynamic_score",
    accessorKey: "score",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const score = row.getValue("dynamic_score") as number;
      return (
        <span className="font-semibold">{score ? `${score}` : "N/A"}</span>
      );
    },
  },
  {
    id: "dynamic_studio",
    accessorFn: (row) => row.studios?.[0]?.name || "N/A",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Studio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className="truncate max-w-12 block">
        {row.getValue("dynamic_studio")}
      </span>
    ),
  },
  {
    id: "dynamic_type",
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <span>{row.getValue("dynamic_type")}</span>,
  },
  {
    id: "dynamic_year",
    accessorFn: (row) => row.aired?.prop?.from?.year || "Unknown",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Year
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <span>{row.getValue("dynamic_year")}</span>,
  },
  // --------------------------------------------------------

  {
    id: "Delete",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <ToggleWatchedButton
            variant="destructive"
            children={{ isWatched: <Trash2 className="h-4 w-4" /> }}
            anime={row.original}
          />
        </div>
      );
    },
    enableHiding: false,
    meta: { className: "text-right" },
  },
];
