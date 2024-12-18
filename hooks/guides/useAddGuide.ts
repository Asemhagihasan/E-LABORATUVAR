import { addGuide as addGuideApi } from "@/services/guides";
import { Guide } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useAddGuide = () => {
  const { mutate: addGuide, isPending } = useMutation({
    mutationFn: (guide: Guide) => addGuideApi(guide),
    onSuccess: () => {
      console.log("Guide added successfully");
    },
    onError: (err) => {
      console.error("Error => ", err);
    },
  });

  return { addGuide, isPending };
};
