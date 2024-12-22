import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import PatientInformation from "@/components/admin-root/PatientInformation";
import AnalysisTable from "@/components/admin-root/AnalysisTable";
import CreateAnalysis from "@/components/admin-root/CreateAnalysis";
import { useGetPatientById } from "@/hooks/patients/useGetPatientById";

const PatientAnalysis = () => {
  const { patientId } = useLocalSearchParams();
  const { patient, isLoading } = useGetPatientById(patientId as string);
  const [refetch, setRefetch] = useState(false);

  return (
    <SafeAreaView className="flex-1">
      <View className="p-6">
        <PatientInformation patient={patient} isLoading={isLoading} />
        <CreateAnalysis setRefetch={setRefetch} patient={patient} />
        <AnalysisTable refetch={refetch} patientId={patientId as string} />
      </View>
    </SafeAreaView>
  );
};

export default PatientAnalysis;
