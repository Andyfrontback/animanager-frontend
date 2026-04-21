import { BrowserRouter, Route } from "react-router";
import Layout from "@/layouts/app.layout";
import { PrivateGuard } from "@/guards";
import { PrivateRouter } from "@/routes/PrivateRouter";
import { PublicRouter } from "@/routes/PublicRouter";
import RoutesWithNotFound from "@/routes/components/RoutesWithNotFound";
import { ScrollToTop } from "./shared/components/ScrollToTop";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RoutesWithNotFound>
        {/* Layout para toda la app */}
        <Route element={<Layout />}>
          {/* Rutas públicas */}
          <Route path="/*" element={<PublicRouter />} />

          {/* Rutas Privadas (La verdad no va a ser nunca privado pero pa practicar está bien) */}
          <Route element={<PrivateGuard />}>
            <Route path="feature/*" element={<PrivateRouter />} />
          </Route>
        </Route>
      </RoutesWithNotFound>
    </BrowserRouter>
  );
};

export default AppRouter;
