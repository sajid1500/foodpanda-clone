import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { CloseButton } from "@/components/ui/CloseButtonFilled";
import { useIsMobile } from "@/hooks/useMobile";
import { formatUserAddress } from "@/lib/utils/helpers";
import { Address } from "@/lib/validators/address.schema";
import { Trash2 } from "lucide-react";

export function DeleteAddress({
  address,
  handleDelete,
}: {
  address: Address;
  handleDelete: (address: Address) => void;
}) {
  const isMobile = useIsMobile();
  if (!isMobile)
    return (
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <button
              type="button"
              aria-label="Delete address"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-700"
            >
              <Trash2 />
            </button>
            {/* <Button variant="outline">Open Dialog</Button> */}
          </DialogTrigger>
          <DialogContent
            showCloseButton={false}
            className="overflow-hidden p-0 sm:max-w-sm"
          >
            <DialogHeader className="px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <DialogTitle className="mt-1 text-3xl leading-none font-semibold">
                  Delete {formatUserAddress(address.addressLine1, address.city)}
                </DialogTitle>
                <DialogClose asChild>
                  <CloseButton className="static h-9 w-9 shrink-0" />
                </DialogClose>
              </div>
            </DialogHeader>

            <DialogDescription className="px-6 py-6 text-3xl text-neutral-700">
              Are you sure you want to delete this address?
            </DialogDescription>

            <DialogFooter className="flex-row items-center justify-end gap-3 border-t border-neutral-200 bg-neutral-50 px-6 py-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 border-neutral-400 bg-white px-6 text-xl font-semibold text-neutral-700 hover:scale-100"
                >
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  onClick={() => handleDelete(address)}
                  type="button"
                  variant="destructive"
                  className="h-11 px-6 text-xl font-semibold hover:scale-100"
                >
                  Confirm
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    );
  return (
    <Sheet>
      <form>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Delete address"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-700"
          >
            <Trash2 />
          </button>
          {/* <Button variant="outline">Open Sheet</Button> */}
        </SheetTrigger>
        <SheetContent
          showCloseButton={false}
          className="overflow-hidden p-0 sm:max-w-sm"
        >
          <SheetClose asChild>
            <CloseButton className="" />
          </SheetClose>
          <SheetHeader className="px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <SheetTitle className="mt-1 leading-none">
                Delete {formatUserAddress(address.addressLine1, address.city)}
              </SheetTitle>
            </div>
          </SheetHeader>

          <SheetDescription className="text-muted-foreground px-6 py-6">
            Are you sure you want to delete this address?
          </SheetDescription>

          <SheetFooter className="flex-row items-center justify-end gap-3 border-t border-neutral-200 bg-neutral-50 px-6 py-4">
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                onClick={() => handleDelete(address)}
                type="button"
                variant="destructive"
              >
                Confirm
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </form>
    </Sheet>
  );
}
