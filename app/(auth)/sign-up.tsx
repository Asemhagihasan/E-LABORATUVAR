import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import { router } from "expo-router";
import {
  SubmitHandler,
  useForm,
  FieldValues,
  FormProvider,
  Controller,
  SubmitErrorHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/types/schema";
import { useSignUp } from "@/hooks/auth/useSignUp";
import { SignUpProps } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
const SignUp = () => {
  const { signUp } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);
  const methods = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    data.role = "user";
    signUp(data as SignUpProps);
  };

  const onError: SubmitErrorHandler<FieldValues> = (errors, e) => {
    console.log(JSON.stringify(errors));
    Alert.alert("Warning", "some thing went wrong");
  };

  return (
    <SafeAreaView className="flex-1 h-full bg-white">
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
          <FormProvider {...methods}>
            <View className="mt-8 gap-6">
              <Controller
                control={methods.control}
                name="fullName"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <InputField
                      label="Full Name"
                      placeholder="Enter your full name"
                      value={value}
                      onChangeText={onChange}
                      errorMessage={error?.message}
                    />
                  );
                }}
              />
              <Controller
                control={methods.control}
                name="email"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <InputField
                      label="Email"
                      placeholder="Enter your email"
                      keypoardType="email-address"
                      value={value}
                      onChangeText={onChange}
                      errorMessage={error?.message}
                    />
                  );
                }}
              />
              <Controller
                control={methods.control}
                name="password"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <InputField
                      label="Password"
                      placeholder="Enter your password"
                      secureTextEntry={true}
                      value={value}
                      onChangeText={onChange}
                      errorMessage={error?.message}
                      icon={
                        showPassword ? (
                          <Feather
                            name="eye"
                            size={24}
                            color="#737373"
                            onPress={() => setShowPassword(!showPassword)}
                          />
                        ) : (
                          <Feather
                            name="eye-off"
                            size={24}
                            color="#737373"
                            onPress={() => setShowPassword(!showPassword)}
                          />
                        )
                      }
                    />
                  );
                }}
              />
              <Controller
                control={methods.control}
                name="nationalId"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <InputField
                      label="nationalId"
                      placeholder="Enter your nationalId"
                      keypoardType="numeric"
                      value={value}
                      onChangeText={onChange}
                      errorMessage={error?.message}
                    />
                  );
                }}
              />
            </View>
            <Button
              title={"Sign Up"}
              onPress={methods.handleSubmit(onSubmit)}
            />
          </FormProvider>
          <View className="flex flex-row justify-center items-center my-8 ">
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
    </SafeAreaView>
  );
};

export default SignUp;
