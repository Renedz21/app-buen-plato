import Navbar from "@/components/modules/shared/navbar";
import { Button } from "@/components/ui/button";
import {
  Utensils,
  Apple,
  ChefHat,
  Clock,
  Droplets,
  LogOut,
  User,
} from "lucide-react";
import type { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <Navbar />

      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
