// data-table.tsx
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useWatchedStore } from "@/stores";
import type { Anime } from "@/models";

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  maxSheetSize: boolean;
}

// Lista de los IDs de las columnas dinámicas que definimos en columns.tsx
const DYNAMIC_COLUMNS = [
  "dynamic_score",
  "dynamic_studio",
  "dynamic_type",
  "dynamic_year",
];

export function DataTable<TData, TValue>({
  columns,
  data,
  maxSheetSize,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  // Estado para las vistas mobile/tablet
  const [activeMobileCol, setActiveMobileCol] = useState(DYNAMIC_COLUMNS[0]); // Por defecto Score
  const [activeTabletCols, setActiveTabletCols] = useState([
    DYNAMIC_COLUMNS[0],
    DYNAMIC_COLUMNS[1],
  ]); // Score y Studio

  // Estado que le pasamos a TanStack
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const removeAnimes = useWatchedStore((state) => state.removeAnimes);

  // --- Lógica Responsiva para Ocultar/Mostrar Columnas ---
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newVisibility: VisibilityState = {};

      if (width < 768) {
        // MOBILE (< md): Ocultar todas las dinámicas excepto la seleccionada
        DYNAMIC_COLUMNS.forEach((col) => {
          newVisibility[col] = col === activeMobileCol;
        });
      } else if ((width >= 768 && width < 1024) || maxSheetSize) {
        // TABLET (md a lg): Mostrar solo las 2 seleccionadas
        DYNAMIC_COLUMNS.forEach((col) => {
          newVisibility[col] = activeTabletCols.includes(col);
        });
      } else {
        // DESKTOP (>= lg): Mostrar todas las dinámicas
        DYNAMIC_COLUMNS.forEach((col) => {
          newVisibility[col] = true;
        });
      }

      setColumnVisibility(newVisibility);
    };

    handleResize(); // Ejecutar al montar
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeMobileCol, activeTabletCols, maxSheetSize]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility, // Controlado por nuestro useEffect
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
        {/* --- CABECERA DE HERRAMIENTAS --- */}
        <div className="flex flex-col md:flex-row md:items-center py-4 gap-4">
          <Input
            placeholder="Filter title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          {/* Selector Mobile (1 Columna) */}
          <div className="md:hidden w-full overflow-x-auto pb-1">
            <Tabs
              value={activeMobileCol}
              onValueChange={setActiveMobileCol}
              className="w-full"
            >
              <TabsList className="w-full justify-start">
                <TabsTrigger value="dynamic_score">Score</TabsTrigger>
                <TabsTrigger value="dynamic_studio">Studio</TabsTrigger>
                <TabsTrigger value="dynamic_type">Type</TabsTrigger>
                <TabsTrigger value="dynamic_year">Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Selector Tablet (2 Columnas - Interfaz simplificada con Tabs para elegir pares) */}
          <div className="hidden md:flex lg:hidden ml-auto">
            <Tabs
              value={activeTabletCols.join(",")}
              onValueChange={(val) => setActiveTabletCols(val.split(","))}
            >
              <TabsList>
                <TabsTrigger
                  value={`${DYNAMIC_COLUMNS[0]},${DYNAMIC_COLUMNS[1]}`}
                >
                  Score & Studio
                </TabsTrigger>
                <TabsTrigger
                  value={`${DYNAMIC_COLUMNS[2]},${DYNAMIC_COLUMNS[3]}`}
                >
                  Type & Year
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* --- TABLA --- */}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const metaStyle =
                    (
                      header.column.columnDef.meta as unknown as {
                        className?: string;
                      }
                    )?.className || "";

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
                    const metaStyle =
                      (
                        cell.column.columnDef.meta as unknown as {
                          className?: string;
                        }
                      )?.className || "";

                    return (
                      <TableCell key={cell.id} className={`py-3 ${metaStyle}`}>
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

        {/* --- PAGINACIÓN --- */}
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm flex gap-4 items-center">
            <div className="h-full text-center">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>

            <div className="hidden md:flex">
              {selectedRows.length > 0 && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleBulkDelete}
                  className="gap-2 animate-in fade-in slide-in-from-left-4"
                >
                  <Trash2 size={16} />
                  Eliminar ({table.getFilteredSelectedRowModel().rows.length})
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

      {/* --- BULK ACTIONS MOBILE --- */}
      {selectedRows.length > 0 && (
        <div className="flex items-center justify-between bg-destructive/10 p-2 rounded-md border border-destructive/20 text-destructive text-sm animate-in fade-in slide-in-from-top-2 md:hidden">
          <span>{selectedRows.length} seleccionados</span>
          <Button
            size="sm"
            variant="destructive"
            onClick={handleBulkDelete}
            className="gap-2"
          >
            <Trash2 size={16} />
            Eliminar
          </Button>
        </div>
      )}
    </div>
  );
}
