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
  return (
    <>
      <Helmet>
        <title>AniManager | Track your Anime Journey</title>
        <meta
          name="description"
          content="La plataforma definitiva para trackear tu progreso anime, analizar estadísticas avanzadas con Web Workers y crear tier lists con dnd-kit."
        />
        <meta
          property="og:title"
          content="AniManager - Anime Analytics & Tierlists"
        />
        <meta property="og:image" content={alyaImg} />
      </Helmet>

      <main className="min-h-screen flex flex-col bg-background selection:bg-primary/30">
        <header>
          <Hero>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic">
              Track your <span className="text-primary">Anime</span> <br />
              journey <span className="text-outline text-transparent">pro</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed font-medium">
              Analyze your stats, build custom tier lists, and keep all your
              watched anime in one place.
            </p>

            <nav
              className="flex flex-wrap gap-4 pt-6"
              aria-label="Hero Actions"
            >
              <a href="#features-grid">
                <Button
                  size="lg"
                  className="font-bold px-8 shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
                >
                  Get Started
                </Button>
              </a>
              <Link to="/private/anime/list">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/20 hover:bg-primary/5 font-bold"
                >
                  Browse Anime
                </Button>
              </Link>
            </nav>
          </Hero>
        </header>

        {/* BENTO GRID SECTION */}
        <BentoGrid id="features-grid">
          {/* Fila 1: Horizontal (Dominante) */}
          <article className="md:col-span-2 md:row-span-1">
            <TiltCard
              title="Advanced Watched List"
              description="Powerful filters synced with the URL for seamless searching."
              image={kaguyaImg}
              layoutType="horizontal"
              cardHref="/private/anime/list"
            />
          </article>

          {/* Columna Derecha: Vertical Larga (Ocupa 2 bloques de altura) */}
          <article className="md:col-span-1 md:row-span-2">
            <TiltCard
              title="Analytics"
              description="Visualize your watch time, top genres, and custom insights."
              image={kohakuImg}
              layoutType="vertical"
              cardHref="/private/dashboard"
            />
          </article>

          {/* Columna Izquierda: Vertical Larga (Cruza la fila central) */}
          <article className="md:col-span-1 md:row-span-2">
            <TiltCard
              title="Tier Lists"
              description="Smooth drag and drop to rank your favorites."
              image={alyaImg}
              layoutType="vertical"
              cardHref="/private/anime/tierlist"
            />
          </article>

          {/* Bloque Central: Mini (El cuadrito decorativo o de status) */}
          <article className="md:col-span-1 md:row-span-1">
            <TiltCard
              image={rezeImg}
              layoutType="mini"
              className="border-primary/40 shadow-[0_0_50px_rgba(var(--color-primary),0.15)]"
            />
          </article>

          {/* Fila Final: Horizontal */}
          <article className="md:col-span-2 md:row-span-1">
            <TiltCard
              title="Discovery"
              description="Coming soon: Smart recommendation engine."
              image={maomaoImg}
              layoutType="horizontal"
            />
          </article>
        </BentoGrid>
      </main>
    </>
  );
};
