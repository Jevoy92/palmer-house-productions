import { Feather } from "@expo/vector-icons";
import { useRouter, type Href } from "expo-router";
import React, { type ComponentProps } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/colors";
import { PALS, PAL_ORDER, PalId } from "@/constants/data";
import { useAuth } from "@/contexts/AuthContext";
import { useActivePal } from "@/contexts/ActivePalContext";
import { useUsage } from "@/contexts/UsageContext";
import { getTierForCreditsUsed } from "@/constants/gamification";

type FeatherIcon = ComponentProps<typeof Feather>["name"];

const PAL_META: Record<PalId, { color: string; bg: string; icon: FeatherIcon; label: string }> = {
  reel: { color: Colors.pal.reel, bg: Colors.pal.reelLight, icon: "smartphone", label: "Reel" },
  system: { color: Colors.pal.system, bg: Colors.pal.systemLight, icon: "settings", label: "System" },
  evergreen: { color: Colors.pal.evergreen, bg: Colors.pal.evergreenLight, icon: "play-circle", label: "Evergreen" },
  spotlight: { color: Colors.pal.spotlight, bg: Colors.pal.spotlightLight, icon: "film", label: "Spotlight" },
};

const PAL_SUGGESTIONS: Record<PalId, { icon: FeatherIcon; title: string; route: Href }[]> = {
  reel: [
    { icon: "edit-3", title: "Draft a Reel script", route: "/tools/video-script" as Href },
    { icon: "hash", title: "Optimize hashtags", route: "/tools/hashtag-strategy" as Href },
    { icon: "calendar", title: "Plan 30-day content", route: "/tools/content-calendar" as Href },
  ],
  system: [
    { icon: "calendar", title: "Plan video system", route: "/tools/content-calendar" as Href },
    { icon: "check-square", title: "Visibility checklist", route: "/tools/visibility-checklist" as Href },
    { icon: "clipboard", title: "Generate SOPs", route: "/tools/sop-generator" as Href },
  ],
  evergreen: [
    { icon: "edit-3", title: "Write long-form script", route: "/tools/video-script" as Href },
    { icon: "bar-chart-2", title: "Audit content", route: "/tools/content-audit" as Href },
    { icon: "message-circle", title: "Generate hooks", route: "/tools/hook-generator" as Href },
  ],
  spotlight: [
    { icon: "users", title: "Plan client spotlight", route: "/tools/client-spotlight-planner" as Href },
    { icon: "edit-3", title: "Script brand story", route: "/tools/brand-story-builder" as Href },
    { icon: "award", title: "Trust signal audit", route: "/tools/trust-signal-audit" as Href },
  ],
};

const GUEST_CHIPS = [
  { label: "More visibility", palId: "reel" as PalId },
  { label: "Build trust", palId: "spotlight" as PalId },
  { label: "Better systems", palId: "system" as PalId },
  { label: "Be an authority", palId: "evergreen" as PalId },
];

