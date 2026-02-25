"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type FieldError,
} from "react-hook-form";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { FieldErrorComponent } from "./FieldErrorComponent";

interface DatePickerFormProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  required: boolean;
  description?: string;
  placeholder?: string;
  onDateSelect: (dateString: string | undefined) => void;
  error?: FieldError;
  minYear?: number;
  maxYear?: number;
}

export function DatePickerForm<T extends FieldValues>({
  name,
  control,
  label,
  required = true,
  description,
  placeholder = "Selecciona fecha",
  onDateSelect,
  error,
  minYear = 1990, // Un default más sensato para anime
  maxYear = new Date().getFullYear() + 2,
}: DatePickerFormProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  // Helper para formatear a lo que pide tu API
  const formatDateForApi = (date: Date) => format(date, "yyyy-MM-dd");

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className="flex flex-col gap-2"
        >
          <FieldLabel htmlFor={name}>
            {label} {required && <span className="text-red-500">*</span>}
            <FieldErrorComponent error={error} fieldState={fieldState} />
          </FieldLabel>

          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <div className="relative flex items-center">
              <PopoverTrigger asChild>
                <Button
                  id={name}
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal pr-10", // pr-10 para dejar espacio a la X
                    !field.value && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(new Date(field.value).setUTCHours(5), "PPP")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                </Button>
              </PopoverTrigger>

              {/* Botón de Limpiar (X) - Fuera del Trigger para evitar conflictos */}
              {!required && field.value && (
                <div
                  role="button"
                  tabIndex={0}
                  className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer p-1 hover:bg-slate-400 rounded-full text-muted-foreground hover:text-foreground transition-colors z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    field.onChange("");
                    if (onDateSelect) onDateSelect(undefined);
                  }}
                >
                  <X className="h-4 w-4" />
                </div>
              )}
            </div>

            <PopoverContent
              className="w-auto p-3"
              align="center"
              side="top"
              sideOffset={8}
            >
              <Calendar
                mode="single"
                captionLayout="dropdown"
                selected={
                  field.value ? new Date(`${field.value}T00:00:00`) : undefined
                }
                onSelect={(date) => {
                  setIsOpen(false);
                  if (date) {
                    field.onChange(formatDateForApi(date));
                    if (onDateSelect) onDateSelect(formatDateForApi(date));
                  }
                }}
                disabled={(date) =>
                  date > new Date(maxYear, 11, 31) ||
                  date < new Date(minYear, 0, 1)
                }
              />
            </PopoverContent>
          </Popover>

          {description && <FieldDescription>{description}</FieldDescription>}
        </Field>
      )}
    />
  );
}
