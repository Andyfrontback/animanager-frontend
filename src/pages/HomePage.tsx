import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { Hero } from "@/features/home/components/Hero";
import { BentoGrid } from "@/features/home/components/BentoGrid";
import { TiltCard } from "@/features/home/components/TiltCard";
import { Button } from "@/components/ui/button";

// Assets
import maomaoImg from "@/assets/imgs/Maomao.webp";
import rezeImg from "@/assets/imgs/reze.jpg";
import kaguyaImg from "@/assets/imgs/kaguya.jpg";
import kohakuImg from "@/assets/imgs/Kohaku.jpg";
import alyaImg from "@/assets/imgs/alya.webp";

export const HomePage = () => {
  // Nota: Cuando despliegues, cambia esta URL por la real de Vercel
  const siteUrl = "https://animanager.vercel.app";

  return (
    <>
      <Helmet>
        {/* Atributos básicos y SEO de contenido */}
        <html lang="es" />
        <title>AniManager | Gestiona tu camino en el Anime</title>
        <meta
          name="description"
          content="La plataforma definitiva para trackear tu progreso anime, analizar estadísticas avanzadas y crear tier lists personalizadas."
        />
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph (Facebook, WhatsApp, Discord) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta
          property="og:title"
          content="AniManager - Analytics y Tierlists de Anime"
        />
        <meta
          property="og:description"
          content="Trackea tu progreso, analiza estadísticas con Web Workers y organiza tus favoritos."
        />
        <meta property="og:image" content={`${siteUrl}${alyaImg}`} />
        <meta property="og:site_name" content="AniManager" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AniManager | Anime Journey Pro" />
        <meta
          name="twitter:description"
          content="Lleva tu lista de anime al siguiente nivel con estadísticas detalladas."
        />
        <meta name="twitter:image" content={`${siteUrl}${alyaImg}`} />
      </Helmet>

      <main className="min-h-screen flex flex-col bg-background selection:bg-primary/30">
        <header>
          <Hero>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic">
              Gestiona tu camino <span className="text-primary">Anime</span>{" "}
              <br />
              como un{" "}
              <span className="[-webkit-text-stroke:2px_var(--color-primary)] text-transparent">
                pro
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed font-medium">
              Analiza tus estadísticas, crea tier lists personalizadas y mantén
              todo tu historial en un solo lugar.
            </p>

            <nav
              className="flex flex-wrap gap-4 pt-6"
              aria-label="Acciones principales"
            >
              <a href="#features-grid">
                <Button
                  size="lg"
                  className="font-bold px-8 shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
                >
                  Empezar ahora
                </Button>
              </a>
              <Link to="/private/anime/list">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/20 hover:bg-primary/5 font-bold"
                >
                  Explorar Anime
                </Button>
              </Link>
            </nav>
          </Hero>
        </header>

        {/* Sección de características con ID para el salto del Hero */}
        <section id="features-grid" aria-labelledby="features-title">
          {/* Título oculto para buscadores, mantiene la jerarquía semántica */}
          <h2 id="features-title" className="sr-only">
            Características principales
          </h2>

          <BentoGrid>
            <article className="md:col-span-2 md:row-span-1">
              <TiltCard
                title="Lista de Seguimiento Avanzada"
                description="Filtros potentes sincronizados con la URL para búsquedas fluidas."
                image={kaguyaImg}
                altText="Interfaz de lista de anime con Kaguya Shinomiya"
                layoutType="horizontal"
                cardHref="/private/anime/list"
              />
            </article>

            <article className="md:col-span-1 md:row-span-2">
              <TiltCard
                title="Analíticas"
                description="Visualiza tu tiempo de visualización y géneros favoritos."
                image={kohakuImg}
                altText="Gráficos de estadísticas con Kohaku de Dr. Stone"
                layoutType="vertical"
                cardHref="/private/dashboard"
              />
            </article>

            <article className="md:col-span-1 md:row-span-2">
              <TiltCard
                title="Tier Lists"
                description="Arrastra y suelta para clasificar tus animes preferidos."
                image={alyaImg}
                altText="Creador de tier lists con Alya"
                layoutType="vertical"
                cardHref="/private/anime/tierlist"
              />
            </article>

            <article className="md:col-span-1 md:row-span-1">
              <TiltCard
                image={rezeImg}
                altText="Decoración de interfaz con Reze de Chainsaw Man"
                layoutType="mini"
                className="border-primary/40 shadow-[0_0_50px_rgba(var(--color-primary),0.15)]"
              />
            </article>

            <article className="md:col-span-2 md:row-span-1">
              <TiltCard
                title="Descubrimiento"
                description="Próximamente: Motor de recomendaciones inteligente."
                image={maomaoImg}
                altText="Recomendaciones inteligentes con Maomao de Apothecary Diaries"
                layoutType="horizontal"
              />
            </article>
          </BentoGrid>
        </section>
      </main>
    </>
  );
};
