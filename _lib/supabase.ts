import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zsinkefhyowyqjycayfz.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase Environment Variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
