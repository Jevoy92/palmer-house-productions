import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
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
import { PAL_IMAGES } from "@/constants/images";
import { useAuth } from "@/contexts/AuthContext";

const { width } = Dimensions.get("window");

interface OnboardingSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  bg: string;
  images?: { male: any; female: any };
}

const SLIDES: OnboardingSlide[] = [
  {
    id: "welcome",
    title: "Meet Your\nVideo Pals",
    subtitle: "AI-GUIDED VIDEO STRATEGY",
    description:
      "Palmer House pairs you with character guides who help you build the perfect video content strategy for your business.",
    icon: "film",
    color: Colors.light.primary,
    bg: Colors.light.primaryLight,
  },
  {
    id: "reel",
    title: "Ryder & Raquel",
    subtitle: "REEL PAL · SHORT-FORM CONTENT",
    description:
      "Build visibility and momentum with strategic reels. Perfect for social media presence and quick engagement wins.",
    icon: "smartphone",
    color: Colors.pal.reel,
    bg: Colors.pal.reelLight,
    images: PAL_IMAGES.reel,
  },
  {
    id: "spotlight",
    title: "Kareem & Kiana",
    subtitle: "SPOTLIGHT PAL · TRUST ASSETS",
    description:
      "Premium trust-building content that establishes credibility. Founder stories, testimonials, and brand films.",
    icon: "film",
    color: Colors.pal.spotlight,
    bg: Colors.pal.spotlightLight,
    images: PAL_IMAGES.spotlight,
  },
  {
    id: "system",
    title: "Silas & Samira",
    subtitle: "SYSTEM PAL · INTERNAL VIDEO",
    description:
      "Streamline operations with internal video systems. Training, onboarding, and SOPs that eliminate repetition.",
    icon: "settings",
    color: Colors.pal.system,
    bg: Colors.pal.systemLight,
    images: PAL_IMAGES.system,
  },
  {
    id: "tools",
    title: "AI Content\nTools",
    subtitle: "POWERED BY AI",
    description:
      "Script writing, content planning, hook generation, and more. Get AI-powered guidance to create better content faster.",
    icon: "zap",
    color: Colors.light.primary,
    bg: Colors.light.primaryLight,
  },
];

function SlideItem({ item, index }: { item: OnboardingSlide; index: number }) {
  return (
    <View style={[styles.slide, { width }]}>
      <View style={styles.slideContent}>
        <Text style={[styles.slideLabel, { color: item.color }]}>{item.subtitle}</Text>

        {item.images ? (
          <View style={styles.avatarSection}>
            <View style={[styles.avatarLarge, { borderColor: item.bg }]}>
              <Image source={item.images.male} style={styles.avatarImage} />
            </View>
            <View style={[styles.avatarLarge, styles.avatarOverlap, { borderColor: item.bg }]}>
              <Image source={item.images.female} style={styles.avatarImage} />
            </View>
          </View>
        ) : (
          <View style={[styles.iconSection, { backgroundColor: item.bg }]}>
            <Feather name={item.icon as any} size={48} color={item.color} />
          </View>
        )}

        <Text style={styles.slideTitle}>{item.title}</Text>
        <Text style={styles.slideDescription}>{item.description}</Text>
      </View>
    </View>
  );
}

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { browseAsGuest } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index != null) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const isLastSlide = currentIndex === SLIDES.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      browseAsGuest();
      router.replace("/(tabs)");
    } else {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    }
  };

  const handleSkip = () => {
    browseAsGuest();
    router.replace("/(tabs)");
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 16 }]}>
      <View style={styles.topBar}>
        <Pressable onPress={handleSkip} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={({ item, index }) => <SlideItem item={item} index={index} />}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      <View style={styles.bottomSection}>
        <View style={styles.dots}>
          {SLIDES.map((slide, i) => (
            <View
              key={slide.id}
              style={[
                styles.dot,
                i === currentIndex
                  ? { backgroundColor: SLIDES[currentIndex].color, width: 24 }
                  : { backgroundColor: Colors.light.border },
              ]}
            />
          ))}
        </View>

        <Pressable
          style={[styles.nextBtn, { backgroundColor: SLIDES[currentIndex].color }]}
          onPress={handleNext}
        >
          <Text style={styles.nextBtnText}>
            {isLastSlide ? "Get Started" : "Next"}
          </Text>
          <Feather name={isLastSlide ? "check" : "arrow-right"} size={18} color="#fff" />
        </Pressable>

        {!isLastSlide && (
          <Pressable
            style={styles.signInLink}
            onPress={() => router.push("/auth/login")}
          >
            <Text style={styles.signInText}>
              Already have an account? <Text style={styles.signInBold}>Sign In</Text>
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  skipBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    color: Colors.light.textSecondary,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  slideContent: {
    alignItems: "center",
    width: "100%",
  },
  slideLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    letterSpacing: 1.5,
    marginBottom: 24,
  },
  avatarSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
    height: 120,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    overflow: "hidden",
  },
  avatarOverlap: {
    marginLeft: -20,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  iconSection: {
    width: 120,
    height: 120,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  slideTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 32,
    color: Colors.light.text,
    textAlign: "center",
    lineHeight: 38,
    letterSpacing: -0.8,
    marginBottom: 12,
  },
  slideDescription: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  bottomSection: {
    paddingHorizontal: 28,
    alignItems: "center",
    gap: 16,
  },
  dots: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    marginBottom: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    paddingVertical: 16,
    borderRadius: 14,
  },
  nextBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: "#fff",
  },
  signInLink: {
    paddingVertical: 4,
  },
  signInText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  signInBold: {
    fontFamily: "Inter_600SemiBold",
    color: Colors.light.primary,
  },
});
