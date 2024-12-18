import { useGetGuideTypes } from "@/hooks/guides/useGetGuidetypes";
import Select from "../ui/Select";

const GuideTypes = ({
  selectedType,
  setSelectedType,
  containerStyle,
  titleStyle,
  rightIconColor,
  errorMessage,
  label,
}: {
  selectedType: any;
  setSelectedType: (type: any) => void;
  containerStyle?: string;
  titleStyle?: string;
  rightIconColor?: string;
  errorMessage?: string;
  label?: string;
}) => {
  const { guidesType, isLoadingTypes } = useGetGuideTypes();

  return (
    <Select
      isLoading={isLoadingTypes}
      options={guidesType || []}
      onSelect={setSelectedType}
      selectedValue={selectedType}
      placeholder="Guide Type"
      containerStyle={`!mt-0 !w-[130px] shadow-md bg-blue-600 ${containerStyle}`}
      rightIcon="chevron-down"
      rightIconColor={rightIconColor}
      titleStyle={titleStyle}
      errorMessage={errorMessage}
      label={label}
    />
  );
};

export default GuideTypes;
