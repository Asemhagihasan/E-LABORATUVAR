import { supabase } from "../supabase";

export async function fetchUserIdsAndProfiles() {
  const { data: patients, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "user");

  if (error) throw new Error(error.message);

  return patients;
}
