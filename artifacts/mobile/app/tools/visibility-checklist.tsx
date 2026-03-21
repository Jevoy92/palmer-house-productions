import { Feather } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/colors";

export default function VisibilityChecklistScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top + 56, paddingBottom: 100, paddingHorizontal: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerIcon}>
        <Feather name="check-square" size={24} color={Colors.pal.reel} />
      </View>
      <Text style={styles.title}>Visibility Checklist</Text>
      <Text style={styles.subtitle}>
        Your personalized checklist of must-have videos. Complete each stage to build a full content system that works 24/7.
      </Text>

      <View style={styles.comingSoon}>
        <View style={styles.comingSoonIcon}>
          <Feather name="check-square" size={28} color={Colors.pal.reel} />
        </View>
        <Text style={styles.comingSoonTitle}>Coming Soon</Text>
        <Text style={styles.comingSoonText}>
          Tell us about your business and we'll dynamically generate your visibility checklist — the exact videos you need, in the right order. Once you complete visibility, you'll unlock trust, systems, and authority stages.
        </Text>
      </View>

      <View style={styles.stagesPreview}>
        <Text style={styles.stagesTitle}>The 4 Stages</Text>
        {[
          { icon: "smartphone", color: Colors.pal.reel, bg: Colors.pal.reelLight, title: "Visibility", desc: "About You, Services, Day-in-the-Life — the basics people need to find you" },
          { icon: "film", color: Colors.pal.spotlight, bg: Colors.pal.spotlightLight, title: "Trust", desc: "Testimonials, Founder Story, Brand Film — proof that you're the real deal" },
          { icon: "settings", color: Colors.pal.system, bg: Colors.pal.systemLight, title: "Systems", desc: "Onboarding, SOPs, Training — stop repeating yourself forever" },
          { icon: "play-circle", color: Colors.pal.evergreen, bg: Colors.pal.evergreenLight, title: "Authority", desc: "Podcasts, Deep Dives, Case Studies — content that compounds" },
        ].map((stage, i) => (
          <View key={i} style={styles.stageRow}>
            <View style={[styles.stageIcon, { backgroundColor: stage.bg }]}>
              <Feather name={stage.icon as any} size={18} color={stage.color} />
            </View>
            <View style={styles.stageContent}>
              <Text style={styles.stageName}>{stage.title}</Text>
              <Text style={styles.stageDesc}>{stage.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.insight}>
        <Feather name="zap" size={14} color={Colors.light.primary} />
        <Text style={styles.insightText}>
          Most businesses only have 5 videos planned. What if you had 50? That's what a complete visibility system looks like.
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
    backgroundColor: Colors.pal.reelLight,
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
  stagesPreview: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 16,
    padding: 20,
    gap: 16,
    marginBottom: 20,
  },
  stagesTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
    marginBottom: 4,
  },
  stageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  stageIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  stageContent: {
    flex: 1,
  },
  stageName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
    marginBottom: 2,
  },
  stageDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
    lineHeight: 18,
  },
  insight: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: Colors.light.primaryLight,
    borderRadius: 14,
    padding: 16,
  },
  insightText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.text,
    lineHeight: 21,
    flex: 1,
  },
});
