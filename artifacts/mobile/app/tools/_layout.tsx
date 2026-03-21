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
      <Stack.Screen name="script-writer" />
      <Stack.Screen name="content-planner" />
      <Stack.Screen name="what-to-post" />
      <Stack.Screen name="hook-generator" />
      <Stack.Screen name="brief-builder" />
      <Stack.Screen name="content-audit" />
    </Stack>
  );
}
