import { getProfilesByRole } from "@/services/auth";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { DataTable } from "react-native-paper";
import ActionSelector from "./ActionSelector";

const DoctorDetails = ({ newDoctorRecord }: { newDoctorRecord: any }) => {
  const [doctorsData, setDoctorsData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);

  // Calculate pagination options dynamically
  const calculateItemsPerPageOptions = () => {
    const totalPatients = doctorsData.length;
    const options = [5, 10, 15].filter((option) => option <= totalPatients);
    return options.length > 0 ? options : [totalPatients];
  };

  const numberOfItemsPerPageList = calculateItemsPerPageOptions();
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0] || 5
  );

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, doctorsData.length);

  useEffect(() => {
    async function fetchData() {
      const profiles = await getProfilesByRole("admin");
      setDoctorsData(profiles || []);
    }

    fetchData();
  }, [newDoctorRecord]);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View className="flex-1">
      {doctorsData.length === 0 ? (
        <View
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
          role="alert"
        >
          <Text className="font-bold">No Doctors Found!</Text>
          <Text>
            There are currently no doctors available. Please add a doctor to
            view their details.
          </Text>
        </View>
      ) : (
        <ScrollView horizontal={true} className="flex-grow">
          <DataTable>
            <DataTable.Header className="bg-gray-100 border-b border-gray-300">
              <DataTable.Title className="w-32 justify-start">
                Doctor Name
              </DataTable.Title>
              <DataTable.Title className="w-32 justify-start">
                Doctor Gender
              </DataTable.Title>
              <DataTable.Title className="w-48 justify-start">
                Doctor Email
              </DataTable.Title>
              <DataTable.Title className="w-24 justify-start">
                Manage
              </DataTable.Title>
            </DataTable.Header>

            {doctorsData.slice(from, to).map((doctor) => (
              <DataTable.Row
                key={doctor.user_id}
                className="border-b border-gray-200"
              >
                <DataTable.Cell className="w-32 justify-start">
                  {doctor.fullName || "Not found!"}
                </DataTable.Cell>
                <DataTable.Cell className="w-32 justify-start">
                  {doctor.gender || "Un Selected!"}
                </DataTable.Cell>
                <DataTable.Cell className="w-48 justify-start">
                  {doctor.email || "Not found!"}
                </DataTable.Cell>
                <DataTable.Cell className="w-24 flex justify-start">
                  <ActionSelector entity={{ name: "Doctor", ...doctor }} />
                </DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(doctorsData.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to} of ${doctorsData.length}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={"Rows per page"}
            />
          </DataTable>
        </ScrollView>
      )}
    </View>
  );
};

export default DoctorDetails;
