import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "@/components/admin-root/Card";
import { router } from "expo-router";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center h-full bg-white">
      <Card
        title="Patients"
        icon="person"
        onPress={() => {
          router.push("./patients");
        }}
      />
      <Card
        title="guides"
        icon="book"
        onPress={() => {
          router.push("./guides/");
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
