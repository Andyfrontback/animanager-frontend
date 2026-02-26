"use client";

import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type FieldError,
} from "react-hook-form";
import { X, Search } from "lucide-react"; // Iconos para UX
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import type { HTMLInputTypeAttribute } from "react";
import { FieldErrorComponent } from "./FieldErrorComponent";

interface InputFormProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  description?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  onInputBlur?: (value: string | undefined) => void;
  error?: FieldError;
  withSearchIcon?: boolean;
  required?: boolean;
}

export const InputForm = <T extends FieldValues>({
  name,
  control,
  label,
  description,
  placeholder,
  onInputBlur,
  error,
  type = "text",
  withSearchIcon = false,
  required = false,
}: InputFormProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const currentError = error || fieldState.error;
        const showClearButton = !required && !!field.value;

        return (
          <Field data-invalid={!!currentError} className="flex flex-col gap-2">
            <FieldLabel htmlFor={name} className="font-medium">
              {label} {required && <span className="text-red-500">*</span>}
              <FieldErrorComponent error={error} fieldState={fieldState} />
            </FieldLabel>

            <div className="relative flex items-center">
              {/* Icono de Lupa */}
              {withSearchIcon && (
                <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
              )}

              <Input
                {...field}
                id={name}
                type={type}
                placeholder={placeholder || label}
                className={cn(
                  "w-full",
                  withSearchIcon && "pl-9", // Espacio para la lupa
                  showClearButton && "pr-9", // Espacio para la X
                )}
                // Importante: Sobreescribimos onBlur pero llamamos al original
                onBlur={(e) => {
                  field.onChange(e.target.value);
                  field.onBlur(); // Mantiene el estado 'touched' de RHF
                  if (onInputBlur) onInputBlur(e.target.value || undefined);
                }}
                // UX Extra: Permitir buscar al presionar Enter
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.currentTarget.blur(); // Fuerza el blur para disparar la búsqueda
                  }
                }}
              />

              {/* Botón de Limpiar (X) */}
              {showClearButton && (
                <button
                  type="button" // Vital para no enviar el form al hacer click
                  tabIndex={-1} // Evita que el tab se detenga aquí
                  className="absolute right-3 p-1 rounded-full hover:bg-slate-100 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    field.onChange("");
                    if (onInputBlur) onInputBlur(undefined); // Limpia la URL
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {description && <FieldDescription>{description}</FieldDescription>}
          </Field>
        );
      }}
    />
  );
};
