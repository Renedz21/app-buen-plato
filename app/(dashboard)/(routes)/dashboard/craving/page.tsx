import { Apple } from "lucide-react";
import CravingClient from "@/components/modules/craving/client";
import DashboardContainer from "@/components/modules/shared/dashboard-container";

export default function CravingPage() {
  return (
    <DashboardContainer
      icon={Apple}
      title="¿Tienes hambre?"
      description="Dime dónde vas a comprar y te ayudo a elegir"
    >
      <CravingClient />
    </DashboardContainer>
  );
}
