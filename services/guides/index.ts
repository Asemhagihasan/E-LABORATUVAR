import { supabase } from "../supabase";

export async function getGuides(guideType: string) {
  console.log("guideType", guideType);
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
    .select("min_age, max_age, age_unit");

  if (error) throw new Error(error.message);

  return guideAgeRanges;
}
