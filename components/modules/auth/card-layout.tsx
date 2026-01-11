import type { PropsWithChildren } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Utensils } from "lucide-react";

type CardLayoutProps = PropsWithChildren<{
  title: string;
  description: string;
}>;

export default function CardLayout({
  title,
  description,
  children,
}: CardLayoutProps) {
  return (
    <Card className="animate-fade-in w-full max-w-md border-0 shadow-lg">
      <CardHeader className="space-y-4 text-center">
        <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl">
          <Utensils className="text-primary h-8 w-8" />
        </div>
        <div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="mt-2">{description}</CardDescription>
        </div>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
}
