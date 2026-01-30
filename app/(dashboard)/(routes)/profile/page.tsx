import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Crown, Mail, User, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProfileForm } from "@/components/modules/profile/profile-form";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const isPro = subscription?.status === "active";
  const hasCustomerId = !!subscription?.polar_customer_id;

  const formatDate = (date: string | null) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mi perfil</h1>
        <p className="text-muted-foreground mt-2">
          Administra tu información personal y suscripción
        </p>
      </div>

      <Separator />

      {/* Información Personal */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="text-muted-foreground h-5 w-5" />
            <CardTitle>Información personal</CardTitle>
          </div>
          <CardDescription>Actualiza tus datos personales</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm userId={user.id} initialName={profile?.name || ""} />
        </CardContent>
      </Card>

      {/* Información de la Cuenta */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="text-muted-foreground h-5 w-5" />
            <CardTitle>Cuenta</CardTitle>
          </div>
          <CardDescription>Información de tu cuenta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Email</span>
            <span className="text-sm font-medium">{user.email}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Cuenta creada</span>
            <span className="text-sm font-medium">
              {formatDate(user.created_at)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Suscripción */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Crown className="text-muted-foreground h-5 w-5" />
            <CardTitle>Suscripción</CardTitle>
          </div>
          <CardDescription>Administra tu plan y facturación</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Plan actual</span>
            <div className="flex items-center gap-2">
              {isPro ? (
                <>
                  <Crown className="text-primary h-4 w-4" />
                  <span className="text-primary text-sm font-medium">Pro</span>
                </>
              ) : (
                <span className="text-sm font-medium">Gratis</span>
              )}
            </div>
          </div>

          {isPro && subscription?.current_period_end && (
            <>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Próxima renovación
                </span>
                <span className="text-sm font-medium">
                  {formatDate(subscription.current_period_end)}
                </span>
              </div>
            </>
          )}

          <Separator />

          <div className="flex flex-col gap-3 pt-2">
            {!isPro ? (
              <Button asChild>
                <Link href="/upgrade">
                  <Crown className="mr-2 h-4 w-4" />
                  Actualizar a Pro
                </Link>
              </Button>
            ) : hasCustomerId ? (
              <Button variant="outline" asChild>
                <Link href="/api/portal" target="_blank">
                  Administrar suscripción
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <div className="text-muted-foreground text-sm">
                No se puede acceder al portal de facturación en este momento.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
