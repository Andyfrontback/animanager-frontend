"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useWatchedStore } from "@/stores";
import type { Anime } from "@/models";

import { useState } from "react";
import { Trash2 } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0, // Página inicial (0-indexed)
    pageSize: 5, // Límite de filas por página
  });

  const removeAnimes = useWatchedStore((state) => state.removeAnimes);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const handleBulkDelete = () => {
    // Extraemos la data original de las filas seleccionadas
    const animesToDelete = selectedRows.map((row) => row.original as Anime);

    // Llamamos al store
    removeAnimes(animesToDelete);

    // Limpiamos la selección
    setRowSelection({});
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-md border py-0 px-4">
        <div className="flex items-center py-4 gap-2">
          <Input
            placeholder="Filter Original Title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  const metaStyle = (
                    column.columnDef.meta as unknown as {
                      className: string;
                    }
                  )?.className;

                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className={`capitalize ${metaStyle}`}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id.replace("_", " ")}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  // AQUI APLICAMOS LA CLASE PARA OCULTAR EN MOVIL
                  // (Busca el meta.className que definimos en columns)
                  const metaStyle = (
                    header.column.columnDef.meta as unknown as {
                      className: string;
                    }
                  )?.className;

                  return (
                    <TableHead key={header.id} className={metaStyle}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    // AQUI TAMBIEN APLICAMOS LA CLASE A LA CELDA
                    const metaStyle = (
                      cell.column.columnDef.meta as unknown as {
                        className: string;
                      }
                    )?.className;

                    return (
                      <TableCell key={cell.id} className={`h-19 ${metaStyle}`}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm flex gap-4 items-center">
            <div className="h-full text-center">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            {/* --- BARRA DE HERRAMIENTAS / BULK ACTIONS --- */}
            <div className="hidden md:flex">
              {selectedRows.length > 0 && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleBulkDelete}
                  className="gap-2 animate-in fade-in slide-in-from-left-4"
                >
                  <Trash2 size="sm" />
                  Eliminar Selección (
                  {table.getFilteredSelectedRowModel().rows.length})
                </Button>
              )}
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      {/* --- BARRA DE HERRAMIENTAS / BULK ACTIONS MOBILE --- */}
      {selectedRows.length > 0 && (
        <div className="flex items-center justify-between bg-destructive/10 p-2 rounded-md border border-destructive/20 text-destructive text-sm animate-in fade-in slide-in-from-top-2 md:hidden">
          <span>{selectedRows.length} animes seleccionados</span>
          <Button
            size="sm"
            variant="destructive"
            onClick={handleBulkDelete}
            className="gap-2"
          >
            <Trash2 size={16} />
            Delete Selection
          </Button>
        </div>
      )}
    </div>
  );
}
