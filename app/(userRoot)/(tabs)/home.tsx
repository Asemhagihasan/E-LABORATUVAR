import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useLogout } from "@/hooks/useLogout";

const Home = () => {
  const { logout, isPending } = useLogout();
  return (
    <SafeAreaView className="flex-1 items-center justify-center h-full bg-white">
      <TouchableOpacity
        onPress={() => logout()}
        disabled={isPending}
        className="p-5 rounded-md flex flex-row justify-center items-center bg-[#1D61E7] shadow-md shadow-neutral-400/70"
      >
        <Text className="text-white text-lg font-bold">Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
