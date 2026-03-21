import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import React from "react";
import Colors from "@/constants/colors";
import { useCart } from "@/contexts/CartContext";

export default function TabLayout() {
  const { items } = useCart();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: Colors.light.tabIconDefault,
        headerShown: true,
        tabBarStyle: {
          backgroundColor: Colors.light.background,
          borderTopColor: Colors.light.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 4,
          height: 60,
        },
        tabBarLabelStyle: {
          fontFamily: "Inter_500Medium",
          fontSize: 11,
        },
        headerStyle: {
          backgroundColor: Colors.light.background,
        },
        headerTitleStyle: {
          fontFamily: "Inter_700Bold",
          color: Colors.light.text,
          fontSize: 18,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pals"
        options={{
          title: "Pals",
          headerTitle: "Video Pals",
          tabBarIcon: ({ color, size }) => (
            <Feather name="grid" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="build"
        options={{
          title: "Build",
          headerTitle: "Your Package",
          tabBarBadge: items.length > 0 ? items.length : undefined,
          tabBarBadgeStyle: {
            backgroundColor: Colors.light.primary,
            fontSize: 10,
            fontFamily: "Inter_600SemiBold",
          },
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-bag" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          headerTitle: "About Us",
          tabBarIcon: ({ color, size }) => (
            <Feather name="info" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
