import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AIToolScreen from "@/components/AIToolScreen";
import { getToolById } from "@/constants/tools";
import Colors from "@/constants/colors";

export default function DynamicToolScreen() {
  const { toolId } = useLocalSearchParams<{ toolId: string }>();
  const insets = useSafeAreaInsets();
  const tool = getToolById(toolId);

  if (!tool) {
    return (
      <View style={[styles.notFound, { paddingTop: insets.top + 80 }]}>
        <Text style={styles.notFoundTitle}>Tool not found</Text>
        <Text style={styles.notFoundText}>The tool "{toolId}" could not be found.</Text>
      </View>
    );
  }

  return <AIToolScreen tool={tool} />;
}

const styles = StyleSheet.create({
  notFound: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  notFoundTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: Colors.light.text,
    marginBottom: 8,
  },
  notFoundText: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.textSecondary,
    textAlign: "center",
  },
});
