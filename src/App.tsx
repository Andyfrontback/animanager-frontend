import AppRouter from "./AppRouter";
import { ThemeProvider } from "./components/ui/theme-provider";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  /* Aquí orquestamos llamados a providers de contextos globales definidos por nosotros */
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRouter />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
