import { CardProps } from "@/types";

export const genders = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

export const card_items: CardProps[] = [
  {
    itemKey: "1",
    src: require("@/assets/images/card_item_1.png"),
    description: "Create and personalize a guide to suit your needs.",
    operation_name: "Create Guide",
    pageName: "guides",
    background_color: "bg-green",
  },
  {
    itemKey: "2",
    src: require("@/assets/images/card_item_2.png"),
    description: "Find and explore a variety of trusted doctors.",
    operation_name: "Find Doctors",
    pageName: "manage-doctors",
    background_color: "bg-blue",
  },
  {
    itemKey: "3",
    src: require("@/assets/images/card_item_3.png"),
    description: "Easily access and review patient results in detail.",
    operation_name: "Patient Results",
    pageName: "patients",
    background_color: "bg-red",
  },
];

export const ageUnits = [
  {
    label: "Years",
    value: "years",
  },
  {
    label: "Months",
    value: "months",
  },
  {
    label: "Days",
    value: "days",
  },
];
