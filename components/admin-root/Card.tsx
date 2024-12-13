import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { CardProps } from "@/types";

const Card: React.FC<CardProps> = ({
  src,
  description,
  operation_name,
  pageName,
}) => {
  return (
    <View
      className={`w-60 border border-gray-200 rounded-lg shadow`}
      style={{ overflow: "hidden" }}
    >
      <Image
        source={{ uri: src }}
        style={{ width: "100%", height: 100 }}
        className="rounded-t-lg"
      />

      <View className="p-5">
        <Text className="mb-3 font-normal text-gray-700">{description}</Text>
        <TouchableOpacity className="inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          <Text className="text-white text-lg">{operation_name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Card;
