import { Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import GoBack from "@/components/ui/GoBack";

const PatientAnalysis = () => {
  const { patientId } = useLocalSearchParams();
  return (
    <SafeAreaView className="flex-1">
      <View className="p-6">
        <GoBack />
        <Text>{patientId}</Text>
      </View>
    </SafeAreaView>
  );
};

export default PatientAnalysis;
