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
  // Update this URL to the production Vercel domain when deploying
  const siteUrl = "https://animanager.vercel.app";

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
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph (Facebook, WhatsApp, Discord) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta
          property="og:title"
          content="AniManager - Anime Analytics & Tier Lists"
        />
        <meta
          property="og:description"
          content="Track your progress, analyze statistics with Web Workers, and organize your favorites."
        />
        <meta property="og:image" content={`${siteUrl}${alyaImg}`} />
        <meta property="og:site_name" content="AniManager" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AniManager | Anime Journey Pro" />
        <meta
          name="twitter:description"
          content="Take your anime list to the next level with detailed statistics."
        />
        <meta name="twitter:image" content={`${siteUrl}${alyaImg}`} />
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
                altText="Anime list interface featuring Kaguya Shinomiya"
                layoutType="horizontal"
                cardHref="/private/anime/list"
              />
            </article>

            <article className="md:col-span-1 md:row-span-2">
              <TiltCard
                title="Analytics"
                description="Visualize your watch time and favorite genres."
                image={kohakuImg}
                altText="Statistics charts with Dr. Stone's Kohaku"
                layoutType="vertical"
                cardHref="/private/dashboard"
              />
            </article>

            <article className="md:col-span-1 md:row-span-2">
              <TiltCard
                title="Tier Lists"
                description="Drag and drop to rank your favorite anime."
                image={alyaImg}
                altText="Tier list creator with Alya"
                layoutType="vertical"
                cardHref="/private/anime/tierlist"
              />
            </article>

            <article className="md:col-span-1 md:row-span-1">
              <TiltCard
                image={rezeImg}
                altText="Interface decoration featuring Reze from Chainsaw Man"
                layoutType="mini"
                className="border-primary/40 shadow-[0_0_50px_rgba(var(--color-primary),0.15)]"
              />
            </article>

            <article className="md:col-span-2 md:row-span-1">
              <TiltCard
                title="Discovery"
                description="Coming soon: Smart recommendation engine."
                image={maomaoImg}
                altText="Smart recommendations with Maomao from Apothecary Diaries"
                layoutType="horizontal"
              />
            </article>
          </BentoGrid>
        </section>
      </div>
    </>
  );
};
