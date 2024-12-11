import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CardProps } from "@/types";

const Card: React.FC<CardProps> = ({ icon, title, containerColor }) => {
  return (
    <TouchableOpacity
      //   onPress={onPress}
      className={`w-11/12 p-4 my-2 rounded-lg shadow-md flex-row items-center ${containerColor}`}
    >
      <MaterialIcons name={icon} size={32} color="#4A90E2" className="mr-4" />
      <Text className="text-lg font-semibold text-gray-700">{title}</Text>
    </TouchableOpacity>
  );
};

export default Card;
