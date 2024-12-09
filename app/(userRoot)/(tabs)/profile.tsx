import { FlatList, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Controller,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePatientSchema } from "@/types/schema";
import FileUpload from "@/components/ui/FileUpload";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import CustomSelect from "@/components/ui/CustomSelect";
import { genders } from "@/constants";
import DatePickerField from "@/components/ui/DatePickerField";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useUser } from "@/hooks/useUser";

const Profile = () => {
  const { user } = useUser();
  const defaultValues = {
    fullName: "Asem",
    email: "asemhagi@gmail.com",
    gender: "male",
    birthDate: new Date().toISOString().split("T")[0], // Ensure ISO format
    nationalId: "12345678910",
    address: "Addis Ababa",
    phone: "5526492954", // Add other fields with default values
  };

  const { updateUser, isPending } = useUpdateUser();

  const methods = useForm({
    resolver: zodResolver(UpdatePatientSchema),
    defaultValues: defaultValues,
  });
  const handleFileSelect = (file: {
    uri: string;
    type: string;
    name: string;
  }) => {
    console.log("Selected File:", file);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    // Replace slashes with dashes to create an ISO-like format
    const birthDateString = data.birthDate.replace(/\//g, "-");
    // Convert to Date object
    const formattedData = {
      ...data,
      birthDate: new Date(birthDateString),
      role: "user",
      userId: user?.id,
    };
    // Send `formattedData` to Supabase or use it as needed
    updateUser(formattedData);
  };

  const formFields = [
    {
      name: "fullName",
      label: "Full Name",
      component: InputField,
      defaultValue: "",
    },
    {
      name: "email",
      label: "Email",
      component: InputField,
      defaultValue: "",
      disabled: true,
    },
    {
      name: "nationalId",
      label: "National ID",
      component: InputField,
      defaultValue: "",
      disabled: true,
    },
    {
      name: "phone",
      label: "Phone Number",
      component: InputField,
      defaultValue: "",
    },
    {
      name: "address",
      label: "Address",
      component: InputField,
      defaultValue: "",
    },
    {
      name: "gender",
      label: "Select your gender",
      component: CustomSelect,
      elementType: "select",
      options: genders,
      defaultValue: "",
    },
  ];

  return (
    <SafeAreaView className="flex-1 h-full bg-white">
      <FormProvider {...methods}>
        <FlatList
          data={formFields}
          keyExtractor={(item) => item.name}
          ListHeaderComponent={() => (
            <>
              <View className="w-full pt-12">
                <Text className="text-neutral-950 font-semibold text-2xl text-center">
                  Update your profile
                </Text>
              </View>
              <View className="p-5 justify-center items-center">
                <FileUpload onFileSelect={handleFileSelect} />
              </View>
            </>
          )}
          renderItem={({ item }: any) => {
            const Component = item.component;
            return (
              <View className="max-w-sm w-full mx-auto my-3">
                <Controller
                  name={item.name}
                  control={methods.control}
                  key={item.name}
                  render={({
                    field: { onChange, value, onBlur },
                    fieldState: { error },
                  }) => {
                    if (item.elementType === "select") {
                      return (
                        <Component
                          label={item.label}
                          onChange={onChange}
                          value={value}
                          onBlur={onBlur}
                          errorMessage={error?.message}
                          disabled={item.disabled}
                          dropdownItems={item.options!}
                          selectionColor="#B7C7D7"
                          {...item}
                        />
                      );
                    } else
                      return (
                        <Component
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          errorMessage={error?.message}
                          defaultValue={item.defaultValue}
                          {...item}
                        />
                      );
                  }}
                />
              </View>
            );
          }}
          ListFooterComponent={() => (
            <View className="max-w-sm w-full mx-auto mb-4">
              <Controller
                name="birthDate"
                control={methods.control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <DatePickerField
                      label="Date of Birth"
                      placeholder="Select your date of birth"
                      value={value}
                      onDateChange={(date) => onChange(date)}
                    />
                    {error && (
                      <Text className="text-red-500 text-base font-semibold">
                        {error.message}
                      </Text>
                    )}
                  </>
                )}
              />
              <Button
                onPress={methods.handleSubmit(onSubmit)}
                title="Save Changes"
                disabled={isPending}
              />
            </View>
          )}
        />
      </FormProvider>
    </SafeAreaView>
  );
};

export default Profile;
