import { Button } from "@/components/ui/button";
import { hungerLevels, HungerLevel } from "@/constants/locations";
import { cn } from "@/lib/utils";

interface HungerLevelSelectorProps {
  selectedHungerLevel: HungerLevel | null;
  onSelectHungerLevel: (level: HungerLevel) => void;
  isLoading: boolean;
}

export default function HungerLevelSelector({
  selectedHungerLevel,
  onSelectHungerLevel,
  isLoading,
}: HungerLevelSelectorProps) {
  return (
    <>
      <div className="text-center">
        <h2 className="text-foreground text-xl font-semibold md:text-2xl">
          Nivel de hambre
        </h2>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">
          Elige el nivel de hambre que tienes
        </p>
      </div>
      <div className="flex flex-1 flex-wrap justify-center gap-2 md:gap-4">
        {(Object.keys(hungerLevels) as HungerLevel[]).map((level, index) => (
          <Button
            key={index}
            variant="outline"
            className={cn(
              "w-full md:w-fit",
              selectedHungerLevel === level &&
                "border-primary bg-primary/10 text-primary dark:border-primary dark:bg-primary/10",
            )}
            onClick={() => onSelectHungerLevel(level)}
            disabled={isLoading}
          >
            {hungerLevels[level]}
          </Button>
        ))}
      </div>
    </>
  );
}
