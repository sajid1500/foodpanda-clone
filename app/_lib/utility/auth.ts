import { createClient as createClientforClient } from "../config/supabase/client";
import { createClient as createClientForServer } from "../config/supabase/server";

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
