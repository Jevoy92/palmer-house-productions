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
  LengthBasedMission,
} from "@/constants/data";
import { useCart, CartItem } from "@/contexts/CartContext";

const PAL_COLORS: Record<PalId, string> = {
  reel: Colors.pal.reel,
  spotlight: Colors.pal.spotlight,
  system: Colors.pal.system,
  evergreen: Colors.pal.evergreen,
};

function Stepper({
  label,
  value,
  onIncrement,
  onDecrement,
  min,
  max,
  color,
}: {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min: number;
  max: number;
  color: string;
}) {
  return (
    <View style={styles.stepper}>
      <Text style={styles.stepperLabel}>{label}</Text>
      <View style={styles.stepperControls}>
        <Pressable
          style={[styles.stepperButton, value <= min && styles.stepperDisabled]}
          onPress={onDecrement}
          disabled={value <= min}
        >
          <Feather name="minus" size={18} color={value <= min ? "#ccc" : color} />
        </Pressable>
        <Text style={styles.stepperValue}>{value}</Text>
        <Pressable
          style={[styles.stepperButton, value >= max && styles.stepperDisabled]}
          onPress={onIncrement}
          disabled={value >= max}
        >
          <Feather name="plus" size={18} color={value >= max ? "#ccc" : color} />
        </Pressable>
      </View>
    </View>
  );
}

