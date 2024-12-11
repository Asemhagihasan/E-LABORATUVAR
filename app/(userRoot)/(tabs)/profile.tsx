import { FlatList, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Controller,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProfileSchema } from "@/types/schema";
import FileUpload from "@/components/ui/FileUpload";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import CustomSelect from "@/components/ui/CustomSelect";
import { genders } from "@/constants";
import DatePickerField from "@/components/ui/DatePickerField";
import { useUpdateProfile } from "@/hooks/profile/useUpdateProfile";
import { useUser } from "@/hooks/auth/useUser";
import { useGetProfile } from "@/hooks/profile/useGetProfile";
import Loader from "@/components/ui/Loader";

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
    disabled: true,
  },
  {
    name: "newPassword",
    label: "New Password (optional)",
    component: InputField,
    secureTextEntry: true,
    placeholder: "*********",
  },
  {
    name: "nationalId",
    label: "National ID",
    component: InputField,
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
  },
  {
    name: "gender",
    label: "Select your gender",
    component: CustomSelect,
    elementType: "select",
    options: genders,
  },
];

const Profile = () => {
  const { user, isLoadingUser } = useUser();
  const { updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { profile, isPending: isLoadingProfile } = useGetProfile(user?.id!);
  const [selectedImage, setSelectedImage] = useState<{ uri: string } | null>({
    uri: profile?.avatar,
  });

  const methods = useForm({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: profile || {},
  });
  console.log("errors", methods.formState.errors);
  useEffect(() => {
    if (profile) {
      methods.reset(profile); // Dynamically update form values when profile data is fetched
      setSelectedImage({ uri: profile.avatar });
    }
  }, [profile, methods.reset]);

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    // Replace slashes with dashes to create an ISO-like format
    const birthDateString = data.birthDate.replace(/\//g, "-");
    // Convert to Date object
    const formattedData = {
      ...data,
      birthDate: new Date(birthDateString),
      avatar: selectedImage?.uri,
      userId: user?.id,
    };
    // Send `formattedData` to Supabase or use it as needed

    updateProfile(formattedData);
  };

  if (isLoadingUser || isLoadingProfile) {
    return <Loader />;
  }

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
                <FileUpload
                  defaultValue={{
                    uri: selectedImage?.uri || "",
                  }}
                  onFileSelect={setSelectedImage}
                />
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
                title={`${isUpdating ? "Updating..." : "Update"}`}
                disabled={isUpdating}
              />
            </View>
          )}
        />
      </FormProvider>
    </SafeAreaView>
  );
};

export default Profile;
