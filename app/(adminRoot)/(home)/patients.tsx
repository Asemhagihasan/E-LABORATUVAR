import { Text, View, ScrollView, Keyboard } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GoBack from "@/components/ui/GoBack";
import PatientsTable from "@/components/admin-root/PatientsTable";
import { Searchbar } from "react-native-paper";
import { TouchableWithoutFeedback } from "react-native";
import { usePathname } from "expo-router";

const patients = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView>
          <View className="flex-1 p-6">
            <GoBack />
            <Text className="text-2xl text-neutral-900 font-bold text-center bg-ne">
              Patients
            </Text>
            <Searchbar
              placeholder="Enter Patient Name or national ID"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={{
                marginTop: 20,
                backgroundColor: "#f5f5f5",
              }}
            />
            <PatientsTable searchQuery={searchQuery} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default patients;
