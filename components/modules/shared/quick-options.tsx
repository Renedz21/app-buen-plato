import { Button } from "@/components/ui/button";
import { features } from "@/constants/features";
import { Apple } from "lucide-react";
import Link from "next/link";

export default function QuickOptions() {
  return (
    <>
      {/* Welcome */}
      <div className="animate-fade-in mb-8">
        <h1 className="text-foreground text-2xl font-bold md:text-3xl">
          ¡Hola! 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          ¿Qué te gustaría hacer hoy?
        </p>
      </div>

      {/* Quick Action - SOS Antojos */}
      <Button
        className="animate-fade-in group mb-8 h-24 w-full justify-start rounded-2xl py-14"
        style={{ animationDelay: "0.1s" }}
        asChild
      >
        <Link href="/dashboard/craving" prefetch={false}>
          <div className="flex items-center gap-4">
            <div className="bg-primary-foreground/20 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-105">
              <Apple className="size-8" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">¿Tienes hambre?</h2>
              <p className="text-primary-foreground/80 text-lg">
                Te doy ideas prácticas al instante
              </p>
            </div>
          </div>
        </Link>
      </Button>

      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {features.map((feature, index) => (
          <Button
            key={feature.id}
            className="animate-fade-in group h-24 justify-start rounded-2xl p-5 transition-all hover:shadow-md"
            variant="outline"
            style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            disabled={feature.isEnabled}
            asChild
          >
            <Link
              href={`/dashboard/${feature.id}`}
              prefetch={false}
              className={
                feature.isEnabled ? "" : "pointer-events-none opacity-50"
              }
            >
              <div className="flex items-start gap-4">
                <div
                  className={`h-12 w-12 ${feature.color} flex items-center justify-center rounded-xl transition-transform group-hover:scale-105`}
                >
                  <feature.icon className="size-6" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold">
                    {feature.isEnabled
                      ? feature.title
                      : "Próximamente estará disponible"}
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {feature.isEnabled ? feature.description : ""}
                  </p>
                </div>
              </div>
            </Link>
          </Button>
        ))}
      </div>
    </>
  );
}
