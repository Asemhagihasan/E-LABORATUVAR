import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import DatePicker from "react-native-modern-datepicker";
import Feather from "@expo/vector-icons/Feather";
interface DatePickerFieldProps {
  label?: string;
  placeholder?: string;
  value?: string; // Updated to string for compatibility with DatePicker
  onDateChange?: (date: string) => void;
  containerStyle?: string;
  inputStyle?: string;
  labelStyle?: string;
  disabled?: boolean;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  placeholder = "Select a date",
  value,
  onDateChange,
  containerStyle,
  inputStyle,
  labelStyle,
  disabled = false,
}) => {
  const [isPickerOpen, setPickerOpen] = useState(false);

  const handleDateChange = (date: string) => {
    setPickerOpen(false); // Close the picker
    if (onDateChange) {
      onDateChange(date); // Pass the selected date back to the parent
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => setPickerOpen(false)}>
      <View className="w-full">
        {label && (
          <Text
            className={`text-lg font-semibold mb-3 text-neutral-500 ${labelStyle}`}
          >
            {label}
          </Text>
        )}
        <TouchableOpacity
          onPress={() => !disabled && setPickerOpen((prev) => !prev)}
          className={`flex flex-row justify-between items-center rounded-xl px-2.5 py-[19px] border border-neutral-300 shadow-black ${containerStyle}`}
        >
          <Text
            className={`font-semibold text-base text-left ${
              !value ? "text-neutral-400" : "text-neutral-950"
            } ${value ? "" : "text-neutral-400"} ${inputStyle}`}
          >
            {value || placeholder}
          </Text>
          <Feather name="calendar" color="#737373" size={24} />
        </TouchableOpacity>

        {isPickerOpen && (
          <DatePicker
            mode="calendar"
            selected={value || new Date().toISOString().split("T")[0]} // Default to today's date
            onDateChange={handleDateChange} // Pass the selected date as a string
            options={{
              backgroundColor: "#f9fafb",
              textHeaderColor: "#2563eb",
              textDefaultColor: "#374151",
              selectedTextColor: "#ffffff",
              mainColor: "#2563eb",
              textSecondaryColor: "#9ca3af",
              borderColor: "rgba(37, 99, 235, 0.1)",
            }}
            style={{ borderRadius: 12, marginTop: 16 }}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DatePickerField;
