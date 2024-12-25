import { addGuide as addGuideApi } from "@/services/guides";
import { Guide } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddGuide = () => {
  const queryClient = useQueryClient();
  const { mutate: addGuide, isPending } = useMutation({
    mutationFn: (guide: Guide) => addGuideApi(guide),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guides"] });
    },
    onError: (err) => {
      console.error("Error => ", err);
    },
  });

  return { addGuide, isPending };
};
