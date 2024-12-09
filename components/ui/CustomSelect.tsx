import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useEffect, useState } from "react";
import { CustomSelectProps } from "@/types";
import { genders } from "@/constants";

const CustomSelect = ({
  labelStyle,
  value,
  onChange,
  dropdownItems,
  label,
  placeholder,
  containerStyle,
  listItemContainerStyle,
  errorMessage,
  defaultValue,
  disabled = false,
}: CustomSelectProps) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(dropdownItems || []);
  const [selectedValue, setSelectedValue] = useState(defaultValue || value); // Set default value if provided
  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue); // Update selected value when default changes
      onChange(defaultValue); // Ensure form control is updated
    }
  }, [defaultValue, onChange]);

  return (
    <View className="-mt-4">
      <Text
        className={`text-neutral-500 text-lg font-semibold m-2 ${labelStyle}`}
      >
        {label}
      </Text>
      <DropDownPicker
        open={open} // Whether the dropdown is open
        value={selectedValue} // Current selected value
        items={genders || []} // Items list
        setOpen={setOpen} // Function to toggle dropdown
        setValue={(callback) => {
          const selected =
            typeof callback === "function" ? callback(selectedValue) : callback;
          setSelectedValue(selected); // Update local state
          onChange(selected); // Pass the updated value to the form control
        }}
        disabled={disabled}
        setItems={setItems} // Function to update items list
        placeholder={placeholder} // Placeholder text
        style={{
          width: "100%",
          height: 66,
          borderRadius: 10,
          backgroundColor: "#fff",
          borderColor: "#d4d4d4",
          padding: 28,

          ...containerStyle,
        }}
        placeholderStyle={{
          color: "#0a0a0a",
          fontSize: 16,
          fontWeight: "bold",
        }}
        listItemContainerStyle={{
          backgroundColor: "#fff",
          ...listItemContainerStyle,
        }}
        labelStyle={{
          color: "#0a0a0a",
          fontSize: 16,
          fontWeight: "bold",
        }}
      />
      <Text className="text-red-500 text-sm">{errorMessage}</Text>
    </View>
  );
};

export default CustomSelect;
