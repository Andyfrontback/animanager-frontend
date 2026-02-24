import { QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./AppRouter";
import { ThemeProvider } from "./components/ui/theme-provider";
import ErrorBoundary from "./ErrorBoundary";
import { queryClient } from "./utils";

function App() {
  /* Aquí orquestamos llamados a providers de contextos globales definidos por nosotros */
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
