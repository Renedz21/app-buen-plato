"use client";

import Image from "next/image";
import Link from "next/link";
import { UserMenu } from "./user-menu";

export default function Navbar({
  email,
  isPro,
  isCanceled,
}: {
  email: string;
  isPro: boolean;
  isCanceled?: boolean;
}) {
  return (
    <header className="bg-background/80 border-border sticky top-0 z-50 border-b backdrop-blur-sm">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
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
            <span className="text-foreground sr-only text-xl font-semibold md:not-sr-only">
              ¿QuéComo?
            </span>
          </Link>
        </div>
        <UserMenu email={email} isPro={isPro} isCanceled={isCanceled} />
      </nav>
    </header>
  );
}
