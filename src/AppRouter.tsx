import { BrowserRouter, Navigate, Route } from "react-router";
import Layout from "@/layouts/app.layout";
import { PrivateGuard } from "@/guards";
import { PrivateRouter } from "@/routes/PrivateRouter";
import { PublicRouter } from "@/routes/PublicRouter";
import RoutesWithNotFound from "@/routes/components/RoutesWithNotFound";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <RoutesWithNotFound>
        {/* Layout para toda la app */}
        <Route element={<Layout />}>
          {/* Rutas públicas */}
          <Route path="public/*" element={<PublicRouter />} />

          {/* Rutas Privadas (La verdad no va a ser nunca privado pero pa practicar está bien) */}
          <Route element={<PrivateGuard />}>
            <Route path="private/*" element={<PrivateRouter />} />
          </Route>

          {/* Redirección inicial (En producción cambiar a public mientras poner la dir a testear en desarrollo)*/}
          <Route path="/" element={<Navigate to="private/anime/list" />} />
        </Route>
      </RoutesWithNotFound>
    </BrowserRouter>
  );
};

export default AppRouter;
