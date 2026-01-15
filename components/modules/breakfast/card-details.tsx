import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Breakfast } from "@/constants/breakfasts";

type CardDetailsProps = {
  breakfast: Breakfast;
  trigger: React.ReactNode;
  title: string;
  relativeTime: string;
  ingredients: string[];
  steps: string[];
  icon: string;
};

export default function CardDetails({
  trigger,
  title,
  relativeTime,
  ingredients,
  steps,
  icon,
}: CardDetailsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="p-0">
        <div className="bg-primary/10 flex flex-col items-center space-y-4 py-6">
          <div aria-hidden="true" className="text-4xl">
            {icon}
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">{title}</DialogTitle>
            <DialogDescription className="text-muted-foreground font-medium sm:text-center">
              Tiempo de preparación estimado: {relativeTime}
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="flex flex-col items-start gap-4 px-6 pt-0 pb-4">
          <div className="flex flex-col items-start gap-2">
            <h3 className="text-foreground font-semibold">Ingredientes</h3>
            <ul className="list-inside list-disc">
              {ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start gap-2">
            <h3 className="text-foreground font-semibold">Pasos</h3>
            <ol className="list-inside list-decimal">
              {steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
