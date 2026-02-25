"use client";

import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type FieldError,
} from "react-hook-form";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { FieldErrorComponent } from "./FieldErrorComponent";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectFormProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: SelectOption[];
  label: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  onValueSelect?: (value: string | undefined) => void;
  error?: FieldError;
  className?: string;
}

export const SelectForm = <T extends FieldValues>({
  name,
  control,
  options,
  label,
  description,
  placeholder = "Seleccionar",
  required = false,
  onValueSelect,
  error,
  className,
}: SelectFormProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const currentError = error || fieldState.error;

        return (
          <Field
            data-invalid={!!currentError}
            className={cn("flex flex-col gap-2", className)} // Layout vertical estándar
          >
            <FieldLabel htmlFor={name} className="font-medium">
              {label} {required && <span className="text-red-500">*</span>}
              <FieldErrorComponent error={error} fieldState={fieldState} />
            </FieldLabel>

            <div className="relative">
              <Select
                name={field.name}
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  if (onValueSelect) onValueSelect(value);
                }}
              >
                <SelectTrigger
                  id={name}
                  className={cn(
                    "w-full",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {description && <FieldDescription>{description}</FieldDescription>}
          </Field>
        );
      }}
    />
  );
};
