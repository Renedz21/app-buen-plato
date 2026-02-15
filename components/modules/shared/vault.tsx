import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  trigger: React.ReactNode;
  title: string;
  description: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  footer: React.ReactNode;
}>;

export default function Vault({
  trigger,
  title,
  description,
  children,
  isOpen,
  onOpenChange,
  footer,
}: Props) {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {children}
        <DrawerFooter>{footer}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
