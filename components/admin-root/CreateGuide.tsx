import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Modal, Portal } from "react-native-paper";
import InputField from "../ui/InputField";
import Button from "../ui/Button";

import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GuideSchema } from "@/types/schema";
import { z } from "zod";
import Select from "../ui/Select";
import GuideTypes from "./GuideTypes";
import { ageUnits } from "@/constants";
import { useAddGuide } from "@/hooks/guides/useAddGuide";
import { Guide } from "@/types";

const containerStyle = {
  backgroundColor: "white",
  padding: 20,
  width: 360,
  marginHorizontal: "auto",
  borderRadius: 10,
  display: "flex",
  flexDirection: "column",
  gap: 20,
  height: 500,
  overflow: "scroll",
};

export default function CreateGuide() {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const { addGuide } = useAddGuide();

  const methods = useForm<z.infer<typeof GuideSchema>>({
    resolver: zodResolver(GuideSchema),
    defaultValues: {
      minValue: 0,
      maxValue: 0,
      minAge: 0,
      maxAge: 0,
    },
  });

  const onSubmit = (data: Guide) => {
    console.log(data);
    addGuide(data, {
      onSettled: () => {
        methods.reset();
        hideModal();
      },
    });
  };

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <FormProvider {...methods}>
            <ScrollView className="p-4 bg-white rounded-md flex-1">
              <Text className="text-lg font-semibold text-neutral-700 text-center mb-4">
                Add new guide
              </Text>
              <View className="flex flex-col gap-4">
                <Controller
                  name="type"
                  control={methods.control}
                  key="type"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <GuideTypes
                      selectedType={value}
                      setSelectedType={onChange}
                      containerStyle="!w-full justify-between !bg-white border border-neutral-300 !shadow-none"
                      errorMessage={error?.message}
                      label="Guide type"
                    />
                  )}
                />
                <View className="flex flex-col gap-4">
                  <Controller
                    name="minValue"
                    control={methods.control}
                    key="minValue"
                    render={({
                      field: { value, onChange, onBlur },
                      fieldState: { error },
                    }) => (
                      <InputField
                        label="Min value"
                        placeholder="Enter min value"
                        value={Number(value).toString()}
                        onBlur={onBlur}
                        onChangeText={(text) => onChange(Number(text))}
                        keyboardType="numeric"
                        errorMessage={error?.message}
                      />
                    )}
                  />
                  <Controller
                    name="maxValue"
                    control={methods.control}
                    key="maxValue"
                    render={({
                      field: { value, onChange, onBlur },
                      fieldState: { error },
                    }) => (
                      <InputField
                        label="Max value"
                        placeholder="Enter max value"
                        value={Number(value).toString()}
                        onBlur={onBlur}
                        onChangeText={(text) => onChange(Number(text))}
                        keyboardType="numeric"
                        errorMessage={error?.message}
                      />
                    )}
                  />
                  <Controller
                    name="minAge"
                    control={methods.control}
                    key="minAge"
                    render={({
                      field: { value, onChange, onBlur },
                      fieldState: { error },
                    }) => (
                      <InputField
                        label="Min age"
                        placeholder="Enter min age"
                        value={Number(value).toString()}
                        onBlur={onBlur}
                        onChangeText={(text) => onChange(Number(text))}
                        keyboardType="numeric"
                        errorMessage={error?.message}
                      />
                    )}
                  />
                  <Controller
                    name="maxAge"
                    control={methods.control}
                    key="maxAge"
                    render={({
                      field: { value, onChange, onBlur },
                      fieldState: { error },
                    }) => (
                      <InputField
                        label="Max age"
                        placeholder="Enter max age"
                        value={Number(value).toString()}
                        onBlur={onBlur}
                        onChangeText={(text) => onChange(Number(text))}
                        keyboardType="numeric"
                        errorMessage={error?.message}
                      />
                    )}
                  />
                </View>
                <Controller
                  name="ageUnit"
                  control={methods.control}
                  key="ageUnit"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <Select
                      options={ageUnits}
                      selectedValue={value}
                      onSelect={onChange}
                      containerStyle="!w-full justify-between !bg-white border border-neutral-300 !shadow-none"
                      placeholder="Select age unit"
                      rightIcon="chevron-down"
                      errorMessage={error?.message}
                      label="Age unit"
                      labelStyle="-mb-4"
                    />
                  )}
                />
              </View>
              <Button
                title="Add"
                onPress={methods.handleSubmit(onSubmit)}
                containerStyle="mb-6"
                titleStyle="text-white"
              />
            </ScrollView>
          </FormProvider>
        </Modal>
      </Portal>
      {/* <Card
        title="Add new guide"
        icon="description"
        containerStyle="bg-gray-100 w-[200px] border border-gray-200 shadow-md"
        onPress={showModal}
      /> */}
      <Button
        title="Add new guide"
        onPress={showModal}
        containerStyle="!w-[200px] bg-gray-100 border border-gray-200 shadow-md gap-4"
        leftIcon="clipboard-outline"
      />
    </>
  );
}
