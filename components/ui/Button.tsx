import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ButtonProps } from "@/types";
import { Icon } from "react-native-paper";

const Button = ({
  title,
  disabled = false,
  titleStyle,
  onPress,
  containerStyle,
  rightIcon,
  leftIcon,
  rightIconColor = "white",
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.6}
      className={`w-full mt-6 p-5 rounded-md flex flex-row justify-center items-center bg-[##1D61E7] shadow-md shadow-neutral-400/70 disabled:opacity-75 gap-2 ${containerStyle}`}
      {...props}
    >
      {leftIcon && <Icon source={leftIcon} size={24} color={rightIconColor} />}
      <Text className={`text-lg font-bold text-white ${titleStyle}`}>
        {title}
      </Text>
      {rightIcon && (
        <Icon source={rightIcon} size={24} color={rightIconColor} />
      )}
    </TouchableOpacity>
  );
};

export default Button;
