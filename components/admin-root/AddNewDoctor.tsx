import React, { useState } from "react";
import Button from "../ui/Button";
import { Text, View } from "react-native";

const AddNewDoctor = () => {
  const [showAddingDoctorModal, setShowAddingDoctorModal] = useState(false);

  return (
    <View className="flex-row flex-wrap items-center justify-between">
      <Button
        title="Add New Doctor"
        onPress={() => setShowAddingDoctorModal(true)}
        containerStyle="bg-[#1D61E7] border border-gray-300 shadow-md rounded-md px-3 py-2"
        titleStyle="text-white font-medium"
        leftIcon="doctor"
        leftIconColor="white"
      />
    </View>
  );
};

export default AddNewDoctor;
