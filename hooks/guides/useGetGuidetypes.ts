import { getGuidesType } from "@/services/guides";
import { useQuery } from "@tanstack/react-query";

export const useGetGuideTypes = () => {
  const { data: guidesType, isPending: isLoadingTypes } = useQuery({
    queryKey: ["guideTypes"],
    queryFn: () => getGuidesType(),
  });

  return { guidesType, isLoadingTypes };
};
