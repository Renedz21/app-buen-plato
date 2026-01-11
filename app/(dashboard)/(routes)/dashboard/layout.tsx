import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <section className="mx-auto max-w-4xl">
      <div className="animate-fade-in mb-4 md:mb-6">
        <Button variant="link" asChild>
          <Link href="/" prefetch={false} replace>
            <ArrowLeft className="size-4" />
            Volver al inicio
          </Link>
        </Button>
      </div>
      {children}
    </section>
  );
}
