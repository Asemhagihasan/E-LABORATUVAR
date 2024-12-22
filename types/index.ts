import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export interface InputFieldProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  icon?: any;
  secureTextEntry?: boolean;
  containerStyle?: string;
  iconStyle?: StyleProp<TextStyle | ViewStyle>;
  labelStyle?: string;
  inputStyle?: StyleProp<TextStyle>;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  errorMessage?: string;
  disabled?: boolean;
  defaultValue?: string;
}

export interface ButtonProps {
  title: string;
  titleStyle?: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  rightIcon?: string;
  leftIcon?: string;
  rightIconColor?: string;
  leftIconColor?: string;
  containerStyle?: string;
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
  nationalId: string;
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
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  containerStyle?: string;
  onPress?: () => void;
}

export interface GuidesTableProps {
  selectedType: string;
  selectedAge: AgeProps | null;
}

export interface AgeProps {
  value: {
    minAge: number;
    maxAge: number;
    ageUnit: string;
  };
  label: string;
}

export interface Guide {
  type: {
    value: string;
    label: string;
  };
  minValue: number;
  maxValue: number;
  minAge: number;
  maxAge: number;
  ageUnit: {
    value: string;
    label: string;
  };
}
