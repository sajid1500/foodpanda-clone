import { createClient as createClientforClient } from "../supabase/client";
import { createClient as createClientForServer } from "../supabase/server";

export const getUserforClient = async () => {
  const supabase = await createClientforClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export const getUserForServer = async () => {
  const supabase = await createClientForServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
