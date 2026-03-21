import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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
import { useAuth } from "@/contexts/AuthContext";
import { TOOLS, getToolsForPal, ToolDefinition } from "@/constants/tools";
import { PalId, PALS } from "@/constants/data";

interface ToolCardProps {
  tool: ToolDefinition;
  locked?: boolean;
  onPress: () => void;
}

const PAL_COLORS: Record<PalId, { main: string; light: string }> = {
  reel: { main: Colors.pal.reel, light: Colors.pal.reelLight },
  spotlight: { main: Colors.pal.spotlight, light: Colors.pal.spotlightLight },
  evergreen: { main: Colors.pal.evergreen, light: Colors.pal.evergreenLight },
  system: { main: Colors.pal.system, light: Colors.pal.systemLight },
};

function ToolCard({ tool, locked, onPress }: ToolCardProps) {
  const palColor = PAL_COLORS[tool.palId];
  const isFree = tool.freeForAll;

  return (
    <Pressable
      style={[styles.toolCard, locked && styles.toolCardLocked]}
      onPress={onPress}
      disabled={locked}
    >
      <View style={styles.toolCardHeader}>
        <View style={[styles.toolIcon, { backgroundColor: palColor.light }]}>
          <Feather name={tool.icon as any} size={20} color={palColor.main} />
        </View>
        <View style={[styles.creditBadge, isFree && styles.creditBadgeFree]}>
          {isFree ? (
            <Text style={[styles.creditText, styles.creditTextFree]}>FREE</Text>
          ) : (
            <>
              <Feather name="zap" size={11} color={Colors.light.primary} />
              <Text style={styles.creditText}>{tool.creditCost}</Text>
            </>
          )}
        </View>
      </View>
      <Text style={styles.toolTitle}>{tool.name}</Text>
      <Text style={styles.toolDesc} numberOfLines={2}>{tool.description}</Text>
      {locked && (
        <View style={styles.lockedOverlay}>
          <Feather name="lock" size={14} color={Colors.light.textTertiary} />
          <Text style={styles.lockedText}>Create account to unlock</Text>
        </View>
      )}
    </Pressable>
  );
}

const PAL_TABS: { id: "all" | PalId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "reel", label: "Reel" },
  { id: "spotlight", label: "Spotlight" },
  { id: "evergreen", label: "Evergreen" },
  { id: "system", label: "System" },
];

export default function ToolsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, isGuest } = useAuth();
  const [activeTab, setActiveTab] = useState<"all" | PalId>("all");

  const credits = user?.credits ?? 3;
  const isLimited = isGuest;

  const filteredTools = activeTab === "all" ? TOOLS : getToolsForPal(activeTab);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: insets.top + 16,
        paddingBottom: 120,
        paddingHorizontal: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.screenTitle}>Tools</Text>
      <Text style={styles.headline}>AI content assistant</Text>
      <Text style={styles.subtitle}>
        {TOOLS.length} AI-powered tools to plan, write, and strategize your video content.
      </Text>

      <View style={styles.creditsCard}>
        <View style={styles.creditsLeft}>
          <Feather name="zap" size={18} color={Colors.light.primary} />
          <View>
            <Text style={styles.creditsLabel}>Available Credits</Text>
            <Text style={styles.creditsCount}>{credits} credits</Text>
          </View>
        </View>
        {isLimited ? (
          <Pressable
            style={styles.upgradeBtn}
            onPress={() => router.push("/auth/register")}
          >
            <Text style={styles.upgradeBtnText}>Sign Up for More</Text>
          </Pressable>
        ) : (
          <Pressable
            style={styles.buyCreditsBtn}
            onPress={() => Alert.alert("Buy Credits", "Credit purchasing will be available soon via the App Store. Stay tuned!")}
          >
            <Feather name="plus" size={14} color={Colors.light.primary} />
            <Text style={styles.buyCreditsText}>Buy Credits</Text>
          </Pressable>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
        style={styles.tabsScroll}
      >
        {PAL_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const color = tab.id !== "all" ? PAL_COLORS[tab.id].main : Colors.light.primary;
          return (
            <Pressable
              key={tab.id}
              style={[
                styles.tab,
                isActive && { backgroundColor: color },
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text
                style={[
                  styles.tabText,
                  isActive && styles.tabTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {activeTab !== "all" && (
        <View style={styles.palInfo}>
          <View style={[styles.palDot, { backgroundColor: PAL_COLORS[activeTab].main }]} />
          <Text style={styles.palInfoText}>
            {PALS[activeTab].name} — {PALS[activeTab].tagline}
          </Text>
        </View>
      )}

      <View style={styles.toolsGrid}>
        {filteredTools.map((tool, index) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            locked={isLimited && !tool.freeForAll && index > 1}
            onPress={() => router.push(`/tools/${tool.id}` as any)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  screenTitle: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: Colors.light.primary,
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  headline: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    color: Colors.light.text,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.textSecondary,
    lineHeight: 22,
    marginBottom: 24,
  },
  creditsCard: {
    backgroundColor: Colors.light.primaryLight,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  creditsLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  creditsLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  creditsCount: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: Colors.light.text,
  },
  upgradeBtn: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  upgradeBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: "#fff",
  },
  buyCreditsBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.light.primary + "30",
  },
  buyCreditsText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: Colors.light.primary,
  },
  tabsScroll: {
    marginBottom: 16,
    marginHorizontal: -20,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.light.backgroundSecondary,
  },
  tabText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  tabTextActive: {
    color: "#fff",
  },
  palInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  palDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  palInfoText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  toolsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  toolCard: {
    width: "48.5%",
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 16,
    padding: 16,
  },
  toolCardLocked: {
    opacity: 0.5,
  },
  toolCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  toolIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  creditBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: Colors.light.primaryLight,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
  },
  creditText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: Colors.light.primary,
  },
  creditBadgeFree: {
    backgroundColor: "#ECFDF5",
  },
  creditTextFree: {
    color: "#059669",
  },
  toolTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
    marginBottom: 4,
  },
  toolDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
    lineHeight: 18,
  },
  lockedOverlay: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 10,
  },
  lockedText: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: Colors.light.textTertiary,
  },
});
