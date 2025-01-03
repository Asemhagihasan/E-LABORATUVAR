import { Guide } from "@/types";
import { supabase } from "../supabase";

export async function getGuides(guideType: string) {
  const { data: guidelines, error } = await supabase
    .from("guidelines")
    .select("*")
    .eq("type", guideType);

  if (error) throw new Error(error.message);

  return guidelines;
}

export async function getGuidesType() {
  const { data: guidelineTypes, error } = await supabase
    .from("guidetypes")
    .select("type");

  if (error) throw new Error(error.message);

  return guidelineTypes;
}

export async function getGuideAgeRanges() {
  const { data: guideAgeRanges, error } = await supabase
    .from("ageranges")
    .select("min_age, max_age, age_unit")
    .order("id");

  if (error) throw new Error(error.message);

  return guideAgeRanges;
}

export async function addGuide(guide: Guide) {
  // check if guide already exists base on type .minAge .maxAge .ageUnit
  const { data: existingGuides, error: existingGuidesError } = await supabase
    .from("guidelines")
    .select("*")
    .eq("type", guide.type.value)
    .eq("min_age", guide.minAge)
    .eq("max_age", guide.maxAge)
    .eq("age_unit", guide.ageUnit.value)
    .single();

  if (existingGuides)
    throw new Error(
      `could not add guide with existing values (type, minAge, maxAge, ageUnit)`
    );

  const { data: age, error: insertAge } = await supabase
    .from("ageranges")
    .insert({
      min_age: guide.minAge,
      max_age: guide.maxAge,
      age_unit: guide.ageUnit.value,
    });

  if (insertAge) throw new Error(insertAge.message);

  const { data: newGuide, error } = await supabase.from("guidelines").insert({
    type: guide.type.value,
    min_value: guide.minValue,
    max_value: guide.maxValue,
    min_age: guide.minAge,
    max_age: guide.maxAge,
    age_unit: guide.ageUnit.value,
  });

  if (error) {
    const { error: deleteAge } = await supabase
      .from("ageranges")
      .delete()
      .eq("id", age[0].id);

    if (deleteAge) throw new Error(deleteAge.message);
  }

  return newGuide;
}

export async function deleteGuide(guideId: string) {
  const { data: deletedGuide, error } = await supabase
    .from("guidelines")
    .delete()
    .eq("id", guideId);

  if (error) throw new Error(error.message);

  return deletedGuide;
}

// in the future we need to move this function to "doctor" service
export async function deleteDoctorById(doctorId: string) {
  const { data: deletedDoctor, error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", doctorId);

  if (error) throw new Error(error.message);

  return deletedDoctor;
}
