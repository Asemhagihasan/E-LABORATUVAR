import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Redirect } from "expo-router";
import { useUser } from "@/hooks/useUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  const { isLoadingUser, isAuthonticated, metaData, user } = useUser();
  console.log("user", user);

  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await AsyncStorage.getItem("supabase.auth.token");
        console.log("Stored session:", session);
      } catch (error) {
        console.error("Error retrieving session:", error);
      }
    };
    getSession();
  }, []);

  return <Redirect href="./(auth)/sign-up" />;
};

export default index;
