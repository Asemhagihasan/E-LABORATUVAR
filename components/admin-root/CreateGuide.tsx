import { ScrollView, Text, View } from "react-native";
import React from "react";
import { Modal, Portal, PaperProvider } from "react-native-paper";
import Card from "./Card";
import InputField from "../ui/InputField";
import Button from "../ui/Button";

export default function CreateGuide() {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    width: 360,
    marginHorizontal: "auto",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    height: 500,
    overflow: "scroll",
  };
  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <ScrollView
            contentContainerStyle={{
              padding: 20,
              backgroundColor: "white",
              borderRadius: 10,
              flexGrow: 1,
            }}
          >
            <Text className="text-lg font-semibold text-neutral-700 text-center">
              Add new guide
            </Text>
            <View className="flex flex-col gap-4">
              <InputField label="Type" placeholder="Enter type" />
              <InputField label="Min value" placeholder="Enter min value" />
              <InputField label="Max value" placeholder="Enter max value" />
              <InputField label="Min age" placeholder="Enter min age" />
              <InputField label="Max age" placeholder="Enter max age" />
              <InputField label="Age unit" placeholder="Enter age unit" />
            </View>
            <Button title="Add" />
          </ScrollView>
        </Modal>
      </Portal>
      <Card
        title="Add new guide"
        icon="description"
        containerStyle="bg-gray-100 w-[200px] shadow-md shadow-neutral-400/70"
        onPress={showModal}
      />
    </>
  );
}
