import Card from "@/components/admin-root/Card";
import { card_items } from "@/constants";
import { useLogout } from "@/hooks/auth/useLogout";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminHome = () => {
  const { logout, isPending } = useLogout();

  return (
    <SafeAreaView className="flex-1 bg-white p-4 gap-4">
      <View className="flex-1">
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-1 pr-4">
            <Text className="text-xl font-bold">Admin Dashboard</Text>
            <Text className="text-lg font-medium text-gray-500">
              Manage patient statuses, monitor doctor activities, and oversee
              system settings efficiently.
            </Text>
          </View>
        </View>

        <View className="flex-row flex-wrap gap-4">
          {card_items.map((item) => {
            return (
              <Card
                key={item.itemKey}
                src={item.src}
                pageName={item.pageName}
                description={item.description}
                operation_name={item.operation_name}
                background_color={item.background_color}
              />
            );
          })}
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

export default AdminHome;
