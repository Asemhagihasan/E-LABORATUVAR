import { getAnalysisTypes, getPreviousResultsForUser } from "@/services/auth";
import { LinkProps } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { DataTable, Icon, IconButton } from "react-native-paper";

export default function DetailsComponent({
  userID,
  profile,
}: {
  userID: string;
  profile: any;
}) {
  const [previousResults, setPreviousResults] = useState<any[]>([]);
  const [analysisTypes, setAnalysisTypes] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([7, 8, 9]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, previousResults.length);

  useEffect(() => {
    async function fetchData() {
      const data = await getPreviousResultsForUser(userID);
      setPreviousResults(data || []);
    }
    fetchData();
  }, [userID]);

  useEffect(() => {
    async function fetchAnalysisData() {
      const data = await getAnalysisTypes();

      setAnalysisTypes(data || []);
    }

    fetchAnalysisData();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const getAnalysisTypesById = (id: string) => {
    return analysisTypes.find((analysis) => analysis.id === id).type || "0";
  };

  return (
    <View className="flex-1 align-top">
      {!profile?.birthDate ? (
        <Alert
          text1="Update your profile"
          text2="Please update your profile to see your previous results"
          icon="alert-circle-outline"
        />
      ) : previousResults.length === 0 ? (
        <Alert
          text1="No Previous Results"
          text2="You don't have any previous results"
        />
      ) : (
        <DataTable>
          <DataTable.Header className="flex-row justify-content-start border-solid bg-gray-100 rounded-md">
            <DataTable.Title className="justify-start">
              Analytics Type
            </DataTable.Title>
            <DataTable.Title numeric style={{ justifyContent: "flex-start" }}>
              Previous Result
            </DataTable.Title>
            <DataTable.Title numeric style={{ justifyContent: "flex-start" }}>
              Result Date
            </DataTable.Title>
          </DataTable.Header>

          {previousResults.slice(from, to).map((item) => (
            <DataTable.Row
              key={item.id}
              className="flex-row justify-content-start"
            >
              <DataTable.Cell style={{ justifyContent: "flex-start" }}>
                {getAnalysisTypesById(item.analysis_id)}
              </DataTable.Cell>
              <DataTable.Cell numeric style={{ justifyContent: "flex-start" }}>
                {item.previous_result}
              </DataTable.Cell>
              <DataTable.Cell numeric style={{ justifyContent: "flex-start" }}>
                {item.date}
              </DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(previousResults.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${previousResults.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={"Rows per page"}
          />
        </DataTable>
      )}
    </View>
  );
}

export function Alert({
  text1,
  text2,
  icon,
}: {
  text1: string;
  text2: string;
  icon?: string;
}) {
  return (
    <View
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex-row items-center gap-4"
      role="alert"
    >
      {icon && <Icon color="red" source={icon} size={24} />}
      <View>
        <Text className="font-bold mb-1">{text1}</Text>
        <Text>{text2}</Text>
      </View>
    </View>
  );
}
