import { TierListContainer } from "@/features/tierlist/components/TierListContainer";
// Asumiendo que usas react-helmet-async para SEO, si no, te doy la alternativa abajo
import { Helmet } from "react-helmet-async";

export const TierlistPage = () => {
  return (
    <>
      <Helmet>
        <title>Anime Tierlist Maker</title>
        <meta
          name="description"
          content="Organiza y clasifica tus animes favoritos en categorías desde S hasta D. Personaliza tu propia tierlist de forma interactiva."
        />
        <meta property="og:title" content="My Anime Tierlist Maker" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* 1. Usamos <main> para indicar el contenido único de esta ruta */}
      <main className="min-h-screen bg-background py-8 px-4" role="main">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* 2. Encabezado Semántico */}
          <header className="space-y-2 text-center md:text-left">
            <h1 className="text-3xl font-black tracking-tighter sm:text-4xl md:text-5xl uppercase italic">
              Anime <span className="text-primary">Tierlist</span> Maker
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
              Arrastra y suelta tus animes para clasificarlos. Tus cambios se
              guardan automáticamente en tu navegador.
            </p>
          </header>

          {/* 3. El contenedor dentro de una sección con etiqueta aria */}
          <section aria-label="Tierlist Editor" className="w-full">
            <TierListContainer />
          </section>
        </div>
      </main>
    </>
  );
};
