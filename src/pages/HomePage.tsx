import { Hero } from "@/features/home/components/Hero";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

export const HomePage = () => {
  return (
    <>
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
          <Button
            size="lg"
            className="bg-primary hover:bg-primary-hover text-primary-foreground font-bold px-8 shadow-[0_0_20px_rgba(var(--primary),0.3)]"
          >
            Get Started
          </Button>
          <NavLink to="/private/anime/list">
            <Button
              size="lg"
              variant="outline"
              className="border-primary/20 hover:bg-primary/5"
            >
              Browse Anime
            </Button>
          </NavLink>
        </div>
      </Hero>
    </>
  );
};
