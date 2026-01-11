import { Apple } from "lucide-react";
import CravingClient from "@/components/modules/craving/client";

export default function CravingPage() {
  return (
    <div className="space-y-8">
      <div className="mb-6 text-center md:mb-8">
        <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full md:h-20 md:w-20">
          <Apple className="text-primary size-8 md:size-10" />
        </div>
        <h1 className="text-foreground text-xl font-semibold md:text-2xl">
          ¿Tienes hambre?
        </h1>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Dime dónde vas a comprar y te ayudo a elegir
        </p>
      </div>

      <CravingClient />
    </div>
  );
}
