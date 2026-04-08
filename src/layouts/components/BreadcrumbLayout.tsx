import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useLocation } from "react-router";
import { Fragment } from "react/jsx-runtime";

const protectedRoutes = ["feature", "public", "home"];

export const BreadcrumbLayout = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // 1. Transformamos y filtramos PRIMERO.
  // Esto separa la lógica de datos de la lógica visual.
  const visibleCrumbs = pathSegments
    .map((segment, index) => {
      // Calculamos el href basándonos en la ruta ORIGINAL completa
      const href = `/${pathSegments.slice(0, index + 1).join("/")}`;

      return {
        href,
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        isHidden: protectedRoutes.includes(segment),
      };
    })
    .filter((crumb) => !crumb.isHidden); // Aquí eliminamos los ocultos

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Mapeamos la lista ya limpia */}
        {visibleCrumbs.map((crumb, index) => {
          const isLast = index === visibleCrumbs.length - 1;

          return (
            <Fragment key={crumb.href}>
              {/* El separador ahora siempre va ANTES del item (excepto el primero que es Inicio,
                  pero aquí lo ponemos al inicio del fragmento para que conecte con el anterior) */}
              <BreadcrumbSeparator className="hidden md:block" />

              <BreadcrumbItem className="hidden md:block">
                {isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
