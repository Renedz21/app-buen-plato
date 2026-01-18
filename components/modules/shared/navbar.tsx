"use client";

import { LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./theme-toggle";
import { CreditsDisplay } from "./credits-display";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };
  return (
    <header className="bg-background/80 border-border sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            prefetch={false}
            className="flex items-center gap-2"
          >
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
              <Image
                src="/images/nutriya_logo.avif"
                alt="logo de ¿QuéComo?"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-foreground text-xl font-semibold sr-only md:not-sr-only">
              ¿QuéComo?
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <CreditsDisplay />
          <div className="text-muted-foreground mr-2 hidden items-center gap-2 text-sm sm:flex">
            <User className="h-4 w-4" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <LogOut className="h-5 w-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
                  <AlertDialogDescription>
                    ¿Estás seguro que deseas cerrar sesión? Tendrás que iniciar
                    sesión nuevamente para acceder a tu cuenta.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSignOut}>
                    Cerrar sesión
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
