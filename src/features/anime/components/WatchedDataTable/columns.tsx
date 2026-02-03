"use client";

import type { Anime } from "@/models";
import { type ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Anime>[] = [
  {
    accessorKey: "images.webp.small_image_url",
    header: "Image",
    cell: ({ row }) => {
      return <img src={row.original.images.webp.small_image_url} />;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "title_english",
    header: () => <div className="hidden md:inline-block">Title English</div>,
    cell: ({ row }) => {
      return (
        <p className="hidden md:inline-block">
          {row.getValue("title_english")}{" "}
        </p>
      );
    },
  },
];
