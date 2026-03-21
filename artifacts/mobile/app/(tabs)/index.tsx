import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
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
import { PAL_PROFILES } from "@/constants/images";
import { useAuth } from "@/contexts/AuthContext";

const { width } = Dimensions.get("window");

const PAL_META: Record<PalId, { color: string; bg: string; icon: string }> = {
  reel: { color: Colors.pal.reel, bg: Colors.pal.reelLight, icon: "smartphone" },
  system: { color: Colors.pal.system, bg: Colors.pal.systemLight, icon: "settings" },
  evergreen: { color: Colors.pal.evergreen, bg: Colors.pal.evergreenLight, icon: "play-circle" },
  spotlight: { color: Colors.pal.spotlight, bg: Colors.pal.spotlightLight, icon: "film" },
};

function QuickAction({ icon, label, onPress }: { icon: string; label: string; onPress: () => void }) {
  return (
    <Pressable style={styles.quickAction} onPress={onPress}>
      <View style={styles.quickActionIcon}>
        <Feather name={icon as any} size={20} color={Colors.light.primary} />
      </View>
      <Text style={styles.quickActionLabel}>{label}</Text>
    </Pressable>
  );
}

function PalPill({ palId }: { palId: PalId }) {
  const router = useRouter();
  const pal = PALS[palId];
  const meta = PAL_META[palId];

  return (
    <Pressable
      style={[styles.palPill, { backgroundColor: meta.bg }]}
      onPress={() => router.push(`/pal/${palId}`)}
    >
      <View style={styles.palPillAvatars}>
        <Image
          source={PAL_PROFILES[palId].male}
          style={[styles.palPillAvatar, styles.palPillAvatarLeft]}
        />
        <Image
          source={PAL_PROFILES[palId].female}
          style={[styles.palPillAvatar, styles.palPillAvatarRight]}
        />
      </View>
      <View style={styles.palPillText}>
        <Text style={[styles.palPillName, { color: meta.color }]}>{pal.name}</Text>
        <Text style={styles.palPillTagline} numberOfLines={1}>{pal.displayName} · {pal.tagline}</Text>
      </View>
      <Feather name="chevron-right" size={16} color={Colors.light.textTertiary} />
    </Pressable>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  const greeting = user ? `Hey, ${user.fullName.split(" ")[0]}` : "Palmer House";

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.headline}>Video systems that{"\n"}solve problems.</Text>
        </View>
      </View>

      <View style={styles.heroCard}>
        <View style={styles.heroContent}>
          <Text style={styles.heroLabel}>FOR BUSINESS OWNERS</Text>
          <Text style={styles.heroTitle}>Build your content strategy with strategic video packages</Text>
          <Text style={styles.heroSubtitle}>
            Explore our Pals, configure your package, and submit a project request.
          </Text>
          <Pressable
            style={styles.heroCta}
            onPress={() => router.push("/(tabs)/pals")}
          >
            <Text style={styles.heroCtaText}>Get Started</Text>
            <Feather name="arrow-right" size={16} color="#fff" />
          </Pressable>
        </View>
      </View>

      <View style={styles.quickActions}>
        <QuickAction
          icon="compass"
          label="Explore Services"
          onPress={() => router.push("/(tabs)/pals")}
        />
        <QuickAction
          icon="zap"
          label="AI Tools"
          onPress={() => router.push("/(tabs)/tools")}
        />
        <QuickAction
          icon="layers"
          label="Build Package"
          onPress={() => router.push("/(tabs)/build")}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Video Pals</Text>
          <Pressable onPress={() => router.push("/(tabs)/pals")}>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>
        <Text style={styles.sectionSubtitle}>
          Each Pal solves a specific business problem
        </Text>
        <View style={styles.palList}>
          {PAL_ORDER.map((id) => (
            <PalPill key={id} palId={id} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <Text style={styles.sectionSubtitle}>
          From discovery to delivery in four steps
        </Text>
        <View style={styles.processGrid}>
          {PROCESS_STEPS.map((step, i) => (
            <View key={step.number} style={styles.processCard}>
              <Text style={styles.processNumber}>{step.number}</Text>
              <Text style={styles.processTitle}>{step.title}</Text>
              <Text style={styles.processDesc}>{step.description}</Text>
            </View>
          ))}
        </View>
      </View>

      <Pressable
        style={styles.ctaBanner}
        onPress={() => Linking.openURL("https://palmerhouseproductions.com/contact")}
      >
        <View style={styles.ctaBannerContent}>
          <Text style={styles.ctaBannerTitle}>Ready to start?</Text>
          <Text style={styles.ctaBannerSubtitle}>Book a free discovery call</Text>
        </View>
        <View style={styles.ctaBannerArrow}>
          <Feather name="arrow-right" size={20} color={Colors.light.primary} />
        </View>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  greeting: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: Colors.light.primary,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  headline: {
    fontFamily: "Inter_700Bold",
    fontSize: 30,
    color: Colors.light.text,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  heroCard: {
    marginHorizontal: 20,
    backgroundColor: Colors.light.primary,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 24,
    ...Colors.shadow.lg,
  },
  heroContent: {
    padding: 24,
  },
  heroLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  heroTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: "#FFFFFF",
    lineHeight: 28,
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    lineHeight: 20,
    marginBottom: 20,
  },
  heroCta: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 100,
  },
  heroCtaText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#fff",
  },
  quickActions: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 32,
  },
  quickAction: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 8,
  },
  quickActionIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.light.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  quickActionLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: Colors.light.text,
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  sectionTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: Colors.light.text,
    letterSpacing: -0.3,
  },
  seeAll: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: Colors.light.primary,
  },
  sectionSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 16,
    marginTop: 4,
  },
  palList: { gap: 8 },
  palPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    gap: 12,
  },
  palPillAvatars: {
    width: 48,
    height: 36,
    position: "relative",
  },
  palPillAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#fff",
    position: "absolute",
    top: 2,
  },
  palPillAvatarLeft: {
    left: 0,
    zIndex: 2,
  },
  palPillAvatarRight: {
    left: 16,
    zIndex: 1,
  },
  palPillText: { flex: 1 },
  palPillName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
  },
  palPillTagline: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
    marginTop: 1,
  },
  processGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  processCard: {
    width: (width - 50) / 2,
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 16,
    padding: 18,
  },
  processNumber: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    color: Colors.light.primaryMuted,
    marginBottom: 8,
  },
  processTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
    marginBottom: 4,
  },
  processDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
    lineHeight: 18,
  },
  ctaBanner: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.primaryLight,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  ctaBannerContent: { flex: 1 },
  ctaBannerTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: Colors.light.primary,
    marginBottom: 2,
  },
  ctaBannerSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.primaryMuted,
  },
  ctaBannerArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    ...Colors.shadow.sm,
  },
});
