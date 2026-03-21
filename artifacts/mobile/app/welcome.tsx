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
    <View style={[styles.container, { paddingTop: insets.top + 48, paddingBottom: insets.bottom + 24 }]}>
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
            Plan, create, and manage professional video content — all in one place.
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
                style={[styles.profilePic, { marginLeft: -10, zIndex: 1 }]}
              />
            </View>
          ))}
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Feather name="compass" size={16} color={Colors.pal.reel} />
            <Text style={styles.featureText}>Browse video services and build packages</Text>
          </View>
          <View style={styles.feature}>
            <Feather name="edit-3" size={16} color={Colors.pal.system} />
            <Text style={styles.featureText}>AI-powered script writing and content planning</Text>
          </View>
          <View style={styles.feature}>
            <Feather name="check-circle" size={16} color={Colors.pal.spotlight} />
            <Text style={styles.featureText}>Track projects and review deliverables</Text>
          </View>
        </View>

        <View style={styles.brandRow}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.brandLabel}>by</Text>
            <Text style={styles.brandName}>Palmer House Productions</Text>
          </View>
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

        <Pressable
          style={styles.tourBtn}
          onPress={() => router.push("/onboarding")}
        >
          <Text style={styles.tourText}>Take a Tour</Text>
        </Pressable>

        <Text style={styles.clientPrompt}>
          Already a client?{" "}
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
    marginBottom: 32,
  },
  headline: {
    fontFamily: "Inter_700Bold",
    fontSize: 34,
    color: Colors.light.text,
    textAlign: "center",
    lineHeight: 40,
    letterSpacing: -0.8,
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 12,
  },
  avatarStrip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
    gap: 10,
  },
  palPairWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Colors.light.background,
  },
  features: {
    gap: 0,
    marginBottom: 28,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.separator,
  },
  featureText: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.text,
    lineHeight: 20,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.light.separator,
    borderRadius: 10,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 8,
  },
  brandLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.light.textTertiary,
  },
  brandName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: Colors.light.text,
  },
  bottom: {
    gap: 12,
    paddingTop: 16,
  },
  guestBtn: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  guestBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#fff",
  },
  tourBtn: {
    alignItems: "center",
    paddingVertical: 4,
  },
  tourText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: Colors.light.primary,
  },
  clientPrompt: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
  clientLink: {
    fontFamily: "Inter_600SemiBold",
    color: Colors.light.primary,
  },
});