function PalTab({
  palId,
  isActive,
  onPress,
}: {
  palId: PalId | null;
  isActive: boolean;
  onPress: () => void;
}) {
  const color = palId ? PAL_META[palId].color : Colors.light.text;
  const label = palId ? PAL_META[palId].label : "All";

  return (
    <Pressable
      style={[styles.palTab, isActive && { borderBottomColor: color }]}
      onPress={onPress}
    >
      {palId && (
        <View style={[styles.palTabDot, { backgroundColor: color }]} />
      )}
      <Text
        style={[
          styles.palTabText,
          isActive && { color, fontFamily: "Inter_600SemiBold" },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, isGuest } = useAuth();
  const { activePal, setActivePal, accentColor } = useActivePal();
  const { stats } = useUsage();
  const tier = getTierForCreditsUsed(stats.totalCreditsUsed);

  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const displayName = user ? user.fullName.split(" ")[0] : "there";

  const isNewUser = isGuest && !user;
  const credits = user?.credits ?? 3;

  const currentSuggestions = activePal
    ? PAL_SUGGESTIONS[activePal]
    : [
        PAL_SUGGESTIONS.reel[0],
        PAL_SUGGESTIONS.spotlight[0],
        PAL_SUGGESTIONS.system[0],
      ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>{timeGreeting}, {displayName}</Text>
            <Text style={styles.headline}>
              {isNewUser ? "Build your\ncontent strategy." : "What's next?"}
            </Text>
          </View>
          <Pressable
            style={styles.profileButton}
            onPress={() => {
              if (user) {
                router.push("/profile");
              } else {
                router.push("/auth/register");
              }
            }}
          >
            <Feather name="user" size={18} color={Colors.light.textSecondary} />
          </Pressable>
        </View>
      </View>

      <View style={styles.tabBar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBarInner}
        >
          <PalTab palId={null} isActive={activePal === null} onPress={() => setActivePal(null)} />
          {PAL_ORDER.map((id) => (
            <PalTab
              key={id}
              palId={id}
              isActive={activePal === id}
              onPress={() => setActivePal(activePal === id ? null : id)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.creditsRow}>
        <Feather name="zap" size={14} color={accentColor} />
        <Text style={styles.creditsText}>
          <Text style={[styles.creditsCount, { color: accentColor }]}>{credits}</Text> credits
        </Text>
        <View style={[styles.tierBadge, { borderColor: tier.color + "40" }]}>
          <Feather name={tier.icon as any} size={10} color={tier.color} />
          <Text style={[styles.tierBadgeText, { color: tier.color }]}>{tier.label.split(" ")[1]}</Text>
        </View>
        <Pressable onPress={() => router.push("/(tabs)/tools")} style={styles.creditsLink}>
          <Feather name="arrow-right" size={14} color={accentColor} />
        </Pressable>
      </View>

      {isNewUser && (
        <View style={styles.welcomeSection}>
          <Text style={styles.sectionTitle}>What's your challenge?</Text>
          <View style={styles.chipGrid}>
            {GUEST_CHIPS.map((chip) => (
              <Pressable
                key={chip.palId}
                style={styles.challengeChip}
                onPress={() => {
                  setActivePal(chip.palId);
                  router.push(`/pal/${chip.palId}`);
                }}
              >
                <View style={[styles.chipDot, { backgroundColor: PAL_META[chip.palId].color }]} />
                <Text style={styles.chipText}>{chip.label}</Text>
                <Feather name="chevron-right" size={14} color={Colors.light.textTertiary} />
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {!isNewUser && (
        <View style={styles.pickUpSection}>
          <Text style={styles.sectionTitle}>Continue</Text>
          <Pressable
            style={styles.listRow}
            onPress={() => router.push("/(tabs)/pals")}
          >
            <Feather name="compass" size={16} color={accentColor} />
            <Text style={styles.listRowText}>
              {activePal ? `Browse ${PALS[activePal].name}` : "Browse services"}
            </Text>
            <Feather name="chevron-right" size={14} color={Colors.light.textTertiary} />
          </Pressable>
          <Pressable
            style={styles.listRow}
            onPress={() => router.push("/(tabs)/tools")}
          >
            <Feather name="zap" size={16} color={accentColor} />
            <Text style={styles.listRowText}>AI content tools</Text>
            <Feather name="chevron-right" size={14} color={Colors.light.textTertiary} />
          </Pressable>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {activePal ? `${PALS[activePal].name} tools` : "Suggested"}
        </Text>
        {currentSuggestions.map((s, i) => (
          <Pressable
            key={i}
            style={styles.listRow}
            onPress={() => router.push(s.route)}
          >
            <View style={[styles.suggestionDot, { backgroundColor: accentColor + "18" }]}>
              <Feather name={s.icon} size={15} color={accentColor} />
            </View>
            <Text style={styles.listRowText}>{s.title}</Text>
            <Feather name="chevron-right" size={14} color={Colors.light.textTertiary} />
          </Pressable>
        ))}
      </View>

      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Quick actions</Text>
        <View style={styles.quickActions}>
          <Pressable style={styles.quickAction} onPress={() => router.push("/(tabs)/pals")}>
            <Feather name="compass" size={20} color={accentColor} />
            <Text style={styles.quickActionLabel}>Explore</Text>
          </Pressable>
          <Pressable style={styles.quickAction} onPress={() => router.push("/(tabs)/tools")}>
            <Feather name="zap" size={20} color={accentColor} />
            <Text style={styles.quickActionLabel}>Tools</Text>
          </Pressable>
          <Pressable style={styles.quickAction} onPress={() => router.push("/(tabs)/build")}>
            <Feather name="layers" size={20} color={accentColor} />
            <Text style={styles.quickActionLabel}>Package</Text>
          </Pressable>
          <Pressable style={styles.quickAction} onPress={() => router.push("/tools/teleprompter-live" as Href)}>
            <Feather name="video" size={20} color={accentColor} />
            <Text style={styles.quickActionLabel}>Prompter</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: { flex: 1, marginRight: 16 },
  greeting: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 4,
  },
  headline: {
    fontFamily: "Inter_700Bold",
    fontSize: 26,
    color: Colors.light.text,
    lineHeight: 32,
    letterSpacing: -0.5,
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.light.border,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  tabBar: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.separator,
    marginBottom: 16,
  },
  tabBarInner: {
    paddingHorizontal: 20,
    gap: 0,
    flexDirection: "row",
  },
  palTab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  palTabDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  palTabText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  creditsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.light.separator,
    borderRadius: 8,
    marginBottom: 20,
  },
  creditsText: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  creditsCount: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
  },
  tierBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  tierBadgeText: {
    fontFamily: "Inter_500Medium",
    fontSize: 10,
  },
  creditsLink: {
    padding: 4,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  chipGrid: {
    gap: 1,
  },
  challengeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.separator,
  },
  chipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  chipText: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.text,
  },
  pickUpSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: Colors.light.textSecondary,
    letterSpacing: 0.1,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.separator,
  },
  listRowText: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.text,
  },
  suggestionDot: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  quickActions: {
    flexDirection: "row",
    gap: 1,
    borderWidth: 1,
    borderColor: Colors.light.separator,
    borderRadius: 10,
    overflow: "hidden",
  },
  quickAction: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    gap: 6,
    backgroundColor: Colors.light.backgroundSecondary,
  },
  quickActionLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: Colors.light.textSecondary,
  },
});
