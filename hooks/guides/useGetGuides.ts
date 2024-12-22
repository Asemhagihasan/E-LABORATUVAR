import { getGuides } from "@/services/guides";
import { useQuery } from "@tanstack/react-query";

export const useGetGuides = (guideType: string) => {
  const { data: guides, isPending: isLoading } = useQuery({
    queryKey: ["guides", guideType],
    queryFn: () => getGuides(guideType),
  });
  return { guides, isLoading };
};
