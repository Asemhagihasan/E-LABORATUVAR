import { Text, View, ScrollView } from "react-native";
import React from "react";
import { DataTable, IconButton } from "react-native-paper";
import { useGetAnalysisByPatientId } from "@/hooks/analysis/useGetAnalysisByPatientId";
import Loader from "../ui/Loader";
import { useGetPreviousResults } from "@/hooks/analysis/useGetPreviousResults";

// Reusable component for rendering a custom-styled cell
const CustomCell = ({
  label,
  subLabel,
}: {
  label?: any;
  subLabel?: string;
}) => (
  <View className="flex flex-col items-center">
    <Text className="text-gray-600 text-sm">{label || "-"}</Text>
    {subLabel && <Text className="text-gray-500 text-xs">{subLabel}</Text>}
  </View>
);

const AnalysisTable = ({ patientId }: { patientId: string }) => {
  const { analysis, isLoading } = useGetAnalysisByPatientId(patientId);
  const { previousresults, isPreviousResultsLoading } =
    useGetPreviousResults(patientId);

  // Helper function to get previous results for a specific analysis_id
  const getPreviousResultsForAnalysis = (analysisId: number) => {
    return previousresults
      ?.filter((result) => result.analysis_id === analysisId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by most recent date
      .map((res) => {
        return {
          date: res.date,
          result: res.previous_result,
        };
      });
  };

  const getValueComparison = (
    currentResult: number,
    latestPreviousResult: number
  ) => {
    if (!latestPreviousResult) {
      return <IconButton icon="minus" size={20} iconColor="gray" />; // No previous results, neutral icon
    }

    if (currentResult > latestPreviousResult) {
      return <IconButton icon="arrow-up" size={20} iconColor="green" />; // Increase, green arrow up
    } else if (currentResult < latestPreviousResult) {
      return <IconButton icon="arrow-down" size={20} iconColor="red" />; // Decrease, red arrow down
    } else {
      return <IconButton icon="minus" size={20} iconColor="gray" />; // No change, neutral icon
    }
  };
  if (isLoading || isPreviousResultsLoading) return <Loader />;

  if (!analysis || analysis.length === 0)
    return (
      <Text className="text-center font-semibold text-2xl text-neutral-500">
        No analysis found for this patient
      </Text>
    );

  // Get the maximum number of previous results for any analysis
  const maxPreviousResults = Math.max(
    ...analysis.map(
      (item) => getPreviousResultsForAnalysis(item.id)?.length || 0
    )
  );

  return (
    <ScrollView horizontal={true}>
      <DataTable style={{ width: 450 + maxPreviousResults * 100 }}>
        <DataTable.Header>
          <DataTable.Title>Type</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title className="mr-2">Reference(g/l)</DataTable.Title>
          <DataTable.Title>Result</DataTable.Title>
          {Array(maxPreviousResults)
            .fill(null)
            .map((_, index) => (
              <DataTable.Title key={index}>
                Last Result {index + 1}
              </DataTable.Title>
            ))}
          <DataTable.Title>Change status</DataTable.Title>
        </DataTable.Header>
        {(analysis || []).map((item) => {
          const previousResults = getPreviousResultsForAnalysis(item.id); // Get previous results
          const currentResult = item.result;
          let changeStatus;
          if (previousResults)
            changeStatus = getValueComparison(
              currentResult,
              previousResults[0]?.result
            );
          return (
            <DataTable.Row key={item.id}>
              <DataTable.Cell>
                <CustomCell label={item.type} />
              </DataTable.Cell>
              <DataTable.Cell>
                <CustomCell label={item.status} />
              </DataTable.Cell>
              <DataTable.Cell>
                <CustomCell label={item.reference} />
              </DataTable.Cell>
              <DataTable.Cell>
                <CustomCell label={item.result} />
              </DataTable.Cell>
              {Array(maxPreviousResults)
                .fill(null)
                .map((_, index) => (
                  <DataTable.Cell key={index}>
                    <CustomCell
                      label={previousResults?.[index]?.result}
                      subLabel={previousResults?.[index]?.date}
                    />
                  </DataTable.Cell>
                ))}
              <DataTable.Cell className="flex justify-center">
                <CustomCell label={changeStatus} />
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </ScrollView>
  );
};

export default AnalysisTable;
