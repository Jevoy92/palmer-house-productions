import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
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

const { width } = Dimensions.get("window");

const PAL_COLORS: Record<PalId, { main: string; light: string; bg: string }> = {
  reel: { main: Colors.pal.reel, light: Colors.pal.reelLight, bg: Colors.pal.reelBg },
  spotlight: { main: Colors.pal.spotlight, light: Colors.pal.spotlightLight, bg: Colors.pal.spotlightBg },
  system: { main: Colors.pal.system, light: Colors.pal.systemLight, bg: Colors.pal.systemBg },
  evergreen: { main: Colors.pal.evergreen, light: Colors.pal.evergreenLight, bg: Colors.pal.evergreenBg },
};

function PalSection({ palId }: { palId: PalId }) {
  const router = useRouter();
  const pal = PALS[palId];
  const colors = PAL_COLORS[palId];
  const missions = getMissionsForPal(palId);

  return (
    <View style={[styles.palSection, { backgroundColor: colors.bg }]}>
      <View style={styles.palHeader}>
        <View style={[styles.palIcon, { backgroundColor: colors.light }]}>
          <Feather name={pal.icon as any} size={24} color={colors.main} />
        </View>
        <View style={styles.palInfo}>
          <Text style={[styles.palName, { color: colors.main }]}>{pal.name}</Text>
          <Text style={styles.palCharacters}>{pal.displayName}</Text>
        </View>
      </View>
      <Text style={styles.palTagline}>{pal.tagline}</Text>
      <Text style={styles.palDescription}>{pal.description}</Text>

      <Text style={styles.missionsLabel}>
        {missions.length} MISSION{missions.length !== 1 ? "S" : ""}
      </Text>
      {missions.map((mission) => (
        <Pressable
          key={mission.id}
          style={styles.missionCard}
          onPress={() => router.push(`/mission/${palId}/${mission.id}`)}
        >
          <View style={styles.missionContent}>
            <Text style={styles.missionName}>{mission.name}</Text>
            <Text style={styles.missionProblem} numberOfLines={2}>
              {mission.problemStatement}
            </Text>
          </View>
          <Feather name="chevron-right" size={18} color={Colors.light.textSecondary} />
        </Pressable>
      ))}

      <Pressable
        style={[styles.viewAllButton, { borderColor: colors.main }]}
        onPress={() => router.push(`/pal/${palId}`)}
      >
        <Text style={[styles.viewAllText, { color: colors.main }]}>
          View {pal.name} Details
        </Text>
        <Feather name="arrow-right" size={16} color={colors.main} />
      </Pressable>
    </View>
  );
}

export default function PalsScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.intro}>
        <Text style={styles.introTitle}>
          Pick the Pal that matches{"\n"}where you're stuck
        </Text>
        <Text style={styles.introSubtitle}>
          Each Pal is a character-driven category of video content designed to
          solve specific business problems.
        </Text>
      </View>

      {PAL_ORDER.map((id) => (
        <PalSection key={id} palId={id} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  intro: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 8 },
  introTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: Colors.light.text,
    marginBottom: 8,
  },
  introSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
  },
  palSection: {
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
  },
  palHeader: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 12 },
  palIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  palInfo: { flex: 1 },
  palName: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
  },
  palCharacters: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  palTagline: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 6,
  },
  palDescription: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
    lineHeight: 19,
    marginBottom: 16,
  },
  missionsLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: Colors.light.textSecondary,
    letterSpacing: 1,
    marginBottom: 10,
  },
  missionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  missionContent: { flex: 1 },
  missionName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
    marginBottom: 3,
  },
  missionProblem: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
    fontStyle: "italic",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  viewAllText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
  },
});
