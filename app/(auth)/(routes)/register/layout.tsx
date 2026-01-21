import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Crear cuenta",
  description:
    "Crea tu cuenta gratuita en ¿QuéComo? y comienza a organizar tus comidas.",
};

export default function RegisterLayout({ children }: PropsWithChildren) {
  return children;
}
