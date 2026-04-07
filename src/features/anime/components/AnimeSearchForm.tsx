import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  searchPanelSchema,
  type SearchPanelInput,
  type SearchPanelSchema,
} from "../schemas/anime.schema";
import { Button } from "@/components/ui/button";
import { DatePickerForm } from "./SearchPanelForm/DatePickerForm";
import { SelectForm } from "./SearchPanelForm/SelectForm";
import { InputForm } from "./SearchPanelForm/InputForm";
import { useSearchParams } from "react-router";
import { useCallback, useEffect, useMemo, type ReactNode } from "react";
import { DEFAULT_VALUES } from "../types/animeComp.types";

// Constantes fuera del componente para evitar recreación
const ORDER_OPTIONS = [
  { label: "Score", value: "score" },
  { label: "Title", value: "title" },
  { label: "Start Date", value: "start_date" },
  { label: "End Date", value: "end_date" },
];

const SORT_OPTIONS = [
  { label: "Descendant", value: "desc" },
  { label: "Ascendant", value: "asc" },
];

interface AnimeSearchFormProps {
  children: ReactNode;
}

export const AnimeSearchForm = ({ children }: AnimeSearchFormProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. ESTRATEGIA DE HIDRATACIÓN: URL -> Formulario
  // Calculamos los valores iniciales fusionando DEFAULTS con lo que venga en la URL.
  const initialValues = useMemo(() => {
    return {
      page: searchParams.get("page") || DEFAULT_VALUES.page,
      limit: searchParams.get("limit") || DEFAULT_VALUES.limit,
      start_date: searchParams.get("start_date") || DEFAULT_VALUES.start_date,
      end_date: searchParams.get("end_date") || DEFAULT_VALUES.end_date,
      order_by: searchParams.get("order_by") || DEFAULT_VALUES.order_by,
      sort: searchParams.get("sort") || DEFAULT_VALUES.sort,
      q: searchParams.get("q") || DEFAULT_VALUES.q,
    };
  }, [searchParams]);

  const {
    control,
    formState: { errors },
    reset,
    trigger,
  } = useForm<z.input<SearchPanelSchema>, unknown, z.output<SearchPanelSchema>>(
    {
      resolver: zodResolver(searchPanelSchema),
      mode: "onBlur",
      defaultValues: initialValues as SearchPanelInput,
    },
  );

  // Forzamos la validación en el montaje
  useEffect(() => {
    // Al ejecutarse sin argumentos, evalúa todo el formulario
    trigger();
  }, [trigger]);

  // 2. ESTRATEGIA DE ACTUALIZACIÓN: Formulario -> URL
  const handleQueryParams = useCallback(
    (key: keyof SearchPanelInput, value: string | undefined) => {
      setSearchParams((searchParams) => {
        if (value) {
          searchParams.set(key, value);
        } else {
          searchParams.delete(key);
        }

        // Resetear a página 1 si cambian los filtros (UX Standard)
        if (key !== "page") {
          searchParams.set("page", "1");
        }

        return searchParams;
      });
    },
    [setSearchParams],
  );

  // 3. RESETEO COMPLETO
  const handleReset = useCallback(() => {
    // Reseteamos el estado interno de RHF
    reset(DEFAULT_VALUES);

    // Reseteamos la URL a los defaults limpios
    setSearchParams(() => {
      const newParams = new URLSearchParams();
      Object.entries(DEFAULT_VALUES).forEach(([k, v]) => {
        if (v) newParams.set(k, v);
      });
      return newParams;
    });
  }, [reset, setSearchParams]);

  return (
    // Ya no necesitamos CardHeader/CardTitle aquí si el Dialog ya los tiene
    <div className="w-full space-y-6">
      <form
        id="anime-search-form"
        role="search" // A11y: Define explícitamente que esto es una búsqueda
        onSubmit={(e) => e.preventDefault()}
        className="space-y-6"
      >
        {/* Grupo 1: Búsqueda por Texto */}
        <div className="space-y-2">
          <InputForm
            control={control}
            name="q"
            label="Anime Title"
            placeholder="Ej: Shingeki no Kyojin..."
            withSearchIcon={true}
            error={errors.q}
            onInputBlur={(val) => handleQueryParams("q", val)}
          />
        </div>

        {/* Grupo 2: Rango de Fechas (Uso de fieldset para semántica) */}
        <fieldset className="space-y-3">
          <legend className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Release Period
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DatePickerForm
              control={control}
              name="start_date"
              label="From"
              error={errors.start_date}
              required={true}
              onDateSelect={(date_str) =>
                handleQueryParams("start_date", date_str)
              }
            />
            <DatePickerForm
              control={control}
              name="end_date"
              label="To"
              error={errors.end_date}
              placeholder="Optional"
              required={false}
              onDateSelect={(date_str) =>
                handleQueryParams("end_date", date_str)
              }
            />
          </div>
        </fieldset>

        {/* Grupo 3: Orden y Dirección */}
        <fieldset className="space-y-3">
          <legend className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Sort Settings
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectForm
              control={control}
              name="order_by"
              label="Order By"
              options={ORDER_OPTIONS}
              error={errors.order_by}
              required={true}
              onValueSelect={(val) => handleQueryParams("order_by", val)}
            />
            <SelectForm
              control={control}
              name="sort"
              label="Direction"
              options={SORT_OPTIONS}
              error={errors.sort}
              required={true}
              onValueSelect={(val) => handleQueryParams("sort", val)}
            />
          </div>
        </fieldset>
      </form>

      {/* Footer de Acciones */}
      <footer className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-4 border-t">
        <div className="flex gap-2">
          {children} {/* Aquí viene el DialogClose */}
        </div>
        <Button
          type="button"
          variant="destructive"
          onClick={handleReset}
          className="font-bold uppercase tracking-tight hover:opacity-90 transition-all"
        >
          Reset Filters
        </Button>
      </footer>
    </div>
  );
};
