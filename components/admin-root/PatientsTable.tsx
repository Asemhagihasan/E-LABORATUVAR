import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useGetPatients } from "@/hooks/patients/useGetPatients";

const PatientsTable = () => {
  const { patients } = useGetPatients();
  console.log("patients", patients);
  return (
    <View>
      <Text>PatientsTable</Text>
    </View>
  );
};

export default PatientsTable;
