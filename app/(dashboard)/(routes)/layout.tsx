import Navbar from "@/components/modules/shared/navbar";
import type { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <section className="bg-background grid min-h-dvh grid-rows-[auto_1fr]">
      <Navbar />
      <main className="container mx-auto max-w-4xl px-4 py-8">{children}</main>
    </section>
  );
}
