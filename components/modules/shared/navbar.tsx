"use client";

import { LogOut, User, Utensils } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./theme-toggle";

export default function Navbar() {
  const { user } = useAuth();
  return (
    <header className="bg-background/80 border-border sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
            <Utensils className="text-primary h-5 w-5" />
          </div>
          <span className="text-foreground text-xl font-semibold">
            BuenPlato
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-muted-foreground mr-2 hidden items-center gap-2 text-sm sm:flex">
            <User className="h-4 w-4" />
            <span>{user?.email}</span>
          </div>
          <div>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
