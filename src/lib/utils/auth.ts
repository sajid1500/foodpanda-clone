import { getBrowserClient } from "../config/supabase/client";
import { getServerClient } from "../config/supabase/server";

export const getUserforClient = async () => {
  const supabase = getBrowserClient();
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
  const supabase = await getServerClient();
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
