import { getGuidesType } from "@/services/guides";
import { useQuery } from "@tanstack/react-query";

export const useGetGuideTypes = () => {
  const { data, isPending: isLoadingTypes } = useQuery({
    queryKey: ["guideTypes"],
    queryFn: () => getGuidesType(),
  });

  const guidesType = data?.map((guideType: any) => {
    return {
      label: guideType.type,
      value: guideType.type,
    };
  });

  return { guidesType, isLoadingTypes };
};
