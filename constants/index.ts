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
    background_color: "#bbf7d0",
    background_color_button: "#16803f",
  },
  {
    itemKey: "2",
    src: require("@/assets/images/card_item_2.png"),
    description: "Find and explore a variety of trusted doctors.",
    operation_name: "Find Doctors",
    pageName: "manage-doctors",
    background_color: "#b9d9fe",
    background_color_button: "#1e4ed8",
  },
  {
    itemKey: "3",
    src: require("@/assets/images/card_item_3.png"),
    description: "Easily access and review patient results in detail.",
    operation_name: "Patient Results",
    pageName: "patients",
    background_color: "#fdcaca",
    background_color_button: "#b91e1e",
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
