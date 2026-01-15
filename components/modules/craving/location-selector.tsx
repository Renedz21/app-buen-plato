import { Button } from "@/components/ui/button";
import { locations, LocationStores } from "@/constants/locations";
import { cn } from "@/lib/utils";
import { Store } from "lucide-react";

interface LocationSelectorProps {
  selectedLocation: LocationStores | null;
  onSelectLocation: (location: LocationStores) => void;
  isLoading: boolean;
}

export default function LocationSelector({
  selectedLocation,
  onSelectLocation,
  isLoading,
}: LocationSelectorProps) {
  return (
    <div className="flex flex-1 flex-wrap justify-center gap-4">
      {(Object.keys(locations) as LocationStores[]).map((location, index) => (
        <Button
          key={index}
          variant="outline"
          className={cn(
            "flex h-18 w-full items-center justify-start gap-4 rounded-xl transition-all md:h-20 md:w-auto md:justify-center",
            selectedLocation === location &&
              "border-primary bg-primary/10 text-primary dark:border-primary dark:bg-primary/10",
          )}
          onClick={() => onSelectLocation(location)}
          disabled={isLoading}
        >
          <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
            <Store className="size-6" />
          </div>
          <div className="flex flex-col items-start">
            <p className="text-foreground font-medium">
              {locations[location].label}
            </p>
            <p className="text-muted-foreground text-sm">
              {locations[location].description}
            </p>
          </div>
        </Button>
      ))}
    </div>
  );
}
