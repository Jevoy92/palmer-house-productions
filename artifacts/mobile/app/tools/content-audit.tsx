import { Feather } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/colors";

export default function ContentAuditScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top + 56, paddingBottom: 100, paddingHorizontal: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.headerIcon, { backgroundColor: "#FDF2F8" }]}>
        <Feather name="bar-chart-2" size={24} color="#EC4899" />
      </View>
      <Text style={styles.title}>Content Audit</Text>
      <Text style={styles.subtitle}>
        Analyze your existing video content, identify gaps, and get a strategic plan for improvement.
      </Text>

      <View style={[styles.comingSoon, { backgroundColor: "#FDF2F8" }]}>
        <View style={styles.comingSoonIcon}>
          <Feather name="zap" size={28} color={Colors.light.primary} />
        </View>
        <Text style={styles.comingSoonTitle}>Coming Soon</Text>
        <Text style={styles.comingSoonText}>
          Share your social profiles or website and we'll analyze your content mix, frequency, performance patterns, and recommend what to change.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    color: Colors.light.text,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    color: Colors.light.textSecondary,
    lineHeight: 24,
    marginBottom: 32,
  },
  comingSoon: {
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
  },
  comingSoonIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  comingSoonTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: Colors.light.text,
    marginBottom: 8,
  },
  comingSoonText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
});
