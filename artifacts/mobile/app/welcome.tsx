import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/colors";
import { PAL_IMAGES } from "@/constants/images";
import { useAuth } from "@/contexts/AuthContext";

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { browseAsGuest } = useAuth();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 60, paddingBottom: insets.bottom + 32 }]}>
      <View style={styles.top}>
        <View style={styles.logoWrap}>
          <Feather name="film" size={32} color={Colors.light.primary} />
        </View>
        <Text style={styles.brand}>Palmer House</Text>
        <Text style={styles.headline}>
          Your video{"\n"}content partner.
        </Text>
        <Text style={styles.subtitle}>
          Explore services, build packages, and get AI-powered content guidance — all in one place.
        </Text>

        <View style={styles.avatarStrip}>
          {(["reel", "spotlight", "system", "evergreen"] as const).map((palId, i) => (
            <Image
              key={palId}
              source={PAL_IMAGES[palId].male}
              style={[styles.stripAvatar, i > 0 && { marginLeft: -10 }]}
            />
          ))}
          {(["reel", "spotlight", "system", "evergreen"] as const).map((palId, i) => (
            <Image
              key={`f-${palId}`}
              source={PAL_IMAGES[palId].female}
              style={[styles.stripAvatar, { marginLeft: -10 }]}
            />
          ))}
        </View>
      </View>

      <View style={styles.features}>
        <View style={styles.feature}>
          <View style={[styles.featureIcon, { backgroundColor: Colors.pal.reelLight }]}>
            <Feather name="compass" size={16} color={Colors.pal.reel} />
          </View>
          <Text style={styles.featureText}>Explore video services & build packages</Text>
        </View>
        <View style={styles.feature}>
          <View style={[styles.featureIcon, { backgroundColor: Colors.pal.systemLight }]}>
            <Feather name="edit-3" size={16} color={Colors.pal.system} />
          </View>
          <Text style={styles.featureText}>AI-powered script writing & content planning</Text>
        </View>
        <View style={styles.feature}>
          <View style={[styles.featureIcon, { backgroundColor: Colors.pal.spotlightLight }]}>
            <Feather name="user" size={16} color={Colors.pal.spotlight} />
          </View>
          <Text style={styles.featureText}>Track your projects & review deliverables</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={styles.primaryBtn}
          onPress={() => router.push("/auth/register")}
        >
          <Text style={styles.primaryBtnText}>Create Account</Text>
        </Pressable>
        <Pressable
          style={styles.secondaryBtn}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.secondaryBtnText}>Sign In</Text>
        </Pressable>
        <View style={styles.guestRow}>
          <Pressable
            style={styles.ghostBtn}
            onPress={() => router.push("/onboarding")}
          >
            <Text style={styles.tourText}>Take a Tour</Text>
          </Pressable>
          <View style={styles.guestDot} />
          <Pressable
            style={styles.ghostBtn}
            onPress={() => {
              browseAsGuest();
              router.replace("/(tabs)");
            }}
          >
            <Text style={styles.ghostBtnText}>Browse as Guest</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: 28,
    justifyContent: "space-between",
  },
  top: {
    alignItems: "center",
  },
  logoWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: Colors.light.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  brand: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: Colors.light.primary,
    letterSpacing: 0.5,
    marginBottom: 8,
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
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  features: {
    gap: 16,
    paddingHorizontal: 8,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.text,
    flex: 1,
    lineHeight: 21,
  },
  actions: {
    gap: 10,
  },
  primaryBtn: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: "#fff",
  },
  secondaryBtn: {
    backgroundColor: Colors.light.backgroundSecondary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  secondaryBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: Colors.light.text,
  },
  avatarStrip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  stripAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#fff",
  },
  guestRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  guestDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.light.textTertiary,
  },
  ghostBtn: {
    paddingVertical: 12,
    alignItems: "center",
  },
  tourText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.primary,
  },
  ghostBtnText: {
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    color: Colors.light.textSecondary,
  },
});
