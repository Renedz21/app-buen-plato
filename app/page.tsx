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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-50 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Utensils className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              BuenPlato
            </span>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/login">Iniciar sesión</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl  font-bold text-foreground leading-tight animate-fade-in">
            Mejora tu alimentación
            <span className="text-primary"> sin esfuerzo</span>
          </h1>
          <p
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Una herramienta sencilla para tomar mejores decisiones alimenticias
            durante tu jornada laboral. Sin dietas, sin conteo de calorías.
          </p>
          <div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <Button size="lg" asChild className="h-14 px-8 text-lg gap-2">
              <Link href="/register">
                Comenzar gratis
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl  font-bold text-center text-foreground mb-4">
            Todo lo que necesitas
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Herramientas diseñadas para tu realidad: poco tiempo, presupuesto
            ajustado y la necesidad de energía para rendir en el trabajo.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6" color="var(--foreground)" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl  font-bold text-foreground mb-6">
            Nuestra filosofía
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Creemos en la mejora progresiva, no en la perfección. Pequeños
            cambios sostenibles que se acumulan con el tiempo para transformar
            tu bienestar.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6">
              <div className="text-4xl  font-bold text-primary mb-2">01</div>
              <h3 className="font-semibold text-foreground mb-2">Realismo</h3>
              <p className="text-sm text-muted-foreground">
                Trabajamos con las opciones que realmente tienes disponibles
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl  font-bold text-primary mb-2">02</div>
              <h3 className="font-semibold text-foreground mb-2">
                Simplicidad
              </h3>
              <p className="text-sm text-muted-foreground">
                Sin registros complicados ni conteo de calorías
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl  font-bold text-primary mb-2">03</div>
              <h3 className="font-semibold text-foreground mb-2">Progreso</h3>
              <p className="text-sm text-muted-foreground">
                Cada pequeña mejora cuenta hacia tu bienestar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl  font-bold text-foreground mb-6">
            ¿Listo para empezar?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Únete a BuenPlato y comienza a tomar mejores decisiones alimenticias
            hoy mismo.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg gap-2" asChild>
            <Link href="/register">
              Crear cuenta gratis
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2026 BuenPlato. Mejorando tu alimentación, un plato a la vez.</p>
        </div>
      </footer>
    </div>
  );
}
