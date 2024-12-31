import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { CardProps } from "@/types";
import { router } from "expo-router";

const Card: React.FC<CardProps> = ({
  src,
  pageName,
  description,
  operation_name,
  background_color,
  background_color_button,
}) => {
  return (
    <View
      style={{
        overflow: "hidden",
        backgroundColor: background_color,
      }}
      className={`w-48 sm:w-52 border border-gray-200 rounded-lg shadow`}
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
          className={`inline-flex items-center px-3 py-2 text-sm font-semibold text-center rounded-md`}
          style={{ backgroundColor: background_color_button }}
          onPress={() => {
            router.push(`./${pageName}/`);
          }}
        >
          <Text className="text-white text-lg">{operation_name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Card;
