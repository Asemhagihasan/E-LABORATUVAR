import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import { useLogin } from "@/hooks/auth/useLogin";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, isPending } = useLogin();
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleSignIn = () => {
    if (!form.email || !form.password) return;
    signIn(form, { onSettled: () => setForm({ email: "", password: "" }) });
  };

  const handleEmailChange = (text: string) => {
    setForm((prevForm) => ({ ...prevForm, email: text }));
  };

  const handlePasswordChange = (text: string) => {
    setForm((prevForm) => ({ ...prevForm, password: text }));
  };

  const redirectToUserPage = () => {
    router.push("/(userRoot)/user-dashboard");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 pt-6">
        <View className="items-center flex-row mt-4 px-1">
          <Image
            source={require("../../assets/images/logo.png")}
            className="w-16 h-16"
          />
          <Text className="text-xl font-bold text-neutral-950">
            E-Laboratuvar
          </Text>
        </View>
        <View className="px-6">
          <Text className="text-4xl font-bold text-neutral-950 mt-8 max-w-60 leading-[40px]">
            Sign in to your Account
          </Text>
          <Text className="text-lg font-semibold text-neutral-500 mt-4">
            Enter your email and password to login
          </Text>
          <View className="mt-8 gap-6">
            <InputField
              label="Email"
              placeholder="Enter your email"
              value={form.email}
              onChangeText={handleEmailChange}
            />
            <InputField
              label="Password"
              placeholder="Enter your password"
              value={form.password}
              onChangeText={handlePasswordChange}
              secureTextEntry={!showPassword}
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
          </View>
          <View className="flex mt-3">
            <TouchableOpacity activeOpacity={0.6} className="w-[140px] ml-auto">
              <Text className="font-bold text-blue-600 text-lg">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            title="Login"
            titleStyle="text-xl"
            disabled={isPending}
            onPress={handleSignIn}
          />
          <Button
            title="User Page"
            titleStyle="text-xl"
            onPress={redirectToUserPage}
          />
          <View className="flex flex-row justify-center items-center mt-4">
            <Text className="text-neutral-500 font-medium">
              Don't have an account?
            </Text>
            <TouchableOpacity
              className="ml-2"
              activeOpacity={0.6}
              onPress={() => router.push("./sign-up")}
            >
              <Text className="text-blue-600 underline text-base font-semibold">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
