import React, { useState } from "react";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DatePickerFieldProps } from "@/types";

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

  const handleDateChange = (
    event: DatePickerFieldProps,
    selectedDate?: Date
  ) => {
    setPickerOpen(false); // Close the picker when a date is selected
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split("T")[0]; // Format the date to string (yyyy-mm-dd)
      if (onDateChange) {
        onDateChange(dateString); // Pass the formatted date string back to the parent
      }
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
          <DateTimePicker
            value={new Date(value || new Date())}
            onChange={handleDateChange} // Pass the selected date as a string
            maximumDate={new Date()}
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
