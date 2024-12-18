import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { Menu, IconButton, Portal, Modal } from "react-native-paper";
import Button from "./Button";
import { useDeleteGuide } from "@/hooks/guides/useDeleteGuide";

const GuideActionSelector = ({ guide }: { guide: any }) => {
  const [visible, setVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteGuide } = useDeleteGuide();

  const confirmDelete = () => {
    deleteGuide(guide.id);
    console.log(`guide with id ${guide.id} is being deleted`);
    setIsDeleting(false);
  };

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        contentStyle={styles.menuItems}
        anchor={
          <IconButton
            icon="dots-vertical"
            size={24}
            onPress={() => setVisible(true)}
            accessibilityLabel="Open guide actions menu"
          />
        }
      >
        <Menu.Item
          onPress={() => {
            setVisible(false);
            console.log("Update Guide");
          }}
          title="Update Guide"
          leadingIcon="pencil"
          style={styles.menuItems}
        />
        <Menu.Item
          onPress={() => {
            setVisible(false);
            setIsDeleting(true);
          }}
          title="Delete Guide"
          leadingIcon="delete"
          style={styles.menuItems}
        />
      </Menu>
      <Portal>
        <Modal visible={isDeleting} onDismiss={() => setIsDeleting(false)}>
          <View className="flex flex-col gap-2 w-80 mx-auto p-4 bg-white rounded-md">
            <Text className="text-lg font-semibold text-neutral-700 text-center">
              Are you sure you want to delete this guide?
            </Text>
            <View className="flex flex-col gap-4"></View>
            <Button
              title="Confirm"
              onPress={confirmDelete}
              containerStyle="bg-red-500"
            />
            <Button
              title="Cancel"
              onPress={() => setIsDeleting(false)}
              containerStyle="bg-gray-300 !mt-0"
            />
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default GuideActionSelector;
const styles = StyleSheet.create({
  menuItems: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0", // Optional: Add separator
    paddingBottom: 0,
  },
});
