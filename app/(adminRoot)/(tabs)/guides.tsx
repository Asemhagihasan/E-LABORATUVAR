import { ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { DataTable, IconButton, Menu } from "react-native-paper";
import { useGetGuides } from "@/hooks/guides/useGetGuides";
import { StyleSheet } from "react-native";
import { useGetGuideTypes } from "@/hooks/guides/useGetGuidetypes";
import Button from "@/components/ui/Button";
import { useGetGuideAgeRange } from "@/hooks/guides/useGetGuideAgeRange";
import CreateGuide from "@/components/admin-root/CreateGuide";

const Guides = () => {
  const [selectedType, setSelectedType] = useState("IgA");
  const [visible, setVisible] = useState(false);
  const [openAgeOptions, setOpenAgeOptions] = useState(false);
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([5, 10, 15]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const { guides } = useGetGuides(selectedType);
  const { guidesType, isLoadingTypes } = useGetGuideTypes();
  const { guideAgeRanges } = useGetGuideAgeRange();

  const [selectedAge, setSelectedAge] = useState<{
    value: { minAge: number; maxAge: number; ageUnit: string };
    label: string;
  } | null>(null);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, (guides || []).length);

  const filteredGuides = (guides || []).filter((guide) => {
    if (!selectedAge) return true; // If no filter is selected, show all guides
    // console.log("guide", guide);
    // console.log("selectedAge", selectedAge);
    const { minAge, maxAge, ageUnit } = selectedAge.value;

    return (
      guide.min_age >= minAge &&
      guide.max_age <= maxAge &&
      guide.age_unit === ageUnit
    );
  });

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="py-4 px-4 gap-4">
          <Text className="text-2xl text-neutral-900 font-bold">
            Guides mangmaent
          </Text>
          <View className="flex-row mt-4 items-center justify-between ">
            <CreateGuide />
            <Menu
              visible={visible}
              onDismiss={() => setVisible(false)}
              contentStyle={styles.menuItems}
              anchor={
                <Button
                  loading={isLoadingTypes}
                  title={selectedType || "Guide Types"}
                  onPress={() => setVisible(true)}
                  rightIcon="chevron-down"
                  containerStyle="mt-0 w-[130px] shadow-md"
                />
              }
            >
              {!isLoadingTypes &&
                (guidesType || []).map((guide) => (
                  <Menu.Item
                    key={guide.type}
                    onPress={() => {
                      console.log(`Selected Guide Type: ${guide.type}`);
                      setSelectedType(guide.type);
                      setVisible(false);
                    }}
                    title={guide.type}
                    style={styles.menuItems}
                  />
                ))}
            </Menu>
          </View>
          <View>
            <Menu
              visible={openAgeOptions}
              onDismiss={() => setOpenAgeOptions(false)}
              contentStyle={styles.menuItems}
              anchor={
                <Button
                  loading={isLoadingTypes}
                  title={selectedAge?.label || "Filter by age range"}
                  onPress={() => setOpenAgeOptions(true)}
                  rightIcon="chevron-down"
                  containerStyle="mt-0 bg-neutral-100 border border-neutral-200 shadow-md"
                  titleStyle="text-neutral-700"
                  rightIconColor="neutral-700"
                />
              }
            >
              {!isLoadingTypes &&
                (guideAgeRanges || []).map((ageRange) => (
                  <Menu.Item
                    key={ageRange.label}
                    onPress={() => {
                      console.log(`Selected Guide Type: ${ageRange.label}`);
                      setSelectedAge(ageRange);
                      setOpenAgeOptions(false);
                    }}
                    title={ageRange.label}
                    style={styles.menuItems}
                  />
                ))}
            </Menu>
          </View>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Age range</DataTable.Title>
              <DataTable.Title numeric>Min Value</DataTable.Title>
              <DataTable.Title numeric>Max Value</DataTable.Title>
              <DataTable.Title className="flex justify-end">
                type
              </DataTable.Title>
            </DataTable.Header>

            {(filteredGuides?.slice(from, to) || []).map((guide) => {
              const {
                type,
                min_value: minValue,
                max_value: maxValue,
                min_age: minAge,
                max_age: maxAge,
                age_unit: unit,
              } = guide;
              return (
                <DataTable.Row key={guide.id} className="flex-row gap-2">
                  <DataTable.Cell>{`${minAge} - ${maxAge} ${unit[0]}`}</DataTable.Cell>
                  <DataTable.Cell numeric>{minValue}</DataTable.Cell>
                  <DataTable.Cell numeric>{maxValue}</DataTable.Cell>
                  <DataTable.Cell className="flex justify-end">
                    {type}
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil((guides || []).length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to} of ${guides?.length}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={"Rows per page"}
            />
          </DataTable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Guides;

const styles = StyleSheet.create({
  menuItems: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0", // Optional: Add separator
  },
});
