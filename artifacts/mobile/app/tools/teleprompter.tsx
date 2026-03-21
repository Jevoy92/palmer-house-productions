import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/colors";

export default function TeleprompterScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top + 56, paddingBottom: 100, paddingHorizontal: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerIcon}>
        <Feather name="video" size={24} color="#059669" />
      </View>
      <Text style={styles.title}>Teleprompter</Text>
      <Text style={styles.subtitle}>
        Draft your script, hit record, and your words scroll on screen while you film. No memorizing, no fumbling.
      </Text>

      <View style={styles.comingSoon}>
        <View style={styles.comingSoonIcon}>
          <Feather name="video" size={28} color="#059669" />
        </View>
        <Text style={styles.comingSoonTitle}>Coming Soon</Text>
        <Text style={styles.comingSoonText}>
          The teleprompter will overlay your script while you record — adjustable scroll speed, font size, and mirror mode for front-facing camera. Film like a pro, right from your phone.
        </Text>
      </View>

      <View style={styles.featureList}>
        <Text style={styles.featureHeader}>What you'll be able to do</Text>
        {[
          { icon: "edit-3", text: "Paste or write your script directly" },
          { icon: "play", text: "Auto-scroll at your speaking pace" },
          { icon: "sliders", text: "Adjust speed, size, and opacity" },
          { icon: "camera", text: "Record with script overlay on screen" },
          { icon: "download", text: "Save and share your finished video" },
          { icon: "refresh-cw", text: "Mirror mode for front-facing camera" },
        ].map((f, i) => (
          <View key={i} style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Feather name={f.icon as any} size={16} color="#059669" />
            </View>
            <Text style={styles.featureText}>{f.text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.freeBadge}>
        <Feather name="gift" size={16} color="#059669" />
        <Text style={styles.freeBadgeText}>This tool will be free for all users</Text>
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
    backgroundColor: "#ECFDF5",
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
    fontSize: 15,
    color: Colors.light.textSecondary,
    lineHeight: 22,
    marginBottom: 28,
  },
  comingSoon: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    marginBottom: 24,
  },
  comingSoonIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#ECFDF5",
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
    lineHeight: 21,
  },
  featureList: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 16,
    padding: 20,
    gap: 14,
    marginBottom: 20,
  },
  featureHeader: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
    marginBottom: 4,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    flex: 1,
  },
  freeBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#ECFDF5",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  freeBadgeText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: "#059669",
  },
});
