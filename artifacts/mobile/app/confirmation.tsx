import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/colors";

export default function ConfirmationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 80 }]}>
      <View style={styles.checkCircle}>
        <Feather name="check" size={36} color={Colors.light.primary} />
      </View>

      <Text style={styles.title}>Request sent</Text>
      <Text style={styles.subtitle}>
        We've received your project request and will reach out within 24 hours to schedule a discovery call.
      </Text>

      <View style={styles.steps}>
        {[
          "We'll review your package and project details",
          "A team member will reach out to schedule a call",
          "We'll finalize everything and get you on the calendar",
        ].map((step, i) => (
          <View key={i} style={styles.step}>
            <View style={styles.stepNum}>
              <Text style={styles.stepNumText}>{i + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <Pressable
          style={styles.primaryBtn}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.primaryBtnText}>Done</Text>
        </Pressable>
        <Pressable
          style={styles.secondaryBtn}
          onPress={() => Linking.openURL("https://palmerhouseproductions.com/contact")}
        >
          <Text style={styles.secondaryBtnText}>Book a Call Now</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: 28,
    alignItems: "center",
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    color: Colors.light.text,
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 36,
  },
  steps: {
    width: "100%",
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    gap: 16,
  },
  step: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.light.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: Colors.light.primary,
  },
  stepText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
    flex: 1,
  },
  actions: {
    width: "100%",
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
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: Colors.light.backgroundSecondary,
  },
  secondaryBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: Colors.light.primary,
  },
});
