import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useGetPatients } from "@/hooks/patients/useGetPatients";
import { DataTable, IconButton } from "react-native-paper";
import Loader from "../ui/Loader";
import { router, usePathname } from "expo-router";
import { maskNationalId } from "@/utils/helpers";

const PatientsTable = ({ searchQuery }: { searchQuery: string }) => {
  const pathName = usePathname();
  const [page, setPage] = useState(0);

  const { patients, isLoading } = useGetPatients();

  const filteredPatients = (patients || []).filter(
    (patient) =>
      patient.nationalId.toString().includes(searchQuery) ||
      patient.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Calculate pagination options dynamically
  const calculateItemsPerPageOptions = () => {
    const totalPatients = filteredPatients.length;
    const options = [5, 10, 15].filter((option) => option <= totalPatients);
    return options.length > 0 ? options : [totalPatients];
  };

  const numberOfItemsPerPageList = calculateItemsPerPageOptions();
  const [itemsPerPage, setItemsPerPage] = useState(
    numberOfItemsPerPageList[0] || 5
  );

  const from = page * itemsPerPage;
  const to = Math.min(
    (page + 1) * itemsPerPage,
    (filteredPatients || []).length
  );

  useEffect(() => {
    setPage(0); // Reset to the first page when items per page changes
  }, [itemsPerPage]);

  if (isLoading) {
    return <Loader />;
  }

  if (filteredPatients?.length === 0 || !filteredPatients) {
    return (
      <Text className="text-center text-neutral-500 text-2xl font-semibold mt-6">
        No patients available.
      </Text>
    );
  }

  return (
    <View className="mt-4">
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Full Name</DataTable.Title>
          <DataTable.Title className="flex justify-center">
            National ID
          </DataTable.Title>
          <DataTable.Title className="flex justify-end">
            Analysis
          </DataTable.Title>
        </DataTable.Header>

        {(filteredPatients || []).slice(from, to).map((patient) => (
          <DataTable.Row key={patient.id}>
            <DataTable.Cell>{patient.fullName}</DataTable.Cell>
            <DataTable.Cell numeric>
              {maskNationalId(patient.nationalId)}
            </DataTable.Cell>
            <DataTable.Cell className="flex justify-end">
              <IconButton
                icon="test-tube"
                size={16}
                style={{
                  borderRadius: 10,
                  backgroundColor: "#1D61E7",
                }}
                iconColor="white"
                onPress={() => {
                  router.push(`./patient-analysis/${patient.id}`);
                }}
              />
            </DataTable.Cell>
          </DataTable.Row>
        ))}
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(filteredPatients.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${filteredPatients?.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
        />
      </DataTable>
    </View>
  );
};

export default PatientsTable;
