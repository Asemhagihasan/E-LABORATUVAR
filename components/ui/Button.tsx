import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ButtonProps } from "@/types";

const Button = ({
  title,
  disabled = false,
  titleStyle,
  onPress,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.6}
      className="w-full mt-6 p-5 rounded-md flex flex-row justify-center items-center bg-[##1D61E7] shadow-md shadow-neutral-400/70 disabled:opacity-75"
    >
      <Text className={`text-lg font-bold text-white ${titleStyle}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
