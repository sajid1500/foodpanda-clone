import { ModdedDatabase } from "@/lib/types/database-mod.types";
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient<ModdedDatabase>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
