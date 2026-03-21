import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Colors from "@/constants/colors";
import {
  PALS,
  PAL_ORDER,
  PalId,
  getMissionsForPal,
} from "@/constants/data";
import { PAL_PROFILES } from "@/constants/images";
import { useActivePal } from "@/contexts/ActivePalContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 50) / 2;

const PAL_META: Record<PalId, { color: string; bg: string; icon: string }> = {
  reel: { color: Colors.pal.reel, bg: Colors.pal.reelLight, icon: "smartphone" },
  spotlight: { color: Colors.pal.spotlight, bg: Colors.pal.spotlightLight, icon: "film" },
  system: { color: Colors.pal.system, bg: Colors.pal.systemLight, icon: "settings" },
  evergreen: { color: Colors.pal.evergreen, bg: Colors.pal.evergreenLight, icon: "play-circle" },
};

const MISSION_ICONS: Record<string, string> = {
  "reel-services": "briefcase",
  "reel-objection": "shield",
  "reel-proof": "award",
  "reel-day-in-life": "sun",
  "reel-pov": "zap",
  "reel-momentum": "calendar",
  "spotlight-brand-presence": "star",
  "spotlight-proof-builder": "thumbs-up",
  "spotlight-offer-clarity": "target",
  "spotlight-authority": "mic",
  "spotlight-culture": "users",
  "system-onboarding": "user-plus",
  "system-training": "book-open",
  "system-sop": "clipboard",
  "system-sales-enablement": "trending-up",
  "system-internal-comms": "message-circle",
  "evergreen-hero": "play-circle",
  "evergreen-series": "layers",
  "evergreen-podcast-launch": "headphones",
  "evergreen-course": "monitor",
  "evergreen-webinar": "video",
};

function FilterChip({
  label,
  active,
  color,
  onPress,
}: {
  label: string;
  active: boolean;
  color: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[
        styles.chip,
        active && { backgroundColor: color },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.chipText,
          active && { color: "#fff" },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function MissionCard({
  palId,
  mission,
}: {
  palId: PalId;
  mission: any;
}) {
  const router = useRouter();
  const meta = PAL_META[palId];
  const iconName = MISSION_ICONS[mission.id] || "video";

  return (
    <Pressable
      style={styles.missionCard}
      onPress={() => router.push(`/mission/${palId}/${mission.id}`)}
    >
      <View style={[styles.missionIcon, { backgroundColor: meta.bg }]}>
        <Feather name={iconName as any} size={18} color={meta.color} />
      </View>
      <Text style={styles.missionName} numberOfLines={2}>{mission.name}</Text>
      <Feather name="arrow-right" size={14} color={meta.color} style={styles.missionArrow} />
    </Pressable>
  );
}

export default function PalsScreen() {
  const router = useRouter();
  const { activePal, setActivePal } = useActivePal();
  const activeFilter: PalId | "all" = activePal ?? "all";
  const filteredPals = activeFilter === "all" ? PAL_ORDER : [activeFilter];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.intro}>
        <Text style={styles.introTitle}>
          {activePal ? PALS[activePal].name : "Explore"}
        </Text>
        <Text style={styles.introSubtitle}>
          {activePal
            ? PALS[activePal].tagline
            : "Browse video packs by category."}
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        <FilterChip
          label="All"
          active={activeFilter === "all"}
          color={Colors.light.text}
          onPress={() => setActivePal(null)}
        />
        {PAL_ORDER.map((id) => (
          <FilterChip
            key={id}
            label={PALS[id].name}
            active={activeFilter === id}
            color={PAL_META[id].color}
            onPress={() => setActivePal(activeFilter === id ? null : id)}
          />
        ))}
      </ScrollView>

      {filteredPals.map((palId) => {
        const pal = PALS[palId];
        const meta = PAL_META[palId];
        const missions = getMissionsForPal(palId);

        return (
          <View key={palId} style={styles.palSection}>
            <Pressable
              style={styles.palHeader}
              onPress={() => router.push(`/pal/${palId}`)}
            >
              <View style={styles.palAvatars}>
                <Image
                  source={PAL_PROFILES[palId].male}
                  style={[styles.palAvatar, styles.palAvatarLeft, { borderColor: meta.bg }]}
                />
                <Image
                  source={PAL_PROFILES[palId].female}
                  style={[styles.palAvatar, styles.palAvatarRight, { borderColor: meta.bg }]}
                />
              </View>
              <View style={styles.palHeaderText}>
                <Text style={styles.palName}>{pal.name}</Text>
                <Text style={styles.palTagline}>{pal.tagline}</Text>
              </View>
              <View style={styles.palArrow}>
                <Feather name="chevron-right" size={18} color={Colors.light.textTertiary} />
              </View>
            </Pressable>

            <View style={styles.missionsGrid}>
              {missions.map((mission) => (
                <MissionCard
                  key={mission.id}
                  palId={palId}
                  mission={mission}
                />
              ))}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  intro: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4 },
  introTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 26,
    color: Colors.light.text,
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  introSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
  },
  chips: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 8,
    flexDirection: "row",
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: Colors.light.backgroundSecondary,
  },
  chipText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: Colors.light.text,
  },
  palSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  palHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  palAvatars: {
    flexDirection: "row",
    alignItems: "center",
  },
  palAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 3,
  },
  palAvatarLeft: {
    zIndex: 2,
  },
  palAvatarRight: {
    marginLeft: -12,
    zIndex: 1,
  },
  palHeaderText: { flex: 1 },
  palName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: Colors.light.text,
  },
  palTagline: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 1,
  },
  palArrow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.light.backgroundSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  missionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  missionCard: {
    width: CARD_WIDTH,
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  missionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  missionName: {
    flex: 1,
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: Colors.light.text,
    lineHeight: 17,
  },
  missionArrow: {
    marginLeft: 2,
  },
});
