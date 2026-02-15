"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="animate-fade-in mb-4 md:mb-6">
      <Button
        variant="link"
        onClick={() => router.back()}
        className="gap-2 px-0 text-base hover:cursor-pointer has-[>svg]:px-0"
      >
        <ArrowLeft className="size-4" />
        Volver
      </Button>
    </div>
  );
}
