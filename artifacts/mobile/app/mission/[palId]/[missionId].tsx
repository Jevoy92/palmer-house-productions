import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/colors";
import {
  PALS,
  PalId,
  getMissionsForPal,
  calculateSessionPrice,
  calculateEvergreenPrice,
  PRICING,
  SessionBasedMission,
} from "@/constants/data";
import { useCart, CartItem } from "@/contexts/CartContext";

const PAL_META: Record<PalId, { color: string; bg: string; icon: string }> = {
  reel: { color: Colors.pal.reel, bg: Colors.pal.reelLight, icon: "smartphone" },
  spotlight: { color: Colors.pal.spotlight, bg: Colors.pal.spotlightLight, icon: "film" },
  system: { color: Colors.pal.system, bg: Colors.pal.systemLight, icon: "settings" },
  evergreen: { color: Colors.pal.evergreen, bg: Colors.pal.evergreenLight, icon: "play-circle" },
};

function Stepper({
  label,
  value,
  onIncrement,
  onDecrement,
  min,
  max,
}: {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min: number;
  max: number;
}) {
  return (
    <View style={styles.stepper}>
      <Text style={styles.stepperLabel}>{label}</Text>
      <View style={styles.stepperControls}>
        <Pressable
          style={[styles.stepperBtn, value <= min && styles.stepperBtnDisabled]}
          onPress={onDecrement}
          disabled={value <= min}
        >
          <Feather name="minus" size={16} color={value <= min ? Colors.light.textTertiary : Colors.light.text} />
        </Pressable>
        <Text style={styles.stepperValue}>{value}</Text>
        <Pressable
          style={[styles.stepperBtn, value >= max && styles.stepperBtnDisabled]}
          onPress={onIncrement}
          disabled={value >= max}
        >
          <Feather name="plus" size={16} color={value >= max ? Colors.light.textTertiary : Colors.light.text} />
        </Pressable>
      </View>
    </View>
  );
}

