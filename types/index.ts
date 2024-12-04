import { StyleProp, TextStyle, ViewStyle } from "react-native";
import React from "react";

export interface InputFieldProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  icon?: React.ComponentType<any>;
  secureTextEntry?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle | ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  keypoardType?: "default" | "email-address" | "numeric" | "phone-pad";
  disabled?: boolean;
}

export interface ButtonProps {
  title: string;
  titleStyle?: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export interface SignUpProps {
  email: string;
  password: string;
  birthDate: string;
  fullName: string;
}

export interface SignInProps {
  email: string;
  password: string;
}
