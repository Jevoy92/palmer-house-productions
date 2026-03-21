import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
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
import { TOOLS, getToolsForPal, ToolDefinition, PAL_TOOL_CATEGORIES } from "@/constants/tools";
import { PalId, PALS } from "@/constants/data";
import { useAuth } from "@/contexts/AuthContext";
import { useActivePal } from "@/contexts/ActivePalContext";

const PAL_COLORS: Record<PalId, { main: string; light: string }> = {
  reel: { main: Colors.pal.reel, light: Colors.pal.reelLight },
  spotlight: { main: Colors.pal.spotlight, light: Colors.pal.spotlightLight },
  evergreen: { main: Colors.pal.evergreen, light: Colors.pal.evergreenLight },
  system: { main: Colors.pal.system, light: Colors.pal.systemLight },
};

function ToolRow({ tool, locked, onPress }: { tool: ToolDefinition; locked?: boolean; onPress: () => void }) {
  const palColor = PAL_COLORS[tool.palId];
  const isFree = tool.freeForAll;

  return (
    <Pressable
      style={[styles.toolRow, locked && styles.toolRowLocked]}
      onPress={onPress}
      disabled={locked}
    >
      <View style={[styles.toolIcon, { backgroundColor: palColor.light }]}>
        <Feather name={tool.icon as any} size={16} color={palColor.main} />
      </View>
      <View style={styles.toolInfo}>
        <Text style={styles.toolTitle} numberOfLines={1}>{tool.name}</Text>
      </View>
      {isFree ? (
        <View style={styles.freeBadge}>
          <Text style={styles.freeText}>FREE</Text>
        </View>
      ) : (
        <View style={styles.creditBadge}>
          <Feather name="zap" size={10} color={Colors.light.primary} />
          <Text style={styles.creditText}>{tool.creditCost}</Text>
        </View>
      )}
      {locked ? (
        <Feather name="lock" size={12} color={Colors.light.textTertiary} />
      ) : (
        <Feather name="chevron-right" size={14} color={Colors.light.textTertiary} />
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

function PalSectionHeader({ palId }: { palId: PalId }) {
  const cat = PAL_TOOL_CATEGORIES.find((c) => c.palId === palId);
  const color = PAL_COLORS[palId];
  if (!cat) return null;

  return (
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionDot, { backgroundColor: color.main }]} />
      <Text style={styles.sectionTitle}>{cat.label}</Text>
    </View>
  );
}

export default function ToolsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, isGuest } = useAuth();
  const { activePal, setActivePal, accentColor } = useActivePal();

  const credits = user?.credits ?? 3;
  const isLimited = isGuest;

  const activeTab: "all" | PalId = activePal ?? "all";

  const orderedPals: PalId[] = activeTab !== "all"
    ? [activeTab, ...PAL_TOOL_CATEGORIES.filter((c) => c.palId !== activeTab).map((c) => c.palId)]
    : PAL_TOOL_CATEGORIES.map((c) => c.palId);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: insets.top + 16,
        paddingBottom: 120,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerArea}>
        <Text style={styles.headline}>Tools</Text>
        <View style={styles.creditsInline}>
          <Feather name="zap" size={14} color={accentColor} />
          <Text style={styles.creditsCount}>{credits}</Text>
          <Text style={styles.creditsLabel}>credits</Text>
          {isLimited ? (
            <Pressable
              style={styles.upgradeLink}
              onPress={() => router.push("/auth/register")}
            >
              <Text style={[styles.upgradeLinkText, { color: accentColor }]}>Get more</Text>
            </Pressable>
          ) : (
            <Pressable
              style={styles.upgradeLink}
              onPress={() => Alert.alert("Buy Credits", "Credit purchasing will be available soon via the App Store.")}
            >
              <Text style={[styles.upgradeLinkText, { color: accentColor }]}>Buy more</Text>
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.tabBar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBarInner}
        >
          {PAL_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const color = tab.id !== "all" ? PAL_COLORS[tab.id].main : Colors.light.text;
            return (
              <Pressable
                key={tab.id}
                style={[styles.tab, isActive && { borderBottomColor: color }]}
                onPress={() => setActivePal(tab.id === "all" ? null : tab.id)}
              >
                <Text
                  style={[
                    styles.tabText,
                    isActive && { color, fontFamily: "Inter_600SemiBold" },
                  ]}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.toolsArea}>
        {activeTab !== "all" ? (
          <>
            {getToolsForPal(activeTab).map((tool) => (
              <ToolRow
                key={tool.id}
                tool={tool}
                locked={isLimited && !tool.freeForAll}
                onPress={() => router.push(`/tools/${tool.id}` as any)}
              />
            ))}
          </>
        ) : (
          orderedPals.map((palId) => {
            const palTools = getToolsForPal(palId);
            if (palTools.length === 0) return null;
            return (
              <View key={palId} style={styles.categorySection}>
                <PalSectionHeader palId={palId} />
                {palTools.map((tool) => (
                  <ToolRow
                    key={tool.id}
                    tool={tool}
                    locked={isLimited && !tool.freeForAll}
                    onPress={() => router.push(`/tools/${tool.id}` as any)}
                  />
                ))}
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  headerArea: {
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  headline: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    color: Colors.light.text,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  creditsInline: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  creditsCount: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: Colors.light.text,
  },
  creditsLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
    flex: 1,
  },
  upgradeLink: {},
  upgradeLinkText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
  },
  tabBar: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.separator,
    marginBottom: 4,
  },
  tabBarInner: {
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  toolsArea: {
    paddingHorizontal: 20,
  },
  categorySection: {
    marginBottom: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    marginTop: 8,
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  sectionTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: Colors.light.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  toolRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.separator,
  },
  toolRowLocked: {
    opacity: 0.45,
  },
  toolIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  toolInfo: {
    flex: 1,
  },
  toolTitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.text,
  },
  creditBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.light.separator,
  },
  creditText: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: Colors.light.primary,
  },
  freeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#BBF7D0",
    backgroundColor: "#F0FDF4",
  },
  freeText: {
    fontFamily: "Inter_500Medium",
    fontSize: 10,
    color: "#15803D",
    letterSpacing: 0.3,
  },
});
