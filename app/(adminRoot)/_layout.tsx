import { Stack } from "expo-router";
import "react-native-reanimated";

export default function AdminLayout() {
  return (
    <Stack initialRouteName="(home)">
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
    </Stack>
  );
}
