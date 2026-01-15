import BreakfastClient from "@/components/modules/breakfast/client";
import DashboardContainer from "@/components/modules/shared/dashboard-container";
import { Clock } from "lucide-react";

export default function BreakfastPage() {
  return (
    <DashboardContainer
      icon={Clock}
      title="Desayuno en 5 Min"
      description="Ideas rápidas para la mañana"
    >
      <BreakfastClient />
    </DashboardContainer>
  );
}
