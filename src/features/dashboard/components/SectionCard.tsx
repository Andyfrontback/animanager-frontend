import { Clock, Star, Trophy, Clapperboard } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AnimeStatsCardsProps {
  totalMinutes: number;
  topGenre: string;
  avgScore: number;
  favoriteStudio: string;
}

export function AnimeStatsCards({
  totalMinutes,
  topGenre,
  avgScore,
  favoriteStudio,
}: AnimeStatsCardsProps) {
  const totalHours = (totalMinutes / 60).toFixed(1);

  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs sm:grid-cols-2 xl:grid-cols-4">
      {/* Total Hours */}
      <Card className="@container/card">
        <CardHeader className="pb-2">
          <CardDescription>Total Watch Time</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {totalHours} hrs
          </CardTitle>
          <div className="absolute top-4 right-4 text-muted-foreground">
            <Clock className="size-5" />
          </div>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground pt-4 border-t mt-4">
          Based on {totalMinutes} total minutes watched
        </CardFooter>
      </Card>

      {/* Top Genre (Highlighted) */}
      <Card className="@container/card border-[oklch(0.6_0.25_280)]/50 bg-[oklch(0.6_0.25_280)]/5">
        <CardHeader className="pb-2">
          <CardDescription className="text-[oklch(0.6_0.25_280)] font-medium">
            Top Genre
          </CardDescription>
          <CardTitle className="text-2xl font-semibold truncate text-[oklch(0.6_0.25_280)]">
            {topGenre}
          </CardTitle>
          <div className="absolute top-4 right-4 text-[oklch(0.6_0.25_280)]">
            <Star className="size-5 fill-[oklch(0.6_0.25_280)]/20" />
          </div>
        </CardHeader>
        <CardFooter className="text-sm text-[oklch(0.6_0.25_280)]/80 pt-4 border-t border-[oklch(0.6_0.25_280)]/20 mt-4">
          Your most watched genre
        </CardFooter>
      </Card>

      {/* Average Score */}
      <Card className="@container/card">
        <CardHeader className="pb-2">
          <CardDescription>Average Score</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {avgScore} / 10
          </CardTitle>
          <div className="absolute top-4 right-4 text-muted-foreground">
            <Trophy className="size-5" />
          </div>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground pt-4 border-t mt-4">
          Average rating across all anime
        </CardFooter>
      </Card>

      {/* Favorite Studio */}
      <Card className="@container/card">
        <CardHeader className="pb-2">
          <CardDescription>Favorite Studio</CardDescription>
          <CardTitle className="text-2xl font-semibold truncate">
            {favoriteStudio}
          </CardTitle>
          <div className="absolute top-4 right-4 text-muted-foreground">
            <Clapperboard className="size-5" />
          </div>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground pt-4 border-t mt-4">
          Studio with the most titles watched
        </CardFooter>
      </Card>
    </div>
  );
}
