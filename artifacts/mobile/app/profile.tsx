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

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout } = useAuth();

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

  const roleBadge = {
    guest: { label: "Guest", color: Colors.light.textTertiary, bg: Colors.light.backgroundSecondary },
    registered: { label: "Registered", color: Colors.light.primary, bg: Colors.light.primaryLight },
    member: { label: "Member", color: Colors.pal.evergreen, bg: Colors.pal.evergreenLight },
    admin: { label: "Admin", color: Colors.pal.reel, bg: Colors.pal.reelLight },
  }[user.role] || { label: "Free", color: Colors.light.textTertiary, bg: Colors.light.backgroundSecondary };

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
        <View style={[styles.roleBadge, { backgroundColor: roleBadge.bg }]}>
          <Text style={[styles.roleText, { color: roleBadge.color }]}>{roleBadge.label}</Text>
        </View>
      </View>

      <View style={styles.creditsCard}>
        <Feather name="zap" size={18} color={Colors.light.primary} />
        <View style={styles.creditsInfo}>
          <Text style={styles.creditsLabel}>AI Credits</Text>
          <Text style={styles.creditsValue}>{user.credits} remaining</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>ACCOUNT</Text>
        <View style={styles.sectionCard}>
          <Pressable style={styles.menuItem}>
            <Feather name="user" size={18} color={Colors.light.textSecondary} />
            <Text style={styles.menuText}>Edit Profile</Text>
            <Feather name="chevron-right" size={16} color={Colors.light.textTertiary} />
          </Pressable>
          <View style={styles.divider} />
          <Pressable style={styles.menuItem} onPress={() => router.push("/portal")}>
            <Feather name="folder" size={18} color={Colors.light.textSecondary} />
            <Text style={styles.menuText}>My Projects</Text>
            <Feather name="chevron-right" size={16} color={Colors.light.textTertiary} />
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Pressable style={styles.signOutBtn} onPress={handleLogout}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>
      </View>
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
    borderRadius: 12,
  },
  signInBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#fff",
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 32,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.light.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  avatarText: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    color: "#fff",
  },
  userName: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: Colors.light.text,
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 12,
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
  },
  roleText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
  },
  creditsCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: Colors.light.primaryLight,
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 28,
  },
  creditsInfo: { flex: 1 },
  creditsLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  creditsValue: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: Colors.light.text,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: Colors.light.textTertiary,
    letterSpacing: 0.8,
    marginBottom: 10,
    paddingLeft: 4,
  },
  sectionCard: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 14,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuText: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    color: Colors.light.text,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.separator,
    marginLeft: 48,
  },
  signOutBtn: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  signOutText: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    color: Colors.light.error,
  },
});
