import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";

interface FileUploadProps {
  label?: string;
  onFileSelect: (file: { uri: string; type: string; name: string }) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label = "Upload Photo",
  onFileSelect,
}) => {
  const [file, setFile] = useState<{ uri: string } | null>(null);

  const handleUpload = async () => {
    // Ask for permission to access media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow access to your media library."
      );
      return;
    }

    // Launch image picker
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      const { uri } = pickerResult.assets[0];
      const fileData = {
        uri,
        type: "image/jpeg", // Adjust based on your file type
        name: uri.split("/").pop() || "photo.jpg",
      };
      setFile({ uri });
      onFileSelect(fileData);
    }
  };

  return (
    <View className="items-center my-5">
      <View className="w-[150px] aspect-square rounded-full border border-[#ccc] items-center justify-center bg-neutral-100">
        {file ? (
          <Image
            source={{ uri: file.uri }}
            className="w-full h-full rounded-full"
          />
        ) : (
          <>
            <Text className="text-stone-500 text-lg text-center">{label}</Text>
            <Text className="text-base mt-2 text-[#aaa]">JPG/PNG</Text>
          </>
        )}
        <TouchableOpacity
          onPress={handleUpload}
          className="absolute -bottom-2 -right-2 w-12 h-12"
        >
          <Feather name="edit" size={20} color="#1D61E7" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FileUpload;
