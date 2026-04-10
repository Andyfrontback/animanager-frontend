import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { Hero } from "@/features/home/components/Hero";
import { BentoGrid } from "@/features/home/components/BentoGrid";
import { TiltCard } from "@/features/home/components/TiltCard";
import { Button } from "@/components/ui/button";

// Assets
import maomaoImg from "@/assets/imgs/Maomao.webp";
import kaguyaImg from "@/assets/imgs/kaguya.webp";
import alyaImg from "@/assets/imgs/alya.webp";
import rezeImg from "@/assets/imgs/reze.webp";
import ichinoseImg from "@/assets/imgs/ichinose.webp";
import { siteBaseUrl, ogImg } from "./constants";

export const HomePage = () => {
  return (
    <>
      <Helmet>
        {/* Basic attributes and content SEO */}
        <html lang="en" />
        <title>AniManager | Manage Your Anime Journey</title>
        <meta
          name="description"
          content="The ultimate platform to track your anime progress, analyze advanced statistics, and create personalized tier lists."
        />
        <link rel="canonical" href={siteBaseUrl} />
        <link rel="preconnect" href="https://api.jikan.moe" />

        {/* Open Graph (Facebook, WhatsApp, Discord) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteBaseUrl} />
        <meta
          property="og:title"
          content="AniManager - Anime Analytics & Tier Lists"
        />
        <meta
          property="og:description"
          content="Track your progress, analyze statistics, and organize your favorites."
        />
        <meta property="og:image" content={`${siteBaseUrl}${ogImg}`} />
        <meta property="og:site_name" content="AniManager" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AniManager | Anime Journey Pro" />
        <meta
          name="twitter:description"
          content="Take your anime list to the next level with detailed statistics."
        />
        <meta name="twitter:image" content={`${siteBaseUrl}${ogImg}`} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background selection:bg-primary/30">
        <header>
          <Hero>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic">
              Manage Your <span className="text-primary">Anime</span> Journey{" "}
              <br />
              Like a{" "}
              <span className="[-webkit-text-stroke:2px_var(--color-primary)] text-transparent">
                Pro
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed font-medium">
              Analyze your statistics, create custom tier lists, and keep your
              entire history in one place.
            </p>

            <nav
              className="flex flex-wrap gap-4 pt-6"
              aria-label="Primary actions"
            >
              <a href="#features-grid">
                <Button
                  size="lg"
                  className="font-bold px-8 shadow-xl shadow-primary/10 hover:scale-105 transition-transform"
                >
                  Get Started
                </Button>
              </a>
              <Link to="/feature/anime/list">
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

        {/* Features section with ID anchor for Hero jump */}
        <section id="features-grid" aria-labelledby="features-title">
          {/* Hidden heading for search engines, maintains semantic hierarchy */}
          <h2 id="features-title" className="sr-only">
            Key Features
          </h2>

          <BentoGrid>
            <article className="md:col-span-2 md:row-span-1">
              <TiltCard
                title="Advanced Watchlist"
                description="Powerful filters synced with URL for seamless searching."
                image={kaguyaImg}
                altText="Dark close-up of Kaguya Shinomiya from 'Kaguya-sama: Love Is War' looking down with a serious, calculating expression."
                layoutType="horizontal"
                cardHref="/feature/anime/list"
              />
            </article>

            <article className="md:col-span-1 md:row-span-2">
              <TiltCard
                title="Analytics"
                description="Visualize your watch time and favorite genres."
                image={ichinoseImg}
                altText="Honami Ichinose from Classroom of the Elite in her school uniform at sunset."
                layoutType="vertical"
                cardHref="/feature/dashboard"
              />
            </article>

            <article className="md:col-span-1 md:row-span-2">
              <TiltCard
                title="Tier Lists"
                description="Drag and drop to rank your favorite anime."
                image={alyaImg}
                altText="Close-up of Alya from 'Alya Sometimes Hides Her Feelings in Russian' in her school uniform, looking thoughtfully at the camera."
                layoutType="vertical"
                cardHref="/feature/anime/tierlist"
              />
            </article>

            <article className="hidden md:block md:col-span-1 md:row-span-1">
              <TiltCard
                image={rezeImg}
                altText="Dimly lit medium shot of Reze from 'Chainsaw Man' smiling softly in an indoor setting."
                layoutType="mini"
                className="border-primary/40 shadow-[0_0_50px_rgba(var(--color-primary),0.15)]"
              />
            </article>

            <article className="md:col-span-2 md:row-span-1">
              <TiltCard
                title="Discovery"
                description="Coming soon: Smart recommendation engine."
                image={maomaoImg}
                altText="Extreme close-up of Maomao's eyes and face from 'The Apothecary Diaries' with a focused look."
                layoutType="horizontal"
              />
            </article>
          </BentoGrid>
        </section>
      </div>
    </>
  );
};
