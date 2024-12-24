import AddNewDoctor from "@/components/admin-root/AddNewDoctor";
import GoBack from "@/components/ui/GoBack";
import { SafeAreaView, Text, View } from "react-native";

const ManageDoctors = () => {
  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <GoBack />
      <View className="px-6 gap-4">
        <Text className="text-2xl text-neutral-900 font-bold text-center mt-6">
          Monitoring Doctor Activities
        </Text>

        <AddNewDoctor />
      </View>
    </SafeAreaView>
  );
};

export default ManageDoctors;
