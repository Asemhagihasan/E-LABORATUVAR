import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { Menu, IconButton } from "react-native-paper";
import { useDeleteGuide } from "@/hooks/guides/useDeleteGuide";
import ConfirmDelete from "./ConfirmDelete";
import UpdateGuide from "./UpdateGuide";

const ActionSelector = ({ entity }: { entity: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteGuide } = useDeleteGuide();

  const confirmDelete = () => {
    deleteGuide(entity.id);
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
            accessibilityLabel={`Open ${entity.name} Actions Menu`}
          />
        }
      >
        <Menu.Item
          onPress={() => {
            setIsMenuOpen(false);
            setIsDeleting(true);
          }}
          title={`Delete ${entity.name}`}
          leadingIcon="delete"
          style={styles.menuItems}
        />
      </Menu>
      <ConfirmDelete
        confirmDelete={confirmDelete}
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
      />
    </View>
  );
};

export default ActionSelector;

const styles = StyleSheet.create({
  menuItems: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    paddingBottom: 0,
  },
});
