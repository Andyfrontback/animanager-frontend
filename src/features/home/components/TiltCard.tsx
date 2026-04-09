// src/features/home/components/TiltCard.tsx
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  title?: string;
  description?: string;
  image: string;
  altText: string;
  cardHref?: string;
  layoutType?: "vertical" | "horizontal" | "mini";
  className?: string;
  children?: ReactNode;
}

export const TiltCard = ({
  title,
  description,
  image,
  altText,
  cardHref,
  layoutType = "vertical",
  className,
  children,
}: TiltCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    /* 1. EL CONTENEDOR DE PERSPECTIVA (Crucial para que no se deforme) */
    <Link
      to={cardHref || "#"}
      className={cn(
        "relative w-full h-full perspective-[1000px] block group/card hover:z-40 transition-all duration-300",
        className,
      )}
    >
      <motion.div
        // Sroll Animation
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        // Tilt Card Config
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer border-2 border-border/50 hover:border-primary/50 transition-colors shadow-2xl min-h-70",
          layoutType === "horizontal" ? "flex flex-row" : "flex flex-col",
          layoutType === "mini" && "justify-center items-center text-center",
        )}
      >
        {/* 2. CAPA FONDO (Empujada hacia atrás para mayor profundidad) */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-70"
          style={{
            backgroundImage: `url(${image})`,
            transform: "translateZ(-20px)",
          }}
          role="img"
          aria-label={altText}
        />

        {/* 3. CAPA OVERLAYS (Nivel 0) */}
        <div
          className="absolute inset-0 z-1 bg-background/50 dark:bg-background/60 group-hover:bg-background/30 dark:group-hover:bg-background/40 transition-colors duration-300"
          style={{ transform: "translateZ(0px)" }}
        />
        <div
          className="absolute inset-0 z-1 bg-linear-to-t dark:from-background/95 dark:via-background/50 to-transparent"
          style={{ transform: "translateZ(0px)" }}
        />

        {/* 4. CAPA DECORATIVA: Corner Brackets y Glow Line inspirados en Atropos (Nivel 1) */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Esquinas */}
          <div className="absolute top-5 left-5 w-6 h-6 border-t-2 border-l-2 opacity-40 border-primary group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-5 right-5 w-6 h-6 border-t-2 border-r-2 opacity-40 border-primary group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-5 left-5 w-6 h-6 border-b-2 border-l-2 opacity-40 border-primary group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute right-5 bottom-5 w-6 h-6 border-r-2 border-b-2 opacity-40 border-primary group-hover:opacity-100 transition-opacity duration-300" />

          {/* Línea de brillo inferior */}
          <div className="absolute right-0 bottom-0 left-0 h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* 5. CAPA CONTENIDO: Texto y Botones (Nivel 2 - ¡Flotando!) */}
        <div
          className={cn(
            "relative z-20 p-8 h-full flex flex-col w-full",
            layoutType === "horizontal"
              ? "justify-center w-1/2"
              : "justify-end",
            layoutType === "mini" && "p-4",
          )}
          style={{ transform: "translateZ(50px)" }}
        >
          {title && (
            <h3 className="text-2xl md:text-3xl font-extrabold mb-2 tracking-tight drop-shadow-xl">
              {title}
            </h3>
          )}
          {description && (
            <p className="dark:text-muted-foreground text-sm mb-5 font-medium drop-shadow-sm">
              {description}
            </p>
          )}

          {children}
        </div>
      </motion.div>
    </Link>
  );
};
