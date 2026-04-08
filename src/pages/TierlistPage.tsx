import { TierListContainer } from "@/features/tierlist/components/TierListContainer";
import { Helmet } from "react-helmet-async";
import { siteBaseUrl } from "./constants";
import alyaImg from "@/assets/imgs/alya.webp";

const pageUrl = `${siteBaseUrl}/feature/anime/tierlist`;
const ogImage = new URL(alyaImg, siteBaseUrl).href;

export const TierlistPage = () => {
  return (
    <>
      <Helmet>
        {/* Core Meta */}
        <title>Anime Tier List Maker | AniManager</title>
        <meta
          name="description"
          content="Organize and rank your favorite anime series from S to D tier. Drag and drop to create your custom, interactive anime tier list."
        />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta
          property="og:title"
          content="Anime Tier List Maker | AniManager"
        />
        <meta
          property="og:description"
          content="Organize and rank your favorite anime series from S to D tier. Drag and drop to create your custom, interactive anime tier list."
        />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Preview of the AniManager Tierlist Maker interface"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta
          name="twitter:title"
          content="Anime Tier List Maker | AniManager"
        />
        <meta
          name="twitter:description"
          content="Organize and rank your favorite anime series from S to D tier. Drag and drop to create your custom, interactive anime tier list."
        />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      {/* 1. No usamos main, ya que el layout lo puso por nosotros */}
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* 2. Encabezado Semántico */}
          <header className="space-y-2 text-center md:text-left">
            <h1 className="text-3xl font-black tracking-tighter sm:text-4xl md:text-5xl uppercase italic">
              Anime <span className="text-primary">Tierlist</span> Maker
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
              Drag and drop your anime to rank them. Your changes are
              automatically saved to your local workspace.
            </p>
          </header>

          {/* Separador visual sutil */}
          <hr className="border-border max-w-7xl mx-auto" aria-hidden="true" />

          {/* 3. El contenedor dentro de una sección con etiqueta aria */}
          <section aria-labelledby="tierlist-section-title" className="w-full">
            <h2 id="tierlist-section-title" className="sr-only">
              Interactive Tier List Editor
            </h2>
            <TierListContainer />
          </section>
        </div>
      </div>
    </>
  );
};
