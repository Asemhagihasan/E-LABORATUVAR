import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import PatientInformation from "@/components/admin-root/PatientInformation";
import AnalysisTable from "@/components/admin-root/AnalysisTable";

const PatientAnalysis = () => {
  const { patientId } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1">
      <View className="p-6 gap-12">
        <PatientInformation patientId={patientId as string} />
        <AnalysisTable patientId={patientId as string} />
      </View>
    </SafeAreaView>
  );
};

export default PatientAnalysis;
