import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/types/database.types";
import { ModdedDatabase } from "@/lib/types/database-mod.types";
import { env } from "@/env";
const supabaseUrl = "https://zsinkefhyowyqjycayfz.supabase.co";
const supabaseKey = env.SUPABASE_ACCESS_TOKEN;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase Environment Variables");
}

const supabase = createClient<ModdedDatabase>(supabaseUrl, supabaseKey);

export { supabase };
