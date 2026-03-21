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

function FilterTab({
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
      style={[styles.filterTab, active && { borderBottomColor: color }]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.filterTabText,
          active && { color, fontFamily: "Inter_600SemiBold" },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function MissionRow({
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
      style={styles.missionRow}
      onPress={() => router.push(`/mission/${palId}/${mission.id}`)}
    >
      <View style={[styles.missionIcon, { backgroundColor: meta.bg }]}>
        <Feather name={iconName as any} size={16} color={meta.color} />
      </View>
      <Text style={styles.missionName} numberOfLines={1}>{mission.name}</Text>
      <Feather name="chevron-right" size={14} color={Colors.light.textTertiary} />
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
          {activePal ? PALS[activePal].tagline : "Browse video packs by category."}
        </Text>
      </View>

      <View style={styles.tabBar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBarInner}
        >
          <FilterTab
            label="All"
            active={activeFilter === "all"}
            color={Colors.light.text}
            onPress={() => setActivePal(null)}
          />
          {PAL_ORDER.map((id) => (
            <FilterTab
              key={id}
              label={PALS[id].name}
              active={activeFilter === id}
              color={PAL_META[id].color}
              onPress={() => setActivePal(activeFilter === id ? null : id)}
            />
          ))}
        </ScrollView>
      </View>

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
                  style={[styles.palAvatar, styles.palAvatarLeft]}
                />
                <Image
                  source={PAL_PROFILES[palId].female}
                  style={[styles.palAvatar, styles.palAvatarRight]}
                />
              </View>
              <View style={styles.palHeaderText}>
                <Text style={styles.palName}>{pal.name}</Text>
                <Text style={styles.palTagline}>{pal.tagline}</Text>
              </View>
              <Feather name="chevron-right" size={16} color={Colors.light.textTertiary} />
            </Pressable>

            <View style={styles.missionList}>
              {missions.map((mission) => (
                <MissionRow
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
    fontSize: 24,
    color: Colors.light.text,
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  introSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  tabBar: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.separator,
    marginBottom: 8,
  },
  tabBarInner: {
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  filterTabText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  palSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  palHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.separator,
  },
  palAvatars: {
    flexDirection: "row",
    alignItems: "center",
  },
  palAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.light.background,
  },
  palAvatarLeft: {
    zIndex: 2,
  },
  palAvatarRight: {
    marginLeft: -10,
    zIndex: 1,
  },
  palHeaderText: { flex: 1 },
  palName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
  },
  palTagline: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 1,
  },
  missionList: {
    gap: 0,
  },
  missionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.separator,
  },
  missionIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  missionName: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.text,
  },
});
