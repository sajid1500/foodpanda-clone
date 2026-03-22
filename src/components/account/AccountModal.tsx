import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { getUserforClient, getUserForServer } from "@/lib/utils/auth";
import { UserMenuSidebar } from "./UserMenuSidebar";
import { AuthDrawer } from "./AuthDrawer";
import { LuUser } from "react-icons/lu";

export async function AccountModal() {
  const user = await getUserForServer();

  return (
    <Sheet>
      <SheetTrigger>
        <LuUser color="black" size={24} />
      </SheetTrigger>
      {/* <SheetClose className="absolute top-4 right-4">hi</SheetClose> */}
      {user ? <UserMenuSidebar /> : <AuthDrawer />}
    </Sheet>
  );
}
