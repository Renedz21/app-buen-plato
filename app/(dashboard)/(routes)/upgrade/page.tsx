import PlanCard from "@/components/modules/upgrade/plan-card";
import { polarClient } from "@/lib/polar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const freePlanFeatures = [
  "5 consultas diarias con IA",
  "Sugerencias de snacks personalizadas",
  "Optimizador de menús",
  "Recetas de desayuno según ingredientes",
  "Generación de recetas de cocina",
];

const proPlanFeatures = [
  "Todo lo incluido en Free, más:",
  "Consultas ilimitadas con IA",
  "Sin restricciones de uso diario",
  "Acceso prioritario a nuevas funciones",
  "Soporte prioritario",
];

const getProducts = async () => {
  const products = await polarClient.products.list({ isArchived: false });
  return products.result.items ?? [];
};

const getCurrentUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export default async function UpgradePage() {
  const [products, user] = await Promise.all([getProducts(), getCurrentUser()]);

  if (!user) {
    redirect("/login");
  }

  return (
    <>
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
            description={product.name.includes("Pro") ? "Decide mejor, más rápido." : "Conoce que comer"}
            priceDescription={
              product.name.includes("Pro")
                ? "/mes facturado"
                : "Gratis para siempre"
            }
            features={
              product.name.includes("Pro") ? proPlanFeatures : freePlanFeatures
            }
            buttonVariant={product.name.includes("Pro") ? "default" : "outline"}
            isPopular={product.name.includes("Pro")}
            productId={product.id}
            customerUser={user}
          />
        ))}
      </div>

      {/* Disclaimer */}
      <p className="text-muted-foreground mt-6 text-center text-xs opacity-75">
        Al suscribirte, confirmas que entiendes que este es un servicio de software informativo.
        <br />
        Esta aplicación proporciona únicamente contenido informativo y no ofrece asesoramiento médico, nutricional ni profesional.
      </p>
    </>
  );
}
