// app/(tabs)/restaurants/_layout.tsx
import { Stack } from "expo-router";

export default function RestaurantsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Restaurantes" }} />
      <Stack.Screen name="[id]" options={{ title: "Detalle" }} />
    </Stack>
  );
}
