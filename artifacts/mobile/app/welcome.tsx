import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/colors";
import { PAL_PROFILES } from "@/constants/images";
import { useAuth } from "@/contexts/AuthContext";

const WALKTHROUGH_COMPLETE_KEY = "@palmer_walkthrough_complete";

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { browseAsGuest } = useAuth();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 24 }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.hero}>
          <Text style={styles.headline}>
            Your video{"\n"}content partner
          </Text>
          <Text style={styles.subtitle}>
            Everything you need to plan, create, and manage professional video content — in one place.
          </Text>
        </View>

        <View style={styles.avatarStrip}>
          {(["reel", "spotlight", "system", "evergreen"] as const).map((palId) => (
            <View key={palId} style={styles.palPairWrap}>
              <Image
                source={PAL_PROFILES[palId].male}
                style={[styles.profilePic, { zIndex: 2 }]}
              />
              <Image
                source={PAL_PROFILES[palId].female}
                style={[styles.profilePic, { marginLeft: -12, zIndex: 1 }]}
              />
            </View>
          ))}
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <View style={[styles.featureIcon, { backgroundColor: Colors.pal.reelLight }]}>
              <Feather name="compass" size={18} color={Colors.pal.reel} />
            </View>
            <View style={styles.featureTextWrap}>
              <Text style={styles.featureTitle}>Explore & Build</Text>
              <Text style={styles.featureDesc}>Browse video services and build custom packages</Text>
            </View>
          </View>
          <View style={styles.feature}>
            <View style={[styles.featureIcon, { backgroundColor: Colors.pal.systemLight }]}>
              <Feather name="edit-3" size={18} color={Colors.pal.system} />
            </View>
            <View style={styles.featureTextWrap}>
              <Text style={styles.featureTitle}>AI Content Guidance</Text>
              <Text style={styles.featureDesc}>Get AI-powered script writing and content planning</Text>
            </View>
          </View>
          <View style={styles.feature}>
            <View style={[styles.featureIcon, { backgroundColor: Colors.pal.spotlightLight }]}>
              <Feather name="check-circle" size={18} color={Colors.pal.spotlight} />
            </View>
            <View style={styles.featureTextWrap}>
              <Text style={styles.featureTitle}>Track Projects</Text>
              <Text style={styles.featureDesc}>Monitor progress and review your deliverables</Text>
            </View>
          </View>
        </View>

        <View style={styles.brandSection}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brandText}>
            Brought to you by{"\n"}
            <Text style={styles.brandName}>Palmer House Productions</Text>
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <Pressable
          style={styles.guestBtn}
          onPress={async () => {
            browseAsGuest();
            try {
              const completed = await AsyncStorage.getItem(WALKTHROUGH_COMPLETE_KEY);
              if (completed === "true") {
                router.replace("/(tabs)");
              } else {
                router.replace("/guest-walkthrough");
              }
            } catch {
              router.replace("/guest-walkthrough");
            }
          }}
        >
          <Text style={styles.guestBtnText}>Browse as Guest</Text>
        </Pressable>

        <View style={styles.guestRow}>
          <Pressable
            style={styles.ghostBtn}
            onPress={() => router.push("/onboarding")}
          >
            <Text style={styles.tourText}>Take a Tour</Text>
          </Pressable>
        </View>

        <Text style={styles.clientPrompt}>
          Already working with Palmer House Productions?{" "}
          <Text
            style={styles.clientLink}
            onPress={() => router.push("/auth/login")}
          >
            Login
          </Text>
          {" or "}
          <Text
            style={styles.clientLink}
            onPress={() => router.push("/auth/register")}
          >
            sign up
          </Text>
          .
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: 28,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 16,
  },
  hero: {
    alignItems: "center",
    marginBottom: 36,
  },
  headline: {
    fontFamily: "Inter_700Bold",
    fontSize: 36,
    color: Colors.light.text,
    textAlign: "center",
    lineHeight: 42,
    letterSpacing: -0.8,
    marginBottom: 14,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  avatarStrip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
    gap: 12,
  },
  palPairWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2.5,
    borderColor: "#fff",
  },
  features: {
    gap: 20,
    paddingHorizontal: 4,
    marginBottom: 36,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  featureTextWrap: {
    flex: 1,
    gap: 2,
  },
  featureTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
    lineHeight: 20,
  },
  featureDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 19,
  },
  brandSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 14,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  brandText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
    lineHeight: 18,
  },
  brandName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: Colors.light.text,
  },
  bottom: {
    gap: 14,
    paddingTop: 16,
  },
  guestBtn: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  guestBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: "#fff",
  },
  guestRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ghostBtn: {
    paddingVertical: 4,
    alignItems: "center",
  },
  tourText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.primary,
  },
  clientPrompt: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
  clientLink: {
    fontFamily: "Inter_600SemiBold",
    color: Colors.light.primary,
  },
});
