import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center h-full">
      <Text className="text-3xl text-red-100">index</Text>
    </SafeAreaView>
  );
};

export default Home;
