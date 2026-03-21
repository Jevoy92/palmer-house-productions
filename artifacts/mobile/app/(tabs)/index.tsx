import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/colors";
import { PALS, PAL_ORDER, PROCESS_STEPS, PalId } from "@/constants/data";

const { width } = Dimensions.get("window");

const PAL_COLORS: Record<PalId, string> = {
  reel: Colors.pal.reel,
  spotlight: Colors.pal.spotlight,
  system: Colors.pal.system,
  evergreen: Colors.pal.evergreen,
};

function PalCard({ palId }: { palId: PalId }) {
  const router = useRouter();
  const pal = PALS[palId];
  const color = PAL_COLORS[palId];

  return (
    <Pressable
      style={styles.palCard}
      onPress={() => router.push(`/pal/${palId}`)}
    >
      <View style={[styles.palCardIcon, { backgroundColor: color + "18" }]}>
        <Feather name={pal.icon as any} size={24} color={color} />
      </View>
      <Text style={styles.palCardName}>{pal.name}</Text>
      <Text style={styles.palCardTagline}>{pal.tagline}</Text>
    </Pressable>
  );
}

function ProcessStep({
  step,
}: {
  step: (typeof PROCESS_STEPS)[0];
}) {
  return (
    <View style={styles.processStep}>
      <View style={styles.processNumber}>
        <Text style={styles.processNumberText}>{step.number}</Text>
      </View>
      <View style={styles.processContent}>
        <Text style={styles.processTitle}>{step.title}</Text>
        <Text style={styles.processDesc}>{step.description}</Text>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <LinearGradient
        colors={["#6B3FA0", "#4A2B70", "#2D1B45"]}
        style={[styles.hero, { paddingTop: insets.top + 20 }]}
      >
        <View style={styles.heroContent}>
          <Text style={styles.heroBadge}>Palmer House Productions</Text>
          <Text style={styles.heroTitle}>
            Video systems that{"\n"}
            <Text style={styles.heroHighlight}>solve problems</Text>
          </Text>
          <Text style={styles.heroSubtitle}>
            Strategic video content for businesses that want to stop blending in
            and start converting.
          </Text>
          <View style={styles.heroButtons}>
            <Pressable
              style={styles.heroPrimary}
              onPress={() => router.push("/(tabs)/pals")}
            >
              <Text style={styles.heroPrimaryText}>Explore Services</Text>
              <Feather name="arrow-right" size={18} color="#fff" />
            </Pressable>
            <Pressable
              style={styles.heroSecondary}
              onPress={() =>
                Linking.openURL(
                  "https://palmerhouseproductions.com/contact"
                )
              }
            >
              <Text style={styles.heroSecondaryText}>Book a Call</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Video Pals</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>20+</Text>
            <Text style={styles.statLabel}>Missions</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>PNW</Text>
            <Text style={styles.statLabel}>Based</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>YOUR VIDEO SYSTEM</Text>
        <Text style={styles.sectionTitle}>Meet the Pals</Text>
        <Text style={styles.sectionSubtitle}>
          Each Pal solves a specific problem. Pick the one that matches where
          you're stuck.
        </Text>
        <View style={styles.palGrid}>
          {PAL_ORDER.map((id) => (
            <PalCard key={id} palId={id} />
          ))}
        </View>
      </View>

      <View style={[styles.section, styles.processSection]}>
        <Text style={styles.sectionLabel}>HOW IT WORKS</Text>
        <Text style={styles.sectionTitle}>Our Process</Text>
        {PROCESS_STEPS.map((step) => (
          <ProcessStep key={step.number} step={step} />
        ))}
      </View>

      <View style={styles.section}>
        <LinearGradient
          colors={["#6B3FA0", "#4A2B70"]}
          style={styles.ctaCard}
        >
          <Text style={styles.ctaTitle}>Ready to build your video system?</Text>
          <Text style={styles.ctaSubtitle}>
            Start by exploring our Pals, build your package, and submit your
            request. We'll be in touch within 24 hours.
          </Text>
          <Pressable
            style={styles.ctaButton}
            onPress={() => router.push("/(tabs)/pals")}
          >
            <Text style={styles.ctaButtonText}>Get Started</Text>
            <Feather name="arrow-right" size={18} color="#6B3FA0" />
          </Pressable>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  hero: { paddingBottom: 30 },
  heroContent: { paddingHorizontal: 24 },
  heroBadge: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  heroTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 36,
    color: "#fff",
    lineHeight: 42,
    marginBottom: 16,
  },
  heroHighlight: {
    color: "#F59E0B",
  },
  heroSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 24,
    marginBottom: 28,
  },
  heroButtons: { flexDirection: "row", gap: 12 },
  heroPrimary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  heroPrimaryText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#fff",
  },
  heroSecondary: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  heroSecondaryText: {
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    color: "rgba(255,255,255,0.9)",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    paddingHorizontal: 24,
    gap: 24,
  },
  stat: { alignItems: "center" },
  statNumber: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    color: "#fff",
  },
  statLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  section: { paddingHorizontal: 24, paddingTop: 40 },
  sectionLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: Colors.light.primary,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 26,
    color: Colors.light.text,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  palGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  palCard: {
    width: (width - 60) / 2,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
  },
  palCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  palCardName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
    marginBottom: 4,
  },
  palCardTagline: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  processSection: {
    backgroundColor: Colors.light.backgroundSecondary,
    marginHorizontal: 0,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  processStep: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },
  processNumber: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.light.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  processNumberText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: Colors.light.primary,
  },
  processContent: { flex: 1 },
  processTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 4,
  },
  processDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
  },
  ctaCard: {
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
  },
  ctaTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
    marginBottom: 12,
  },
  ctaSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  ctaButtonText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#6B3FA0",
  },
});
