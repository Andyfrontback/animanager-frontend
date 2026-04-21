import { AlertCircle } from "lucide-react";
import type { ControllerFieldState, FieldError } from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

interface FieldErrorComponentProps {
  error?: FieldError;
  fieldState?: ControllerFieldState;
}

export const FieldErrorComponent = ({
  error,
  fieldState,
}: FieldErrorComponentProps) => {
  const actualError = error || fieldState?.error;

  // Si no hay error, no renderizamos nada, manteniendo la UI intacta
  if (!actualError) return null;

  return (
    // Reducimos el delay para que el error se vea casi de inmediato al pasar el mouse
    <TooltipProvider delayDuration={500}>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* El ícono de emergencia. inline-block y ml-1 lo alinean perfecto con el label */}
          <AlertCircle
            className="inline-block w-4 h-4 ml-1.5 text-destructive cursor-help outline-none animate-in zoom-in duration-1000"
            aria-label="Error en el campo"
          />
        </TooltipTrigger>

        {/* Usamos side="right" o "top" según prefieras. Le damos color de alerta al fondo */}
        <TooltipContent
          side="right"
          className="bg-destructive text-destructive-foreground font-medium text-xs max-w-62.5 text-center"
        >
          <p>{actualError.message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
