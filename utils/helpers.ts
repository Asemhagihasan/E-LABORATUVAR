export function maskNationalId(nationalId: string) {
  return nationalId.slice(0, 3) + "*****" + nationalId.slice(8, 11);
}

export function calculateAge(birthDate: string) {
  const today = new Date();
  const birthDateObj = new Date(birthDate);

  const ageInDays = Math.floor(
    (today.getTime() - birthDateObj.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (ageInDays <= 30) {
    return {
      label: `${ageInDays} days`,
      value: ageInDays,
      ageUnit: "days",
    };
  }

  const ageInMonths = Math.floor(ageInDays / 30.44); // Approximate average days in a month
  if (ageInMonths < 48) {
    return {
      label: `${ageInMonths} months`,
      value: ageInMonths,
      ageUnit: "months",
    };
  }

  // If age is 4 years or more
  const ageInYears = Math.floor(ageInMonths / 12);
  return {
    label: `${ageInYears} years`,
    value: ageInYears,
    ageUnit: "years",
  };
}

export const convertToGramsPerL = (value: number) => {
  const convertedValue = value * 0.01;
  return convertedValue.toFixed(2); // Round to 2 decimal places
};

export const calculateResultStatus = (
  result: number,
  reference: { minValue: number; maxValue: number }
) => {
  if (result < reference.minValue) return "low";
  if (result > reference.maxValue) return "high";
  return "normal";
};
