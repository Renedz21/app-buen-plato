import type { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return <section className="mx-auto max-w-4xl">{children}</section>;
}
