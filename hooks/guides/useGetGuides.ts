import { getGuides } from "@/services/guides";
import { useQuery } from "@tanstack/react-query";

export const useGetGuides = (guideType: string) => {
  const { data: guides, isPending } = useQuery({
    queryKey: ["guides", guideType],
    queryFn: () => getGuides(guideType),
  });
  return { guides, isPending };
};
