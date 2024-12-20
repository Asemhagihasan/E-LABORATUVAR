import { ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Menu } from "react-native-paper";
import { useGetGuides } from "@/hooks/guides/useGetGuides";
import { StyleSheet } from "react-native";
import { useGetGuideTypes } from "@/hooks/guides/useGetGuidetypes";
import Button from "@/components/ui/Button";
import { useGetGuideAgeRange } from "@/hooks/guides/useGetGuideAgeRange";
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

  const { guides } = useGetGuides(selectedType.value);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="px-6 gap-4">
          <GoBack />
          <Text className="text-2xl text-neutral-900 font-bold text-center -mt-6">
            Guides mangmaent
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
          <GuidesTable guides={guides} selectedAge={selectedAge} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Guides;
