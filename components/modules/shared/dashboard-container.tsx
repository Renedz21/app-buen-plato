import type { LucideIcon } from "lucide-react";
import type { PropsWithChildren } from "react";

type DashboardContainerProps = PropsWithChildren<{
  icon: LucideIcon;
  title: string;
  description: string;
}>;

export default function DashboardContainer({
  icon: Icon,
  title,
  description,
  children,
}: DashboardContainerProps) {
  return (
    <div className="space-y-8">
      <div className="mb-6 text-center md:mb-8">
        <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full md:h-20 md:w-20">
          <Icon className="text-primary size-8 md:size-10" />
        </div>
        <h1 className="text-foreground text-xl font-semibold md:text-2xl">
          {title}
        </h1>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}
