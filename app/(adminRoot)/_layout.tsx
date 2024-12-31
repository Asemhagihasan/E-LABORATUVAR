import React from "react";
import { Stack } from "expo-router";

const AdminRoot = () => {
  return (
    <Stack
      initialRouteName="admin-home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="admin-home" />
      <Stack.Screen name="manage-doctors" />
      <Stack.Screen name="patients" />
      <Stack.Screen name="guides" />
      <Stack.Screen name="patient-analysis/:patientId" />
    </Stack>
  );
};

export default AdminRoot;
