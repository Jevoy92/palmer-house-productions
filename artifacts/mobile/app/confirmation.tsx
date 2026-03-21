import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/colors";

export default function ConfirmationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={["#6B3FA0", "#4A2B70", "#2D1B45"]}
      style={[styles.container, { paddingTop: insets.top + 60 }]}
    >
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Feather name="check" size={48} color="#6B3FA0" />
        </View>
      </View>

      <Text style={styles.title}>Request Submitted!</Text>
      <Text style={styles.subtitle}>
        Thank you for your interest in Palmer House Productions. We've received
        your project request and will be in touch within 24 hours.
      </Text>

      <View style={styles.nextSteps}>
        <Text style={styles.nextStepsTitle}>What happens next?</Text>
        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <Text style={styles.stepText}>
            We'll review your project details and package selections.
          </Text>
        </View>
        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <Text style={styles.stepText}>
            A team member will reach out to schedule a discovery call.
          </Text>
        </View>
        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <Text style={styles.stepText}>
            We'll finalize your package and get you on the calendar.
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={styles.primaryButton}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.primaryButtonText}>Back to Home</Text>
        </Pressable>
        <Pressable
          style={styles.secondaryButton}
          onPress={() =>
            Linking.openURL("https://palmerhouseproductions.com/contact")
          }
        >
          <Text style={styles.secondaryButtonText}>
            Book a Discovery Call Now
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    alignItems: "center",
  },
  iconContainer: { marginBottom: 28 },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 30,
    color: "#fff",
    textAlign: "center",
    marginBottom: 14,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 36,
  },
  nextSteps: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: 24,
    marginBottom: 36,
  },
  nextStepsTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: "#fff",
    marginBottom: 18,
  },
  step: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    marginBottom: 16,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#fff",
  },
  stepText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 20,
    flex: 1,
  },
  actions: { width: "100%", gap: 12 },
  primaryButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryButtonText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: "#6B3FA0",
  },
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.4)",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
  },
});
