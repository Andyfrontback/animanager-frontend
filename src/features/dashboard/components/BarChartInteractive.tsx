"use client";

import { useState, useEffect, useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/components/ui/chart";

interface InteractiveStatsChartProps {
  genreFrequency: Record<string, number>;
  studioFrequency: Record<string, number>;
}

type ChartView = "genres" | "studios";

const chartConfig = {
  count: {
    label: "Cantidad",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function InteractiveStatsChart({
  genreFrequency,
  studioFrequency,
}: InteractiveStatsChartProps) {
  const [activeView, setActiveView] = useState<ChartView>("genres");
  const [showXAxisLabels, setShowXAxisLabels] = useState(true);

  // Detectar si la pantalla es >= 1280px, XAxis se ve bien solo en esta resolución
  useEffect(() => {
    const handleResize = () => {
      setShowXAxisLabels(window.innerWidth >= 1280);
    };

    // Ejecutar una vez al montar para obtener el tamaño inicial
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Tomamos el top 10 de la data para no sobrecargar de información
  const chartData = useMemo(() => {
    const rawData = activeView === "genres" ? genreFrequency : studioFrequency;
    return Object.entries(rawData)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [genreFrequency, studioFrequency, activeView]);

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b p-0 pb-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0">
          <CardTitle>Preference Analysis</CardTitle>
          <CardDescription>Top 10 Watched List Distribution</CardDescription>
        </div>
        <div className="flex">
          {(["genres", "studios"] as ChartView[]).map((view) => (
            <button
              key={view}
              data-active={activeView === view}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6 cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => setActiveView(view)}
              aria-label={`Ver estadísticas de ${view === "genres" ? "Géneros" : "Estudios"}`}
            >
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {view === "genres" ? "Genres" : "Studios"}
              </span>
              {/* <span className="text-lg leading-none font-bold sm:text-2xl capitalize">
                {activeView === view ? "Currently viewing" : "Switch view"}
              </span> */}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-87.5 w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12, top: 20 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={showXAxisLabels} // Renderiza los labels solo si es >= 1280px
              tickFormatter={(value) =>
                value.length > 8 ? `${value.substring(0, 8)}...` : value
              }
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="count"
              fill="var(--color-count)"
              radius={[4, 4, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
