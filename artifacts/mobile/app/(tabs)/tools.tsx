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
import { useAuth } from "@/contexts/AuthContext";

interface ToolCardProps {
  icon: string;
  title: string;
  description: string;
  color: string;
  bg: string;
  credits: number;
  locked?: boolean;
  onPress: () => void;
}

function ToolCard({ icon, title, description, color, bg, credits, locked, onPress }: ToolCardProps) {
  return (
    <Pressable
      style={[styles.toolCard, locked && styles.toolCardLocked]}
      onPress={onPress}
      disabled={locked}
    >
      <View style={styles.toolCardHeader}>
        <View style={[styles.toolIcon, { backgroundColor: bg }]}>
          <Feather name={icon as any} size={20} color={color} />
        </View>
        <View style={[styles.creditBadge, credits === 0 && styles.creditBadgeFree]}>
          {credits === 0 ? (
            <Text style={[styles.creditText, styles.creditTextFree]}>FREE</Text>
          ) : (
            <>
              <Feather name="zap" size={11} color={Colors.light.primary} />
              <Text style={styles.creditText}>{credits}</Text>
            </>
          )}
        </View>
      </View>
      <Text style={styles.toolTitle}>{title}</Text>
      <Text style={styles.toolDesc}>{description}</Text>
      {locked && (
        <View style={styles.lockedOverlay}>
          <Feather name="lock" size={14} color={Colors.light.textTertiary} />
          <Text style={styles.lockedText}>Create account to unlock</Text>
        </View>
      )}
    </Pressable>
  );
}

const TOOLS = [
  {
    icon: "edit-3",
    title: "Script Writer",
    description: "Generate video scripts for any platform or format",
    color: Colors.pal.reel,
    bg: Colors.pal.reelLight,
    credits: 1,
    route: "/tools/script-writer",
  },
  {
    icon: "calendar",
    title: "Content Planner",
    description: "Plan a month of strategic content in minutes",
    color: Colors.pal.system,
    bg: Colors.pal.systemLight,
    credits: 2,
    route: "/tools/content-planner",
  },
  {
    icon: "trending-up",
    title: "What to Post",
    description: "Get personalized recommendations for your next post",
    color: Colors.pal.spotlight,
    bg: Colors.pal.spotlightLight,
    credits: 1,
    route: "/tools/what-to-post",
  },
  {
    icon: "message-circle",
    title: "Hook Generator",
    description: "Create attention-grabbing hooks for your videos",
    color: Colors.pal.evergreen,
    bg: Colors.pal.evergreenLight,
    credits: 1,
    route: "/tools/hook-generator",
  },
  {
    icon: "file-text",
    title: "Brief Builder",
    description: "Create a production brief for your next project",
    color: "#3B82F6",
    bg: "#EFF6FF",
    credits: 2,
    route: "/tools/brief-builder",
  },
  {
    icon: "bar-chart-2",
    title: "Content Audit",
    description: "Analyze your existing content and find gaps",
    color: "#EC4899",
    bg: "#FDF2F8",
    credits: 3,
    route: "/tools/content-audit",
  },
  {
    icon: "video",
    title: "Teleprompter",
    description: "Record yourself with your script scrolling on screen",
    color: "#059669",
    bg: "#ECFDF5",
    credits: 0,
    route: "/tools/teleprompter",
  },
  {
    icon: "check-square",
    title: "Visibility Checklist",
    description: "Your personalized checklist of must-have videos",
    color: Colors.pal.reel,
    bg: Colors.pal.reelLight,
    credits: 1,
    route: "/tools/visibility-checklist",
  },
];

export default function ToolsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, isGuest } = useAuth();

  const credits = user?.credits ?? 3;
  const isLimited = isGuest;

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
        Powered tools to plan, write, and strategize your video content.
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

      <View style={styles.tierInfo}>
        <View style={styles.tierRow}>
          <View style={[styles.tierDot, { backgroundColor: Colors.light.textTertiary }]} />
          <Text style={styles.tierText}>Guest — 3 free credits</Text>
        </View>
        <View style={styles.tierRow}>
          <View style={[styles.tierDot, { backgroundColor: Colors.light.primary }]} />
          <Text style={styles.tierText}>Registered — 10 credits/month</Text>
        </View>
        <View style={styles.tierRow}>
          <View style={[styles.tierDot, { backgroundColor: Colors.pal.evergreen }]} />
          <Text style={styles.tierText}>Member — 50 credits/month + portal</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>All Tools</Text>

      <View style={styles.toolsGrid}>
        {TOOLS.map((tool, index) => (
          <ToolCard
            key={tool.title}
            icon={tool.icon}
            title={tool.title}
            description={tool.description}
            color={tool.color}
            bg={tool.bg}
            credits={tool.credits}
            locked={isLimited && index > 1}
            onPress={() => router.push(tool.route as any)}
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
    marginBottom: 16,
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
  tierInfo: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 14,
    padding: 16,
    gap: 10,
    marginBottom: 28,
  },
  tierRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  tierDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  tierText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  sectionTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 17,
    color: Colors.light.text,
    marginBottom: 16,
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
