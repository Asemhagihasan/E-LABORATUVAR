import { useState } from "react";
import Button from "../ui/Button";
import { Modal, Portal } from "react-native-paper";
import { Text, View } from "react-native";
import GuideTypes from "./GuideTypes";
import InputField from "../ui/InputField";
import { useAddAnalysis } from "@/hooks/analysis/useAddAnalysis";
import { calculateAge } from "@/utils/helpers";

const CreateAnalysis = ({
  patient,
  setRefetch,
}: {
  patient: any;
  setRefetch: (value: boolean) => void;
}) => {
  const [visible, setVisible] = useState(false);
  const [selectedType, setSelectedType] = useState({
    label: "",
    value: "",
  });
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const { addAnalysis, isPending } = useAddAnalysis();

  const handleReset = () => {
    setVisible(false);
    setSelectedType({ label: "", value: "" });
    setResult("");
    setError("");
  };

  const handleAddAnalysis = () => {
    console.log(typeof +result);
    if (!selectedType.value || !result) {
      setError("Please fill in all fields");
      return;
    }
    addAnalysis(
      {
        patientId: patient.id,
        type: selectedType.value,
        result: Number(result),
        age: calculateAge(patient.birthDate),
      },
      {
        onSettled: handleReset,
        onSuccess: () => setRefetch(true),
      }
    );
  };

  return (
    <>
      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)}>
          <View className="p-6 bg-white rounded-md w-[340px] mx-auto">
            <Text className="text-lg font-semibold text-neutral-700 text-center mb-4">
              Add new analysis
            </Text>
            <View className="flex flex-col gap-4">
              <GuideTypes
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                containerStyle="!w-full flex items-center justify-between bg-gray-100 border border-gray-200 shadow-md"
              />
              <InputField
                keyboardType="numeric"
                label="Result"
                placeholder="result"
                value={result}
                onChangeText={setResult}
              />
              {error && (
                <Text className="text-red-500 text-base">{error || ""}</Text>
              )}
              <Button
                title="ADD ANALYSIS"
                onPress={handleAddAnalysis}
                containerStyle="!w-full border border-gray-200 shadow-md !mt-0"
                titleStyle="text-white"
                disabled={isPending}
              />
            </View>
          </View>
        </Modal>
      </Portal>
      <Button
        title="ADD ANALYSIS"
        onPress={() => {
          setVisible(true);
        }}
        containerStyle="!w-[200] border border-gray-200 shadow-md gap-4"
        leftIcon="plus-circle"
        titleStyle="text-white"
        leftIconColor="white"
      />
    </>
  );
};

export default CreateAnalysis;
