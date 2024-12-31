import AddNewDoctor from "@/components/admin-root/AddNewDoctor";
import DoctorDetails from "@/components/admin-root/DoctorDetails";
import GoBack from "@/components/ui/GoBack";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ManageDoctors = () => {
  const [newDoctorRecord, setNewDoctorRecord] = useState({});

  const updateDoctorTable = (newDoctor: any) => {
    setNewDoctorRecord(newDoctor);
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <GoBack />
      <View className="px-6 mb-3">
        <Text className="text-2xl text-neutral-900 font-bold text-center mb-4">
          Monitoring Doctor Activities
        </Text>
        <AddNewDoctor updateDoctorTable={updateDoctorTable} />
      </View>

      <DoctorDetails newDoctorRecord={newDoctorRecord} />
    </SafeAreaView>
  );
};

export default ManageDoctors;
