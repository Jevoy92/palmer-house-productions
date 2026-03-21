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

type FeatherIcon = ComponentProps<typeof Feather>["name"];

const PAL_META: Record<PalId, { color: string; bg: string; icon: FeatherIcon; label: string }> = {
  reel: { color: Colors.pal.reel, bg: Colors.pal.reelLight, icon: "smartphone", label: "Reel" },
  system: { color: Colors.pal.system, bg: Colors.pal.systemLight, icon: "settings", label: "System" },
  evergreen: { color: Colors.pal.evergreen, bg: Colors.pal.evergreenLight, icon: "play-circle", label: "Evergreen" },
  spotlight: { color: Colors.pal.spotlight, bg: Colors.pal.spotlightLight, icon: "film", label: "Spotlight" },
};

const PAL_SUGGESTIONS: Record<PalId, { icon: FeatherIcon; title: string; subtitle: string; route: Href }[]> = {
  reel: [
    { icon: "edit-3", title: "Draft a script for your next Reel", subtitle: "Use AI to write a scroll-stopping hook", route: "/tools/video-script" as Href },
    { icon: "hash", title: "Optimize your hashtag strategy", subtitle: "Get personalized hashtag recommendations", route: "/tools/hashtag-strategy" as Href },
    { icon: "calendar", title: "Plan your 30-day content calendar", subtitle: "Stay consistent with a strategic plan", route: "/tools/content-calendar" as Href },
  ],
  system: [
    { icon: "calendar", title: "Plan your internal video system", subtitle: "Map out onboarding & SOP content", route: "/tools/content-calendar" as Href },
    { icon: "check-square", title: "Review your visibility checklist", subtitle: "Make sure nothing is missing", route: "/tools/visibility-checklist" as Href },
    { icon: "clipboard", title: "Generate your SOPs", subtitle: "Document your production processes", route: "/tools/sop-generator" as Href },
  ],
  evergreen: [
    { icon: "edit-3", title: "Write a long-form script", subtitle: "Authority content that compounds", route: "/tools/video-script" as Href },
    { icon: "bar-chart-2", title: "Audit your existing content", subtitle: "Find gaps and opportunities", route: "/tools/content-audit" as Href },
    { icon: "message-circle", title: "Generate compelling hooks", subtitle: "Open strong, keep attention", route: "/tools/hook-generator" as Href },
  ],
  spotlight: [
    { icon: "users", title: "Plan your client spotlight", subtitle: "Create a brief for client stories", route: "/tools/client-spotlight-planner" as Href },
    { icon: "edit-3", title: "Script your brand story", subtitle: "Tell your origin story with impact", route: "/tools/brand-story-builder" as Href },
    { icon: "award", title: "Build your trust signals", subtitle: "Audit credibility strategically", route: "/tools/trust-signal-audit" as Href },
  ],
};

const GUEST_CHIPS = [
  { label: "I need more visibility", palId: "reel" as PalId },
  { label: "I want to build trust", palId: "spotlight" as PalId },
  { label: "I need better systems", palId: "system" as PalId },
  { label: "I want to be an authority", palId: "evergreen" as PalId },
];

function PalSelectorPill({
  palId,
  isActive,
  onPress,
}: {
  palId: PalId | null;
  isActive: boolean;
  onPress: () => void;
}) {
  if (palId === null) {
    return (
      <Pressable
        style={[
          styles.palSelectorPill,
          isActive && { backgroundColor: Colors.light.text },
        ]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.palSelectorText,
            isActive && { color: "#fff" },
          ]}
        >
          All
        </Text>
      </Pressable>
    );
  }

  const meta = PAL_META[palId];
  return (
    <Pressable
      style={[
        styles.palSelectorPill,
        isActive && { backgroundColor: meta.color },
      ]}
      onPress={onPress}
    >
      <View style={[styles.palSelectorDot, { backgroundColor: isActive ? "#fff" : meta.color }]} />
      <Text
        style={[
          styles.palSelectorText,
          isActive && { color: "#fff" },
        ]}
      >
        {meta.label}
      </Text>
    </Pressable>
  );
}

