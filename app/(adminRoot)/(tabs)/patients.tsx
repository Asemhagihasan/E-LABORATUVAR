import { Text, View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GoBack from "@/components/ui/GoBack";
import PatientsTable from "@/components/admin-root/PatientsTable";

const patients = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="flex-1 px-6">
          <GoBack />
          <Text className="text-2xl text-neutral-900 font-bold text-center">
            Patients
          </Text>
          <PatientsTable />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default patients;
