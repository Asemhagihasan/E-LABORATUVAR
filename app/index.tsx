import { Redirect } from "expo-router";
import { useUser } from "@/hooks/auth/useUser";
import Loader from "@/components/ui/Loader";
import { useGetProfile } from "@/hooks/profile/useGetProfile";

const index = () => {
  const { isLoadingUser, isAuthonticated, metaData, user } = useUser();
  const { profile, isPending: isLoadingProfile } = useGetProfile(user?.id!);

  const role = metaData?.role || profile?.role;

  if (isLoadingUser || isLoadingProfile) return <Loader />;

  return isAuthonticated ? (
    role === "user" ? (
      <Redirect href={`./(userRoot)/(tabs)/home`} />
    ) : role === "admin" ? (
      <Redirect href={`./(adminRoot)/admin-home`} />
    ) : (
      <Redirect href="./(auth)/sign-in" />
    )
  ) : (
    <Redirect href="./(auth)/sign-in" />
  );
};

export default index;
