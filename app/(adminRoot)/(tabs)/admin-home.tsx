import Card from "@/components/admin-root/Card";
import { card_items } from "@/constants";
import { FlatList, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminHome = () => {
  const handleCardPress = (action: string) => {
    console.log(`${action} card pressed`);
    // Add navigation or logic here
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center h-full bg-white">
      <Text>Admin Home</Text>
    </SafeAreaView>
  );
};

export default AdminHome;
