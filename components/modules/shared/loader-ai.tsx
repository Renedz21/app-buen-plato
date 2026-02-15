import Image from "next/image";
import { useState, useEffect } from "react";

interface LoaderAIProps {
  messages?: string[];
  duration?: number;
}

const LoaderAI: React.FC<LoaderAIProps> = ({
  messages = [
    "Llamando a la IA...",
    "Pensando en sabores...",
    "Ya casi...",
    "Preparando tu menú...",
    "Seleccionando recetas...",
    "¡Casi listo!",
  ],
  duration = 3500,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setFade(true);
      }, 500);
    }, duration);

    return () => clearInterval(interval);
  }, [messages.length, duration]);

  return (
    <div className="flex min-h-[300] flex-col items-center justify-center gap-8 md:min-h-[500]">
      {/* Logo Animado */}
      <div className="relative">
        {/* Círculo de pulso de fondo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="bg-primary/20 h-20 w-20 animate-ping rounded-full"
            style={{ animationDuration: "2.5s" }}
          />
        </div>

        {/* Logo SVG con animaciones */}
        <div className="relative z-10 flex h-20 w-20 items-center justify-center">
          <Image
            src="/images/que-como-logo.webp"
            alt="Logo"
            width={50}
            height={50}
          />
        </div>
      </div>

      {/* Texto con transición */}
      <div className="relative flex h-16 items-center">
        <p
          className={`text-primary-foreground text-xl font-medium transition-all duration-500 ${
            fade ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          {messages[currentIndex]}
        </p>
      </div>

      {/* Barra de progreso decorativa */}
      <div className="h-1 w-64 overflow-hidden rounded-full bg-gray-200 shadow-inner">
        <div className="animate-progress from-primary to-primary h-full bg-linear-to-r" />
      </div>
    </div>
  );
};

export default LoaderAI;
