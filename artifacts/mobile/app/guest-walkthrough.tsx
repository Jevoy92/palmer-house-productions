import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/colors";
import { PAL_PROFILES } from "@/constants/images";

const WALKTHROUGH_COMPLETE_KEY = "@palmer_walkthrough_complete";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getSeasonalHint(): string {
  const month = new Date().getMonth();
  if (month >= 0 && month <= 2) return "Q1 is the perfect time to get ahead on content before your competitors wake up.";
  if (month >= 3 && month <= 5) return "Spring is when businesses ramp up marketing — now's the time to build your content engine.";
  if (month >= 6 && month <= 8) return "Summer is prime time for behind-the-scenes content while energy is high.";
  return "End-of-year is perfect for planning next year's content strategy and getting a head start.";
}

interface WalkthroughStep {
  id: string;
  icon: keyof typeof Feather.glyphMap;
  iconBg: string;
  iconColor: string;
  greeting: string;
  title: string;
  body: string;
  tip: string;
  palId?: "reel" | "spotlight" | "system" | "evergreen";
}

const STEPS: WalkthroughStep[] = [
  {
    id: "welcome",
    icon: "film",
    iconBg: Colors.light.primaryLight,
    iconColor: Colors.light.primary,
    greeting: `${getGreeting()}! 👋`,
    title: "What are we working on?",
    body: "This app helps you figure out exactly what kind of video content your business needs — and builds the plan for you. No guesswork, no fluff.",
    tip: getSeasonalHint(),
  },
  {
    id: "visibility",
    icon: "smartphone",
    iconBg: Colors.pal.reelLight,
    iconColor: Colors.pal.reel,
    greeting: "Need more visibility? 📱",
    title: "People don't know you exist yet",
    body: "If your business isn't showing up on social, you're invisible. Reel Pal builds a visibility system with short-form content — services reels, proof videos, day-in-the-life content. Think of it as your About You video, your Services video, the basics.",
    tip: "Most businesses only have 5 videos planned. What if you had 50? That's what a system looks like.",
    palId: "reel",
  },
  {
    id: "trust",
    icon: "film",
    iconBg: Colors.pal.spotlightLight,
    iconColor: Colors.pal.spotlight,
    greeting: "Need to build trust? 🎬",
    title: "People know you, but don't trust you yet",
    body: "Spotlight Pal creates premium trust assets — founder stories, testimonials, brand films. The kind of content that makes 'trust me' unnecessary because your clients sell for you.",
    tip: "One strong testimonial video can outperform months of social posting. Start with your best client story.",
    palId: "spotlight",
  },
  {
    id: "systems",
    icon: "settings",
    iconBg: Colors.pal.systemLight,
    iconColor: Colors.pal.system,
    greeting: "Hired someone recently? ⚙️",
    title: "Stop repeating yourself",
    body: "System Pal builds internal video systems — onboarding, SOPs, training. Hired someone and need to get them up to speed fast? Stop explaining the same thing for the 47th time.",
    tip: "The average company spends 30+ hours per new hire on repeated training. One video library eliminates that forever.",
    palId: "system",
  },
  {
    id: "authority",
    icon: "play-circle",
    iconBg: Colors.pal.evergreenLight,
    iconColor: Colors.pal.evergreen,
    greeting: "Ready to be the authority? 🎙️",
    title: "Content that compounds over time",
    body: "Evergreen Pal builds long-form authority content — podcasts, webinars, deep dives. Not content that expires in 24 hours, but videos that work harder the longer they exist.",
    tip: "A single 10-minute FAQ video can answer your top 5 questions forever — and it works 24/7.",
    palId: "evergreen",
  },
  {
    id: "tools",
    icon: "edit-3",
    iconBg: Colors.light.primaryLight,
    iconColor: Colors.light.primary,
    greeting: "One more thing... ✨",
    title: "AI tools to get you started",
    body: "Use the Script Writer to draft your first video script, then use the Teleprompter to film it yourself — your words scroll right on screen while you record. Plus content planners, hook generators, and more.",
    tip: "Try the Script Writer first. Draft a script, then hit record with the teleprompter. It's that quick.",
  },
  {
    id: "ready",
    icon: "check-circle",
    iconBg: Colors.light.primaryLight,
    iconColor: Colors.light.primary,
    greeting: "You're all set! 🚀",
    title: "Ready to explore",
    body: "Browse everything at your own pace. When you find a Pal that matches your biggest challenge right now, you can build a custom package and see pricing instantly. No surprises, no back-and-forth.",
    tip: "Everything you see as a guest is fully available. Create an account when you're ready to save your progress and track projects.",
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

  const currentStep = STEPS[currentIndex];

  const renderStep = ({ item }: { item: WalkthroughStep }) => (
    <View style={[styles.stepContainer, { width: SCREEN_WIDTH }]}>
      <View style={styles.stepContent}>
        {item.palId ? (
          <View style={styles.palAvatars}>
            <View style={[styles.avatarWrap, { borderColor: item.iconBg }]}>
              <Image source={PAL_PROFILES[item.palId].male} style={styles.avatarImg} />
            </View>
            <View style={[styles.avatarWrap, styles.avatarOverlap, { borderColor: item.iconBg }]}>
              <Image source={PAL_PROFILES[item.palId].female} style={styles.avatarImg} />
            </View>
          </View>
        ) : (
          <View style={[styles.iconWrap, { backgroundColor: item.iconBg }]}>
            <Feather name={item.icon} size={32} color={item.iconColor} />
          </View>
        )}

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
              index <= currentIndex && {
                backgroundColor: currentStep.iconColor,
              },
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
          style={[styles.nextBtn, { backgroundColor: currentStep.iconColor }]}
          onPress={goNext}
        >
          <Text style={styles.nextBtnText}>
            {isLastStep ? "Let's Go" : "Next"}
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
  palAvatars: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    overflow: "hidden",
  },
  avatarOverlap: {
    marginLeft: -16,
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    borderRadius: 36,
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
    paddingVertical: 16,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  nextBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: "#fff",
  },
});
