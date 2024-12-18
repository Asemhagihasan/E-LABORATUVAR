import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Menu } from "react-native-paper";
import { useGetGuideAgeRange } from "@/hooks/guides/useGetGuideAgeRange";
import Button from "../ui/Button";
import { AgeProps } from "@/types";
import Select from "../ui/Select";

const AgeRangeFilter = ({
  selectedAge,
  setSelectedAge,
}: {
  selectedAge: AgeProps | null;
  setSelectedAge: (age: AgeProps | null) => void;
}) => {
  const { guideAgeRanges } = useGetGuideAgeRange();

  return (
    <Select
      options={guideAgeRanges as AgeProps[]}
      onSelect={setSelectedAge}
      selectedValue={selectedAge}
      isLoading={false}
      containerStyle="!mt-0 bg-neutral-100 border border-neutral-200 shadow-md"
      placeholder="Filter by age range"
      titleStyle="!text-neutral-700"
      rightIconColor="neutral-700"
      rightIcon="chevron-down"
    />
  );
};

export default AgeRangeFilter;
