import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { UserMenuButton } from "@/components/ui/UserMenuButton";
import { getUserforClient, getUserForServer } from "@/lib/utils/auth";
import { UserMenuSidebar } from "./UserMenuSidebar";
import { AuthDrawer } from "./AuthDrawer";
import { createClient } from "@/lib/config/supabase/client";

export async function AccountModal() {
  const user = await getUserForServer();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <UserMenuButton />
      </SheetTrigger>
      {/* <SheetClose className="absolute top-4 right-4">hi</SheetClose> */}
      {user ? <UserMenuSidebar /> : <AuthDrawer />}
    </Sheet>
  );
}
