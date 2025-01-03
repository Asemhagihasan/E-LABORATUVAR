import { ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CreateGuide from "@/components/admin-root/CreateGuide";
import { AgeProps } from "@/types";
import GuidesTable from "@/components/admin-root/GuidesTable";
import AgeRangeFilter from "@/components/admin-root/AgeRangeFilter";
import GuideTypes from "@/components/admin-root/GuideTypes";
import GoBack from "@/components/ui/GoBack";

const Guides = () => {
  const [selectedType, setSelectedType] = useState({
    label: "IgA",
    value: "IgA",
  });
  const [selectedAge, setSelectedAge] = useState<AgeProps | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="px-6 gap-4">
          <GoBack />
          <Text className="text-2xl text-neutral-900 font-bold text-center -mt-6">
            Guides Management
          </Text>
          <View className="flex-row items-end justify-between">
            <CreateGuide />
            <GuideTypes
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              rightIconColor="white"
              titleStyle="text-white"
            />
          </View>
          <AgeRangeFilter
            selectedAge={selectedAge}
            setSelectedAge={setSelectedAge}
          />
          <GuidesTable
            selectedType={selectedType.value}
            selectedAge={selectedAge}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Guides;
