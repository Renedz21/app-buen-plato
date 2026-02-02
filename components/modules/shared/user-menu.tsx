"use client";

import { Crown, LogOut, Moon, Sun, User, Zap, UserCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/components/providers/auth-provider";
import { useCredits } from "@/components/providers/credits-provider";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function UserMenu({
  email,
  isPro,
  isCanceled,
}: {
  email: string;
  isPro: boolean;
  isCanceled?: boolean;
}) {
  const { signOut } = useAuth();
  const { credits } = useCredits();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm leading-none font-medium">Mi cuenta</p>
              <p className="text-muted-foreground text-xs leading-none">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-muted-foreground text-xs font-normal">
              Plan
            </DropdownMenuLabel>
            {isPro ? (
              <DropdownMenuItem asChild className="bg-primary/5">
                <div className="flex items-center gap-2">
                  <Crown className="text-primary h-4 w-4" />
                  <span className="text-primary font-medium">Pro</span>
                </div>
              </DropdownMenuItem>
            ) : isCanceled ? (
              <DropdownMenuItem asChild>
                <Link href="/upgrade" className="flex items-center gap-2">
                  <Crown className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground">Pro (Cancelado)</span>
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem asChild>
                <Link href="/upgrade" className="flex items-center gap-2">
                  <Zap
                    className={cn(
                      "h-4 w-4",
                      credits <= 1
                        ? "text-red-500"
                        : credits <= 2
                          ? "text-yellow-500"
                          : "text-green-500",
                    )}
                  />
                  <span>{credits}/5 intentos hoy</span>
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-muted-foreground text-xs font-normal">
              Cuenta
            </DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center">
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Mi perfil</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-muted-foreground text-xs font-normal">
              Apariencia
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Tema oscuro</span>
                </>
              ) : (
                <>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Tema claro</span>
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setShowSignOutDialog(true)}
            className="text-red-600 focus:text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showSignOutDialog} onOpenChange={setShowSignOutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro que deseas cerrar sesión? Tendrás que iniciar sesión
              nuevamente para acceder a tu cuenta.
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
    </>
  );
}
