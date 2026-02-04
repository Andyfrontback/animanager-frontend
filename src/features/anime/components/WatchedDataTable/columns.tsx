"use client";

import type { Anime } from "@/models";
import { type ColumnDef } from "@tanstack/react-table";
import { ToggleWatchedButton } from "../ToggleWatchedButton";
import { Trash2 } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

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
  },
  {
    accessorKey: "Image",
    header: "Image",
    cell: ({ row }) => {
      return <img src={row.original.images.webp.small_image_url} />;
    },
    meta: { className: "hidden md:table-cell" },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p className="truncate max-w-50">{row.getValue("title")}</p>;
    },
    meta: {
      className: "truncate max-w-50",
    },
  },
  {
    accessorKey: "title_english",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex"
        >
          Title English
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="truncate max-w-50">{row.getValue("title_english")} </p>
      );
    },
    meta: { className: "hidden md:table-cell" },
  },
  {
    id: "Delete",
    header: "Delete",
    cell: ({ row }) => {
      return (
        <ToggleWatchedButton
          variant="destructive"
          children={{ isWatched: <Trash2 /> }}
          anime={row.original}
        />
      );
    },
    enableHiding: false,
  },
];
