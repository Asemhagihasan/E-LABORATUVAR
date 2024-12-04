import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import InputField from "@/components/ui/InputField";
import DatePickerField from "@/components/ui/DatePickerField";
import Button from "@/components/ui/Button";
import { router } from "expo-router";

const SignUp = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  console.log("selectedDate", selectedDate);

  return (
    <ScrollView className="flex-1 pt-8 bg-white">
      <View className="px-7 py-4 h-full">
        <TouchableOpacity className="mt-4">
          <Ionicons
            name="arrow-back"
            size={24}
            onPress={() => {
              router.push("/sign-in");
            }}
          />
        </TouchableOpacity>
        <Text className="text-3xl font-bold text-neutral-950 mt-8">
          Sign Up
        </Text>
        <Text className="text-xl font-semibold text-neutral-500 mt-4">
          Create an account to continue!
        </Text>
        <View className="mt-8 gap-6">
          <InputField label="Full Name" placeholder="Enter your full name" />
          <InputField
            label="Email"
            placeholder="Enter your email"
            keypoardType="email-address"
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={true}
          />
          <DatePickerField
            label="Date of Birth"
            placeholder="Select your date of birth"
            value={selectedDate}
            onDateChange={(date) => setSelectedDate(date)}
          />
        </View>
        <Button title={"Sign Up"} />
        <View className="flex flex-row justify-center items-center mt-8">
          <Text className="text-neutral-500 font-medium">
            Already have an account?
          </Text>
          <TouchableOpacity
            className="ml-2"
            onPress={() => router.push("./sign-in")}
          >
            <Text className="text-blue-600 underline text-base font-semibold">
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
