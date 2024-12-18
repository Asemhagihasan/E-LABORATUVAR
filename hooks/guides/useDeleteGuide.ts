import { deleteGuide as deleteGuideApi } from "@/services/guides";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteGuide = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteGuide, isPending } = useMutation({
    mutationFn: (id: string) => deleteGuideApi(id),
    onSuccess: () => {
      console.log("Guide deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["guides"] });
    },
    onError: (err) => {
      console.error("Error => ", err);
    },
  });

  return { deleteGuide, isPending };
};
