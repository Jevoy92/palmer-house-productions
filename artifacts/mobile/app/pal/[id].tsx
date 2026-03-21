import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/colors";
import { PALS, PalId, getMissionsForPal } from "@/constants/data";

const PAL_GRADIENTS: Record<PalId, string[]> = {
  reel: ["#D97706", "#B45309"],
  spotlight: ["#6B3FA0", "#4A2B70"],
  system: ["#0F766E", "#0D5C56"],
  evergreen: ["#6B8E23", "#4A6B10"],
};

export default function PalDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const palId = id as PalId;
  const pal = PALS[palId];
  const missions = getMissionsForPal(palId);
  const gradient = PAL_GRADIENTS[palId] || PAL_GRADIENTS.reel;

  if (!pal) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Pal not found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={gradient as [string, string]}
        style={[styles.header, { paddingTop: insets.top + 48 }]}
      >
        <View style={styles.headerIcon}>
          <Feather name={pal.icon as any} size={32} color="#fff" />
        </View>
        <Text style={styles.headerName}>{pal.name}</Text>
        <Text style={styles.headerCharacters}>{pal.displayName}</Text>
        <Text style={styles.headerTagline}>{pal.tagline}</Text>
        <Text style={styles.headerDescription}>{pal.description}</Text>
      </LinearGradient>

      <View style={styles.missionsSection}>
        <Text style={styles.missionsTitle}>Available Missions</Text>
        <Text style={styles.missionsSubtitle}>
          Each mission targets a specific problem. Tap to see details and add to
          your package.
        </Text>

        {missions.map((mission, index) => (
          <Pressable
            key={mission.id}
            style={styles.missionCard}
            onPress={() => router.push(`/mission/${palId}/${mission.id}`)}
          >
            <View style={styles.missionIndex}>
              <Text style={[styles.missionIndexText, { color: gradient[0] }]}>
                {String(index + 1).padStart(2, "0")}
              </Text>
            </View>
            <View style={styles.missionContent}>
              <Text style={styles.missionName}>{mission.name}</Text>
              <Text style={styles.missionProblem}>
                "{mission.problemStatement}"
              </Text>
              <Text style={styles.missionDesc} numberOfLines={2}>
                {mission.description}
              </Text>
            </View>
            <Feather
              name="chevron-right"
              size={20}
              color={Colors.light.textSecondary}
            />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 36,
    alignItems: "center",
  },
  headerIcon: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  headerName: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    color: "#fff",
    marginBottom: 4,
  },
  headerCharacters: {
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 12,
  },
  headerTagline: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: "rgba(255,255,255,0.95)",
    marginBottom: 10,
  },
  headerDescription: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  missionsSection: { paddingHorizontal: 20, paddingTop: 28 },
  missionsTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: Colors.light.text,
    marginBottom: 6,
  },
  missionsSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
    marginBottom: 20,
  },
  missionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
  },
  missionIndex: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.light.backgroundSecondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  missionIndexText: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
  },
  missionContent: { flex: 1 },
  missionName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 4,
  },
  missionProblem: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
    fontStyle: "italic",
    marginBottom: 4,
  },
  missionDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
    lineHeight: 18,
  },
});
