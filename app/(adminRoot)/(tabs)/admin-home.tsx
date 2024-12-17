import Card from "@/components/admin-root/Card";
import { card_items } from "@/constants";
import { FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminHome = () => {
  const handleCardPress = (action: string) => {
    console.log(`${action} card pressed`);
    // Add navigation or logic here
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center h-full bg-white">
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <FlatList
          data={card_items}
          renderItem={({ item }) => (
            <Card
              icon={item.icon}
              containerColor={item.containerColor}
              title={item.title}
              pageName={item.pageName}
            />
          )}
          keyExtractor={(item) => item.pageName}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminHome;
