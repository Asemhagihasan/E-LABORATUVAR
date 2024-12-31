import React, { useState } from "react";
import Button from "../ui/Button";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Modal, Portal } from "react-native-paper";
import {
  Controller,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddDoctorSchema } from "@/types/schema";
import { containerStyle } from "./CreateGuide";
import { z } from "zod";
import DatePickerField from "../ui/DatePickerField";
import InputField from "../ui/InputField";
import CustomSelect from "../ui/CustomSelect";
import { genders } from "@/constants";
import { useAddDoctor } from "@/hooks/admin/useAddDoctor";
import { checkNationalIdExists } from "@/services/auth";
import Toast from "react-native-toast-message";

const AddNewDoctor = ({
  updateDoctorTable,
}: {
  updateDoctorTable: (formattedData: any) => void;
}) => {
  const [showAddingDoctorModal, setShowAddingDoctorModal] = useState(false);
  const { createDoctorRecord, isPending, error } = useAddDoctor();

  const methods = useForm<z.infer<typeof AddDoctorSchema>>({
    resolver: zodResolver(AddDoctorSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
      nationalId: "",
    },
  });

  const hideModal = () => {
    setShowAddingDoctorModal(false);
  };

  const formFields = [
    {
      name: "fullName",
      label: "Full Name",
      component: InputField,
    },
    {
      name: "email",
      label: "Email",
      component: InputField,
    },
    {
      name: "password",
      label: "Account Password",
      component: InputField,
      secureTextEntry: true,
      placeholder: "*********",
    },
    {
      name: "nationalId",
      label: "National ID",
      component: InputField,
    },
    {
      name: "phone",
      label: "Phone Number",
      component: InputField,
      defaultValue: "",
    },
    {
      name: "gender",
      label: "Select your gender",
      component: CustomSelect,
      elementType: "select",
      options: genders,
    },
  ];

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    // Replace slashes with dashes to create an ISO-like format
    const birthDateString = data.birthDate.replace(/\//g, "-");

    // Convert to Date object
    const formattedData = {
      ...data,
      birthDate: new Date(birthDateString),
    };

    // check if the user is existis by national Id
    const isExistis = await checkNationalIdExists(data.nationalId);
    if (isExistis) {
      Toast.show({
        type: "error",
        text1: "User was found!",
        text2: "the national Id is already existis!",
        text1Style: { fontSize: 16, fontWeight: "bold" },
        text2Style: { fontSize: 14 },
      });
      return;
    }

    // add new doctor to supabase
    createDoctorRecord(formattedData);
    if (error) {
      console.error(
        "There an issue in AddNewDoctor (onSubmit): ",
        error.message
      );
      return;
    }
    hideModal();

    // reset form states and update the doctors table
    methods.reset();
    updateDoctorTable(formattedData);
  };

  return (
    <View className="flex-row flex-wrap items-center justify-between">
      <Button
        title="Add New Doctor"
        onPress={() => setShowAddingDoctorModal(true)}
        containerStyle="bg-[#1D61E7] border border-gray-300 shadow-md rounded-md p-3"
        titleStyle="text-white font-medium"
        leftIcon="doctor"
        leftIconColor="white"
      />

      <Portal>
        <Modal
          visible={showAddingDoctorModal}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle as any}
        >
          <FormProvider {...methods}>
            <View className="flex-row items-center justify-between pb-4 border-b-2 border-gray-100">
              <Text className="text-2xl font-semibold text-[#1D61E7] text-left">
                Add new guide
              </Text>

              <TouchableOpacity
                onPress={hideModal}
                className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
              >
                <Text className="text-gray-600 text-lg font-bold">X</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={formFields}
              keyExtractor={(item) => item.name}
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
                    titleStyle="text-white text-xl"
                    title={`${isPending ? "Saving..." : "Add Doctor"}`}
                    disabled={isPending}
                  />
                </View>
              )}
            />
          </FormProvider>
        </Modal>
      </Portal>
    </View>
  );
};

export default AddNewDoctor;
