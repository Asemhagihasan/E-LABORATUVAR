import { deleteGuide as deleteGuideApi } from "@/services/guides";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useDeleteGuide = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteGuide, isPending } = useMutation({
    mutationFn: (id: string) => deleteGuideApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guides"] });
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "Guide deleted successfully",
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

  return { deleteGuide, isPending };
};
