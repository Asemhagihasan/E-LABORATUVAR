import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useLogout } from "@/hooks/auth/useLogout";
import { useUser } from "@/hooks/auth/useUser";

const Home = () => {
  const { logout, isPending } = useLogout();
  const { user, isLoadingUser } = useUser();

  return (
    <SafeAreaView className="flex-1 bg-white p-4 gap-4">
      <View className="flex-1">
        <View className="flex-1 pr-4">
          <Text className="text-xl font-bold">Admin Dashboard</Text>
          <Text>{JSON.stringify(user?.user_metadata, null, 2)}</Text>
          <Text className="text-lg font-medium text-gray-500">
            Manage patient statuses, monitor doctor activities, and oversee
            system settings efficiently.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => logout()}
        disabled={isPending}
        className="p-5 rounded-md flex flex-row justify-center items-center bg-red-600 shadow-md shadow-neutral-400/70"
      >
        <Text className="text-white text-lg font-bold">Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
