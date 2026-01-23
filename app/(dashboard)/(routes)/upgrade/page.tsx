import { Button } from "@/components/ui/button";
import { polarClient } from "@/lib/polar";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const freePlanFeatures = [
  "5 consultas diarias con IA",
  "Sugerencias de snacks personalizadas",
  "Optimizador de menús (entrada + plato)",
  "Recetas de desayuno según ingredientes",
  "Generación de recetas de cocina",
  "Acceso a todos los módulos",
];

const proPlanFeatures = [
  "Todo lo incluido en Free, más:",
  "Consultas ilimitadas con IA",
  "Sin restricciones de uso diario",
  "Acceso prioritario a nuevas funciones",
  "Soporte prioritario",
];

const DOLLAR_TO_PEN = 3.36;

interface PlanCardProps {
  title: string;
  description: string;
  price: string;
  priceDescription: string;
  features: string[];
  buttonText: string;
  buttonVariant: "outline" | "default";
  icon: React.ReactNode;
  iconBgColor: string;
  isPopular?: boolean;
  productId: string;
  customerExternalId: string;
}

function PlanCard({
  title,
  description,
  price,
  priceDescription,
  features,
  buttonText,
  buttonVariant,
  icon,
  iconBgColor,
  isPopular,
  productId,
  customerExternalId,
}: Partial<PlanCardProps>) {
  return (
    <div className="group border-border bg-card relative flex flex-col overflow-hidden rounded-3xl border p-8 shadow-sm transition-all hover:shadow-2xl">
      {isPopular && (
        <div className="bg-primary text-primary-foreground absolute top-8 -right-12 rotate-45 px-12 py-1 text-center text-xs font-semibold shadow-md">
          Más popular
        </div>
      )}

      {/* Icon */}
      <div className="mb-6 flex items-center justify-between">
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-2xl",
            iconBgColor,
          )}
        >
          {icon}
        </div>
      </div>

      {/* Plan Title & Description */}
      <div className="mb-6">
        <h3 className="text-foreground mb-2 text-2xl font-bold">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      {/* Price */}
      <div className="mb-8">
        <div className="flex items-baseline gap-2">
          <span className="text-foreground text-5xl font-bold">{price}</span>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">{priceDescription}</p>
        {price &&
          price !== "USD 0" &&
          (() => {
            const usdAmount = parseFloat(price.replace("USD ", "").trim());
            if (!Number.isNaN(usdAmount)) {
              const penAmount = Math.round(usdAmount * DOLLAR_TO_PEN);
              return (
                <p className="text-muted-foreground mt-1 text-xs">
                  (Aprox. {penAmount} PEN al tipo de cambio actual)
                </p>
              );
            }
            return null;
          })()}
      </div>

      {/* CTA Button */}
      <Button
        variant={buttonVariant}
        className="mb-8 h-12 w-full rounded-xl text-base font-semibold transition-transform hover:scale-105"
        asChild
      >
        <Link
          href={`/api/checkout?products=${productId}&customerEmail=edzon@gmail.com&customerExternalId=${customerExternalId}`}
        >
          {buttonText}
        </Link>
      </Button>

      {/* Divider */}
      <div className="bg-border mb-6 h-px" />

      {/* Features List */}
      <ul className="space-y-4">
        {features?.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="bg-primary/10 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
              <Check className="text-primary h-3.5 w-3.5" />
            </div>
            <span className="text-foreground text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const getProducts = async () => {
  const products = await polarClient.products.list({ isArchived: false });
  return products.result.items ?? [];
};

const getCurrentUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id;
};

export default async function UpgradePage() {
  const [products, user] = await Promise.all([getProducts(), getCurrentUser()]);

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      {/* Header Section */}
      <div className="mb-16 text-center">
        <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
          Planes que crecen contigo
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Elige el plan que mejor se adapte a tus necesidades y comienza a
          organizar mejor tus comidas diarias
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {products.map((product) => (
          <PlanCard
            key={product.id}
            title={product.name}
            price={product.name.includes("Pro") ? "USD 4.99" : "USD 0"}
            priceDescription={
              product.name.includes("Pro")
                ? "/ mes facturado mensualmente"
                : "Gratis para siempre"
            }
            features={
              product.name.includes("Pro") ? proPlanFeatures : freePlanFeatures
            }
            buttonText={
              product.name.includes("Pro")
                ? "Obtener plan Plan Pro"
                : "Usar Buen Plato gratis"
            }
            buttonVariant={product.name.includes("Pro") ? "default" : "outline"}
            icon={
              <Zap
                className={cn(
                  "text-primary h-8 w-8",
                  product.name.includes("Pro")
                    ? "text-primary"
                    : "text-foreground",
                )}
              />
            }
            iconBgColor={
              product.name.includes("Pro") ? "bg-primary/10" : "bg-muted"
            }
            isPopular={product.name.includes("Pro")}
            productId={product.id}
            customerExternalId={user ?? ""}
          />
        ))}
      </div>

      {/* Footer Note */}
      <p className="text-muted-foreground mt-12 text-center text-sm">
        Todos los planes incluyen actualizaciones gratuitas y acceso a nuevas
        funciones
      </p>
      
      {/* Disclaimer */}
      <p className="text-muted-foreground mt-6 text-center text-xs opacity-75">
        Al suscribirte, confirmas que entiendes que este es un servicio de software informativo.
        <br />
        Esta aplicación proporciona únicamente contenido informativo y no ofrece asesoramiento médico, nutricional ni profesional.
      </p>
    </div>
  );
}
