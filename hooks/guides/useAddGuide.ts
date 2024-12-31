import { addGuide as addGuideApi } from "@/services/guides";
import { Guide } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useAddGuide = () => {
  const queryClient = useQueryClient();
  const { mutate: addGuide, isPending } = useMutation({
    mutationFn: (guide: Guide) => addGuideApi(guide),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guides"] });
      queryClient.invalidateQueries({ queryKey: ["guideAgeRanges"] });
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "Guide added successfully",
        text1Style: { fontSize: 16, fontWeight: "bold" },
        text2Style: { fontSize: 14 },
      });
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err.message,
        text1Style: { fontSize: 16, fontWeight: "bold" },
        text2Style: { fontSize: 14 },
      });
    },
  });

  return { addGuide, isPending };
};
