import { Button } from "@/components/ui/button";
import { polarClient } from "@/lib/polar";
import { Check, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

// Plan features configuration - hoisted to module scope (Rule 6.3)
const freePlanFeatures = [
  "Acceso básico a recomendaciones",
  "3 consultas diarias",
  "Optimizador de menú básico",
  "Recetas simples para cocinar",
];

const proPlanFeatures = [
  "Todo lo incluido en Free, más:",
  "Consultas ilimitadas",
  "Prioridad en respuestas",
  "Recetas personalizadas avanzadas",
  "Planificación semanal de menús",
  "Sugerencias nutricionales detalladas",
  "Soporte prioritario",
];

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
}: Partial<PlanCardProps>) {
  return (
    <div className="group border-border bg-card relative flex flex-col overflow-hidden rounded-3xl border p-8 shadow-sm transition-all hover:shadow-xl">
      {isPopular && (
        <div className="bg-primary text-primary-foreground absolute top-8 -right-12 rotate-45 px-12 py-1 text-center text-xs font-semibold shadow-md">
          Más popular
        </div>
      )}

      {/* Icon */}
      <div className="mb-6 flex items-center justify-between">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${iconBgColor} transition-transform group-hover:scale-110`}
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
      </div>

      {/* CTA Button */}
      <Button
        variant={buttonVariant}
        className="mb-8 h-12 w-full rounded-xl text-base font-semibold transition-transform hover:scale-105"
        asChild
      >
        <Link
          href={`/api/checkout?products=${productId}&customerEmail=edzon@gmail.com`}
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

export default async function UpgradePage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      {/* Header Section */}
      <div className="mb-16 text-center">
        <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
          Planes que crecen contigo
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Elige el plan que mejor se adapte a tus necesidades y comienza a
          disfrutar de una alimentación saludable
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Free Plan */}
        <PlanCard
          title="Free"
          description="Conoce a Buen Plato"
          price="USD 0"
          priceDescription="Gratis para siempre"
          features={freePlanFeatures}
          buttonText="Usar Buen Plato gratis"
          buttonVariant="outline"
          icon={<Sparkles className="text-foreground h-8 w-8" />}
          iconBgColor="bg-muted"
          productId=""
        />

        {products.map((product) => (
          <PlanCard
            key={product.id}
            title={product.name}
            price="USD 17"
            priceDescription="/ mes facturado mensualmente"
            features={proPlanFeatures}
            buttonText="Obtener plan Pro"
            buttonVariant="default"
            icon={<Zap className="text-primary h-8 w-8" />}
            iconBgColor="bg-primary/10"
            isPopular
            productId={product.id}
          />
        ))}
      </div>

      {/* Footer Note */}
      <p className="text-muted-foreground mt-12 text-center text-sm">
        Todos los planes incluyen actualizaciones gratuitas y acceso a nuevas
        funciones
      </p>
    </div>
  );
}
