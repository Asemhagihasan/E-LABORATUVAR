import React from "react";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
  ToastProps,
} from "react-native-toast-message";

// Define custom toast config
const toastConfig: ToastConfig = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "green",
        backgroundColor: "#fff",
        marginTop: 25,
        height: 70,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: "bold",
      }}
      text2Style={{
        fontSize: 14,
        color: "gray",
      }}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "red",
        backgroundColor: "#ffe6e6",
        marginTop: 25,
      }}
      contentContainerStyle={{ paddingHorizontal: 15, height: 60 }}
      text1Style={{
        fontSize: 18,
        fontWeight: "bold",
      }}
      text2Style={{
        fontSize: 14,
        color: "gray",
      }}
    />
  ),
  // Add other types if needed
};

export default function ToastContainer() {
  return <Toast config={toastConfig} />;
}
