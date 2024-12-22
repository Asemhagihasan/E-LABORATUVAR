import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import { router } from "expo-router";

const GoBack = () => {
  return (
    <View>
      <IconButton
        icon="arrow-left"
        size={28}
        onPress={() => {
          // go back
          router.back();
        }}
        accessibilityLabel="Go back"
        className="!p-0 !m-0"
        style={{ marginLeft: -10 }}
      />
    </View>
  );
};

export default GoBack;
