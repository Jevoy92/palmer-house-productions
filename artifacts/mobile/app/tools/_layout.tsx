import { Stack } from "expo-router";
import React from "react";
import Colors from "@/constants/colors";

export default function ToolsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: "",
        headerTintColor: Colors.light.primary,
      }}
    >
      <Stack.Screen name="[toolId]" />
    </Stack>
  );
}
