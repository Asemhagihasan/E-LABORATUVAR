import Card from "@/components/admin-root/Card";
import { card_items } from "@/constants";
import { FlatList, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminHome = () => {
  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <View className="flex-row flex-wrap justify-center gap-4">
        {card_items.map((item, index) => {
          return (
            <Card
              key={index}
              src={item.src}
              pageName={item.pageName}
              description={item.description}
              operation_name={item.operation_name}
              background_color={item.background_color}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default AdminHome;
