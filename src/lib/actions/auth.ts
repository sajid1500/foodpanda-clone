"use server";

import { redirect } from "next/navigation";
import { createServerClient } from "../config/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { env } from "@/env";

export const signInWithProvider = async (provider: Provider) => {
  console.log(`Initiating sign-in with ${provider}...`);
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${env.NEXT_PUBLIC_URL}/auth/callback`,
    },
  });

  if (error) {
    console.error("Error during sign-in:", error);
    throw new Error("Failed to sign in");
  }

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
};
