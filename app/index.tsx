import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { useUser } from "@/hooks/useUser";

const index = () => {
  const { isLoadingUser, isAuthonticated, metaData, user } = useUser();

  const role = metaData?.role;

  if (isLoadingUser)
    return (
      <View className="h-full bg-white flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#1D61E7" />
      </View>
    );

  return isAuthonticated ? (
    role === "user" ? (
      <Redirect href={`./(userRoot)/(tabs)/explore`} /> // redirect to user dashboard
    ) : (
      <Redirect href={`./(adminRoot)/(tabs)/index`} /> // redirect to admin dashboard (not create yet)
    )
  ) : (
    <Redirect href="./(auth)/sign-in" />
  );
};

export default index;