function SuggestionCard({
  icon,
  title,
  subtitle,
  accentColor,
  onPress,
}: {
  icon: FeatherIcon;
  title: string;
  subtitle: string;
  accentColor: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.suggestionCard} onPress={onPress}>
      <View style={[styles.suggestionIcon, { backgroundColor: accentColor + "15" }]}>
        <Feather name={icon} size={18} color={accentColor} />
      </View>
      <View style={styles.suggestionContent}>
        <Text style={styles.suggestionTitle}>{title}</Text>
        <Text style={styles.suggestionSubtitle}>{subtitle}</Text>
      </View>
      <Feather name="chevron-right" size={16} color={Colors.light.textTertiary} />
    </Pressable>
  );
}

function QuickAction({
  icon,
  label,
  accentColor,
  onPress,
}: {
  icon: FeatherIcon;
  label: string;
  accentColor: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.quickAction} onPress={onPress}>
      <View style={[styles.quickActionIcon, { backgroundColor: accentColor + "15" }]}>
        <Feather name={icon} size={18} color={accentColor} />
      </View>
      <Text style={styles.quickActionLabel}>{label}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, isGuest } = useAuth();
  const { activePal, setActivePal, accentColor } = useActivePal();

  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const displayName = user ? user.fullName.split(" ")[0] : "there";
  const greeting = `${timeGreeting}, ${displayName}`;

  const month = new Date().getMonth();
  const seasonalEmoji = month >= 2 && month <= 4 ? "🌱" : month >= 5 && month <= 7 ? "☀️" : month >= 8 && month <= 10 ? "🍂" : "❄️";

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
            <Text style={styles.greeting}>{greeting} {seasonalEmoji}</Text>
            <Text style={styles.headline}>
              {isNewUser ? "Let's build your\ncontent strategy." : "What are we\nworking on today?"}
            </Text>
          </View>
          <Pressable
            style={[styles.profileButton, { borderColor: accentColor + "30" }]}
            onPress={() => {
              if (user) {
                router.push("/profile");
              } else {
                router.push("/auth/register");
              }
            }}
          >
            <Feather name="user" size={18} color={accentColor} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.palSelector}
      >
        <PalSelectorPill palId={null} isActive={activePal === null} onPress={() => setActivePal(null)} />
        {PAL_ORDER.map((id) => (
          <PalSelectorPill
            key={id}
            palId={id}
            isActive={activePal === id}
            onPress={() => setActivePal(activePal === id ? null : id)}
          />
        ))}
      </ScrollView>

      <View style={styles.creditsInline}>
        <View style={styles.creditsRow}>
          <Feather name="zap" size={15} color={accentColor} />
          <Text style={styles.creditsText}>
            <Text style={[styles.creditsCount, { color: accentColor }]}>{credits}</Text> credits available
          </Text>
        </View>
        <Pressable onPress={() => router.push("/(tabs)/tools")}>
          <Text style={[styles.creditsLink, { color: accentColor }]}>Use tools →</Text>
        </Pressable>
      </View>

      {isNewUser && (
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>What's your biggest content challenge?</Text>
          <Text style={styles.welcomeSubtitle}>Pick one to get started — we'll customize your experience.</Text>
          <View style={styles.welcomeChips}>
            {GUEST_CHIPS.map((chip) => (
              <Pressable
                key={chip.palId}
                style={[styles.welcomeChip, { borderColor: PAL_META[chip.palId].color + "40" }]}
                onPress={() => {
                  setActivePal(chip.palId);
                  router.push(`/pal/${chip.palId}`);
                }}
              >
                <View style={[styles.welcomeChipDot, { backgroundColor: PAL_META[chip.palId].color }]} />
                <Text style={styles.welcomeChipText}>{chip.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {!isNewUser && (
        <View style={styles.pickUpCard}>
          <View style={styles.pickUpHeader}>
            <Feather name="clock" size={16} color={accentColor} />
            <Text style={styles.pickUpTitle}>Pick up where you left off</Text>
          </View>
          <View style={styles.pickUpActions}>
            <Pressable
              style={styles.pickUpAction}
              onPress={() => router.push("/(tabs)/pals")}
            >
              <View style={[styles.pickUpActionDot, { backgroundColor: accentColor }]} />
              <Text style={styles.pickUpActionText}>
                {activePal ? `Continue with ${PALS[activePal].name}` : "Browse video services"}
              </Text>
              <Feather name="arrow-right" size={14} color={Colors.light.textTertiary} />
            </Pressable>
            <Pressable
              style={styles.pickUpAction}
              onPress={() => router.push("/(tabs)/tools")}
            >
              <View style={[styles.pickUpActionDot, { backgroundColor: Colors.pal.reel }]} />
              <Text style={styles.pickUpActionText}>Use AI content tools</Text>
              <Feather name="arrow-right" size={14} color={Colors.light.textTertiary} />
            </Pressable>
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {activePal ? `${PALS[activePal].name} suggestions` : "Suggested for you"}
        </Text>
        <View style={styles.suggestionList}>
          {currentSuggestions.map((s, i) => (
            <SuggestionCard
              key={i}
              icon={s.icon}
              title={s.title}
              subtitle={s.subtitle}
              accentColor={accentColor}
              onPress={() => router.push(s.route)}
            />
          ))}
        </View>
      </View>

      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Quick actions</Text>
        <View style={styles.quickActions}>
          <QuickAction
            icon="compass"
            label="Explore"
            accentColor={accentColor}
            onPress={() => router.push("/(tabs)/pals")}
          />
          <QuickAction
            icon="zap"
            label="AI Tools"
            accentColor={accentColor}
            onPress={() => router.push("/(tabs)/tools")}
          />
          <QuickAction
            icon="layers"
            label="Package"
            accentColor={accentColor}
            onPress={() => router.push("/(tabs)/build")}
          />
          <QuickAction
            icon="video"
            label="Teleprompter"
            accentColor={accentColor}
            onPress={() => router.push("/tools/teleprompter-live" as Href)}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: { flex: 1, marginRight: 16 },
  greeting: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.textSecondary,
    marginBottom: 6,
  },
  headline: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    color: Colors.light.text,
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.backgroundSecondary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    marginTop: 4,
  },
  palSelector: {
    paddingHorizontal: 20,
    gap: 8,
    flexDirection: "row",
    paddingBottom: 20,
  },
  palSelectorPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: Colors.light.backgroundSecondary,
  },
  palSelectorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  palSelectorText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: Colors.light.text,
  },
  creditsInline: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  creditsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  creditsText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  creditsCount: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
  },
  creditsLink: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
  },
  welcomeCard: {
    marginHorizontal: 20,
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  welcomeTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 18,
    color: Colors.light.text,
    lineHeight: 24,
    marginBottom: 6,
  },
  welcomeSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
    marginBottom: 18,
  },
  welcomeChips: {
    gap: 10,
  },
  welcomeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
  },
  welcomeChipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  welcomeChipText: {
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    color: Colors.light.text,
  },
  pickUpCard: {
    marginHorizontal: 20,
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  pickUpHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  pickUpTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: Colors.light.text,
  },
  pickUpActions: {
    gap: 8,
  },
  pickUpAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  pickUpActionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  pickUpActionText: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.text,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  sectionTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 17,
    color: Colors.light.text,
    letterSpacing: -0.2,
    marginBottom: 14,
  },
  suggestionList: {
    gap: 10,
  },
  suggestionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 16,
    padding: 16,
    gap: 14,
  },
  suggestionIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  suggestionContent: { flex: 1 },
  suggestionTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
    marginBottom: 2,
    lineHeight: 20,
  },
  suggestionSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
    lineHeight: 18,
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  quickActions: {
    flexDirection: "row",
    gap: 10,
  },
  quickAction: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 6,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  quickActionLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: Colors.light.text,
    textAlign: "center",
  },
});
