import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartOverview } from "./CartOverview";
import { Cart } from "./Cart";

export function CartSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild={true}>
        <CartOverview />
      </SheetTrigger>
      <SheetContent side="right" className="w-full px-4 pt-4">
        <SheetHeader className="sr-only">
          <SheetTitle>Your cart</SheetTitle>
          <SheetDescription>Browser items in your cart</SheetDescription>
        </SheetHeader>
        <Cart />
      </SheetContent>
    </Sheet>
  );
}
