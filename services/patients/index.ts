import { supabase } from "../supabase";

export async function fetchUserIdsAndProfiles() {
  const { data: patients, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "user");

  if (error) throw new Error(error.message);

  return patients;
}

export async function fetchPatientById(id: string) {
  const { data: patient, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return patient;
}
