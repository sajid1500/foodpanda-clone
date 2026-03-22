import { ModdedDatabase } from "@/lib/types/database-mod.types";
import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";
import { env } from "@/env";

export function getBrowserClient() {
  return createSupabaseBrowserClient<ModdedDatabase>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}
