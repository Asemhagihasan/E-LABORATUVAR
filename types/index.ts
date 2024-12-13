import { StyleProp, TextStyle, ViewStyle } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

export interface InputFieldProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  icon?: React.ComponentType<any>;
  secureTextEntry?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle | ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  keypoardType?: "default" | "email-address" | "numeric" | "phone-pad";
  errorMessage?: string;
  disabled?: boolean;
}

export interface ButtonProps {
  title: string;
  titleStyle?: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export declare interface CustomSelectProps {
  label: string;
  value: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange: (...event: any[]) => void;
  dropdownItems: DropDownItemsProps[];
  labelStyle?: string;
  valueStyle?: string;
  placeholder?: string;
  containerStyle?: {
    [key: string]: string;
  };
  listItemContainerStyle?: {
    [key: string]: string;
  };
  errorMessage?: string;
}

export declare interface DropDownItemsProps {
  label: string;
  value: string;
}

export interface SignUpProps {
  email: string;
  password: string;
  birthDate?: string;
  fullName: string;
  tc: string;
  role?: string;
}

export interface UpdatePatientProps extends Omit<SignUpProps, "role"> {
  fullName: string;
  tc: string;
  birthDate?: string;
  address?: string;
  phone?: string;
  gender?: string;
}

export interface SignInProps {
  email: string;
  password: string;
}

export interface TabsProps {
  icon: any;
  name: string;
  color: string;
}

export interface DatePickerFieldProps {
  label?: string;
  placeholder?: string;
  value?: string; // Updated to string for compatibility with DatePicker
  onDateChange?: (date: string) => void;
  containerStyle?: string;
  inputStyle?: string;
  labelStyle?: string;
  disabled?: boolean;
}

export interface CardProps {
  src: string;
  description: string;
  operation_name: string;
  pageName?: string;
}
