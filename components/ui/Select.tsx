import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Menu } from "react-native-paper";
import Button from "./Button";

interface SelectProps {
  options: any[];
  onSelect: (value: any) => void;
  selectedValue: any;
  containerStyle?: string;
  rightIcon?: string;
  isLoading?: boolean;
  placeholder?: string;
  titleStyle?: string;
  rightIconColor?: string;
  errorMessage?: string;
  label?: string;
  labelStyle?: string;
}

const Select = ({
  options,
  onSelect,
  selectedValue,
  containerStyle,
  rightIcon,
  isLoading,
  placeholder,
  titleStyle,
  rightIconColor = "#404040",
  errorMessage,
  labelStyle,
  label,
}: SelectProps) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View>
      {label && (
        <Text
          className={`text-lg font-semibold mb-2 text-neutral-500 ${labelStyle}`}
        >
          {label}
        </Text>
      )}
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            title={selectedValue?.label || placeholder}
            onPress={openMenu}
            containerStyle={`${containerStyle}`}
            rightIcon={rightIcon}
            disabled={isLoading}
            titleStyle={titleStyle}
            rightIconColor={rightIconColor}
          />
        }
        contentStyle={styles.menuItems}
      >
        {(options || []).map((option) => (
          <Menu.Item
            key={option.label}
            onPress={() => {
              onSelect(option);
              closeMenu();
            }}
            title={option?.label}
            style={styles.menuItems}
          />
        ))}
      </Menu>
      {errorMessage && (
        <Text className="text-red-500 mt-2">{errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menuItems: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0", // Optional: Add separator
    paddingBottom: 0,
  },
});

export default Select;
