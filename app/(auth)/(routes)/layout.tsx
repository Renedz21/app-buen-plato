import type { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <section className="bg-background flex min-h-screen flex-col">
      <header className="p-4">
        <Button asChild variant="ghost" className="gap-2">
          <Link href="/" prefetch={false} replace>
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>
        </Button>
      </header>
      <main className="flex flex-1 items-center justify-center p-4">
        {children}
      </main>
    </section>
  );
}
