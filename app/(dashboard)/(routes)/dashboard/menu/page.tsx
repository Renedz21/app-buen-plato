import FoodCards from "@/components/modules/menu/food-cards";
import DashboardContainer from "@/components/modules/shared/dashboard-container";
import ImageUploader from "@/components/modules/shared/image-uploader";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import { Utensils } from "lucide-react";
import { getSavedMenus } from "./actions";

export default async function MenuPage() {
  const savedMenus = await getSavedMenus();
  return (
    <DashboardContainer
      icon={Utensils}
      title="Optimizador de Menús"
      description="Agrega las opciones del menú de hoy y te ayudo a elegir la mejor combinación"
    >
      <>
        <ImageUploader placeholder="Sube una foto del menú" maxSizeMB={2} />
        <div className="relative">
          <Separator className="absolute inset-0 top-1/2" />
          <span className="bg-background text-muted-foreground relative mx-auto block w-fit px-2">
            O escribe el menú manualmente
          </span>
        </div>

        <FoodCards savedMenus={savedMenus || []} />
      </>
    </DashboardContainer>
  );
}
