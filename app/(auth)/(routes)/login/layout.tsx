import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Inicia sesión en ¿QuéComo? para organizar tus comidas diarias.",
};

export default function LoginLayout({ children }: PropsWithChildren) {
  return children;
}
