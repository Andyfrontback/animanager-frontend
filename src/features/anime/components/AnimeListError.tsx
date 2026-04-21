import { ServerCrash, RefreshCcw } from "lucide-react";
import { Button } from "@/shared/components/ui/button"; // Asumiendo que tienes el Button de shadcn

interface AnimeListErrorProps {
  errorMessage: string;
  resetErrorBoundary: () => void;
  resetErrorButtonMessage?: string;
}

export const AnimeListError = ({
  errorMessage,
  resetErrorBoundary,
  resetErrorButtonMessage,
}: AnimeListErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 w-full p-6 text-center animate-in fade-in zoom-in duration-300">
      {/* Icono de error (puedes cambiarlo por WifiOff, AlertTriangle, etc.) */}
      <div className="bg-destructive/10 p-4 rounded-full mb-4">
        <ServerCrash className="w-10 h-10 text-destructive" />
      </div>

      {/* Título amigable */}
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-2">
        ¡Ups! Something went wrong
      </h2>

      {/* Mensaje técnico */}
      <p className="text-sm text-muted-foreground max-w-md mb-6">
        Failed to load anime list: <br />
        <span className="font-mono text-xs bg-muted p-1 rounded mt-2 inline-block">
          {errorMessage}
        </span>
      </p>

      {/* Botón de reintento */}
      <Button onClick={resetErrorBoundary} variant="outline" className="gap-2">
        <RefreshCcw className="w-4 h-4" />
        {resetErrorButtonMessage || "Try again"}
      </Button>
    </div>
  );
};
