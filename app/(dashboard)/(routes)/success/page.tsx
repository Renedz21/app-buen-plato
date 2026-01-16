import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, Sparkles } from "lucide-react";
import Link from "next/link";

// Benefits list - hoisted to module scope (Rule 6.3)
const benefits = [
  "Acceso ilimitado a todas las funciones Pro",
  "Respuestas prioritarias y personalizadas",
  "Planificación avanzada de menús semanales",
  "Soporte prioritario del equipo",
];

export default function SuccessPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl items-center justify-center px-4">
      <div className="w-full text-center">
        {/* Success Icon with Animation */}
        <div className="mb-8 flex justify-center">
          <div className="bg-primary/10 relative flex h-24 w-24 items-center justify-center rounded-full">
            <CheckCircle2 className="text-primary h-14 w-14 animate-[scale-in_0.3s_ease-out]" />
            <div className="bg-primary/20 absolute inset-0 animate-[ping_1s_ease-out] rounded-full" />
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
          ¡Pago exitoso!
        </h1>
        <p className="text-muted-foreground mb-8 text-lg md:text-xl">
          Bienvenido a{" "}
          <span className="text-primary font-semibold">Buen Plato Pro</span>
        </p>

        {/* Benefits Card */}
        <div className="border-border bg-card mb-10 rounded-2xl border p-8 text-left shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <Sparkles className="text-primary h-5 w-5" />
            </div>
            <h2 className="text-foreground text-xl font-semibold">
              Ya puedes disfrutar de:
            </h2>
          </div>

          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="bg-primary/10 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                  <CheckCircle2 className="text-primary h-3.5 w-3.5" />
                </div>
                <span className="text-foreground text-sm md:text-base">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            className="rounded-xl text-base font-semibold transition-transform hover:scale-105"
            asChild
          >
            <Link href="/dashboard">
              <Home className="mr-2 h-5 w-5" />
              Ir al inicio
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="rounded-xl text-base font-semibold transition-transform hover:scale-105"
            asChild
          >
            <Link href="/dashboard/menu">Explorar funciones</Link>
          </Button>
        </div>

        {/* Support Note */}
        <p className="text-muted-foreground mt-10 text-sm">
          ¿Necesitas ayuda?{" "}
          <Link
            href="/support"
            className="text-primary font-medium hover:underline"
          >
            Contacta con soporte
          </Link>
        </p>
      </div>
    </div>
  );
}
