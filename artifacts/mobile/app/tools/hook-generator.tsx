import { Feather } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/colors";

export default function HookGeneratorScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top + 56, paddingBottom: 100, paddingHorizontal: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerIcon}>
        <Feather name="message-circle" size={24} color={Colors.pal.evergreen} />
      </View>
      <Text style={styles.title}>Hook Generator</Text>
      <Text style={styles.subtitle}>
        Create attention-grabbing hooks that stop the scroll and keep viewers watching.
      </Text>

      <View style={styles.comingSoon}>
        <View style={styles.comingSoonIcon}>
          <Feather name="zap" size={28} color={Colors.light.primary} />
        </View>
        <Text style={styles.comingSoonTitle}>Coming Soon</Text>
        <Text style={styles.comingSoonText}>
          Input your topic and get multiple hook options — questions, bold statements, pattern interrupts — optimized for engagement.
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
    backgroundColor: Colors.pal.evergreenLight,
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
    backgroundColor: Colors.pal.evergreenLight,
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
