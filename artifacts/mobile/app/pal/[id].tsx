import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/colors";
import { PALS, PalId, getMissionsForPal } from "@/constants/data";
import { PAL_PROFILES } from "@/constants/images";

const PAL_META: Record<PalId, { color: string; bg: string }> = {
  reel: { color: Colors.pal.reel, bg: Colors.pal.reelLight },
  spotlight: { color: Colors.pal.spotlight, bg: Colors.pal.spotlightLight },
  system: { color: Colors.pal.system, bg: Colors.pal.systemLight },
  evergreen: { color: Colors.pal.evergreen, bg: Colors.pal.evergreenLight },
};

export default function PalDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const palId = id as PalId;
  const pal = PALS[palId];
  const missions = getMissionsForPal(palId);
  const meta = PAL_META[palId];

  if (!pal) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Not found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.header, { paddingTop: insets.top + 56 }]}>
        <View style={styles.avatarRow}>
          <Image source={PAL_PROFILES[palId].male} style={[styles.avatar, { borderColor: meta.bg }]} />
          <Image source={PAL_PROFILES[palId].female} style={[styles.avatar, styles.avatarOverlap, { borderColor: meta.bg }]} />
        </View>
        <Text style={styles.palName}>{pal.name}</Text>
        <Text style={styles.characters}>{pal.displayName} · {pal.tagline}</Text>
        <Text style={styles.description}>{pal.description}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.missionsSection}>
        <Text style={styles.missionsLabel}>
          {missions.length} MISSIONS
        </Text>

        {missions.map((mission, index) => (
          <Pressable
            key={mission.id}
            style={styles.missionRow}
            onPress={() => router.push(`/mission/${palId}/${mission.id}`)}
          >
            <View style={[styles.indexBadge, { backgroundColor: meta.bg }]}>
              <Text style={[styles.indexText, { color: meta.color }]}>
                {String(index + 1).padStart(2, "0")}
              </Text>
            </View>
            <View style={styles.missionInfo}>
              <Text style={styles.missionName}>{mission.name}</Text>
              <Text style={styles.missionProblem} numberOfLines={1}>
                {mission.problemStatement}
              </Text>
            </View>
            <Feather name="chevron-right" size={14} color={Colors.light.textTertiary} />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  errorContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  errorText: { fontFamily: "Inter_500Medium", fontSize: 16, color: Colors.light.textSecondary },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    alignItems: "center",
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
  },
  avatarOverlap: {
    marginLeft: -14,
  },
  palName: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    color: Colors.light.text,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  characters: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 12,
  },
  description: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    textAlign: "center",
    lineHeight: 21,
    paddingHorizontal: 20,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.separator,
    marginHorizontal: 20,
  },
  missionsSection: { paddingHorizontal: 20, paddingTop: 16 },
  missionsLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: Colors.light.textTertiary,
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  missionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.separator,
  },
  indexBadge: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  indexText: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
  },
  missionInfo: { flex: 1 },
  missionName: {
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    color: Colors.light.text,
  },
  missionProblem: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 1,
  },
});
