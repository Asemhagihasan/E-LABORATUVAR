import { DataTable, IconButton } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { GuidesTableProps } from "@/types";
import { Text, View } from "react-native";
import GuideActionSelector from "../ui/GuideActionSelector";

const GuidesTable = ({ guides, selectedAge }: GuidesTableProps) => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([5, 10, 15]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const filteredGuides = (guides || []).filter((guide) => {
    if (!selectedAge) return true; // If no filter is selected, show all guides
    const { minAge, maxAge, ageUnit } = selectedAge.value;

    return (
      guide.min_age >= minAge &&
      guide.max_age <= maxAge &&
      guide.age_unit === ageUnit
    );
  });
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, (filteredGuides || []).length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Age range</DataTable.Title>
        <DataTable.Title numeric>Min Value</DataTable.Title>
        <DataTable.Title numeric className="ml-2">
          Max Value
        </DataTable.Title>
        <DataTable.Title className="flex justify-end">type</DataTable.Title>
        <DataTable.Title>{""}</DataTable.Title>
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
            <DataTable.Cell className="flex justify-end">{type}</DataTable.Cell>
            <DataTable.Cell className="flex justify-end">
              <GuideActionSelector guide={guide} />
            </DataTable.Cell>
          </DataTable.Row>
        );
      })}
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil((filteredGuides || []).length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${guides?.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={"Rows per page"}
      />
    </DataTable>
  );
};

export default GuidesTable;
