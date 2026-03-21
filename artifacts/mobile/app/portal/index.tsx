import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/colors";
import { useAuth } from "@/contexts/AuthContext";

interface ProjectCardProps {
  title: string;
  status: string;
  statusColor: string;
  date: string;
  pal: string;
}

function ProjectCard({ title, status, statusColor, date, pal }: ProjectCardProps) {
  return (
    <View style={styles.projectCard}>
      <View style={styles.projectHeader}>
        <Text style={styles.projectTitle}>{title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + "15" }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>{status}</Text>
        </View>
      </View>
      <View style={styles.projectMeta}>
        <Text style={styles.projectMetaText}>{pal}</Text>
        <Text style={styles.projectMetaDot}>·</Text>
        <Text style={styles.projectMetaText}>{date}</Text>
      </View>
    </View>
  );
}

export default function PortalScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useAuth();

  const isMember = user?.role === "member" || user?.role === "admin";

  if (!user) {
    return (
      <View style={[styles.container, styles.center, { paddingTop: insets.top }]}>
        <View style={styles.lockedCard}>
          <View style={styles.lockedIcon}>
            <Feather name="lock" size={28} color={Colors.light.primary} />
          </View>
          <Text style={styles.lockedTitle}>Sign in to access</Text>
          <Text style={styles.lockedText}>
            Create an account or sign in to track your projects, review drafts, and access delivered assets.
          </Text>
          <Pressable
            style={styles.signInBtn}
            onPress={() => router.push("/auth/login")}
          >
            <Text style={styles.signInBtnText}>Sign In</Text>
          </Pressable>
        </View>
      </View>
    );
  }

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
      <Text style={styles.screenTitle}>Portal</Text>
      <Text style={styles.headline}>Your projects</Text>
      <Text style={styles.subtitle}>
        Track progress, review drafts, and access your delivered assets.
      </Text>

      {!isMember && (
        <View style={styles.upgradeCard}>
          <Feather name="star" size={18} color={Colors.light.primary} />
          <View style={styles.upgradeInfo}>
            <Text style={styles.upgradeTitle}>Upgrade to Member</Text>
            <Text style={styles.upgradeText}>
              Full portal access with project tracking, draft review, and delivered asset management.
            </Text>
          </View>
        </View>
      )}

      <Text style={styles.sectionTitle}>Active Projects</Text>

      <View style={styles.emptyState}>
        <View style={styles.emptyIcon}>
          <Feather name="folder" size={24} color={Colors.light.textTertiary} />
        </View>
        <Text style={styles.emptyTitle}>No active projects</Text>
        <Text style={styles.emptyText}>
          When you start a project with us, you'll be able to track its progress here.
        </Text>
        <Pressable
          style={styles.exploreBtn}
          onPress={() => router.push("/(tabs)/pals")}
        >
          <Text style={styles.exploreBtnText}>Explore Services</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>How it works</Text>
      <View style={styles.howItWorks}>
        {[
          { icon: "send", title: "Submit Request", desc: "Build your package and submit a project request" },
          { icon: "phone-call", title: "Discovery Call", desc: "We'll reach out to finalize details and timeline" },
          { icon: "video", title: "Production", desc: "Track filming, editing, and revision progress" },
          { icon: "check-circle", title: "Review & Approve", desc: "Review rough drafts and approve final deliverables" },
          { icon: "download", title: "Delivered", desc: "Access your final videos and assets" },
        ].map((step, i) => (
          <View key={i} style={styles.howStep}>
            <View style={styles.howStepIcon}>
              <Feather name={step.icon as any} size={16} color={Colors.light.primary} />
            </View>
            <View style={styles.howStepContent}>
              <Text style={styles.howStepTitle}>{step.title}</Text>
              <Text style={styles.howStepDesc}>{step.desc}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  center: { alignItems: "center", justifyContent: "center" },
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
  lockedCard: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    margin: 24,
  },
  lockedIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.light.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  lockedTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: Colors.light.text,
    marginBottom: 8,
  },
  lockedText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  signInBtn: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
  },
  signInBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#fff",
  },
  upgradeCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: Colors.light.primaryLight,
    borderRadius: 16,
    padding: 16,
    marginBottom: 28,
  },
  upgradeInfo: { flex: 1 },
  upgradeTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
    marginBottom: 4,
  },
  upgradeText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
    lineHeight: 18,
  },
  sectionTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 17,
    color: Colors.light.text,
    marginBottom: 16,
  },
  projectCard: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  projectTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
    flex: 1,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
  },
  projectMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  projectMetaText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  projectMetaDot: {
    color: Colors.light.textTertiary,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 36,
    marginBottom: 28,
  },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.light.backgroundSecondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 6,
  },
  emptyText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  exploreBtn: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  exploreBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#fff",
  },
  howItWorks: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 16,
    padding: 20,
    gap: 18,
  },
  howStep: {
    flexDirection: "row",
    gap: 14,
  },
  howStepIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.light.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  howStepContent: { flex: 1 },
  howStepTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 2,
  },
  howStepDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
    lineHeight: 18,
  },
});
