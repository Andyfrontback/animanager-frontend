// src/pages/HomePage.tsx
import { Hero } from "@/features/home/components/Hero";
import { BentoGrid } from "@/features/home/components/BentoGrid";
import { TiltCard } from "@/features/home/components/TiltCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router"; // O react-router-dom
import maomaoImg from "@/assets/imgs/Maomao.jpg";
import rezeImg from "@/assets/imgs/reze.jpg";
import kaguyaImg from "@/assets/imgs/kaguyaShinomiya.jpg";
import kohakuImg from "@/assets/imgs/Kohaku.jpg";
import frierenImg from "@/assets/imgs/frieren.jpeg";

export const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight">
          Track your <span className="text-primary italic">Anime</span> <br />
          journey like a pro
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
          Analyze your stats, create custom tier lists and save your watched
          anime in one place.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <a href="#features-grid">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-hover text-primary-foreground font-bold px-8 shadow-primary/30"
            >
              Get Started
            </Button>
          </a>
          <Link to="/private/anime/list">
            <Button
              size="lg"
              variant="outline"
              className="border-primary/20 hover:bg-primary/5"
            >
              Browse Anime
            </Button>
          </Link>
        </div>
      </Hero>

      {/* SECCIÓN DEL BENTO GRID */}
      <BentoGrid id="features-grid">
        {/* Horizontal: Ocupa 2 columnas */}
        <div className="md:col-span-2 md:row-span-1">
          <TiltCard
            title="Advanced Watched List"
            description="Filter by genre, year, status and more."
            image={kaguyaImg}
            layoutType="horizontal"
            cardHref="/private/anime/list"
          />
        </div>

        {/* Vertical: Ocupa 1 columna, 2 filas de alto */}
        <div className="md:col-span-1 md:row-span-2">
          <TiltCard
            title="Personal Dashboard"
            description="Visualize your hours watched, top genres and custom analytics."
            image={kohakuImg}
            layoutType="vertical"
          />
        </div>

        {/* Vertical: Ocupa 1 columna, 2 filas de alto */}
        <div className="md:col-span-1 md:row-span-2">
          <TiltCard
            title="Custom Tier Lists"
            description="Drag and drop your favorite anime to create the ultimate ranking."
            image={frierenImg}
            layoutType="vertical"
          />
        </div>

        {/* Mini Card Central: Ocupa 1 columna */}
        <div className="md:col-span-1 md:row-span-1">
          <TiltCard
            image={rezeImg}
            layoutType="mini"
            className="border-primary/50 shadow-[0_0_30px_rgba(var(--color-primary),0.2)]"
          />
        </div>

        <div className="md:col-span-2 md:row-span-1">
          <TiltCard
            title="Discovery"
            description="Coming soon"
            image={maomaoImg}
            layoutType="horizontal"
          />
        </div>
      </BentoGrid>

      {/* FOOTER SENCILLO */}
      <footer className="mt-auto border-t border-border bg-background py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm font-medium">
            © {new Date().getFullYear()} AniManager
          </p>
          <div className="flex gap-4">
            {/* <Link
              to="/about"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </Link> */}
            <a
              href="https://github.com/andyfrontback"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
