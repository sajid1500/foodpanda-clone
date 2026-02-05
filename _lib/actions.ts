"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { Provider } from "@supabase/supabase-js";

export const signInWithProvider = async (provider: Provider) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `http://localhost:3000/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
};
