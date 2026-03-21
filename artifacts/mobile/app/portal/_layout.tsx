import { Stack } from "expo-router";
import React from "react";
import Colors from "@/constants/colors";

export default function PortalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "Client Portal",
        headerTintColor: Colors.light.primary,
        headerStyle: { backgroundColor: "#fff" },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
