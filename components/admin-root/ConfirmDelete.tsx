import { Text, View } from "react-native";
import React, { useState } from "react";
import { Modal, Portal } from "react-native-paper";
import Button from "../ui/Button";

const ConfirmDelete = ({
  confirmDelete,
  isDeleting,
  setIsDeleting,
}: {
  confirmDelete: () => void;
  isDeleting: boolean;
  setIsDeleting: (isDeleting: boolean) => void;
}) => {
  return (
    <Portal>
      <Modal visible={isDeleting} onDismiss={() => setIsDeleting(false)}>
        <View className="flex flex-col gap-2 w-80 mx-auto p-6 bg-white rounded-md">
          <Text className="text-lg font-semibold text-neutral-700 text-center">
            Are you sure you want to delete this guide?
          </Text>
          <View className="flex flex-row justify-between gap-2 items-center">
            <Button
              title="Confirm"
              onPress={confirmDelete}
              containerStyle="bg-red-500 !w-1/2"
              titleStyle="text-white"
            />
            <Button
              title="Cancel"
              onPress={() => setIsDeleting(false)}
              containerStyle="bg-gray-300 !w-1/2"
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default ConfirmDelete;
