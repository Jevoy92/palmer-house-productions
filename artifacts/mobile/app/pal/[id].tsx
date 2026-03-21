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
import { PAL_IMAGES } from "@/constants/images";

const PAL_META: Record<PalId, { color: string; bg: string; icon: string }> = {
  reel: { color: Colors.pal.reel, bg: Colors.pal.reelLight, icon: "smartphone" },
  spotlight: { color: Colors.pal.spotlight, bg: Colors.pal.spotlightLight, icon: "film" },
  system: { color: Colors.pal.system, bg: Colors.pal.systemLight, icon: "settings" },
  evergreen: { color: Colors.pal.evergreen, bg: Colors.pal.evergreenLight, icon: "play-circle" },
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
          <View style={[styles.avatarWrap, { borderColor: meta.bg }]}>
            <Image source={PAL_IMAGES[palId].male} style={styles.avatar} />
          </View>
          <View style={[styles.avatarWrap, styles.avatarOverlap, { borderColor: meta.bg }]}>
            <Image source={PAL_IMAGES[palId].female} style={styles.avatar} />
          </View>
        </View>
        <Text style={styles.palName}>{pal.name}</Text>
        <Text style={styles.characters}>{pal.displayName}</Text>
        <View style={[styles.taglineBadge, { backgroundColor: meta.bg }]}>
          <Text style={[styles.taglineText, { color: meta.color }]}>{pal.tagline}</Text>
        </View>
        <Text style={styles.description}>{pal.description}</Text>
      </View>

      <View style={styles.missionsSection}>
        <Text style={styles.missionsTitle}>
          {missions.length} Available Missions
        </Text>

        {missions.map((mission, index) => (
          <Pressable
            key={mission.id}
            style={styles.missionCard}
            onPress={() => router.push(`/mission/${palId}/${mission.id}`)}
          >
            <View style={styles.missionCardContent}>
              <View style={styles.missionCardTop}>
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
              </View>
              <Text style={styles.missionDesc} numberOfLines={2}>
                {mission.description}
              </Text>
            </View>
            <Feather name="chevron-right" size={16} color={Colors.light.textTertiary} />
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
    paddingBottom: 32,
    alignItems: "center",
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    height: 80,
  },
  avatarWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    overflow: "hidden",
  },
  avatarOverlap: {
    marginLeft: -16,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 36,
  },
  palName: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    color: Colors.light.text,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  characters: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.textSecondary,
    marginBottom: 12,
  },
  taglineBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 100,
    marginBottom: 16,
  },
  taglineText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
  },
  description: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  missionsSection: { paddingHorizontal: 20 },
  missionsTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 17,
    color: Colors.light.text,
    marginBottom: 16,
  },
  missionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    gap: 8,
  },
  missionCardContent: { flex: 1 },
  missionCardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  indexBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  indexText: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
  },
  missionInfo: { flex: 1 },
  missionName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
  },
  missionProblem: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 1,
  },
  missionDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
    lineHeight: 18,
    paddingLeft: 44,
  },
});
