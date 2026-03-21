import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/colors";

export default function ScriptWriterScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top + 56, paddingBottom: 100, paddingHorizontal: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerIcon}>
        <Feather name="edit-3" size={24} color={Colors.pal.reel} />
      </View>
      <Text style={styles.title}>Script Writer</Text>
      <Text style={styles.subtitle}>
        Generate video scripts tailored to your brand, audience, and platform.
      </Text>

      <View style={styles.comingSoon}>
        <View style={styles.comingSoonIcon}>
          <Feather name="zap" size={28} color={Colors.light.primary} />
        </View>
        <Text style={styles.comingSoonTitle}>Coming Soon</Text>
        <Text style={styles.comingSoonText}>
          AI-powered script generation is being built. You'll be able to select your platform, tone, and topic — then get a ready-to-film script in seconds.
        </Text>
      </View>

      <View style={styles.preview}>
        <Text style={styles.previewTitle}>How it will work</Text>
        {[
          { icon: "target", text: "Choose your platform & format" },
          { icon: "type", text: "Describe your topic or goal" },
          { icon: "cpu", text: "AI generates your script" },
          { icon: "copy", text: "Copy, edit, or save for later" },
        ].map((step, i) => (
          <View key={i} style={styles.previewStep}>
            <View style={styles.stepIcon}>
              <Feather name={step.icon as any} size={16} color={Colors.light.primary} />
            </View>
            <Text style={styles.stepText}>{step.text}</Text>
          </View>
        ))}
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
    backgroundColor: Colors.pal.reelLight,
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
    backgroundColor: Colors.light.primaryLight,
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    marginBottom: 28,
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
  preview: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 16,
    padding: 20,
  },
  previewTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 16,
  },
  previewStep: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 14,
  },
  stepIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.light.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  stepText: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.text,
    flex: 1,
  },
});
