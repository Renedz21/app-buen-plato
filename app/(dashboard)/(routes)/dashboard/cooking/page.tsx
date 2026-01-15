import CookingClient from "@/components/modules/cooking/client";
import DashboardContainer from "@/components/modules/shared/dashboard-container";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChefHat, Info } from "lucide-react";

export default function CookingPage() {
  return (
    <DashboardContainer
      icon={ChefHat}
      title="Cocina para 2 Días"
      description="Recetas simples que duran"
    >
      <>
        <Alert variant="info">
          <Info />
          <AlertTitle>Importante</AlertTitle>
          <AlertDescription>
            Actualizaremos las recetas cada semana para que siempre tengas
            nuevas opciones.
          </AlertDescription>
        </Alert>
        <CookingClient />
      </>
    </DashboardContainer>
  );
}
