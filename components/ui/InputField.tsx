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
  placeholder,
  icon: Icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  labelStyle,
  disabled = false,
  keypoardType = "default",
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
            className={`flex flex-row justify-start items-center gap-4 rounded-xl border border-neutral-300 p-2.5 shadow-black ${containerStyle}`}
          >
            {Icon && <Icon />}
            <TextInput
              value={value}
              onChangeText={onChangeText}
              className={`font-semibold text-lg text-left text-neutral-950 w-full grow ${inputStyle}`}
              editable={!disabled}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
