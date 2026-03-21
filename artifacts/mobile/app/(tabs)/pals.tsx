import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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

const { width } = Dimensions.get("window");

const PAL_META: Record<PalId, { color: string; bg: string; icon: string }> = {
  reel: { color: Colors.pal.reel, bg: Colors.pal.reelLight, icon: "smartphone" },
  spotlight: { color: Colors.pal.spotlight, bg: Colors.pal.spotlightLight, icon: "film" },
  system: { color: Colors.pal.system, bg: Colors.pal.systemLight, icon: "settings" },
  evergreen: { color: Colors.pal.evergreen, bg: Colors.pal.evergreenLight, icon: "play-circle" },
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

  return (
    <Pressable
      style={styles.missionCard}
      onPress={() => router.push(`/mission/${palId}/${mission.id}`)}
    >
      <View style={styles.missionTop}>
        <View style={[styles.missionDot, { backgroundColor: meta.color }]} />
        <Text style={styles.missionPalLabel}>{PALS[palId].name}</Text>
      </View>
      <Text style={styles.missionName}>{mission.name}</Text>
      <Text style={styles.missionProblem} numberOfLines={2}>
        {mission.problemStatement}
      </Text>
      <View style={styles.missionFooter}>
        <Text style={[styles.missionCta, { color: meta.color }]}>View Details</Text>
        <Feather name="arrow-right" size={14} color={meta.color} />
      </View>
    </Pressable>
  );
}

export default function PalsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<PalId | "all">("all");

  const filteredPals = activeFilter === "all" ? PAL_ORDER : [activeFilter];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.intro}>
        <Text style={styles.introTitle}>Find your fit</Text>
        <Text style={styles.introSubtitle}>
          Each Pal category targets a specific business challenge. Browse missions to build your package.
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
          onPress={() => setActiveFilter("all")}
        />
        {PAL_ORDER.map((id) => (
          <FilterChip
            key={id}
            label={PALS[id].name}
            active={activeFilter === id}
            color={PAL_META[id].color}
            onPress={() => setActiveFilter(id)}
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
                <Text style={styles.palTagline}>{pal.displayName} · {pal.tagline}</Text>
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
    marginBottom: 6,
  },
  introSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.textSecondary,
    lineHeight: 21,
  },
  chips: {
    paddingHorizontal: 20,
    paddingVertical: 16,
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
    marginBottom: 28,
  },
  palHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 12,
  },
  palAvatars: {
    flexDirection: "row",
    alignItems: "center",
  },
  palAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    fontSize: 17,
    color: Colors.light.text,
  },
  palTagline: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
    marginTop: 1,
  },
  palArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
    width: (width - 50) / 2,
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 16,
    padding: 16,
  },
  missionTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  missionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  missionPalLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: Colors.light.textSecondary,
    letterSpacing: 0.3,
  },
  missionName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
    marginBottom: 4,
    lineHeight: 20,
  },
  missionProblem: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.light.textSecondary,
    lineHeight: 17,
    marginBottom: 12,
  },
  missionFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  missionCta: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
  },
});
