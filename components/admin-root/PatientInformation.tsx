import React from "react";
import { Text, View } from "react-native";
import GoBack from "@/components/ui/GoBack";
import { calculateAge, maskNationalId } from "@/utils/helpers";
import Loader from "../ui/Loader";
import { useGetPatientById } from "@/hooks/patients/useGetPatientById";

const PatientInfoRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row items-center justify-between w-[220px]">
    <Text className="text-lg text-neutral-700 font-bold">{label}:</Text>
    <Text className="text-lg text-neutral-700 font-semibold">{value}</Text>
  </View>
);

const PatientInformation = ({ patientId }: { patientId: string }) => {
  const { patient, isLoading } = useGetPatientById(patientId as string);

  if (isLoading) return <Loader />;
  return (
    <View>
      <GoBack />
      <Text className="text-2xl text-neutral-800 font-bold text-center">
        Patient Information
      </Text>
      <View className="mt-8 gap-4 bg-neutral-50 border border-neutral-200 rounded-md p-6">
        <PatientInfoRow label="Full name" value={patient?.fullName || "N/A"} />
        <PatientInfoRow
          label="National ID"
          value={maskNationalId(patient?.nationalId) || "N/A"}
        />
        <PatientInfoRow
          label="Birth date"
          value={
            patient?.birthDate
              ? `${patient.birthDate} / ${calculateAge(patient.birthDate)}`
              : "N/A"
          }
        />
        <PatientInfoRow label="Gender" value={patient?.gender || "N/A"} />
      </View>
    </View>
  );
};

export default PatientInformation;
