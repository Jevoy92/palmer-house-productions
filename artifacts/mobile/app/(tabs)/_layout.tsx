import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import Colors from "@/constants/colors";
import { useCart } from "@/contexts/CartContext";
import { useActivePal } from "@/contexts/ActivePalContext";

export default function TabLayout() {
  const { items } = useCart();
  const { accentColor } = useActivePal();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: accentColor,
        tabBarInactiveTintColor: Colors.light.tabIconDefault,
        headerShown: true,
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: 1,
          borderTopColor: Colors.light.separator,
          backgroundColor: Platform.OS === "ios" ? "transparent" : "rgba(255,255,255,0.97)",
          height: 84,
          paddingTop: 6,
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
          ) : (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(255,255,255,0.97)" }]} />
          ),
        tabBarLabelStyle: {
          fontFamily: "Inter_500Medium",
          fontSize: 10,
          letterSpacing: 0.2,
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginBottom: -2,
        },
        headerStyle: {
          backgroundColor: Colors.light.background,
          shadowColor: "transparent",
          elevation: 0,
        },
        headerTitleStyle: {
          fontFamily: "Inter_600SemiBold",
          fontSize: 17,
          color: Colors.light.text,
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pals"
        options={{
          title: "Explore",
          headerTitle: "Explore",
          tabBarIcon: ({ color }) => (
            <Feather name="compass" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: "Tools",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="zap" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="build"
        options={{
          title: "Package",
          headerTitle: "Your Package",
          tabBarBadge: items.length > 0 ? items.length : undefined,
          tabBarBadgeStyle: {
            backgroundColor: accentColor,
            fontSize: 10,
            fontFamily: "Inter_600SemiBold",
            minWidth: 18,
            height: 18,
            lineHeight: 18,
          },
          tabBarIcon: ({ color }) => (
            <Feather name="layers" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "More",
          headerTitle: "Palmer House",
          tabBarIcon: ({ color }) => (
            <Feather name="menu" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
