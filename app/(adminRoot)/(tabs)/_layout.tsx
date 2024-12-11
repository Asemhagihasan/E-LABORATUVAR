import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TabsProps } from "@/types";

export default function AdminLayout() {
  const TabIcon = ({ color, name, icon }: TabsProps) => {
    return (
      <View className="flex items-center justify-center gap-2 grow w-24 h-full mb-6">
        {icon}
        <Text style={{ color }} className="font-semibold text-sm">
          {name}
        </Text>
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#1D61E7",
        tabBarInactiveTintColor: "#CDCDE0",

        tabBarStyle: {
          height: 70,
          borderTopWidth: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="admin-home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, focused }) => {
            return (
              <TabIcon
                color={color}
                name="Home"
                icon={
                  <Ionicons
                    name="home"
                    size={24}
                    color={`${focused ? "#1D61E7" : "#CDCDE0"}`}
                  />
                }
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color, focused }) => {
            return (
              <TabIcon
                color={color}
                name="Profile"
                icon={
                  <Ionicons
                    name="person"
                    size={24}
                    color={`${focused ? "#1D61E7" : "#CDCDE0"}`}
                  />
                }
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
