import { QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./AppRouter";
import { ThemeProvider } from "./components/ui/theme-provider";
import ErrorBoundary from "./ErrorBoundary";
import { queryClient } from "./utils";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Buscamos todas las etiquetas que tienen la clase .static-seo
    const staticElements = document.querySelectorAll(".static-seo");

    // Las eliminamos del DOM de forma segura
    staticElements.forEach((el) => el.remove());

    // SEO Estático eliminado. React Helmet toma el control.
  }, []);
  /* Aquí orquestamos llamados a providers de contextos globales definidos por nosotros */
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <AppRouter />
          </HelmetProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
