import { getCurrentUser } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const { isPending: isLoadingUser, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    isAuthonticated: !!user,
    isLoadingUser,
    user,
    metaData: user?.user_metadata,
  };
};
