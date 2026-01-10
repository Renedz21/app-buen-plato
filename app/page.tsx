import {
  Utensils,
  Apple,
  Clock,
  Droplets,
  ChefHat,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    icon: Utensils,
    title: "Optimiza tu menú",
    description: "Elige mejor entre las opciones del menú del día",
  },
  {
    icon: Apple,
    title: "SOS Antojos",
    description: "Sugerencias saludables cuando te da hambre",
  },
  {
    icon: ChefHat,
    title: "Cocina para 2 días",
    description: "Recetas simples que duran y ahorran tiempo",
  },
  {
    icon: Clock,
    title: "Desayuno en 5 min",
    description: "Ideas rápidas para empezar bien el día",
  },
  {
    icon: Droplets,
    title: "Hidratación",
    description: "Recordatorios amigables para tomar agua",
  },
];

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="bg-background/80 border-border fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
              <Utensils className="text-primary h-5 w-5" />
            </div>
            <span className="text-foreground text-xl font-semibold">
              BuenPlato
            </span>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/login">Iniciar sesión</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 pt-32 pb-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-foreground animate-fade-in text-4xl leading-tight font-bold md:text-6xl">
            Mejora tu alimentación
            <span className="text-primary"> sin esfuerzo</span>
          </h1>
          <p
            className="text-muted-foreground animate-fade-in mx-auto mt-6 max-w-2xl text-lg md:text-xl"
            style={{ animationDelay: "0.1s" }}
          >
            Una herramienta sencilla para tomar mejores decisiones alimenticias
            durante tu jornada laboral. Sin dietas, sin conteo de calorías.
          </p>
          <div
            className="animate-fade-in mt-10 flex flex-col justify-center gap-4 sm:flex-row"
            style={{ animationDelay: "0.2s" }}
          >
            <Button size="lg" asChild className="h-14 gap-2 px-8 text-lg">
              <Link href="/register">
                Comenzar gratis
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/30 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-foreground mb-4 text-center text-3xl font-bold md:text-4xl">
            Todo lo que necesitas
          </h2>
          <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center">
            Herramientas diseñadas para tu realidad: poco tiempo, presupuesto
            ajustado y la necesidad de energía para rendir en el trabajo.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card border-border animate-fade-in rounded-2xl border p-6 transition-shadow hover:shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                  <feature.icon className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-2 text-lg font-semibold">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-foreground mb-6 text-3xl font-bold md:text-4xl">
            Nuestra filosofía
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
            Creemos en la mejora progresiva, no en la perfección. Pequeños
            cambios sostenibles que se acumulan con el tiempo para transformar
            tu bienestar.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="p-6">
              <div className="text-primary mb-2 text-4xl font-bold">01</div>
              <h3 className="text-foreground mb-2 font-semibold">Realismo</h3>
              <p className="text-muted-foreground text-sm">
                Trabajamos con las opciones que realmente tienes disponibles
              </p>
            </div>
            <div className="p-6">
              <div className="text-primary mb-2 text-4xl font-bold">02</div>
              <h3 className="text-foreground mb-2 font-semibold">
                Simplicidad
              </h3>
              <p className="text-muted-foreground text-sm">
                Sin registros complicados ni conteo de calorías
              </p>
            </div>
            <div className="p-6">
              <div className="text-primary mb-2 text-4xl font-bold">03</div>
              <h3 className="text-foreground mb-2 font-semibold">Progreso</h3>
              <p className="text-muted-foreground text-sm">
                Cada pequeña mejora cuenta hacia tu bienestar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 px-4 py-20">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-foreground mb-6 text-3xl font-bold md:text-4xl">
            ¿Listo para empezar?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Únete a BuenPlato y comienza a tomar mejores decisiones alimenticias
            hoy mismo.
          </p>
          <Button size="lg" className="h-14 gap-2 px-8 text-lg" asChild>
            <Link href="/register">
              Crear cuenta gratis
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-border border-t px-4 py-8">
        <div className="text-muted-foreground container mx-auto text-center text-sm">
          <p>© 2026 BuenPlato. Mejorando tu alimentación, un plato a la vez.</p>
        </div>
      </footer>
    </div>
  );
}
