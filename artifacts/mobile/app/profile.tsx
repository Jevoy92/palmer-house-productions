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
import { useUsage } from "@/contexts/UsageContext";
import {
  getTierForCreditsUsed,
  getNextTier,
  getTierProgress,
} from "@/constants/gamification";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { stats, toolsMastered, uniqueToolsUsed } = useUsage();

  const tier = getTierForCreditsUsed(stats.totalCreditsUsed);
  const nextTier = getNextTier(stats.totalCreditsUsed);
  const progress = getTierProgress(stats.totalCreditsUsed);

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/welcome");
        },
      },
    ]);
  };

  if (!user) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.notSignedIn}>Not signed in</Text>
        <Pressable style={styles.signInBtn} onPress={() => router.push("/auth/login")}>
          <Text style={styles.signInBtnText}>Sign In</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
          </Text>
        </View>
        <Text style={styles.userName}>{user.fullName}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.tierSection}>
        <View style={styles.tierRow}>
          <Feather name={tier.icon as any} size={18} color={tier.color} />
          <Text style={[styles.tierLabel, { color: tier.color }]}>{tier.label}</Text>
        </View>
        {nextTier && (
          <>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: tier.color }]} />
            </View>
            <Text style={styles.progressText}>
              {stats.totalCreditsUsed} / {nextTier.minCreditsUsed} credits to {nextTier.label}
            </Text>
          </>
        )}
        {!nextTier && (
          <Text style={styles.progressText}>Max tier reached</Text>
        )}
      </View>

      <View style={styles.divider} />

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.credits}</Text>
          <Text style={styles.statLabel}>Credits</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.totalGenerations}</Text>
          <Text style={styles.statLabel}>Generations</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{uniqueToolsUsed}</Text>
          <Text style={styles.statLabel}>Tools Used</Text>
        </View>
      </View>

      {toolsMastered > 0 && (
        <View style={styles.masteredRow}>
          <Feather name="award" size={14} color={Colors.pal.evergreen} />
          <Text style={styles.masteredText}>{toolsMastered} tool{toolsMastered > 1 ? "s" : ""} mastered (5+ uses)</Text>
        </View>
      )}

      <View style={styles.divider} />

      <View style={styles.sectionLabel}>
        <Text style={styles.sectionLabelText}>ACCOUNT</Text>
      </View>
      <View style={styles.menuGroup}>
        <Pressable style={styles.menuItem}>
          <Feather name="user" size={16} color={Colors.light.textSecondary} />
          <Text style={styles.menuText}>Edit Profile</Text>
          <Feather name="chevron-right" size={14} color={Colors.light.textTertiary} />
        </Pressable>
        <Pressable style={styles.menuItem} onPress={() => router.push("/portal")}>
          <Feather name="folder" size={16} color={Colors.light.textSecondary} />
          <Text style={styles.menuText}>My Projects</Text>
          <Feather name="chevron-right" size={14} color={Colors.light.textTertiary} />
        </Pressable>
      </View>

      <Pressable style={styles.signOutBtn} onPress={handleLogout}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  center: { alignItems: "center", justifyContent: "center" },
  notSignedIn: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    color: Colors.light.textSecondary,
    marginBottom: 16,
  },
  signInBtn: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  signInBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#fff",
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.light.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: "#fff",
  },
  userName: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: Colors.light.text,
    marginBottom: 2,
  },
  userEmail: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.separator,
    marginHorizontal: 20,
  },
  tierSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  tierRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  tierLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 6,
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
  progressText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.light.textTertiary,
  },
  statsGrid: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: Colors.light.text,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: Colors.light.textTertiary,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: Colors.light.separator,
  },
  masteredRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  masteredText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  sectionLabel: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionLabelText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: Colors.light.textTertiary,
    letterSpacing: 0.8,
  },
  menuGroup: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.separator,
  },
  menuText: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.text,
  },
  signOutBtn: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  signOutText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: Colors.light.error,
  },
});
