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
    <SafeAreaView className="flex-1 bg-white p-4">
      {card_items.map((item) => {
        return (
          <View
            key={item.pageName}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            <Card
              src={item.src}
              description={item.description}
              operation_name={item.operation_name}
              pageName={item.pageName}
            />
          </View>
        );
      })}
    </SafeAreaView>
  );
};

export default AdminHome;
