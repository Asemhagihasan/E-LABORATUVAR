import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { Menu, IconButton, Portal, Modal } from "react-native-paper";
import Button from "../ui/Button";
import { useDeleteGuide } from "@/hooks/guides/useDeleteGuide";
import ConfirmDelete from "./ConfirmDelete";
import UpdateGuide from "./UpdateGuide";

const GuideActionSelector = ({ guide }: { guide: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { deleteGuide } = useDeleteGuide();

  const confirmDelete = () => {
    deleteGuide(guide.id);
    setIsDeleting(false);
  };

  return (
    <View>
      <Menu
        visible={isMenuOpen}
        onDismiss={() => setIsMenuOpen(false)}
        contentStyle={styles.menuItems}
        anchor={
          <IconButton
            icon="dots-vertical"
            size={24}
            onPress={() => setIsMenuOpen(true)}
            accessibilityLabel="Open guide actions menu"
          />
        }
      >
        <Menu.Item
          onPress={() => {
            setIsMenuOpen(false);
          }}
          title="Update Guide"
          leadingIcon="pencil"
          style={styles.menuItems}
        />
        <Menu.Item
          onPress={() => {
            setIsMenuOpen(false);
            setIsDeleting(true);
          }}
          title="Delete Guide"
          leadingIcon="delete"
          style={styles.menuItems}
        />
      </Menu>
      <ConfirmDelete
        confirmDelete={confirmDelete}
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
      />
      <UpdateGuide
        isUpdating={isUpdating}
        setIsUpdating={setIsUpdating}
        guide={guide}
      />
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
