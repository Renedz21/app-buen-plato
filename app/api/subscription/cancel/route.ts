import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { polarClient } from "@/lib/polar";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 401 }
      );
    }

    const { subscriptionId } = await request.json();

    if (!subscriptionId) {
      return NextResponse.json(
        { message: "ID de suscripción requerido" },
        { status: 400 }
      );
    }

    // Verificar que la suscripción pertenece al usuario
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .eq("polar_subscription_id", subscriptionId)
      .single();

    if (!subscription) {
      return NextResponse.json(
        { message: "Suscripción no encontrada" },
        { status: 404 }
      );
    }

    // Cancelar en Polar
    await polarClient.subscriptions.revoke({
      id: subscriptionId,
    });

    // Actualizar estado en Supabase
    await supabase
      .from("subscriptions")
      .update({
        status: "canceled",
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)
      .eq("polar_subscription_id", subscriptionId);

    return NextResponse.json({
      message: "Suscripción cancelada correctamente",
    });
  } catch (error) {
    console.error("Error al cancelar suscripción:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Error al cancelar la suscripción",
      },
      { status: 500 }
    );
  }
}
