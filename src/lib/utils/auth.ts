import { createBrowserClient as createClientforClient } from "../config/supabase/client";
import { createServerClient as createClientForServer } from "../config/supabase/server";

export const getUserforClient = async () => {
  const supabase = createClientforClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    // console.error("Error fetching user:", error);
    return null;
  }
  return user;
};

export const getUserForServer = async () => {
  const supabase = await createClientForServer();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    // console.error("Error fetching user:", error);
    return null;
  }
  return user;
};
