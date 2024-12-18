import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { CardProps } from "@/types";

const Card: React.FC<CardProps> = ({
  key,
  src,
  pageName,
  description,
  operation_name,
  background_color,
}) => {
  return (
    <View
      key={key}
      style={{ overflow: "hidden" }}
      className={`w-52 border border-gray-200 rounded-lg shadow ${background_color}-200`}
    >
      <View className="rounded-t-lg flex justify-center items-center pt-2">
        <Image
          source={src}
          className="object-contain"
          style={{ width: 100, height: 100 }}
        />
      </View>

      <View className="p-5">
        <Text className="mb-3 font-medium text-base text-gray-700">
          {description}
        </Text>
        <TouchableOpacity
          className={`inline-flex items-center px-3 py-2 text-sm font-semibold text-center ${background_color}-700 rounded-md`}
        >
          <Text className="text-white text-lg">{operation_name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Card;
