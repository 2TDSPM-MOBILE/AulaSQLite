import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{animation:"slide_from_right"}}>
      <Stack.Screen name="index" />
      <Stack.Screen name="edit/[id]" options={{ title: "Tela de Edição" }} />
    </Stack>
  )
}
