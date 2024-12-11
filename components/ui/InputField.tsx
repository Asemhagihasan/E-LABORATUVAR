import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { InputFieldProps } from "@/types";

const InputField = ({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  labelStyle,
  disabled = false,
  keypoardType = "default",
  defaultValue,
  errorMessage,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="w-full">
          {label && (
            <Text
              className={`text-lg font-semibold mb-3 text-neutral-500 ${labelStyle}`}
            >
              {label}
            </Text>
          )}
          <View
            className={`flex flex-row justify-between items-center gap-4 rounded-xl border w-full border-neutral-300 p-2.5 shadow-black ${
              disabled ? "bg-neutral-100" : "bg-white"
            } ${containerStyle}`}
          >
            <TextInput
              value={value}
              onChangeText={onChangeText}
              onBlur={onBlur}
              className={`font-semibold text-lg text-left text-neutral-950 w-[90%] relative disabled:bg-neutral-500 ${inputStyle}`}
              editable={!disabled}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              keyboardType={keypoardType}
              defaultValue={defaultValue}
              {...props}
            />
            <Text className="absolute right-4"> {icon && icon}</Text>
          </View>
          {errorMessage && (
            <Text className="text-base text-red-500 mt-2">{errorMessage}</Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
