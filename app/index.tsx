import { View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { useUser } from "@/hooks/auth/useUser";
import Loader from "@/components/ui/Loader";

const index = () => {
  const { isLoadingUser, isAuthonticated, metaData, user } = useUser();

  const role = metaData?.role;

  if (isLoadingUser) return <Loader />;

  return isAuthonticated ? (
    role === "user" ? (
      <Redirect href={`./(userRoot)/(tabs)/home`} /> // redirect to user dashboard
    ) : (
      <Redirect href={`./(adminRoot)/(home)/home`} /> // redirect to admin dashboard (not create yet)
    )
  ) : (
    <Redirect href="./(auth)/sign-in" />
  );
};

export default index;
