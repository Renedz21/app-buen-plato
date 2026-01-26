import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import type { User } from "@supabase/supabase-js";
import { Check } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

interface PlanCardProps {
    title: string;
    description: string;
    price: string;
    priceDescription: string;
    features: string[];
    buttonVariant: "outline" | "default";
    isPopular?: boolean;
    productId: string;
    customerUser: User;
}

export default memo(function PlanCard({
    title,
    description,
    price,
    priceDescription,
    features,
    buttonVariant,
    isPopular,
    productId,
    customerUser,
}: Partial<PlanCardProps>) {

    return (
        <Card className="group relative overflow-hidden shadow-sm transition-all hover:shadow-2xl gap-0">
            {isPopular && (
                <div className="bg-primary text-primary-foreground absolute top-8 -right-12 rotate-45 px-12 py-1 text-center text-xs font-semibold shadow-md">
                    Más popular
                </div>
            )}
            <CardHeader className="text-foreground dark:text-white">
                <CardTitle className="text-2xl font-bold">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
                <div className="space-y-6 md:space-y-4">
                    <span className="text-4xl md:text-4xl font-bold">{price}</span>
                    <p className="text-muted-foreground text-sm">{priceDescription}</p>
                </div>
                <Button
                    size="lg"
                    variant={buttonVariant}
                    className="w-full rounded-xl text-base font-semibold transition-transform hover:scale-102 my-4"
                    asChild={title?.includes("Pro")}
                >
                    {title?.includes("Pro") ? (
                        <Link
                            href={`/api/checkout?products=${productId}&customerEmail=${customerUser?.email}&customerExternalId=${customerUser?.id}`}
                        >
                            Obtener Plan Pro
                        </Link>
                    ) : "Usalo Gratis"}
                </Button>
            </CardHeader>
            <CardContent>
                <Separator className="my-4" />
                <ul className="space-y-2">
                    {features?.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <Check className="text-primary size-4" />
                            <span className="text-foreground text-sm font-medium">{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
})