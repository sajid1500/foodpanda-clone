import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import CartOverview from "./CartOverview";
import Cart from "./Cart";

export default function CartSidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <CartOverview />
      </SheetTrigger>
      <SheetContent className="px-4 pt-4">
        <SheetHeader className="sr-only">
          <SheetTitle>Your cart</SheetTitle>
          <SheetDescription>Browser items in your cart</SheetDescription>
        </SheetHeader>
        <Cart />
      </SheetContent>
    </Sheet>
  );
}
