"use server";

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { Provider } from "@supabase/supabase-js";

export const signInWithProvider = async (provider: Provider) => {
  console.log(`Initiating sign-in with ${provider}...`);
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
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
