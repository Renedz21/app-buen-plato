import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { UseFormReturn } from "react-hook-form";

interface MenuItemCardProps {
  title: string;
  description: string;
  items: string[];
  onAdd: (item: string) => void;
  onRemove: (item: string) => void;
  form: UseFormReturn<any>;
  fieldName: string;
  placeholder: string;
  examples: string[];
  isLoading?: boolean;
}

export default function MenuItemCard({
  title,
  description,
  items,
  onAdd,
  onRemove,
  form,
  fieldName,
  placeholder,
  examples,
  isLoading = false,
}: MenuItemCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = form.getValues(fieldName);
      onAdd(value);
    }
  };

  const handleAddClick = () => {
    const value = form.getValues(fieldName);
    onAdd(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {title}
          <span className="text-muted-foreground text-sm font-normal">
            ({items.length} {items.length === 1 ? "agregada" : "agregadas"})
          </span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Added items */}
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <div
              key={item}
              className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full px-3 py-1"
            >
              <span className="text-xs">{item}</span>
              <Button
                size="icon-xs"
                variant="ghost"
                onClick={() => onRemove(item)}
                className="hover:bg-primary/20 rounded-full p-0"
              >
                <X className="text-primary size-3.5" />
              </Button>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            placeholder={placeholder}
            {...form.register(fieldName)}
            onKeyDown={handleKeyDown}
            readOnly={isLoading}
            disabled={isLoading}
          />
          <Button size="icon" onClick={handleAddClick} disabled={isLoading}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick add examples */}
        <div className="pt-2">
          <p className="text-muted-foreground mb-2 text-xs">O agrega rápido:</p>
          <div className="flex flex-wrap gap-2">
            {examples.map((item) => (
              <Button
                key={item}
                size="xs"
                onClick={() => onAdd(item)}
                className="bg-muted hover:bg-muted/80 text-muted-foreground"
                disabled={isLoading}
              >
                <Plus className="size-3" />
                {item}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
