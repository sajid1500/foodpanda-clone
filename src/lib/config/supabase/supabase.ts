import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/types/database.types";
import { ModdedDatabase } from "@/lib/types/database-mod.types";
const supabaseUrl = "https://zsinkefhyowyqjycayfz.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase Environment Variables");
}

const supabase = createClient<ModdedDatabase>(supabaseUrl, supabaseKey);

export { supabase };
