import { calculateResultStatus } from "@/utils/helpers";
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

export async function addAnalysis(analysis: {
  patientId: string;
  type: string;
  age: { label: string; value: number; ageUnit: string };
  result: number;
}) {
  // Check if the analysis already exists
  const existingAnalysis = await getExistingAnalysis(
    analysis.patientId,
    analysis.type
  );

  const reference = await getTypeReference(analysis.type, analysis.age);

  const newAnalysis = {
    patient_id: +analysis.patientId,
    type: analysis.type,
    result: analysis.result || 0,
    date: new Date().toISOString(),
    reference: `${reference.minValue.toFixed(2)} - ${reference.maxValue.toFixed(
      2
    )}`,
    status: calculateResultStatus(analysis.result, {
      minValue: reference.minValue,
      maxValue: reference.maxValue,
    }),
  };

  if (existingAnalysis) {
    const updatedAnalysis = await handleExistingAnalysis({
      ...newAnalysis,
      id: existingAnalysis?.id,
    });
    const { error: insertError } = await supabase
      .from("previousresults")
      .insert({
        patient_id: +analysis.patientId,
        analysis_id: updatedAnalysis?.id,
        previous_result: existingAnalysis.result,
        date: existingAnalysis.date,
      });

    if (insertError) throw new Error(insertError.message);
  } else {
    const { error } = await supabase.from("analyses").insert(newAnalysis);

    if (error) throw new Error(error.message);
  }
}

// Helper to check if an analysis already exists
async function getExistingAnalysis(patientId: string, type: string) {
  const { data, error } = await supabase
    .from("analyses")
    .select("*")
    .eq("patient_id", patientId)
    .eq("type", type)
    .maybeSingle(); // Returns null if no row is found

  if (error) throw new Error(error.message);
  return data; // Returns the analysis data or null if no matching record is found
}

// Helper to handle existing analysis (move to previous results and delete)
async function handleExistingAnalysis(newAnalysis: any) {
  const { error: updateError, data } = await supabase
    .from("analyses")
    .update(newAnalysis)
    .eq("id", newAnalysis.id)
    .select("*")
    .single();

  if (updateError) throw new Error(`${updateError.message} 98`);
  return data;
}

// Helper to fetch reference values based on type and age
async function getTypeReference(
  type: string,
  patientAge: { label: string; value: number; ageUnit: string }
) {
  const { data, error } = await supabase
    .from("guidelines")
    .select("min_value, max_value")
    .eq("type", type)
    .eq("age_unit", patientAge.ageUnit)
    .lte("min_age", patientAge.value)
    .gte("max_age", patientAge.value);

  if (error) throw new Error(`${error.message} 117`);

  if (!data || data.length === 0)
    throw new Error("No matching reference found");

  return {
    minValue: data[0].min_value / 100,
    maxValue: data[0].max_value / 100,
  };
}
