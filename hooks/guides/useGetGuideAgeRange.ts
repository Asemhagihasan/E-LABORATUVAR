import { getGuideAgeRanges } from "@/services/guides";
import { useQuery } from "@tanstack/react-query";

export const useGetGuideAgeRange = () => {
  const { data: rawGuideAgeRanges, isPending } = useQuery({
    queryKey: ["guideAgeRanges"],
    queryFn: () => getGuideAgeRanges(),
  });

  const guideAgeRanges = rawGuideAgeRanges?.map(
    (guideAgeRange: { min_age: number; max_age: number; age_unit: string }) => {
      return {
        label: `${guideAgeRange.min_age} - ${guideAgeRange.max_age} ${guideAgeRange.age_unit}`,
        value: {
          minAge: guideAgeRange.min_age,
          maxAge: guideAgeRange.max_age,
          ageUnit: guideAgeRange.age_unit,
        },
      };
    }
  );

  return { guideAgeRanges, isPending };
};
