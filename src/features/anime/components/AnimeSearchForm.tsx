import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  searchPanelSchema,
  type SearchPanelInput,
  type SearchPanelSchema,
} from "../schemas/anime.schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
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
      mode: "onChange",
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
    <Card className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl border-none shadow-none sm:border sm:shadow-sm">
      <CardHeader>
        <CardTitle>Search Panel</CardTitle>
        <CardDescription>Filter anime by score, date, or name.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {" "}
        {/* space-y-4 da espaciado uniforme */}
        <form id="anime-search-form" onSubmit={(e) => e.preventDefault()}>
          <FieldGroup className="gap-4">
            {/* Buscador Principal */}
            <InputForm
              control={control}
              name="q"
              label="Title"
              placeholder="Search (e.g. Black Clover)..."
              withSearchIcon={true}
              error={errors.q}
              onInputBlur={(val) => handleQueryParams("q", val)}
            />

            <div className="flex flex-col items-center justify-center lg:grid lg:grid-cols-2 gap-4">
              <DatePickerForm
                control={control}
                name="start_date"
                label="Start date"
                error={errors.start_date}
                required={true}
                onDateSelect={(date_str) =>
                  handleQueryParams("start_date", date_str)
                }
              />

              <DatePickerForm
                control={control}
                name="end_date"
                label="End date"
                error={errors.end_date} // Aquí se mostrará el error del .refine()
                required={false}
                placeholder="Optional"
                onDateSelect={(date_str) =>
                  handleQueryParams("end_date", date_str)
                }
              />
            </div>

            <div className="flex flex-col items-center justify-center lg:grid lg:grid-cols-2 gap-4">
              <SelectForm
                control={control}
                name="order_by"
                label="Order by"
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
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        {children}
        {/* Botón Reset mejorado */}
        <Button
          type="button"
          variant="destructive"
          onClick={handleReset}
          className="hover:scale-105 transition-transform"
        >
          Reset Filters
        </Button>
      </CardFooter>
    </Card>
  );
};
