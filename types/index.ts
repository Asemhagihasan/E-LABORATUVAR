import {
  ImageSourcePropType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
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
  value?: string;
  onDateChange?: (date: string) => void;
  placeholder?: string;
  disabled?: boolean;
  containerStyle?: string;
  inputStyle?: string;
  labelStyle?: string;
}

export interface CardProps {
  itemKey?: string;
  pageName?: string;
  description: string;
  operation_name: string;
  background_color: string;
  src: ImageSourcePropType;
  background_color_button: string;
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
  minValue: string;
  maxValue: string;
  minAge: string;
  maxAge: string;
  ageUnit: {
    value: string;
    label: string;
  };
}
