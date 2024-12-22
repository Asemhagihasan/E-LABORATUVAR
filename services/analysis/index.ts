import { supabase } from "../supabase";

export async function getAnalysisByPatientId(patientId: string) {
  const { data, error } = await supabase
    .from("analyses")
    .select("*")
    .eq("patient_id", patientId);

  if (error) throw new Error(error.message);

  return data;
}

export async function getPreviousResults(patientId: string) {
  const { data, error } = await supabase
    .from("previousresults")
    .select("*")
    .eq("patient_id", patientId);

  if (error) throw new Error(error.message);

  return data;
}