export default function MissionDetailScreen() {
  const { palId: palIdParam, missionId } = useLocalSearchParams<{
    palId: string;
    missionId: string;
  }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addItem } = useCart();

  const palId = palIdParam as PalId;
  const pal = PALS[palId];
  const meta = PAL_META[palId];
  const missions = getMissionsForPal(palId);
  const mission = missions.find((m) => m.id === missionId);

  const isSessionBased = mission?.pricingType === "session-based";
  const sessionMission = mission as SessionBasedMission | undefined;

  const [sessions, setSessions] = useState(sessionMission?.defaultSessions ?? 1);
  const [additionalVideos, setAdditionalVideos] = useState(sessionMission?.defaultAdditionalVideos ?? 4);
  const [episodeLength, setEpisodeLength] = useState(5);
  const [additionalEpisodes, setAdditionalEpisodes] = useState(0);

  const price = useMemo(() => {
    if (!mission) return 0;
    if (isSessionBased) return calculateSessionPrice(sessions, additionalVideos);
    return calculateEvergreenPrice(episodeLength, additionalEpisodes);
  }, [mission, isSessionBased, sessions, additionalVideos, episodeLength, additionalEpisodes]);

  if (!pal || !mission) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Not found</Text>
      </View>
    );
  }

  const handleAdd = () => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const item: CartItem = {
      id,
      palId,
      missionId: mission.id,
      missionName: mission.name,
      sessions: isSessionBased ? sessions : 1,
      additionalVideos: isSessionBased ? additionalVideos : 0,
      episodeLength: isSessionBased ? undefined : episodeLength,
      price,
    };
    addItem(item);
    Alert.alert("Added to Package", `${mission.name} added.`, [
      { text: "Keep Browsing", style: "cancel" },
      { text: "View Package", onPress: () => router.push("/(tabs)/build") },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140, paddingTop: insets.top + 56 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.breadcrumb}>
            <View style={[styles.breadcrumbDot, { backgroundColor: meta.color }]} />
            <Text style={[styles.breadcrumbText, { color: meta.color }]}>{pal.name}</Text>
          </View>

          <Text style={styles.missionName}>{mission.name}</Text>
          <Text style={styles.problemStatement}>"{mission.problemStatement}"</Text>
          <Text style={styles.description}>{mission.description}</Text>

          <View style={styles.includesCard}>
            <View style={styles.includesHeader}>
              <Feather name="check-circle" size={16} color={Colors.light.primary} />
              <Text style={styles.includesLabel}>What's Included</Text>
            </View>
            <Text style={styles.includesText}>{mission.includes}</Text>
          </View>

          <View style={styles.configSection}>
            <Text style={styles.configTitle}>Configure</Text>

            {isSessionBased ? (
              <>
                <Stepper
                  label="Filming Sessions"
                  value={sessions}
                  onIncrement={() => setSessions((s) => s + 1)}
                  onDecrement={() => setSessions((s) => s - 1)}
                  min={1}
                  max={8}
                />
                <Text style={styles.rateHint}>${PRICING.SESSION} per session</Text>

                <Stepper
                  label="Additional Videos"
                  value={additionalVideos}
                  onIncrement={() => setAdditionalVideos((v) => v + 1)}
                  onDecrement={() => setAdditionalVideos((v) => v - 1)}
                  min={0}
                  max={30}
                />
                <Text style={styles.rateHint}>${PRICING.ADDITIONAL_VIDEO} per video</Text>
              </>
            ) : (
              <>
                <Text style={styles.stepperLabel}>Episode Length</Text>
                <View style={styles.lengthOptions}>
                  {[5, 10, 15].map((len) => (
                    <Pressable
                      key={len}
                      style={[
                        styles.lengthOption,
                        episodeLength === len && { backgroundColor: meta.color, borderColor: meta.color },
                      ]}
                      onPress={() => setEpisodeLength(len)}
                    >
                      <Text style={[styles.lengthText, episodeLength === len && { color: "#fff" }]}>
                        {len} min
                      </Text>
                      <Text style={[styles.lengthPrice, episodeLength === len && { color: "rgba(255,255,255,0.8)" }]}>
                        ${PRICING.EVERGREEN[len].toLocaleString()}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                <Stepper
                  label="Additional Episodes"
                  value={additionalEpisodes}
                  onIncrement={() => setAdditionalEpisodes((e) => e + 1)}
                  onDecrement={() => setAdditionalEpisodes((e) => e - 1)}
                  min={0}
                  max={10}
                />
                {additionalEpisodes > 0 && (
                  <Text style={styles.rateHint}>
                    +${(PRICING.EVERGREEN_ADDITIONAL[episodeLength] ?? 525).toLocaleString()} per episode
                  </Text>
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.footerPrice}>
          <Text style={styles.footerLabel}>Estimated</Text>
          <Text style={styles.footerAmount}>${price.toLocaleString()}</Text>
        </View>
        <Pressable style={[styles.addButton, { backgroundColor: meta.color }]} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Add to Package</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  errorContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  errorText: { fontFamily: "Inter_500Medium", fontSize: 16, color: Colors.light.textSecondary },
  content: { paddingHorizontal: 20 },
  breadcrumb: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  breadcrumbDot: { width: 8, height: 8, borderRadius: 4 },
  breadcrumbText: { fontFamily: "Inter_500Medium", fontSize: 14 },
  missionName: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    color: Colors.light.text,
    letterSpacing: -0.5,
    marginBottom: 12,
    lineHeight: 34,
  },
  problemStatement: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    color: Colors.light.textSecondary,
    fontStyle: "italic",
    marginBottom: 16,
    lineHeight: 24,
  },
  description: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.textSecondary,
    lineHeight: 22,
    marginBottom: 24,
  },
  includesCard: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 16,
    padding: 18,
    marginBottom: 28,
  },
  includesHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  includesLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: Colors.light.text,
  },
  includesText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
  },
  configSection: {},
  configTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: Colors.light.text,
    letterSpacing: -0.3,
    marginBottom: 20,
  },
  stepper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  stepperLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    color: Colors.light.text,
    marginBottom: 4,
  },
  stepperControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  stepperBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.light.backgroundSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  stepperBtnDisabled: { opacity: 0.4 },
  stepperValue: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 18,
    color: Colors.light.text,
    minWidth: 28,
    textAlign: "center",
  },
  rateHint: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textTertiary,
    marginBottom: 20,
  },
  lengthOptions: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
    marginTop: 8,
  },
  lengthOption: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: Colors.light.backgroundSecondary,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  lengthText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
    marginBottom: 2,
  },
  lengthPrice: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.light.background,
    borderTopWidth: 1,
    borderTopColor: Colors.light.separator,
    paddingHorizontal: 20,
    paddingTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  footerPrice: { flex: 1 },
  footerLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  footerAmount: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: Colors.light.text,
    letterSpacing: -0.5,
  },
  addButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
  },
  addButtonText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#fff",
  },
});
