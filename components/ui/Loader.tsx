import { ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Loader = () => {
  return (
    <SafeAreaView className="h-full bg-white flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#1D61E7" />
    </SafeAreaView>
  );
};

export default Loader;
