import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useLogout } from "@/hooks/auth/useLogout";
import { useUser } from "@/hooks/auth/useUser";
import { useGetProfile } from "@/hooks/profile/useGetProfile";
import DetailsComponent from "../../../components/details";

const Home = () => {
  const { logout, isPending } = useLogout();
  const { user } = useUser();
  const { profile } = useGetProfile(user?.id!);

  const capitalizeFirstLetter = (name: string) => {
    if (!name) return "Back!";

    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4 gap-4">
      <View className="flex-1">
        <Text className="text-2xl font-bold">
          Welcome{" "}
          <Text className="text-[##1D61E7]">
            {capitalizeFirstLetter(profile?.fullName)}
          </Text>
        </Text>
        <Text className="text-lg font-medium text-gray-500 mt-4 mb-5">
          View your medical test results and gain insights into your health.
        </Text>

        <DetailsComponent userID={profile?.id || null} profile={profile} />
      </View>

      <TouchableOpacity
        onPress={() => logout()}
        disabled={isPending}
        className="p-5  rounded-md flex flex-row justify-center items-center bg-red-600 shadow-md shadow-neutral-400/70"
      >
        <Text className="text-white text-lg font-bold">Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
