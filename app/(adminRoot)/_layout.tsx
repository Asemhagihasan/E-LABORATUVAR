import React from "react";
import { Stack } from "expo-router";

const AdminRoot = () => {
  return (
    <Stack initialRouteName="admin-home">
      <Stack.Screen name="admin-home" options={{ headerShown: false }} />
      <Stack.Screen name="patients" options={{ headerShown: false }} />
      <Stack.Screen name="guides" options={{ headerShown: false }} />
      <Stack.Screen
        name="patient-analysis/:patientId"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default AdminRoot;