function LengthSelector({
  selected,
  onSelect,
  color,
}: {
  selected: number;
  onSelect: (len: number) => void;
  color: string;
}) {
  return (
    <View style={styles.lengthSelector}>
      <Text style={styles.stepperLabel}>Episode Length</Text>
      <View style={styles.lengthOptions}>
        {[5, 10, 15].map((len) => (
          <Pressable
            key={len}
            style={[
              styles.lengthOption,
              selected === len && { backgroundColor: color, borderColor: color },
            ]}
            onPress={() => onSelect(len)}
          >
            <Text
              style={[
                styles.lengthOptionText,
                selected === len && { color: "#fff" },
              ]}
            >
              {len} min
            </Text>
            <Text
              style={[
                styles.lengthOptionPrice,
                selected === len && { color: "rgba(255,255,255,0.85)" },
              ]}
            >
              ${PRICING.EVERGREEN[len].toLocaleString()}
            </Text>
          </Pressable>
        ))}
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
  const color = PAL_COLORS[palId];
  const missions = getMissionsForPal(palId);
  const mission = missions.find((m) => m.id === missionId);

  const isSessionBased = mission?.pricingType === "session-based";
  const sessionMission = mission as SessionBasedMission | undefined;
  const lengthMission = mission as LengthBasedMission | undefined;

  const [sessions, setSessions] = useState(
    sessionMission?.defaultSessions ?? 1
  );
  const [additionalVideos, setAdditionalVideos] = useState(
    sessionMission?.defaultAdditionalVideos ?? 4
  );
  const [episodeLength, setEpisodeLength] = useState(5);
  const [additionalEpisodes, setAdditionalEpisodes] = useState(0);

  const price = useMemo(() => {
    if (!mission) return 0;
    if (isSessionBased) {
      return calculateSessionPrice(sessions, additionalVideos);
    }
    return calculateEvergreenPrice(episodeLength, additionalEpisodes);
  }, [mission, isSessionBased, sessions, additionalVideos, episodeLength, additionalEpisodes]);

  if (!pal || !mission) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Mission not found</Text>
      </View>
    );
  }

  const handleAdd = () => {
    const id =
      Date.now().toString() + Math.random().toString(36).substr(2, 9);
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
    Alert.alert(
      "Added to Package",
      `${mission.name} has been added to your package.`,
      [
        { text: "Keep Browsing", style: "cancel" },
        {
          text: "View Package",
          onPress: () => router.push("/(tabs)/build"),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140, paddingTop: insets.top + 48 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={[styles.palBadge, { backgroundColor: color + "18" }]}>
            <Feather name={pal.icon as any} size={16} color={color} />
            <Text style={[styles.palBadgeText, { color }]}>{pal.name}</Text>
          </View>

          <Text style={styles.missionName}>{mission.name}</Text>
          <Text style={styles.problemStatement}>
            "{mission.problemStatement}"
          </Text>
          <Text style={styles.description}>{mission.description}</Text>

          <View style={styles.includesCard}>
            <Text style={styles.includesLabel}>WHAT'S INCLUDED</Text>
            <Text style={styles.includesText}>{mission.includes}</Text>
          </View>

          <View style={styles.configSection}>
            <Text style={styles.configTitle}>Configure Your Package</Text>

            {isSessionBased ? (
              <>
                <Stepper
                  label="Filming Sessions"
                  value={sessions}
                  onIncrement={() => setSessions((s) => s + 1)}
                  onDecrement={() => setSessions((s) => s - 1)}
                  min={1}
                  max={8}
                  color={color}
                />
                <View style={styles.priceBreakdown}>
                  <Text style={styles.breakdownText}>
                    ${PRICING.SESSION}/session
                  </Text>
                </View>

                <Stepper
                  label="Additional Videos"
                  value={additionalVideos}
                  onIncrement={() => setAdditionalVideos((v) => v + 1)}
                  onDecrement={() => setAdditionalVideos((v) => v - 1)}
                  min={0}
                  max={30}
                  color={color}
                />
                <View style={styles.priceBreakdown}>
                  <Text style={styles.breakdownText}>
                    ${PRICING.ADDITIONAL_VIDEO}/video
                  </Text>
                </View>
              </>
            ) : (
              <>
                <LengthSelector
                  selected={episodeLength}
                  onSelect={setEpisodeLength}
                  color={color}
                />
                <Stepper
                  label="Additional Episodes"
                  value={additionalEpisodes}
                  onIncrement={() => setAdditionalEpisodes((e) => e + 1)}
                  onDecrement={() => setAdditionalEpisodes((e) => e - 1)}
                  min={0}
                  max={10}
                  color={color}
                />
                {additionalEpisodes > 0 && (
                  <View style={styles.priceBreakdown}>
                    <Text style={styles.breakdownText}>
                      +$
                      {(
                        PRICING.EVERGREEN_ADDITIONAL[episodeLength] ?? 525
                      ).toLocaleString()}
                      /additional episode
                    </Text>
                  </View>
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.footerPrice}>
          <Text style={styles.footerPriceLabel}>Estimated Price</Text>
          <Text style={[styles.footerPriceValue, { color }]}>
            ${price.toLocaleString()}
          </Text>
        </View>
        <Pressable
          style={[styles.addButton, { backgroundColor: color }]}
          onPress={handleAdd}
        >
          <Feather name="plus" size={18} color="#fff" />
          <Text style={styles.addButtonText}>Add to Package</Text>
        </Pressable>
      </View>
    </View>
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
  content: { paddingHorizontal: 24 },
  palBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  palBadgeText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
  },
  missionName: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    color: Colors.light.text,
    marginBottom: 12,
  },
  problemStatement: {
    fontFamily: "Inter_500Medium",
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
    lineHeight: 24,
    marginBottom: 24,
  },
  includesCard: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
  },
  includesLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: Colors.light.primary,
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  includesText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.text,
    lineHeight: 20,
  },
  configSection: { marginBottom: 20 },
  configTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: Colors.light.text,
    marginBottom: 20,
  },
  stepper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  stepperLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    color: Colors.light.text,
  },
  stepperControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  stepperButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.light.border,
    alignItems: "center",
    justifyContent: "center",
  },
  stepperDisabled: {
    borderColor: "#eee",
  },
  stepperValue: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: Colors.light.text,
    minWidth: 30,
    textAlign: "center",
  },
  priceBreakdown: { marginBottom: 20, marginTop: 2 },
  breakdownText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  lengthSelector: { marginBottom: 20 },
  lengthOptions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  lengthOption: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.light.border,
    backgroundColor: Colors.light.backgroundSecondary,
  },
  lengthOptionText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
    marginBottom: 4,
  },
  lengthOptionPrice: {
    fontFamily: "Inter_500Medium",
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
    borderTopColor: Colors.light.border,
    paddingHorizontal: 20,
    paddingTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  footerPrice: { flex: 1 },
  footerPriceLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  footerPriceValue: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 14,
  },
  addButtonText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#fff",
  },
});
