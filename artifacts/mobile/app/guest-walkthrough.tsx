import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/colors";

const WALKTHROUGH_COMPLETE_KEY = "@palmer_walkthrough_complete";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface WalkthroughStep {
  id: string;
  icon: keyof typeof Feather.glyphMap;
  iconBg: string;
  iconColor: string;
  greeting: string;
  title: string;
  body: string;
  tip: string;
}

const STEPS: WalkthroughStep[] = [
  {
    id: "welcome",
    icon: "film",
    iconBg: Colors.light.primaryLight,
    iconColor: Colors.light.primary,
    greeting: "Hey there! 👋",
    title: "Welcome to Palmer House",
    body: "I'm your guide to getting the most out of this app. Palmer House Productions helps businesses create video content systems that actually drive results — not just pretty footage.",
    tip: "Think of this app as your video strategy partner, available anytime you need it.",
  },
  {
    id: "explore",
    icon: "compass",
    iconBg: Colors.pal.reelLight,
    iconColor: Colors.pal.reel,
    greeting: "Let's explore! 🎬",
    title: "Browse Video Services",
    body: "We've organized our services into four categories called Pals — Reel, Spotlight, System, and Evergreen. Each one solves a different business problem with video.",
    tip: "Start by browsing the Pals tab to find which video type matches your biggest challenge right now.",
  },
  {
    id: "build",
    icon: "package",
    iconBg: Colors.pal.systemLight,
    iconColor: Colors.pal.system,
    greeting: "Make it yours! 📦",
    title: "Build Custom Packages",
    body: "Found something you like? Use the Build tab to customize your video package — pick your sessions, add extras, and see pricing instantly. No surprises, no back-and-forth.",
    tip: "You can mix and match services from different Pals to create the perfect package for your goals.",
  },
  {
    id: "ai-tools",
    icon: "edit-3",
    iconBg: Colors.pal.evergreenLight,
    iconColor: Colors.pal.evergreen,
    greeting: "Your AI toolkit! ✨",
    title: "AI-Powered Content Tools",
    body: "Access free AI tools to plan your content strategy — from script writing and hook generation to content audits and posting schedules. It's like having a creative director on call.",
    tip: "Try the Script Writer tool first — it'll give you a feel for how AI can supercharge your content.",
  },
  {
    id: "tracking",
    icon: "clipboard",
    iconBg: Colors.pal.spotlightLight,
    iconColor: Colors.pal.spotlight,
    greeting: "Stay on track! 📋",
    title: "Track Your Projects",
    body: "Once you're a member, you can track your active projects, review deliverables, and stay in the loop on production timelines — all from the app. No more email chains or missed updates.",
    tip: "Create an account when you're ready to unlock project tracking and keep everything organized in one place.",
  },
  {
    id: "ready",
    icon: "check-circle",
    iconBg: Colors.light.primaryLight,
    iconColor: Colors.light.primary,
    greeting: "You're all set! 🚀",
    title: "Ready to Explore",
    body: "That's the quick tour! Browse everything at your own pace. When you're ready to get started for real, create an account to save your packages and track projects.",
    tip: "Everything you see as a guest is fully available — no hidden paywalls or locked features.",
  },
];

export default function GuestWalkthroughScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const completeWalkthrough = async () => {
    try {
      await AsyncStorage.setItem(WALKTHROUGH_COMPLETE_KEY, "true");
    } finally {
      router.replace("/(tabs)");
    }
  };

  const goNext = () => {
    if (currentIndex < STEPS.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      completeWalkthrough();
    }
  };

  const renderStep = ({ item }: { item: WalkthroughStep }) => (
    <View style={[styles.stepContainer, { width: SCREEN_WIDTH }]}>
      <View style={styles.stepContent}>
        <View style={[styles.iconWrap, { backgroundColor: item.iconBg }]}>
          <Feather name={item.icon} size={32} color={item.iconColor} />
        </View>

        <View style={styles.chatBubble}>
          <Text style={styles.greeting}>{item.greeting}</Text>
          <Text style={styles.stepTitle}>{item.title}</Text>
          <Text style={styles.stepBody}>{item.body}</Text>
        </View>

        <View style={styles.tipCard}>
          <Feather name="zap" size={14} color={Colors.light.primary} />
          <Text style={styles.tipText}>{item.tip}</Text>
        </View>
      </View>
    </View>
  );

  const isLastStep = currentIndex === STEPS.length - 1;

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 }]}>
      <View style={styles.header}>
        <View style={styles.stepIndicator}>
          <Text style={styles.stepCount}>
            {currentIndex + 1} of {STEPS.length}
          </Text>
        </View>
        <Pressable onPress={completeWalkthrough} hitSlop={12}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>

      <View style={styles.progressBarContainer}>
        {STEPS.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressSegment,
              index <= currentIndex && styles.progressSegmentActive,
            ]}
          />
        ))}
      </View>

      <FlatList
        ref={flatListRef}
        data={STEPS}
        renderItem={renderStep}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        style={styles.flatList}
      />

      <View style={styles.footer}>
        <Pressable
          style={[styles.nextBtn, isLastStep && styles.nextBtnFinal]}
          onPress={goNext}
        >
          <Text style={styles.nextBtnText}>
            {isLastStep ? "Get Started" : "Next"}
          </Text>
          {!isLastStep && <Feather name="arrow-right" size={18} color="#fff" />}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  stepIndicator: {
    backgroundColor: Colors.light.backgroundSecondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  stepCount: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  skipText: {
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    color: Colors.light.textSecondary,
  },
  progressBarContainer: {
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  progressSegment: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.light.backgroundTertiary,
  },
  progressSegmentActive: {
    backgroundColor: Colors.light.primary,
  },
  flatList: {
    flex: 1,
  },
  stepContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  stepContent: {
    alignItems: "center",
    gap: 24,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  chatBubble: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 20,
    borderTopLeftRadius: 6,
    padding: 24,
    width: "100%",
  },
  greeting: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: Colors.light.primary,
    marginBottom: 8,
  },
  stepTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: Colors.light.text,
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  stepBody: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.textSecondary,
    lineHeight: 23,
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: Colors.light.primaryLight,
    borderRadius: 14,
    padding: 16,
    width: "100%",
  },
  tipText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.text,
    lineHeight: 21,
    flex: 1,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  nextBtn: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  nextBtnFinal: {
    backgroundColor: Colors.light.primary,
  },
  nextBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: "#fff",
  },
});
