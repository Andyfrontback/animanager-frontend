import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  // Permitimos inyectar una UI de error personalizada (Flexibilidad)
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(): ErrorBoundaryState {
    // Retornamos el nuevo estado para que el próximo render muestre la UI alternativa
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Aquí podrías conectar con un servicio de logging externo (Sentry, LogRocket, etc.)
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Si nos pasaron un fallback, lo usamos. Si no, usamos uno por defecto.
      return this.props.fallback || <h1>Ups! Algo salió mal.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
