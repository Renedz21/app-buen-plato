import FoodCards from "@/components/modules/menu/food-cards";
import DashboardContainer from "@/components/modules/shared/dashboard-container";
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
      <FoodCards savedMenus={savedMenus || []} />
    </DashboardContainer>
  );
}
