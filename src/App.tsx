import { QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./AppRouter";
import { ThemeProvider } from "./components/ui/theme-provider";
import ErrorBoundary from "./ErrorBoundary";
import { queryClient } from "./utils";
import { HelmetProvider } from "react-helmet-async";

function App() {
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
