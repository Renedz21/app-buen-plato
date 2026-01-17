import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl items-center justify-center px-4">
      <div className="w-full text-center">
        {/* Success Icon with Animation */}
        <div className="mb-8 flex justify-center">
          <div className="bg-primary/10 relative flex h-24 w-24 items-center justify-center rounded-full">
            <CheckCircle2 className="text-primary h-14 w-14 animate-[scale-in_0.3s_ease-out]" />
            <div className="bg-primary/20 absolute inset-0 animate-[ping_1s_ease-out] rounded-full" />
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
          ¡Pago exitoso!
        </h1>
        <p className="text-muted-foreground mb-8 text-lg md:text-xl">
          Disfruta de todas las funciones de tu{" "}
          <span className="text-primary font-semibold">Plan Pro</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            className="rounded-xl text-base font-semibold transition-transform hover:scale-105"
            asChild
          >
            <Link href="/dashboard">
              Ir al inicio
            </Link>
          </Button>
        </div>

        {/* Support Note */}
        <p className="text-muted-foreground mt-10 text-sm">
          ¿Necesitas ayuda?{" "}
          <Link
            href="mailto:edzonperez.castillo@gmail.com"
            className="text-primary font-medium hover:underline"
          >
            Contacta con soporte por email
          </Link>
        </p>
      </div>
    </div>
  );
}
