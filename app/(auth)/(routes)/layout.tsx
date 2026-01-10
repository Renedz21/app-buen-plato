import type { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { Utensils, ArrowLeft } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <section>
      <div className="bg-background flex min-h-screen flex-col">
        <header className="p-4">
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Link>
          </Button>
        </header>

        <main className="flex flex-1 items-center justify-center p-4">
          <Card className="animate-fade-in w-full max-w-md border-0 shadow-lg">
            <CardHeader className="space-y-4 text-center">
              <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl">
                <Utensils className="text-primary h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-2xl">Crea tu cuenta</CardTitle>
                <CardDescription className="mt-2">
                  Únete a BuenPlato y mejora tu alimentación día a día
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>{children}</CardContent>
          </Card>
        </main>
      </div>
    </section>
  );
}
