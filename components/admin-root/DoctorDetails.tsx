import { getProfilesByRole } from "@/services/auth";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { DataTable } from "react-native-paper";
import ActionSelector from "./ActionSelector";

const DoctorDetails = () => {
  const [doctorsData, setDoctorsData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([6, 8, 10]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, doctorsData.length);

  useEffect(() => {
    async function fetchData() {
      const data = await getProfilesByRole("admin");
      setDoctorsData(data || []);
    }
    fetchData();
  }, []);

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
        <ScrollView horizontal={true}>
          <DataTable className="">
            <DataTable.Header className="flex-row justify-content-start border-solid bg-gray-100 rounded-md">
              <DataTable.Title className="justify-start">
                Doctor Name
              </DataTable.Title>
              <DataTable.Title numeric style={{ justifyContent: "flex-start" }}>
                Doctor Gender
              </DataTable.Title>
              <DataTable.Title numeric style={{ justifyContent: "flex-start" }}>
                Doctor Email
              </DataTable.Title>
              <DataTable.Title numeric style={{ justifyContent: "flex-end" }}>
                Mange
              </DataTable.Title>
            </DataTable.Header>

            {doctorsData.slice(from, to).map((doctor) => (
              <DataTable.Row
                key={doctor.user_id}
                className="flex-row justify-content-start"
              >
                <DataTable.Cell style={{ justifyContent: "flex-start" }}>
                  {doctor.fullName || "Not found!"}
                </DataTable.Cell>
                <DataTable.Cell
                  numeric
                  style={{ justifyContent: "flex-start" }}
                >
                  {doctor.gender || "Un Selected!"}
                </DataTable.Cell>
                <DataTable.Cell
                  numeric
                  style={{ justifyContent: "flex-start" }}
                >
                  {doctor.email || "Not found!"}
                </DataTable.Cell>
                <DataTable.Cell className="flex justify-end">
                  <ActionSelector entity={{ name: "Doctor" }} />
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
