import React from "react";
import { Redirect } from "expo-router";
import { useUser } from "@/hooks/auth/useUser";
import Loader from "@/components/ui/Loader";

const index = () => {
  const { isLoadingUser, isAuthonticated, metaData, user } = useUser();

  const role = metaData?.role;

  if (isLoadingUser) return <Loader />;
  console.log("user metaData => " + JSON.stringify(metaData));
  console.log("user role => " + role);
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
