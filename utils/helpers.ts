export function maskNationalId(nationalId: string) {
  return nationalId.slice(0, 3) + "*****" + nationalId.slice(8, 11);
}

export function calculateAge(birthDate: string) {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  const age = today.getFullYear() - birthDateObj.getFullYear();
  return age;
}

export const convertToGramsPerL = (value: number) => {
  const convertedValue = value * 0.01;
  return convertedValue.toFixed(2); // Round to 2 decimal places
};
